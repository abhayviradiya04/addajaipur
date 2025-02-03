import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Wishlist.css';
import Skeleton from 'react-loading-skeleton';

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWishlistItems();
  }, [user, navigate]);

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch(`https://addajaipur.onrender.com/api/user-actions/wishlist/${user._id}`, {
        credentials: 'include',
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
    const confirmRemove = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    });

    if (!confirmRemove.isConfirmed) return;

    try {
      const response = await fetch(`https://addajaipur.onrender.com/api/user-actions/wishlist/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to remove item from wishlist');

      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId));

      Swal.fire({
        title: 'Removed!',
        text: 'Item has been removed from your wishlist.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
      });
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch('https://addajaipur.onrender.com/api/user-actions/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to add to cart');

      Swal.fire({
        title: 'Success!',
        text: 'Product added to cart successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      const response1 = await fetch(`https://addajaipur.onrender.com/api/user-actions/wishlist/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId }),
        credentials: 'include',
      });

      if (!response1.ok) throw new Error('Failed to remove item from wishlist');

      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
      });
    }
  };

 
  if (loading) {
    return (
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        <div className="wishlist-items">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="wishlist-item">
              <div className="item-image">
                <Skeleton height={150} width={150} />
              </div>
              <div className="item-details">
                <h3><Skeleton width={120} /></h3>
                <p className="brand"><Skeleton width={100} /></p>
                <p className="price"><Skeleton width={80} /></p>
                <div className="stock-status">
                  <Skeleton width={60} />
                </div>
                <div className="item-actions">
                  <Skeleton width={120} height={35} />
                  <Skeleton width={100} height={35} style={{ marginLeft: '10px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="wishlist-error">Error: {error}</div>;

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
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item._id)} disabled={item.stock === 0}>
                  <FaShoppingCart /> Move to Cart
                </button>
                <button className="remove-btn" onClick={() => handleRemoveFromWishlist(item._id)}>
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
