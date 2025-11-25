import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./EditProfile.css";

export default function EditProfile({ onClose }) {
  // Get user and updateProfile function from context
  const { user, updateProfile } = useAuth();

  // Local form state
  const [form, setForm] = useState(null);

  // Load form values when user data is available
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",

        avatar:
          user.avatar && user.avatar.trim() !== ""
            ? user.avatar.trim()
            : "https://i.imgur.com/sgcGa3S.png",

        banner:
          user.banner && user.banner.trim() !== ""
            ? user.banner.trim()
            : "https://wallpapercave.com/wp/wp9167142.jpg",

        bio: user.bio || "",
      });
    }
  }, [user]);

  // If user or form is still loading
  if (!user || !form) {
    return (
      <div className="edit-overlay">
        <div className="edit-box">Loading profile...</div>
      </div>
    );
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Save updated profile after cleaning values
  const save = () => {
    const cleanData = {
      name: form.name.trim() || user.name,

      avatar:
        form.avatar && form.avatar.trim() !== ""
          ? form.avatar.trim()
          : "https://i.imgur.com/sgcGa3S.png",

      banner:
        form.banner && form.banner.trim() !== ""
          ? form.banner.trim()
          : "https://wallpapercave.com/wp/wp9167142.jpg",

      bio: form.bio.trim(),
    };

    updateProfile(cleanData);
    onClose();
  };

  return (
    <div className="edit-overlay">
      <div className="edit-box">
        {/* Title */}
        <h2>Edit Profile</h2>

        {/* Username */}
        <label>Username</label>
        <input name="name" value={form.name} onChange={handleChange} />

        {/* Avatar URL */}
        <label>Profile Photo URL</label>
        <input name="avatar" value={form.avatar} onChange={handleChange} />

        {/* Banner URL */}
        <label>Banner Image URL</label>
        <input name="banner" value={form.banner} onChange={handleChange} />

        {/* Bio */}
        <label>Bio</label>
        <textarea
          name="bio"
          rows={3}
          value={form.bio}
          onChange={handleChange}
        />

        {/* Buttons */}
        <button className="save-btn" onClick={save}>
          Save
        </button>

        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
