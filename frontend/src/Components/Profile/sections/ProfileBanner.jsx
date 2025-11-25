import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import "./ProfileBanner.css";

export default function ProfileBanner({ onEdit }) {
  // Access user data from authentication context
  const { user } = useAuth();

  // Fallback avatar if user has no valid avatar URL
  const avatarSrc =
    user?.avatar && user.avatar.trim() !== ""
      ? user.avatar.trim()
      : "https://i.imgur.com/sgcGa3S.png";

  // Fallback banner if user has no banner URL
  const bannerSrc =
    user?.banner && user.banner.trim() !== ""
      ? user.banner.trim()
      : "https://wallpapercave.com/wp/wp9167142.jpg";

  return (
    // Banner with background image
    <div
      className="profile-banner"
      style={{ backgroundImage: `url(${bannerSrc})` }}
    >
      {/* Dark gradient overlay for readability */}
      <div className="profile-overlay">
        {/* Left section: avatar + username + bio */}
        <div className="left-info">
          {/* Avatar */}
          <img
            className="avatar"
            src={avatarSrc}
            alt="profile"
            onError={(e) => {
              e.target.src = "https://i.imgur.com/sgcGa3S.png";
            }}
          />

          {/* User information */}
          <div>
            <h2 className="username">{user?.name || "User"}</h2>
            <p className="bio">{user?.bio || "No bio added yet."}</p>
          </div>
        </div>

        {/* Edit button */}
        <button className="edit-btn" onClick={onEdit}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}
