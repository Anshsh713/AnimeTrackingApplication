// Import React hooks and Axios library
import React, { useEffect, useState } from "react";
import axios from "axios";

// AnimeList component — displays all anime and allows deleting them
export default function AnimeList({ refresh }) {
  // 🧠 useState hook to store all anime fetched from backend
  const [animeList, setAnimeList] = useState([]);

  /**
   * 🟢 Function to fetch anime list from the backend API
   * Uses axios to make a GET request to: http://localhost:5000/api/anime
   */
  const fetchAnimeList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/anime"); // Fetch all anime
      setAnimeList(res.data); // Save the fetched data in state
    } catch (error) {
      console.error("❌ Error fetching anime list:", error);
    }
  };

  /**
   * 🔁 useEffect runs once when the component loads (like componentDidMount)
   * Calls fetchAnimeList() to load data initially
   */
  useEffect(() => {
    fetchAnimeList();
  }, [refresh]); // Also refetch when 'refresh' prop changes

  /**
   * 🔴 Function to delete an anime by its ID
   * Sends a DELETE request to backend and refreshes the list
   */
  const deleteAnime = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/anime/${id}`); // Delete anime by ID
      fetchAnimeList(); // Refresh list after deletion
    } catch (error) {
      console.error("❌ Error deleting anime:", error);
    }
  };

  /**
   * 🎨 UI section — displays the anime list or a "No Anime Added Yet" message
   */
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Anime List</h2>

      {/* If the anime list is empty, show a placeholder message */}
      {animeList.length === 0 ? (
        <p>No Anime Added Yet</p>
      ) : (
        // Otherwise, map through each anime and render it as a styled card
        animeList.map((anime) => (
          <div
            key={anime._id} // Unique key for React rendering
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            {/* Display anime title */}
            <h3>{anime.title}</h3>

            {/* Show episodes watched, total episodes, and status */}
            <p>
              {anime.episodesWatched}/{anime.totalEpisodes} episodes -{" "}
              <strong>{anime.status}</strong>
            </p>

            {/* Delete button calls deleteAnime with anime's ID */}
            <button
              onClick={() => deleteAnime(anime._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
