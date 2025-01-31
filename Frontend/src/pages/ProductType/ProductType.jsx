import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';
import './ProductType.css';

export default function ProductType() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://addajaipur.onrender.com/api/products/type/${type}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) {
    return <div className="product-type-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="product-type-error">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="product-type-empty">No products found for {capitalizeFirstLetter(type)}</div>;
  }

  return (
    <div className="product-type-container">
      <div className="product-type-wrapper">
        <h1 className="product-type-title">{capitalizeFirstLetter(type)}</h1>
        
        <div className="product-type-filters">
          <p className="product-type-count">{products.length} Products</p>
          {/* Add filters here if needed */}
        </div>
        
        <div className="product-type-grid">
          {products.map((product) => (
            <div className="product-type-card-wrapper" key={product._id}>
              <ProductCard
                product={product}
                type={type}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 