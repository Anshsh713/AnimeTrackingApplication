// Import React and hooks
import React, { useRef, useState, useEffect } from "react";
// Import router tools
import { NavLink, useNavigate } from "react-router-dom";
// Import logos
import LightLogo from "../../../Images/Logo.png";
import DarkLogo from "../../../Images/logo2.png";
// Import styles
import "./Header.css";
// Import auth context
import { useAuth } from "../../../Context/AuthContext";

export default function Header() {
  const navigate = useNavigate(); // hook to navigate
  const { user, logout } = useAuth(); // get user and logout function
  const searchInputRef = useRef(null); // kept if you use search later

  const [menu, setMenu] = useState(false); // user dropdown open/close
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" // read theme from storage
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // mobile nav open/close

  // Avatar URL or null
  const avatarSrc =
    user?.avatar && user.avatar.trim() !== "" ? user.avatar.trim() : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (event) => {
      const dropdown = document.querySelector(".dropdown-menu"); // dropdown element
      const toggleButton = document.getElementById("down"); // dropdown toggle

      if (
        dropdown &&
        !dropdown.contains(event.target) && // click not in dropdown
        (!toggleButton || !toggleButton.contains(event.target)) // and not on button
      ) {
        setMenu(false); // close dropdown
      }
    };

    document.addEventListener("click", closeDropdown); // attach listener
    return () => document.removeEventListener("click", closeDropdown); // cleanup
  }, []);

  // Handle theme change
  useEffect(() => {
    const root = document.documentElement; // html root
    root.setAttribute("data-theme", darkMode ? "dark" : "light"); // set theme attr
    localStorage.setItem("theme", darkMode ? "dark" : "light"); // save in storage
  }, [darkMode]); // run when darkMode changes

  // Toggle user dropdown
  const downMenu = () => {
    setMenu((prev) => !prev); // flip dropdown state
  };

  // Toggle mobile nav menu
  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev); // flip mobile nav state
  };

  // Logout handler
  const log_out = async () => {
    const result = await logout(); // call logout
    if (result?.success !== false) navigate("/about"); // redirect if ok
  };

  return (
    <header>
      {/* Top navigation bar */}
      <nav>
        {/* Left: Logo */}
        <div className="main-box">
          <div className="Logo">
            <NavLink to="/Home">
              <img
                src={darkMode ? DarkLogo : LightLogo} // logo by theme
                alt="AniRealm Logo" // alt text
              />
            </NavLink>
          </div>
        </div>

        {/* Center/Right: Navigation links */}
        <ul
          className={`nav-links ${mobileNavOpen ? "nav-links-open" : ""}`} // add class when mobile open
        >
          {/* Home link */}
          <li>
            <NavLink to="/Home" className="nav-icon">
              {({ isActive }) => (
                <i
                  className={
                    isActive ? "fa-solid fa-house" : "fa-regular fa-house"
                  } // solid when active
                ></i>
              )}
            </NavLink>
          </li>

          {/* Anime List link */}
          <li>
            <NavLink to="/AnimeList" className="nav-icon">
              {({ isActive }) => (
                <i
                  className="fa-solid fa-list-ul" // list icon
                  style={{ color: isActive ? "#ffdd57" : "inherit" }} // yellow when active
                ></i>
              )}
            </NavLink>
          </li>

          {/* Clubs link */}
          <li>
            <NavLink to="/Clubs" className="nav-icon">
              {({ isActive }) => (
                <i
                  className={
                    isActive ? "fa-solid fa-comments" : "fa-regular fa-comments"
                  } // solid when active
                ></i>
              )}
            </NavLink>
          </li>

          {/* Right: User section */}
          <div className="user-section">
            {/* Username text */}
            <li className="user-name">{user?.name || "User"}</li>

            {/* Dropdown toggle button */}
            <button type="button" onClick={downMenu}>
              <div id="down">
                <i
                  style={{ fontSize: "0.9rem" }} // icon size
                  className={
                    menu ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
                  } // arrow icon
                ></i>
              </div>
            </button>

            {/* Dropdown menu content */}
            {menu && (
              <div className="dropdown-menu">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/profile"); // go to profile
                    setMenu(false); // close dropdown
                  }}
                >
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode((prev) => !prev)} // toggle theme
                >
                  {darkMode ? "Light Theme" : "Dark Theme"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/reviews"); // go to reviews
                    setMenu(false); // close dropdown
                  }}
                >
                  Reviews
                </button>

                <button
                  type="button"
                  className="logout"
                  onClick={log_out} // call logout
                >
                  Log out
                </button>
              </div>
            )}

            {/* Avatar / user icon */}
            <li>
              <NavLink to="/profile" className="nav-icon profile-avatar-link">
                {avatarSrc ? (
                  <img
                    src={avatarSrc} // avatar from user
                    className="header-avatar" // avatar style
                    alt="Profile" // alt text
                    onError={(e) => (e.target.style.display = "none")} // hide if broken
                  />
                ) : (
                  <i className="fa-regular fa-circle-user"></i> // fallback icon
                )}
              </NavLink>
            </li>
          </div>
        </ul>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="mobile-menu-btn" // mobile button style
          onClick={toggleMobileNav} // toggle mobile nav
          aria-label="Toggle navigation" // accessibility
        >
          <i
            className={mobileNavOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} // show X when open
          ></i>
        </button>
      </nav>
    </header>
  );
}
