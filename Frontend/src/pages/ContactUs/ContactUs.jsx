import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Visit Our Fashion Hub</h2>

      <div className="contact-grid">
        

        {/* Contact Information */}
        <div className="contact-info">
          <h3>Adaa Jaipur Store</h3>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Location</h4>
              <p>
                Plot No. 22, Jawahar Lal Nehru Marg, <br />
                Jaipur, Rajasthan 302017
              </p>
            </div>
          </div>

          <div className="info-item">
            <FaPhone className="info-icon" />
            <div>
              <h4>Call</h4>
              <p>+91 99831 70003</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email</h4>
              <p>adaajaipur@fashionstore.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-container">
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
  );
};

export default ContactUs;
