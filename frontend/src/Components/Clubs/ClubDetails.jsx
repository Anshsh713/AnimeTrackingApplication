import React, { useEffect, useState } from "react"; // React + Hooks
import API from "../../api/api"; // Axios instance
import { useParams, Link } from "react-router-dom"; // Router tools
import { useClubs } from "../../Context/ClubContext"; // Club actions
import { useAuth } from "../../Context/AuthContext"; // Current user
import "./ClubDetails.css"; // Stylesheet

export default function ClubDetails() {
  const { id } = useParams(); // Club ID from URL
  const { joinClub, leaveClub, deleteClub } = useClubs(); // Club actions
  const { user } = useAuth(); // Logged-in user

  const [club, setClub] = useState(null); // Club data state

  // Fetch club details
  const fetchDetails = async () => {
    const res = await API.get(`/clubs/${id}`); // GET club data
    setClub(res.data); // Save to state
  };

  useEffect(() => {
    fetchDetails(); // Load on mount
  }, [id]); // Re-run if ID changes

  if (!club) return <h2>Loading...</h2>; // Loading fallback
  if (!user) return null; // Block if no user

  const userId = user._id || user.id; // Normalize IDs
  const creatorId = club.creator?._id || club.creator;

  const isCreator = creatorId?.toString() === userId.toString(); // Admin?
  const isMember = club.members?.some(
    (m) => (m._id || m).toString() === userId.toString() // Member?
  );

  const handleJoin = async () => {
    await joinClub(id); // Join API call
    fetchDetails(); // Refresh
  };

  const handleLeave = async () => {
    await leaveClub(id); // Leave API call
    fetchDetails();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;
    await deleteClub(id); // Delete API
    window.history.back(); // Go back
  };

  return (
    <div className="CD-container">
      <div className="CD-header">
        <button className="CD-back-btn" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back</span>
        </button>
      </div>

      <div className="CD-card">
        {/* Cinematic Header Section */}
        <div className="CD-hero">
          <div className="CD-hero-overlay"></div>
          <div className="CD-hero-content">
            <h1 className="CD-title">{club.name}</h1>
            <p className="CD-desc">{club.description}</p>

            <div className="CD-meta">
              <div className="CD-stat-pill">
                <i className="fa-solid fa-users"></i>
                <span>{club.members.length} / {club.maxMembers === 99999 ? "Unlimited" : club.maxMembers}</span>
              </div>
              <div className="CD-stat-pill admin">
                <i className="fa-solid fa-crown"></i>
                <span>{club.creator?.name || "Unknown"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Section */}
        <div className="CD-controls">
          <div className="CD-actions-main">
            {!isCreator && !isMember && (
              <button className="CD-btn primary" onClick={handleJoin}>
                <i className="fa-solid fa-plus-circle"></i>
                <span>Join Community</span>
              </button>
            )}

            {isMember && (
              <Link to={`/clubs/${id}/chat`}>
                <button className="CD-btn accent">
                  <i className="fa-solid fa-comments"></i>
                  <span>Enter Lounge</span>
                </button>
              </Link>
            )}

            <Link to={`/clubs/${id}/polls`}>
              <button className="CD-btn secondary">
                <i className="fa-solid fa-square-poll-vertical"></i>
                <span>Active Polls</span>
              </button>
            </Link>
          </div>

          <div className="CD-actions-extra">
            {!isCreator && isMember && (
              <button className="CD-btn leave" onClick={handleLeave}>
                Leave Club
              </button>
            )}

            {isCreator && (
              <button className="CD-btn danger" onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
                <span>Delete Club</span>
              </button>
            )}
          </div>
        </div>

        {/* Members Roster Section */}
        <div className="CD-roster">
          <div className="CD-roster-header">
            <h3>Community Members</h3>
            <div className="CD-line"></div>
          </div>
          <div className="CD-members-grid">
            {club.members.map((m) => (
              <div key={m._id || m} className="CD-member-chip">
                <div className="CD-member-avatar" style={{ background: `hsl(${(m.name?.length * 45 || 0) % 360}, 60%, 55%)` }}>
                  {m.name?.charAt(0) || "U"}
                </div>
                <div className="CD-member-info">
                  <span className="CD-member-name">{m.name || "User"}</span>
                  {(m._id || m).toString() === creatorId?.toString() && (
                    <span className="CD-admin-badge">Admin</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
