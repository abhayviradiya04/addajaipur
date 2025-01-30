import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user-actions/cart/${user._id}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data.cartItems);

      // Initialize quantities based on fetched items
      const initialQuantities = {};
      data.cartItems.forEach(item => {
        initialQuantities[item._id] = item.quantity || 1; // Use the quantity from the server or default to 1
      });
      setQuantities(initialQuantities);

      // Save cart items with quantities to localStorage
      const cartWithQuantities = data.cartItems.map(item => ({
        ...item,
        quantity: initialQuantities[item._id] || 1
      }));
      localStorage.setItem('cart', JSON.stringify(cartWithQuantities));

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user-actions/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          productId: productId
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      // Update the cart items state
      setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
      // Remove quantity state for this item
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      });

      // Update localStorage
      const updatedCart = cartItems.filter(item => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      alert('Error removing item from cart: ' + err.message);
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const product = cartItems.find(item => item._id === productId);

      if (!product) return prev; // Ensure the product exists

      const currentQuantity = prev[productId] || 1;
      const newQuantity = currentQuantity + change;

      // Prevent quantity from going below 1 or above available stock
      if (newQuantity < 1 || newQuantity > product.stock) {
        return prev;
      }

      // Update localStorage with the new quantity
      const updatedCart = cartItems.map(item => {
        if (item._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return {
        ...prev,
        [productId]: newQuantity
      };
    });
  };

  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item._id] || 1));
    }, 0);
  };

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="cart-error">Error: {error}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to proceed with checkout!</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image" onClick={() => navigate(`/${item.type}/${item._id}`)}>
                <img src={item.image[0]} alt={item.name} />
              </div>
              <div className="item-details">
                <h3 onClick={() => navigate(`/${item.type}/${item._id}`)}>{item.name}</h3>
                <p className="brand">{item.brand.name}</p>
                <p className="price">₹{item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >
                    <FaMinus />
                  </button>
                  <span>{quantities[item._id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    disabled={quantities[item._id] === item.stock}
                  >
                    <FaPlus />
                  </button>
                </div>
                <p className="item-total">
                  Total: ₹{calculateItemTotal(item.price, quantities[item._id] || 1)}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
          </div>
          <Link to="/checkout">
          <button className="checkout-btn">
           
              Proceed to Checkout
            
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}