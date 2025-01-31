import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTimes, FaShippingFast, FaBox, FaUndo } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://addajaipur.onrender.com/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const checkLoginAndProceed = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!checkLoginAndProceed()) return;

    try {
      const response = await fetch('https://addajaipur.onrender.com/api/user-actions/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId: id }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to cart');
      }

      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: 'Product successfully added to your cart.',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!checkLoginAndProceed()) return;

    try {
      const response = await fetch('https://addajaipur.onrender.com/api/user-actions/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId: id }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to wishlist');
      }

      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist!',
        text: 'Product successfully added to your wishlist.',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    }
  };

  const LoginModal = () => (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-modal" onClick={() => setShowLoginModal(false)}>
          <FaTimes />
        </button>
        <h2>Please Login</h2>
        <p>You need to be logged in to perform this action.</p>
        <div className="modal-buttons">
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="register-button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-images">
          <div className="main-image-container">
            <div className="main-image">
              <img src={product.image[currentImage]} alt={product.name} />
            </div>
            <div className="image-zoom-hint">
              <span>Hover to zoom</span>
            </div>
          </div>
          <div className="image-thumbnails">
            {product.image.map((img, index) => (
              <div key={index} className={`thumbnail-wrapper ${currentImage === index ? 'active' : ''}`}>
                <img src={img} alt={`${product.name} view ${index + 1}`} onClick={() => setCurrentImage(index)} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <p className="brand">By <span>{product.brand.name}</span></p>
            <p className="style-code">Style Code: {product.stylecode}</p>
          </div>

          <div className="product-pricing">
            <div className="price">₹{product.price}</div>
            <div className="stock-info">
              {product.stock > 0 ? (
                <span className="in-stock">
                  <FaBox /> In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="out-of-stock">
                  <FaTimes /> Out of Stock
                </span>
              )}
            </div>
          </div>

          <div className="shipping-info">
            <div className="info-item">
              <FaShippingFast />
              <span>Free Shipping</span>
            </div>
            <div className="info-item">
              <FaUndo />
              <span>30-Day Returns</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart} disabled={product.stock === 0}>
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button className="add-to-wishlist" onClick={handleAddToWishlist}>
              <FaHeart />
              <span>Add to Wishlist</span>
            </button>
          </div>

          <div className="product-details-info">
            <div className="details-section">
              <h3>Product Details</h3>
              <div className="details-grid">
                <div className="detail-item"><span className="label">Material</span><span className="value">{product.material}</span></div>
                <div className="detail-item"><span className="label">Pattern</span><span className="value">{product.pattern}</span></div>
                <div className="detail-item"><span className="label">Type</span><span className="value">{product.type}</span></div>
                <div className="detail-item"><span className="label">Length</span><span className="value">{product.lengthType}</span></div>
                <div className="detail-item"><span className="label">Neck</span><span className="value">{product.neck}</span></div>
              </div>
            </div>
            <div className="description"><h3>Description</h3><p>{product.description}</p></div>
            <div className="fabric-care"><h3>Fabric Care</h3><p>{product.fabricCare}</p></div>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginModal />}
    </div>
  );
}
