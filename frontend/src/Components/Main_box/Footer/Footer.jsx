// Import React for component creation
import React from "react";
// Import NavLink for navigation
import { NavLink } from "react-router-dom";
// Import styles
import "./Footer.css";

export default function Footer() {
  return (
    // Footer container
    <footer className="footer">
      {/* Grid sections wrapper */}
      <div className="footer-content">
        {/* About section */}
        <div className="footer-section about">
          <h2 className="footer-title">About AnimeTracker</h2>
          <p className="footer-text">
            {/* About text */}
            Track your favorite anime, rate episodes, join clubs, and connect
            with fellow fans — all in one place.
          </p>
        </div>

        {/* Quick links section */}
        <div className="footer-section links">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-list">
            <li>
              {/* Navigation link */}
              <NavLink to="/Home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/AnimeList">My List</NavLink>
            </li>
            <li>
              <NavLink to="/Profile">Profile</NavLink>
            </li>
          </ul>
        </div>

        {/* Social / connect section */}
        <div className="footer-section connect">
          <h2 className="footer-title">Connect</h2>
          <ul className="footer-list">
            <li>
              {/* External link */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright text */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} AnimeTrackr — Built with React & Tailwind.
      </div>
    </footer>
  );
}
