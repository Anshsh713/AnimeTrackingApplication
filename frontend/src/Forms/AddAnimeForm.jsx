// Import React hooks and Axios for HTTP requests
import React, { useState } from "react";
import axios from "axios";

// AddAnimeForm component — allows users to add a new anime
export default function AddAnimeForm({ onAdded }) {
  // 🧠 useState to track form input values
  const [formData, setFormData] = useState({
    title: "", // Anime title
    episodesWatched: 0, // Number of episodes already watched
    totalEpisodes: 0, // Total episodes in the anime
    status: "Plan to Watch", // Default watching status
  });

  /**
   * 🔄 handleChange updates formData whenever an input changes
   * [e.target.name] dynamically updates the correct field
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * 🟢 handleSubmit sends formData to the backend via POST request
   * - Prevents default form submission
   * - Calls the backend API to add a new anime
   * - Resets the form
   * - Calls onAdded() to refresh the anime list in parent component
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page reload
    try {
      await axios.post("http://localhost:5000/api/anime", formData); // Send POST request
      // Reset form fields
      setFormData({
        title: "",
        episodesWatched: 0,
        totalEpisodes: 0,
        status: "Plan to Watch",
      });
      onAdded(); // Refresh anime list in parent component
    } catch (err) {
      console.error("❌ Error adding anime:", err);
    }
  };

  // 🎨 JSX for the form UI
  return (
    <form
      onSubmit={handleSubmit} // Handle form submission
      style={{
        padding: "20px",
        background: "#f4f4f4",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>Add New Anime</h2>

      {/* Input for anime title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange} // Updates state on typing
        required
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "100%",
        }}
      />

      {/* Input for episodes watched */}
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

      {/* Input for total episodes */}
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

      {/* Dropdown to select watching status */}
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

      {/* Submit button */}
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
