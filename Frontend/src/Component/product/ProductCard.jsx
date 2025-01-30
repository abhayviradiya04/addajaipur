import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="card-header">
        <div className="image-container">
          <img 
            src={product.image[0]} 
            alt={product.name} 
            className="product-image"
            loading="lazy"
          />
          <div className="hover-actions">
            <button className="quick-add">Quick Add</button>
          </div>
          {product.stock === 0 && (
            <div className="status-badge out-of-stock">Sold Out</div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="status-badge low-stock">Almost Gone</div>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="product-meta">
          <span className="brand">{product.brand.name}</span>
          <div className="rating">
            ★★★★☆ <span className="rating-count">(128)</span>
          </div>
        </div>

        <h3 className="product-title">{product.name}</h3>

        <div className="price-section">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <div className="product-footer">
          <button className="wishlist-btn">
            ♥ Wishlist
          </button>
          <div className="color-switcher">
            <div className="color-dot red"></div>
            <div className="color-dot blue"></div>
            <div className="color-dot black"></div>
          </div>
        </div>
      </div>
    </div>
  );
}