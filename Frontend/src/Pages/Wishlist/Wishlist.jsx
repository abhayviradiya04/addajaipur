import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import './Wishlist.css';

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    fetchWishlistItems();
  }, [user, navigate]);

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user-actions/wishlist/${user._id}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const data = await response.json();
      setWishlistItems(data.wishlistItems);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user-actions/wishlist/remove`, {
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
        throw new Error('Failed to remove item from wishlist');
      }

      // Update the wishlist items state
      setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId));
    } catch (err) {
      alert('Error removing item from wishlist: ' + err.message);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/user-actions/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          productId: productId
        }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to cart');
      }

      alert('Product added to cart successfully!');
      // Optionally remove from wishlist after adding to cart
      await handleRemoveFromWishlist(productId);
    } catch (err) {
      alert('Error adding to cart: ' + err.message);
    }
  };

  if (loading) {
    return <div className="wishlist-loading">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="wishlist-error">Error: {error}</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <h2>Your Wishlist is Empty</h2>
        <p>Add items to your wishlist to save them for later!</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div key={item._id} className="wishlist-item">
            <div className="item-image" onClick={() => navigate(`/${item.type}/${item._id}`)}>
              <img src={item.image[0]} alt={item.name} />
            </div>
            <div className="item-details">
              <h3 onClick={() => navigate(`/${item.type}/${item._id}`)}>{item.name}</h3>
              <p className="brand">{item.brand.name}</p>
              <p className="price">₹{item.price}</p>
              <div className="stock-status">
                {item.stock > 0 ? (
                  <span className="in-stock">In Stock</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>
              <div className="item-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item._id)}
                  disabled={item.stock === 0}
                >
                  <FaShoppingCart /> Move to Cart
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 