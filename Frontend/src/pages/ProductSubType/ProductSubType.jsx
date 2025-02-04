import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';
import './ProductSubType.css';

export default function ProductSubType() {
  const { subtype } = useParams();
 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        const formattedSubtype = subtype.replace(/-/g, ' ');
        
        const response = await fetch(`https://addajaipur.onrender.com/api/products/subtype/${formattedSubtype}`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subtype]);

  if (loading) {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="product-type-error">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="product-type-empty">No products found for {subtype.replace(/-/g, ' ')}</div>;
  }

  return (
    <div className="product-type-container">
      <div className="product-type-wrapper">
        <h1 className="product-type-title">{subtype.replace(/-/g, ' ')}</h1>
        
        <div className="product-type-filters">
          <p className="product-type-count">{products.length} Products</p>
        </div>
        
        <div className="product-type-grid">
          {products.map((product) => (
            <div className="product-type-card-wrapper" key={product._id}>
              <ProductCard product={product} type={subtype} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
