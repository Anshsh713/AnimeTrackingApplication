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
    <div className="create-club">
      {" "}
      {/* Wrapper */}
      <h1>Create Club</h1> {/* Title */}
      {/* Club name */}
      <input
        placeholder="Club Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Description */}
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {!isUnlimited && ( // Show when limited
        <input
          type="number"
          placeholder="Max Members"
          value={maxMembers === 99999 ? "" : maxMembers}
          onChange={handleLimitChange}
        />
      )}
      <label className="checkbox-row">
        {" "}
        {/* Unlimited toggle */}
        <input
          type="checkbox"
          checked={isUnlimited}
          onChange={toggleUnlimited}
        />
        Unlimited Members
      </label>
      <button onClick={submit}>Create</button> {/* Submit button */}
    </div>
  );
}
