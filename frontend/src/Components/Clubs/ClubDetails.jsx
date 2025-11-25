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
    <div className="club-details">
      {" "}
      {/* Wrapper */}
      <h1>{club.name}</h1>
      <p className="club-desc">{club.description}</p>
      <p className="club-members-count">
        Members: {club.members.length} /{" "}
        {club.maxMembers === 99999 ? "Unlimited" : club.maxMembers}
      </p>
      <p className="club-admin">
        Admin: <b>{club.creator?.name || "Unknown"}</b>
      </p>
      {/* Join / leave / delete buttons */}
      <div className="club-actions">
        {!isCreator && !isMember && (
          <button onClick={handleJoin}>Join Club</button>
        )}

        {!isCreator && isMember && (
          <button onClick={handleLeave}>Leave Club</button>
        )}

        {isCreator && (
          <button className="danger-btn" onClick={handleDelete}>
            Delete Club
          </button>
        )}
      </div>
      {/* Navigation buttons */}
      <div className="club-nav">
        <Link to={`/clubs/${id}/chat`}>
          <button>Enter Chat</button>
        </Link>

        <Link to={`/clubs/${id}/polls`}>
          <button>Polls</button>
        </Link>
      </div>
      {/* Members list */}
      <div className="club-members-list">
        <h3>Members</h3>
        <ul>
          {club.members.map((m) => (
            <li key={m._id || m}>
              {m.name || "User"}{" "}
              {creatorId?.toString() === (m._id || m).toString() && (
                <span className="admin-badge">Admin</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
