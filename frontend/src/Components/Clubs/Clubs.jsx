import React from "react"; // React library
import { useClubs } from "../../Context/ClubContext"; // Club context hook
import { Link } from "react-router-dom"; // Navigation links
import "./Clubs.css"; // Stylesheet

export default function Clubs() {
  const { myClubs, otherClubs, loading } = useClubs(); // Get club data

  if (loading)
    // Show loading state
    return <h2 style={{ color: "white" }}>Loading Clubs...</h2>;

  return (
    <div className="CL-container">
      {/* Cinematic Header */}
      <div className="CL-header">
        <div className="CL-header-text">
          <h1 className="CL-title">Club Dashboard</h1>
          <p className="CL-subtitle">Connect with fellow fans and grow your community</p>
        </div>
        <Link to="/clubs/create">
          <button className="CL-create-btn">
            <i className="fa-solid fa-plus"></i>
            <span>Create New Club</span>
          </button>
        </Link>
      </div>

      {/* Joined Clubs Section */}
      <div className="CL-section">
        <h2 className="CL-section-title">Your Member Clubs</h2>
        <div className="CL-grid">
          {myClubs.map((club) => (
            <Link to={`/clubs/${club._id}`} key={club._id} className="CL-card-link">
              <div className="CL-card joined">
                <div className="CL-card-badge">Joined</div>
                <div className="CL-card-content">
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                </div>
                <div className="CL-card-footer">
                  <div className="CL-stat">
                    <i className="fa-solid fa-users"></i>
                    <span>{club.members.length} Members</span>
                  </div>
                  <div className="CL-go-btn">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Discovery Section */}
      <div className="CL-section discovery">
        <h2 className="CL-section-title">Discover New Communities</h2>
        <div className="CL-grid">
          {otherClubs.map((club) => (
            <Link to={`/clubs/${club._id}`} key={club._id} className="CL-card-link">
              <div className="CL-card explore">
                <div className="CL-card-content">
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                </div>
                <div className="CL-card-footer">
                  <div className="CL-stat">
                    <i className="fa-solid fa-users"></i>
                    <span>{club.members.length} Members</span>
                  </div>
                  <div className="CL-join-cta">
                    <span>View Club</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
