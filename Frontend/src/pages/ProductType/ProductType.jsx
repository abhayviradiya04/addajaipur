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
        const response = await fetch(`http://localhost:5000/api/products/type/${type}`);
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
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="no-products">No products found for {capitalizeFirstLetter(type)}</div>;
  }

  return (
    <div className="product-type-page">
      <h1>{capitalizeFirstLetter(type)}</h1>
      <div className="filters-section">
        <p>{products.length} Products</p>
        {/* Add filters here if needed */}
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            type={type}
          />
        ))}
      </div>
    </div>
  );
} 