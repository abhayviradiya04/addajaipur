import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';

export default function ProductSubType() {
  const { subtype } = useParams();
  console.log("Type from URL:", subtype);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];
      
      if (minPrice !== '') {
        filtered = filtered.filter(product => product.price >= parseInt(minPrice));
      }
      if (maxPrice !== '') {
        filtered = filtered.filter(product => product.price <= parseInt(maxPrice));
      }
      
      setFilteredProducts(filtered);
    }
  }, [products, minPrice, maxPrice]);

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
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-md-2">
                <p className="mb-0 fw-semibold fs-5">
                  {filteredProducts.length} Products
                </p>
              </div>
              <div className="col-12 col-md-6 ms-auto">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseInt(value) >= 0 && !isNaN(parseInt(value)))) {
                        setMinPrice(value);
                      }
                    }}
                    placeholder="Min Price"
                    className="form-control form-control-sm"
                    style={{ width: "120px" }}
                    min="0"
                  />
                  <span className="text-secondary fw-medium">to</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseInt(value) >= 0 && !isNaN(parseInt(value)))) {
                        if (minPrice && value !== '' && parseInt(value) < parseInt(minPrice)) {
                          setMaxPrice(minPrice);
                        } else {
                          setMaxPrice(value);
                        }
                      }
                    }}
                    placeholder="Max Price"
                    className="form-control form-control-sm"
                    style={{ width: "120px" }}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-type-grid">
          {filteredProducts.map((product) => (
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

