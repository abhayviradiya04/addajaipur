import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { FaTruck, FaMoneyBillWave, FaTag, FaHome, FaPen, FaCashRegister, FaCreditCard } from 'react-icons/fa';
import './Checkout.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [address, setAddress] = useState({
    street: '123, Dummy Street',
    city: 'Jaipur',
    state: 'Rajasthan',
    zip: '302001',
    contact: '+91 9876543210'
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?._id) {
          throw new Error('User not logged in');
        }

        const response = await fetch(`https://addajaipur.onrender.com/api/users/${user._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }

        const userData = await response.json();
        
        setAddress({
          street: `${userData.addressLine1}${userData.addressLine2 ? `, ${userData.addressLine2}` : ''}`,
          city: userData.city,
          state: userData.state,
          zip: userData.cityCode,
          contact: address.contact
        });

      } catch (error) {
        console.error('Address fetch error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Address Loading Failed',
          text: 'Could not load your saved address. Using default address.',
        });
      }
    };

    fetchUserAddress();
  }, []);

  const calculateSubtotal = () => products.reduce((total, product) => total + product.price * product.quantity, 0);
  const calculateGST = (amount) => amount * 0.09;
  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const discounted = subtotal - discount;
    return discounted + calculateGST(discounted) * 2;
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'DISCOUNT10') {
      const subtotal = calculateSubtotal();
      setDiscount(subtotal * 0.1);
      setIsPromoApplied(true);
      Swal.fire('Promo Applied!', '10% discount has been applied!', 'success');
    } else {
      Swal.fire('Invalid Promo', 'The promo code entered is invalid', 'error');
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) throw new Error('User not logged in');

      const totalAmount = calculateGrandTotal();

      if (paymentMethod === 'COD') {
        await handleCODOrder(user._id, totalAmount);
        return;
      }

      await handleRazorpayPayment(user, totalAmount);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCODOrder = async (userId, totalAmount) => {
    const response = await fetch('https://addajaipur.onrender.com/api/user-actions/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        products,
        paymentMethod: 'COD',
        totalAmount
      }),
      
    });
    console.log(response);

    if (!response.ok) throw new Error('Failed to create COD order');
    await updateStockAndClearCart(userId);
    generateInvoice(await response.json());
  };

  const handleRazorpayPayment = async (user, totalAmount) => {
    const orderResponse = await fetch('https://addajaipur.onrender.com/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products, totalAmount }),
    });

    if (!orderResponse.ok) throw new Error('Failed to create order');
    const orderData = await orderResponse.json();

    const options = {
      key: 'rzp_test_2K2eGnhmTiYi44',
      amount: orderData.amount.toString(),
      currency: 'INR',
      name: 'Outfit Craze',
      description: 'Order Payment',
      order_id: orderData.id,
      handler: async (response) => {
        await handleSuccessfulPayment(user._id, response.razorpay_payment_id);
      },
      prefill: { ...user },
      theme: { color: '#3399cc' }
    };

    new window.Razorpay(options).open();
  };

  const handleSuccessfulPayment = async (userId, paymentId) => {
   const response = await fetch('https://addajaipur.onrender.com/api/user-actions/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        products,
        paymentId,
        paymentMethod: 'Razorpay',
        totalAmount: calculateGrandTotal()
      }),
    });

    await updateStockAndClearCart(userId);
    
    generateInvoice(await response.json());
    Swal.fire('Success!', 'Payment processed successfully!', 'success').then(() => {
      localStorage.removeItem('cart');
      navigate('/home');
    });
  };

  const updateStockAndClearCart = async (userId) => {
    await Promise.all([
      fetch('https://addajaipur.onrender.com/api/products/update-quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: products.map(p => ({ productId: p._id, quantity: p.quantity }))
        }),
      }),
      fetch('https://addajaipur.onrender.com/api/user-actions/cart/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
    ]);
  };

  const generateInvoice = (orderData) => {
    const doc = new jsPDF();
    let y = 20;
    
    // Add logo (Make sure to replace 'logo.png' with the actual path to your logo)
    const logo = new Image();
    logo.src = '../../../public/asset/images/logo.webp';
    doc.addImage(logo, 'webp', 10, y, 40, 40);
    
    // Title
    doc.setFontSize(18).setTextColor(0, 123, 255).text("Outfit's Craze", 105, y + 20, { align: 'center' });
    y += 40; // Adjust for logo and title space
    
    // Date and Time of Payment
    doc.setFontSize(12).setTextColor(0, 0, 0);
    const currentDate = new Date().toLocaleString();
    doc.text(`Order Date: ${currentDate}`, 20, y);
    y += 10;
    
    // Add a horizontal line for separation
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 10;
    
    // Billing Section (Delivery address, etc.)
    doc.setFontSize(12).text("Billing Information", 20, y);
    y += 7;
    
    doc.setFontSize(10)
      .text(`Delivery Address: ${address.street}, ${address.city}, ${address.state} ${address.zip}`, 20, y)
      .text(`Contact: ${address.contact}`, 20, y + 7);
    y += 20;
    
    // Order ID
    doc.setFontSize(12).text(`Order ID: ${orderData.orderId}`, 20, y);
    y += 10;
  
    // Products List
    doc.setFontSize(12).text("Product Details", 20, y);
    y += 10;
  
    // Product Table (if you have products to list)
    doc.setFontSize(10);
    products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} x ${product.quantity} - ₹${(product.price * product.quantity).toFixed(2)}`, 20, y);
      y += 7;
    });
    
    // Add another line for separation
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 10;
    
    // Calculations (Subtotal, Discount, GST, Grand Total)
    const subtotal = calculateSubtotal();
    const gst = calculateGST(subtotal - discount);
    
    doc.setFontSize(12)
      .text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, y)
      .text(`Discount: -₹${discount.toFixed(2)}`, 120, y)
      y += 10;
    
    doc.text(`GST (9%): ₹${gst.toFixed(2)}`, 20, y);
    doc.text(`CGST (9%): ₹${gst.toFixed(2)}`, 120, y);
    y += 10;
    
    doc.setFont('helvetica', 'bold').setTextColor(255, 87, 34);
    doc.text(`Grand Total: ₹${calculateGrandTotal().toFixed(2)}`, 20, y);
    
    // Add another line for separation
    doc.setLineWidth(1);
    doc.line(20, y + 7, 190, y + 7);
    
    // Footer (Terms, Website, etc.)
    y += 20;
    doc.setFontSize(8).setTextColor(0, 0, 0);
    doc.text("Thank you for shopping with Outfit's!", 20, y);
    doc.text("Visit us at Our Website for more awesome deals!", 20, y + 7);
    
    // Save the invoice
    setInvoice(doc);
    doc.save(`invoice_${orderData.orderId}.pdf`);
    navigate('/home');
  };
  

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="checkout-grid">
        {/* Address Section */}
        <div className="checkout-section address-section">
          <h2 className="section-title">
            <FaHome /> Delivery Address
            <span className="edit-icon" onClick={() => setIsEditingAddress(!isEditingAddress)}>
              <FaPen size={12} />
            </span>
          </h2>
          {isEditingAddress ? (
            <div className="address-form">
              <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={e => setAddress({...address, street: e.target.value})}
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={e => setAddress({...address, city: e.target.value})}
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={e => setAddress({...address, state: e.target.value})}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={address.zip}
                onChange={e => setAddress({...address, zip: e.target.value})}
              />
              <input
                type="text"
                placeholder="Contact"
                value={address.contact}
                onChange={e => setAddress({...address, contact: e.target.value})}
              />
              <button className="save-button" onClick={() => setIsEditingAddress(false)}>Save Address</button>
            </div>
          ) : (
            <div className="address-display">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>Contact: {address.contact}</p>
            </div>
          )}
        </div>

        {/* Payment Method Section */}
        <div className="checkout-section payment-section">
          <h2 className="section-title"><FaMoneyBillWave /> Payment Method</h2>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'Razorpay' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'Razorpay'}
                onChange={() => setPaymentMethod('Razorpay')}
              />
              <FaCreditCard size={20} style={{ marginRight: 8 }} />
              <span>Razorpay</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              <FaCashRegister size={20} style={{ marginRight: 8 }} />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="checkout-section order-summary">
          <h2 className="section-title"><FaTruck /> Order Summary</h2>
           {/* Promo Code Section */}
           <div className="promo-section mb-3">
            {/* <FaTag /> */}
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              disabled={isPromoApplied}
            />
            <button
              className="apply-button"
              onClick={handleApplyPromo}
              disabled={isPromoApplied}
            >
              {isPromoApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
          <div className="order-items">
            {products.map((product, i) => (
              <div key={i} className="order-item">
                <div className="item-details">
                  <span className="item-name">{product.name}</span>
                  <span className="item-quantity">x{product.quantity}</span>
                </div>
                <span className="item-price">₹{(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

         

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="price-row">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="price-row">
              <span>GST (9%)</span>
              <span>₹{calculateGST(calculateSubtotal() - discount).toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>CGST (9%)</span>
              <span>₹{calculateGST(calculateSubtotal() - discount).toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <b><span>Total</span>
              <span>₹{calculateGrandTotal().toFixed(2)}</span>
              </b>
            </div>
          </div>

          <div className="checkout-buttons m-3">
            <button className="checkout-button" onClick={handlePayment} disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
