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
    <div className="clubs-page">
      {" "}
      {/* Main page wrapper */}
      {/* Header row */}
      <div className="clubs-header">
        <h1>Your Clubs</h1> {/* Page title */}
        <Link to="/clubs/create">
          {" "}
          {/* Navigate to create */}
          <button className="create-btn">Create Club</button>
        </Link>
      </div>
      {/* Clubs you joined */}
      <h2 className="section-title">Joined Clubs</h2>
      <div className="clubs-grid">
        {" "}
        {/* Grid layout */}
        {myClubs.map(
          (
            club // Loop joined clubs
          ) => (
            <Link to={`/clubs/${club._id}`} key={club._id}>
              <div className="club-card">
                {" "}
                {/* Club card */}
                <h3>{club.name}</h3> {/* Name */}
                <p>{club.description}</p> {/* Description */}
                <p>{club.members.length} Members</p> {/* Member count */}
              </div>
            </Link>
          )
        )}
      </div>
      {/* Clubs not joined yet */}
      <h2 className="section-title">Discover Clubs</h2>
      <div className="clubs-grid">
        {" "}
        {/* Grid */}
        {otherClubs.map(
          (
            club // Loop discover list
          ) => (
            <Link to={`/clubs/${club._id}`} key={club._id}>
              <div className="club-card explore">
                {" "}
                {/* Explore-style card */}
                <h3>{club.name}</h3>
                <p>{club.description}</p>
                <p>{club.members.length} Members</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
