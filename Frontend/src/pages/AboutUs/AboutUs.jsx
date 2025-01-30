import { FaTshirt, FaHeart, FaLeaf, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Crafting Fashion Narratives</h1>
          <p className="hero-subtitle">Where Style Meets Substance</p>
        </div>
        <div className="hero-gradient"></div>
      </section>

      {/* Brand Story */}
      <section className="story-section">
        <div className="story-grid">
          <div className="story-image">
            <div className="image-frame"></div>
          </div>
          <div className="story-content">
            <h2 className="section-title">Redefining Modern Elegance</h2>
            <p className="story-text">
              Since our inception in 2015, we've revolutionized contemporary fashion through
              innovative designs that blend artisanal craftsmanship with cutting-edge technology.
            </p>
            <div className="stats-container">
              <div className="stat-card">
                <span className="stat-number">850K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">120+</span>
                <span className="stat-label">Award Wins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2 className="section-title centered">Our Fashion Philosophy</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <FaLeaf className="spin-icon" />
            </div>
            <h3>Sustainable Luxury</h3>
            <p>Ethically sourced materials meeting highest environmental standards</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaHeart className="pulse-icon" />
            </div>
            <h3>Customer Obsession</h3>
            <p>Personalized styling services and 24/7 customer support</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaTshirt className="float-icon" />
            </div>
            <h3>Innovative Design</h3>
            <p>AI-powered trend forecasting and smart fabric technology</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title centered">Creative Visionaries</h2>
        <div className="team-grid">
          {["https://media.istockphoto.com/id/1338894467/photo/man-shopping-in-the-mall.jpg?s=612x612&w=0&k=20&c=PoUwjAF182HZTi-KN1EAbuIsUkK1sKNAWIbHCuRsXv4="
          , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6ptFcNumNaQzIqFpnnDc89uFnhyeq-IkK9w&shttps://i5.walmartimages.com/asr/bc299287-9bea-49e8-af04-cd4540d2d22f.f2e74d33633486ef65a0a94a2b211dac.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
           "https://i5.walmartimages.com/asr/bc299287-9bea-49e8-af04-cd4540d2d22f.f2e74d33633486ef65a0a94a2b211dac.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
          ].map((item) => (
            <div key={item} className="team-card">
              <div className="member-image">
                <img
                  src={item}
                  alt={`Designer ${item}`}
                />
                <div className="social-overlay">
                  <FaInstagram className="social-icon" />
                  <FaFacebookF className="social-icon" />
                  <FaTwitter className="social-icon" />
                </div>
              </div>
              <div className="member-info">
                <h4>Sarah Johnson</h4>
                <p>Lead Fashion Designer</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Begin Your Style Journey</h2>
          <p className="cta-text">Receive exclusive access to collections and private sales</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Explore Collection</button>
            <button className="cta-btn secondary">Join Newsletter</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;