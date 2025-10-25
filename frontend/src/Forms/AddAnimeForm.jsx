// Import React hooks and Axios
import React, { useState } from "react";
import axios from "axios";

// AddAnimeForm component
export default function AddAnimeForm({ onAdded }) {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    episodesWatched: 0,
    totalEpisodes: 0,
    status: "Plan to Watch",
  });

  // Get token from localStorage
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Get token before sending request
      const token = localStorage.getItem("token");
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

      await axios.post(
        "http://localhost:5000/api/anime",
        formData,
        axiosConfig
      );

      setFormData({
        title: "",
        episodesWatched: 0,
        totalEpisodes: 0,
        status: "Plan to Watch",
      });
      onAdded();
    } catch (err) {
      console.error(
        "❌ Error adding anime:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        background: "#f4f4f4",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>Add New Anime</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "100%",
        }}
      />

      <input
        type="number"
        name="episodesWatched"
        placeholder="Episodes Watched"
        value={formData.episodesWatched}
        onChange={handleChange}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "100%",
        }}
      />

      <input
        type="number"
        name="totalEpisodes"
        placeholder="Total Episodes"
        value={formData.totalEpisodes}
        onChange={handleChange}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "100%",
        }}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "100%",
        }}
      >
        <option>Watching</option>
        <option>Completed</option>
        <option>On Hold</option>
        <option>Dropped</option>
        <option>Plan to Watch</option>
      </select>

      <button
        type="submit"
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Add Anime
      </button>
    </form>
  );
}
