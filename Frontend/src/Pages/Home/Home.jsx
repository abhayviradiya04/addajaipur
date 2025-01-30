import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState({});

  const slides = [
    {
      image: '../../asset/images/1.jpg',
      title: 'New Collection',
    },
    {
      image: '../../asset/images/2.jpg',
      title: 'Summer Sale',
    },
    {
      image: '../../asset/images/3.jpg',
      title: 'Festival Special',
    },
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Group products by type
        const grouped = data.reduce((acc, product) => {
          const type = product.type;
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(product);
          return acc;
        }, {});
        
        setGroupedProducts(grouped);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Slideshow timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      {/* Slideshow */}
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
            </div>
          </div>
        ))}
        <div className="slide-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Products by Type */}
      <div className="products-by-type">
        {Object.entries(groupedProducts).map(([type, typeProducts]) => (
          <div key={type} className="product-type-section">
            <h2 className="type-title">{capitalizeFirstLetter(type)}</h2>
            <div className="product-grid">
              {typeProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  type={product.type.toLowerCase()}
                />
              ))}
            </div>
            {typeProducts.length >= 4 && (
              <div className="view-all-container">
                <button 
                  className="view-all-button"
                  onClick={() => navigate(`/${type}`)}
                >
                  View All {capitalizeFirstLetter(type)}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Checkout Button */}
      <div className="checkout-container">
        <button 
          className="checkout-button"
          onClick={() => navigate('/checkout')}
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
