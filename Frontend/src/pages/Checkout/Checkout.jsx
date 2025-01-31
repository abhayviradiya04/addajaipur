import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Add your CSS for styling
import Swal from 'sweetalert2';
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from local storage or API
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(storedProducts);
  }, []);

  // Handle payment using Razorpay
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
  
    try {
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
  
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        throw new Error('User not logged in.');
      }
      
      const userId = user._id; // Extract userId
  
      // Create an order on the backend
      const response = await fetch('https://addajaipur.onrender.com/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products, totalAmount: calculateTotal() }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const orderData = await response.json();
      const { id, amount, currency } = orderData;
  
      // Razorpay options
      const options = {
        key: 'rzp_test_2K2eGnhmTiYi44',
        amount: amount.toString(),
        currency: currency,
        name: 'E-clothing',
        description: 'Payment for your order',
        order_id: id,
        handler: async function (response) {
          // Save order in the database
          const orderResponse = await fetch('https://addajaipur.onrender.com/api/user-actions/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId, // Pass userId from localStorage
              products,
              paymentId: response.razorpay_payment_id,
            }),
          });


          if (!orderResponse.ok) {
            throw new Error('Failed to save order');
          }
  
          // Show success message
          Swal.fire({
            title: 'Payment Successful!',
            text: `Your payment ID is: ${response.razorpay_payment_id}`,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/order-success');
          });
  
          // Clear cart after successful order
          localStorage.removeItem('cart');
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
      console.error('Error during payment:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    console.log(products)
    return products.reduce((total, product) => total + (product.price * product.quantity
    ), 0);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        <div className="checkout-items">
          <h2>Your Order</h2>
          {products.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="checkout-item">
                <img src={product.image[0]} alt={product.name} className="checkout-item-image" />
                <div className="item-details">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="payment-button"
            disabled={loading || products.length === 0}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;