import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title" >Visit Our Fashion Hub</h2>
        <p className="contact-subtitle">Experience luxury fashion at our Jaipur location or connect digitally</p>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group compact">
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label className="form-label">Full Name</label>
                <span className="input-highlight"></span>
              </div>

              <div className="form-group compact">
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label className="form-label">Email</label>
                <span className="input-highlight"></span>
              </div>

              <div className="form-group compact">
                <select
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Product Questions</option>
                  <option>Returns & Exchanges</option>
                </select>
                <label className="form-label">Subject</label>
                <span className="input-highlight"></span>
              </div>

              <div className="form-group compact">
                <textarea
                  rows={3}
                  required
                  className="form-input textarea"
                  placeholder=" "
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <label className="form-label">Message</label>
                <span className="input-highlight"></span>
              </div>

              <button type="submit" className="submit-btn compact">
                Send Message
                <span className="btn-overlay"></span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-container">
            <div className="info-card compact">
              <h3 className="info-title">Adaa Jaipur Store</h3>
              
              <div className="info-item dense">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Plot No. 22, Jawahar Lal Nehru Marg,<br/>Jaipur, Rajasthan 302017</p>
                </div>
              </div>

              <div className="info-item dense">
                <FaPhone className="info-icon" />
                <div>
                  <h4>Call</h4>
                  <p>+91 99831 70003</p>
                </div>
              </div>

              <div className="info-item dense">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>E-mail</h4>
                  <p>adaajaipur@fashionstore.com</p>
                </div>
              </div>
            </div>

            <div className="social-card compact">
              <h3 className="social-title">Style Connections</h3>
              <div className="social-links tight">
                <a href="#" className="social-link">
                  <FaInstagram className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <FaFacebookF className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <FaTwitter className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="map-container tight">
          <iframe
            title="adaa-jaipur-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.556009764504!2d75.7765919!3d26.8277583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d69821715b%3A0x90205ef69828a6d5!2sAdaa%20Jaipur!5e0!3m2!1sen!2sin!4v1719409091230!5m2!1sen!2sin"
            className="map-iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;