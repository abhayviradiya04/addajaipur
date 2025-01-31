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
    <div className="pcard-container" onClick={handleClick}>
      <div className="pcard-image-wrapper">
        <img
          src={product.image[0]}
          alt={product.name}
          className="pcard-image"
          loading="lazy"
        />
        <button className="pcard-quick-view-btn" onClick={handleQuickView}>
          <span className="pcard-quick-view-icon">🔍</span>
        </button>
        
        {/* Status Badges */}
        {product.stock === 0 && 
          <div className="pcard-badge pcard-sold-out">Sold Out</div>
        }
        {product.stock > 0 && product.stock <= 5 && 
          <div className="pcard-badge pcard-low-stock">Almost Gone</div>
        }
      </div>

      <div className="pcard-details">
        <h3 className="pcard-title">{product.name}</h3>
        <div className="pcard-price-section">
          <span className="pcard-current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && 
            <span className="pcard-original-price">₹{product.originalPrice.toLocaleString()}</span>
          }
        </div>
        <div className="pcard-meta">
          <span className="pcard-brand">{product.brand.name}</span>
          <div className="pcard-rating">
            ★★★★☆ <span className="pcard-rating-count">(128)</span>
          </div>
        </div>
    
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
