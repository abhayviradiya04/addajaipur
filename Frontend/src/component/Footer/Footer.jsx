import React from "react";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are a leading online clothing store offering the latest trends in
            fashion for men, women, and kids. Shop with us for quality and style.
          </p>
        </div>

        <div className="footer-section">
          {/* <h4>Subscribe to Our Newsletter</h4>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form> */}
          
          <img src='../../asset/images/logo.webp' alt="Logo" />
          
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            {/* <li>
              <a href="/sale">Sale</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li> */}
          </ul>
        </div>

        {/* Customer Service Section */}
        {/* <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <a href="/shipping">Shipping Information</a>
            </li>
            <li>
              <a href="/returns">Returns & Exchanges</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div> */}

        {/* Newsletter Section */}
       
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Clothing Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;