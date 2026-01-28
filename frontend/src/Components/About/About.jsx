import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

// Import themed images
import AboutHero from "../../Images/AboutHero.png";
import CommunityBanner from "../../Images/CommunityBanner.png";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* ===============================
          HERO SECTION
      ================================== */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Enter the <span>AniRealm</span>
          </h1>
          <p className="hero-subtitle">
            Your definitive anime companion. Track progress, discover legends,
            and build your own universe today.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate("/login")}>
              Initialize Journey
            </button>
            <button className="secondary-btn" onClick={() => {
              document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Features
            </button>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={AboutHero} alt="Anime Hero" className="hero-img" />
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* ===============================
          STATS SECTION (NEW)
      ================================== */}
      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">50K+</span>
          <span className="stat-label">Anime titles</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">1M+</span>
          <span className="stat-label">Active Users</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">10M+</span>
          <span className="stat-label">Episodes Tracked</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">500+</span>
          <span className="stat-label">Anime Clubs</span>
        </div>
      </section>

      {/* ===============================
          FEATURES SECTION
      ================================== */}
      <section className="features-section" id="features">
        <h2 className="section-title">Core Capabilities</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="card-icon">
              <i className="fa-solid fa-list-check"></i>
            </div>
            <h3>Precision Tracking</h3>
            <p>Maintain your watchlist with surgical precision. Status, episodes, and scores at your fingertips.</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h3>Advanced Analytics</h3>
            <p>Deep dive into your viewing habits with beautiful, interactive visualizations and trends.</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">
              <i className="fa-solid fa-comments"></i>
            </div>
            <h3>Club Hubs</h3>
            <p>Join specialized clubs or create your own to discuss theories, fanart, and seasonal releases.</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <h3>Dynamic Persona</h3>
            <p>Express yourself with fully customizable profiles, banners, and an anime-style bio system.</p>
          </div>
        </div>
      </section>

      {/* ===============================
          COMMUNITY SECTION (NEW)
      ================================== */}
      <section className="community-section">
        <div className="community-container">
          <div className="community-text">
            <h2 className="section-title">Global Community</h2>
            <p>
              Connect with enthusiasts from every corner of the world. Share your
              top 10s, participate in global polls, and find your next obsession through
              peer recommendations.
            </p>
            <ul className="community-perks">
              <li><i className="fa-solid fa-check"></i> 24/7 Active Forums</li>
              <li><i className="fa-solid fa-check"></i> Exclusive Discord Rewards</li>
              <li><i className="fa-solid fa-check"></i> Seasonal Watch Parties</li>
            </ul>
          </div>
          <div className="community-art">
            <img src={CommunityBanner} alt="Community" className="community-img" />
          </div>
        </div>
      </section>



      {/* ===============================
          CTA SECTION
      ================================== */}
      <section className="final-cta">
        <div className="cta-box">
          <h2>Ready to ascend your anime experience?</h2>
          <p>Join thousands of fans already tracking their destiny on AniRealm.</p>
          <button className="launch-btn" onClick={() => navigate("/login")}>
            LAUNCH APP
          </button>
        </div>
      </section>
    </div>
  );
}
