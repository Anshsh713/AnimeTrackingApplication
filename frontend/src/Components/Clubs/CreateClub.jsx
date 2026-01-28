import React, { useState } from "react"; // React + state hook
import { useClubs } from "../../Context/ClubContext"; // Club context actions
import { useNavigate } from "react-router-dom"; // Navigation hook
import "./CreateClub.css"; // Styles

export default function CreateClub() {
  const [name, setName] = useState(""); // Club name
  const [desc, setDesc] = useState(""); // Description
  const [maxMembers, setMaxMembers] = useState(99999); // Default unlimited
  const [isUnlimited, setIsUnlimited] = useState(true); // Toggle unlimited

  const { createClub } = useClubs(); // Create club function
  const navigate = useNavigate(); // Redirect

  const submit = async () => {
    const payload = {
      name,
      description: desc,
      maxMembers: isUnlimited ? 99999 : Number(maxMembers) || 99999, // Limit logic
    };

    await createClub(payload); // Create club API
    navigate("/clubs"); // Redirect to clubs list
  };

  const handleLimitChange = (e) => {
    setIsUnlimited(false); // Disable unlimited
    setMaxMembers(e.target.value); // Update limit
  };

  const toggleUnlimited = () => {
    if (isUnlimited) {
      setIsUnlimited(false); // Turn off unlimited
      setMaxMembers(50); // Default 50
    } else {
      setIsUnlimited(true); // Turn on unlimited
      setMaxMembers(99999); // Large value
    }
  };

  return (
    <div className="CC-container">
      <div className="CC-header">
        <button className="CC-back-btn" onClick={() => navigate("/clubs")}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="CC-card">
        <div className="CC-card-header">
          <h1>Create New Club</h1>
          <p>Launch your community and invite members</p>
        </div>

        <div className="CC-form">
          <div className="CC-input-group">
            <label>Club Name</label>
            <input
              placeholder="e.g. Elite Anime Discuss"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="CC-input-group">
            <label>Description</label>
            <textarea
              placeholder="What is this club about? (min 10 characters)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="CC-limit-section">
            <label className="CC-checkbox-row">
              <div className="CC-checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={isUnlimited}
                  onChange={toggleUnlimited}
                />
                <div className="CC-checkbox-mark"></div>
              </div>
              <span>Unlimited Members</span>
            </label>

            {!isUnlimited && (
              <div className="CC-input-group compact">
                <label>Max Members</label>
                <input
                  type="number"
                  placeholder="50"
                  value={maxMembers === 99999 ? "" : maxMembers}
                  onChange={handleLimitChange}
                />
              </div>
            )}
          </div>

          <button className="CC-submit-btn" onClick={submit}>
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
}
