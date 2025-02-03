import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';

export default function ProductSubType() {
  const { subtype } = useParams();
  console.log("Type from URL:", subtype);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        var arr = subtype.split("-").join(' ');
        console.log("parms : ",arr)
        const response = await fetch(`https://addajaipur.onrender.com/api/products/subtype/${arr}`);
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
  }, [subtype]);

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
    return <div className="product-type-empty">No products found for {subtype}</div>;
  }

  return (
    <div className="product-type-container">
      <div className="product-type-wrapper">
        <h1 className="product-type-title">{subtype.split("-").join(' ')}</h1>
        
        <div className="product-type-filters">
          <p className="product-type-count">{products.length} Products</p>
          {/* Add filters here if needed */}
        </div>
        
        <div className="product-type-grid">
          {products.map((product) => (
            <div className="product-type-card-wrapper" key={product._id}>
              <ProductCard
                product={product}
                type={subtype}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 