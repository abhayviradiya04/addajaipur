import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaAngleDown } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = {
    shirt: ['classicsottonshirt'],
    Dress: ['FloralSummerDress'],
    Pants: ['slimfitdenimjeans', 'casualchinopants']
  };

  return (
    <header className="header">
      <nav className="nav-container">
        {/* Logo on the left */}
        <div className="logo flex items-center h-16">
          <Link to="/"><img src='../../asset/images/logo.webp' alt="Logo" /></Link>
        </div>

        {/* Dropdown pages in the center */}
       
        <div className="nav-links">
        <Link to="/">Home</Link>
          {Object.entries(categories).map(([category, subcategories]) => (
            <div
              className="dropdown"
              key={category}
              onMouseEnter={() => setActiveDropdown(category)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to={`/${category}`} className="dropdown-trigger">
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                <FaAngleDown />
              </Link>
              {activeDropdown === category && (
                <div className="dropdown-content">
                  {subcategories.map((subcat) => (
                    <Link
                      key={subcat}
                      to={`/${subcat.toLowerCase()}`}
                    >
                      {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Icons on the right */}
        <div className="nav-icons">
          <Link to="/wishlist" className="icon">
            <FaHeart />
          </Link>
          <Link to="/cart" className="icon">
            <FaShoppingCart />
          </Link>
          <Link to="/profile" className="icon">
            <FaUser />
          </Link>
        </div>
      </nav>
    </header>
  );
}