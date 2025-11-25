import React, { useState } from "react";
import Login from "../../Login_Signin/Login/Login.jsx";
import "./About.css";

export default function About() {
  const [login, setLogin] = useState(false);

  return (
    <div className="about-page">
      {/* ===============================
          HERO SECTION
      ================================== */}
      <section className="hero">
        <h1>
          Welcome to <span>AniRealm</span>
        </h1>
        <p>
          Your personal anime universe — track, explore and personalize your
          journey.
        </p>

        <button className="login-btn" onClick={() => setLogin(!login)}>
          {login ? "Close Login" : "Login to Continue"}
        </button>

        {login && (
          <div className="login-popup">
            <Login />
          </div>
        )}
      </section>

      {/* ===============================
          FEATURES SECTION
      ================================== */}
      <section className="features">
        <h2>What Makes AniRealm Special</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <i className="fa-solid fa-list-check"></i>
            <h3>Track Your Anime</h3>
            <p>Update episodes, ratings and statuses with ease.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-chart-line"></i>
            <h3>Beautiful Statistics</h3>
            <p>View your watching habits in detailed charts and graphs.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-heart"></i>
            <h3>Favorite Collection</h3>
            <p>Display your favorite anime and personal ranking.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-user"></i>
            <h3>Custom Profile</h3>
            <p>Edit avatar, banner and bio to reflect your personality.</p>
          </div>
        </div>
      </section>

      {/* ===============================
          VISION SECTION
      ================================== */}
      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          AniRealm is designed as a personalized anime diary. It empowers fans
          who love analyzing, exploring and sharing their anime experience in a
          meaningful way.
        </p>
      </section>

      {/* ===============================
          CALL TO ACTION
      ================================== */}
      <section className="cta">
        <h2>Start Your Anime Journey</h2>

        <button className="cta-btn" onClick={() => setLogin(true)}>
          Get Started
        </button>
      </section>
    </div>
  );
}
