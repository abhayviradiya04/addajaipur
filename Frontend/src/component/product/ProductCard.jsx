import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, type }) {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);

  const handleClick = () => {
    navigate(`/${type}/${product._id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/${type}/${product._id}`);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {/* Image Section */}
      <div className="image-container">
        <img
          src={product.image[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {/* Quick View Button */}
        <button className="quick-add-btn" onClick={handleQuickView}>
          <span className="quick-view-icon">🔍</span>
        </button>
        {/* Status Badges */}
        {product.stock === 0 && <div className="status-badge out-of-stock">Sold Out</div>}
        {product.stock > 0 && product.stock <= 5 && <div className="status-badge low-stock">Almost Gone</div>}
      </div>

      {/* Product Details */}
      <div className="card-details">
        <h3 className="product-title">{product.name}</h3>
        <div className="price-section">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>}
        </div>
        <div className="product-meta">
          <span className="brand">{product.brand.name}</span>
          <div className="rating">★★★★☆ <span className="rating-count">(128)</span></div>
        </div>
        {/* Wishlist Button on the right */}
        <button className="wishlist-btn" aria-label="Add to Wishlist">❤️</button>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quick-view-modal">
          <div className="modal-content">
            <span className="close" onClick={closeQuickView}>&times;</span>
            <img src={product.image[0]} alt={product.name} className="modal-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price-section">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
