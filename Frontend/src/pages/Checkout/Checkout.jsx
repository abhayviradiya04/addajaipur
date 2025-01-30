import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Add your CSS for styling

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
          script.onload = () => {
            resolve();
          };
          document.body.appendChild(script);
        });
      };
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }
      // Create an order on the backend
      const response = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();
      const { id, amount, currency } = orderData;

      // Razorpay options
      const options = {
        key: 'rzp_test_2K2eGnhmTiYi44', // Replace with your Razorpay key ID
        amount: amount.toString(), // Amount is in currency subunits (e.g., paise for INR)
        currency: currency,
        name: 'E-clothing',
        description: 'Payment for your order',
        order_id: id, // Order ID generated in the backend
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally, send payment details to your server for verification
          navigate('/order-success'); // Redirect to a success page
        },
        prefill: {
          name: 'Customer Name', // Replace with dynamic user data if available
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc', // Customize the theme color
        },
      };

      // Open Razorpay checkout
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
                <img src={product.image} alt={product.name} className="item-image" />
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