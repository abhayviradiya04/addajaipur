import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { FaTruck, FaMoneyBillWave, FaTag, FaHome, FaPen, FaCreditCard, FaCashRegister } from 'react-icons/fa';
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
        
        // Map backend address fields to local state
        setAddress({
          street: `${userData.addressLine1}${userData.addressLine2 ? `, ${userData.addressLine2}` : ''}`,
          city: userData.city,
          state: userData.state,
          zip: userData.cityCode,
          contact: address.contact // Keep existing contact or add phone to user model
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
  }, []); // Empty dependency array to run only once on mount

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

    if (!response.ok) throw new Error('Failed to create COD order');
    generateInvoice(await response.json());
    await updateStockAndClearCart(userId);
    Swal.fire('Success!', 'Payment processed successfully!', 'success').then(() => {
      localStorage.removeItem('cart');
      navigate('/home');
    });
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
    try {
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
 
       if (!response.ok) {
          throw new Error('Failed to process order');
       }
 
       const orderData = await response.json();
       await updateStockAndClearCart(userId);
       
       Swal.fire({
          title: 'Payment Successful!',
          text: 'Do you want to download the invoice?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Download Invoice',
          cancelButtonText: 'No, Just Go Home',
       }).then((result) => {
          if (result.isConfirmed) {
             generateInvoice(orderData);
          }
          localStorage.removeItem('cart');
          navigate('/home');
       });
    } catch (error) {
       console.error('Error processing payment:', error);
       Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
 };
 

  const updateStockAndClearCart = async (userId) => {
    await Promise.all([
      fetch('https://addajaipur.onrender.com/api/products/update-quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: products.map(p => ({ _id: p._id, quantity: p.quantity }))
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
    
    // Header
    doc.setFontSize(18)
       .setTextColor(40, 40, 40)
       .setFont('helvetica', 'bold')
       .text('INVOICE', 105, y, { align: 'center' });
    y += 10;

    // Company Info
    doc.setFontSize(10)
       .setTextColor(100, 100, 100)
       .setFont('helvetica', 'normal')
       .text('Outfit Craze', 20, y)
       .text('123 Fashion Street', 20, y + 5)
       .text('Jaipur, Rajasthan 302001', 20, y + 10)
       .text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, y + 20);
    y += 30;

    // Order and Customer Info
    const customer = JSON.parse(localStorage.getItem('user')) || {};
    doc.setFont('helvetica', 'bold').text(`Order ID: ${orderData.orderId}`, 20, y);
    doc.setFont('helvetica', 'normal').text(`Customer: ${customer.name || ''}`, 20, y + 10);
    y += 20;

    // Product Table Header
    doc.setFillColor(245, 245, 245)
       .rect(20, y, 170, 10, 'F')
       .setFont('helvetica', 'bold')
       .text('Product', 22, y + 7)
       .text('Quantity', 120, y + 7)
       .text('Price', 160, y + 7);
    y += 15;

    // Product Items
    products.forEach((product, index) => {
      if (y > 250) { // Page break
        doc.addPage();
        y = 20;
      }
      
      doc.setFont('helvetica', 'normal')
         .text(product.name, 22, y + 7)
         .text(product.quantity.toString(), 120, y + 7)
         .text(`₹${(product.price * product.quantity).toFixed(2)}`, 160, y + 7);
      
      // Add line separator
      doc.setDrawColor(200, 200, 200)
         .line(20, y + 12, 190, y + 12);
      y += 15;
    });

    // Price Breakdown
    const subtotal = calculateSubtotal();
    const gst = calculateGST(subtotal - discount);
    y += 10;

    doc.setFont('helvetica', 'bold')
       .text('Subtotal:', 120, y)
       .text(`₹${subtotal.toFixed(2)}`, 160, y);
    y += 10;

    doc.text(`Discount (${isPromoApplied ? '10%' : '0%'}):`, 120, y)
       .text(`-₹${discount.toFixed(2)}`, 160, y);
    y += 10;

    doc.text('GST (9%):', 120, y)
       .text(`₹${gst.toFixed(2)}`, 160, y);
    y += 10;

    doc.text('CGST (9%):', 120, y)
       .text(`₹${gst.toFixed(2)}`, 160, y);
    y += 15;

    doc.setFontSize(12)
       .text('Grand Total:', 120, y)
       .text(`₹${calculateGrandTotal().toFixed(2)}`, 160, y);
    
    // Footer
    doc.setFontSize(8)
       .setTextColor(150, 150, 150)
       .text('Thank you for shopping with us!', 105, 280, { align: 'center' });

    setInvoice(doc);
    doc.save(`invoice_${orderData.orderId}.pdf`);
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
            
            <span 
              className="edit-icon m-2" 
              onClick={() => setIsEditingAddress(!isEditingAddress)} 
              >
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
                className='m-1'
                checked={paymentMethod === 'Razorpay'}
                onChange={() => setPaymentMethod('Razorpay')}
              />
              <span>
                <FaCreditCard className='m-2' />Razorpay</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                className='m-1'
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              <span><FaCashRegister className='m-2'/>Cash on Delivery</span>

            </label>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="checkout-section order-summary">
          <h2 className="section-title"><FaTruck /> Order Summary</h2>

            {/* Promo Code Section */}
            <div className="promo-section m-3">
           
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
              <span>Grand Total</span>
              <span>₹{calculateGrandTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        className="checkout-button m-3"
        onClick={handlePayment}
        disabled={loading || products.length === 0}
      >
        {loading ? 'Processing...' : `Pay ₹${calculateGrandTotal().toFixed(2)}`}
      </button>
    </div>
  );
};

export default Checkout;