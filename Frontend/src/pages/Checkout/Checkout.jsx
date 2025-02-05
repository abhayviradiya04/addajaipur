import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import './Checkout.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay'); // Default Razorpay
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(storedProducts);
  }, []);

  // Function to calculate total price
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        throw new Error('User not logged in.');
      }

      const userId = user._id;
      const totalAmount = calculateTotal();

      // If COD is selected, create an order and generate an invoice
      if (paymentMethod === 'COD') {
        const response = await fetch('https://addajaipur.onrender.com/api/user-actions/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, products, paymentMethod }),
        });

        if (!response.ok) {
          throw new Error('Failed to create COD order');
        }

         // ✅ Update stock after successful payment
      const updateStockResponse = await fetch('https://addajaipur.onrender.com/api/products/update-quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: products.map(product => ({
            productId: product._id,
            quantity: product.quantity,
          })),
        }),
      });

      if (!updateStockResponse.ok) {
        throw new Error('Failed to update product stock');
      }

      // Clear cart from the database
      const clearCartResponse = await fetch('https://addajaipur.onrender.com/api/user-actions/cart/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!clearCartResponse.ok) {
        throw new Error('Failed to clear cart');
      }

        const orderData = await response.json();
        generateInvoice(orderData);
        return;
      }

      // Razorpay payment flow
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      };

      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      const orderResponse = await fetch('https://addajaipur.onrender.com/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products, totalAmount }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();
      const { id, amount, currency } = orderData;

      const options = {
        key: 'rzp_test_2K2eGnhmTiYi44',
        amount: amount.toString(),
        currency: currency,
        name: 'E-clothing',
        description: 'Payment for your order',
        order_id: id,
        handler: async function (response) {
          try {
            const saveOrderResponse = await fetch('https://addajaipur.onrender.com/api/user-actions/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId,
                products,
                paymentId: response.razorpay_payment_id,
                paymentMethod: 'Razorpay',
              }),
            });

            if (!saveOrderResponse.ok) {
              throw new Error('Failed to save order');
            }
            // ✅ Update stock after successful payment
            const updateStockResponse = await fetch('https://addajaipur.onrender.com/api/products/update-quantity', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                products: products.map(product => ({
                  productId: product._id,
                  quantity: product.quantity,
                })),
              }),
            });

            if (!updateStockResponse.ok) {
              throw new Error('Failed to update product stock');
            }

            // Clear cart from the database
            const clearCartResponse = await fetch('https://addajaipur.onrender.com/api/user-actions/cart/clear', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId }),
            });

            if (!clearCartResponse.ok) {
              throw new Error('Failed to clear cart');
            }

            
        const orderData = await saveOrderResponse.json();
        generateInvoice(orderData);
            Swal.fire({
              title: 'Payment Successful!',
              text: `Your payment ID is: ${response.razorpay_payment_id}`,
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              localStorage.removeItem('cart');
              navigate('/home');
            });
          } catch (err) {
            setError('Failed to process payment. Please contact support.');
          }
        },
        prefill: {
          name: user.name || 'Clothing Website',
          email: user.email || 'clothing@example.com',
          contact: user.contact || '+91 5432112345',
        },
        theme: { color: '#3399cc' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate Invoice PDF
  const generateInvoice = (orderData) => {
    const doc = new jsPDF();
    let yPosition = 20;
  
    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 150, 243); // Blue color
    doc.text('Invoice', 105, yPosition, { align: 'center' });
    yPosition += 15;
  
    // Order Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Order ID: ${orderData.orderId}`, 20, yPosition);
    yPosition += 10;
  
    doc.text(`Payment Method: ${orderData.paymentMethod}`, 20, yPosition);
    yPosition += 10;
  
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 15;
  
    // Delivery Details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Delivery Details', 20, yPosition);
    yPosition += 10;
  
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('123, Dummy Street, India', 20, yPosition);
    yPosition += 10;
  
    doc.text('Contact: +91 9876543210', 20, yPosition);
    yPosition += 15;
  
    // Product Table Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Summary', 20, yPosition);
    yPosition += 10;
  
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(200, 200, 200); // Light gray border
    doc.setLineWidth(0.2);
  
    // Table Header
    doc.setFillColor(245, 245, 245); // Light gray background
    doc.rect(20, yPosition, 170, 10, 'F');
    doc.text('Product', 25, yPosition + 7);
    doc.text('Quantity', 100, yPosition + 7);
    doc.text('Price', 150, yPosition + 7);
    yPosition += 10;
  
    // Product Rows
    products.forEach((product) => {
      doc.text(product.name, 25, yPosition + 7);
      doc.text(product.quantity.toString(), 100, yPosition + 7);
      doc.text(`₹${product.price}`, 150, yPosition + 7);
      yPosition += 10;
    });
  
    // Total Amount
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount: ₹${orderData.totalAmount}`, 20, yPosition + 15);
  
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gray color
    doc.text('Thank you for shopping with us!', 105, 280, { align: 'center' });
  
    // Save and Show Invoice
    setInvoice(doc);
  
    Swal.fire({
      title: 'Order Placed Successfully!',
      text: 'Your COD order has been placed. You can download the invoice.',
      icon: 'success',
      confirmButtonText: 'Download Invoice',
    }).then(() => {
      doc.save(`invoice_${orderData.orderId}.pdf`);
      navigate('/home');
    });
  };


  return (
    <div className="checkout-container">
    <h1>Checkout</h1>
    {error && <div className="error-message">{error}</div>}
  
    <div className="order-summary">
      <h2>Order Summary</h2>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ₹{calculateTotal()}</h3>
    </div>
  
    <div className="payment-method">
      <h2>Select Payment Method</h2>
      <label className={`payment-option ${paymentMethod === 'Razorpay' ? 'selected' : ''}`}>
        <input type="radio" value="Razorpay" checked={paymentMethod === 'Razorpay'} onChange={() => setPaymentMethod('Razorpay')} />
        Pay with Razorpay
      </label>
      <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
        <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
        Cash on Delivery
      </label>
    </div>
  
    <button className="checkout-button" onClick={handlePayment} disabled={loading || products.length === 0}>
      {loading ? 'Processing...' : 'Proceed to Payment'}
    </button>
  </div>
  );
};

export default Checkout;
