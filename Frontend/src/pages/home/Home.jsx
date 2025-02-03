import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../component/product/ProductCard';
import ProductSkeleton from '../../component/ProductSkeleton/ProductSkeleton'; // Import skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderLoading, setSliderLoading] = useState(true); // Slider loading state
  const [error, setError] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState({});

  const slides = [
    { image: '../../asset/images/1.jpg', title: 'New Collection' },
    { image: '../../asset/images/2.jpg', title: 'Summer Sale' },
    { image: '../../asset/images/3.jpg', title: 'Festival Special' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://addajaipur.onrender.com/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        
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

  useEffect(() => {
    // Delay slider loading by 5-6 seconds
    const timer = setTimeout(() => {
      setSliderLoading(false);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      {/* Slideshow with Skeleton Loader */}
      <div className="slideshow">
        {sliderLoading ? (
          <Skeleton height={300} width="100%" /> // Skeleton loader for slider
        ) : (
          slides.map((slide, index) => (
            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h2>{slide.title}</h2>
              </div>
            </div>
          ))
        )}
        {!sliderLoading && (
          <div className="slide-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
  
      {/* Products by Type with Skeleton Loader */}
      <div className="products-by-type">
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          Object.entries(groupedProducts).map(([type, typeProducts]) => (
            <div key={type} className="product-type-section">
              <h2 className="type-title">{capitalizeFirstLetter(type)}</h2>
              <div className="product-grid">
                {typeProducts.map((product) => (
                  <ProductCard key={product._id} product={product} type={product.type.toLowerCase()} />
                ))}
              </div>
              {typeProducts.length >= 4 && (
                <div className="view-all-container">
                  <button className="view-all-button" onClick={() => navigate(`/${type}`)}>
                    View All {capitalizeFirstLetter(type)}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );}  