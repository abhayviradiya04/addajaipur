import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://addajaipur.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include' // if using cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data or token in localStorage/context
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Invalid email or password'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-card">
        <h2 className="login-page-title">Login</h2>
        
        {errors.submit && (
          <div className="login-error-message">{errors.submit}</div>
        )}

        <form onSubmit={handleSubmit} className="login-page-form">
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`login-form-input ${errors.email ? 'login-input-error' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="login-error-text">{errors.email}</span>}
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`login-form-input ${errors.password ? 'login-input-error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <span className="login-error-text">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-register-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
        </div>
      </div>
    </div>
  );
} 