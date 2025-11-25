import React, { useState } from "react";
import { useAnimeList } from "../../Context/AnimeListContext";
import "./AnimeListcard.css";

export default function AnimeCard({ anime }) {
  const { updateAnime } = useAnimeList();

  // Controls edit popup visibility
  const [editing, setEditing] = useState(false);

  // Increase one episode and auto-complete if final episode reached
  const increaseEpisode = () => {
    const newEpisodeCount = anime.episodesWatched + 1;

    const updateData = {
      episodesWatched: newEpisodeCount,
    };

    if (newEpisodeCount >= anime.totalEpisodes) {
      updateData.status = "Completed";
    }

    updateAnime(anime._id, updateData);
  };

  // Update rating between 0 and 10
  const changeRating = (e) => {
    const newRating = Number(e.target.value);
    if (newRating >= 0 && newRating <= 10) {
      updateAnime(anime._id, { rating: newRating });
    }
  };

  // Progress bar fill percentage
  const progressPercent =
    anime.totalEpisodes > 0
      ? (anime.episodesWatched / anime.totalEpisodes) * 100
      : 0;

  // Fallback handling for missing images
  const imageSrc =
    anime.image ||
    anime.coverImage?.large ||
    "https://placehold.co/200x300?text=No+Image&font=roboto";

  // Clean anime title fallback
  const title = anime.title || anime.title?.romaji || "Untitled Anime";

  return (
    <>
      {/* Main Anime Card */}
      <div className="AC-card">
        {/* Thumbnail */}
        <div className="AC-image">
          <img src={imageSrc} alt={title} />
        </div>

        {/* Details */}
        <div className="AC-details">
          <h3 className="AC-title">{title}</h3>

          <p className="AC-status">
            Status: <b>{anime.status}</b>
          </p>

          {/* Rating */}
          <div className="AC-rating">
            <span>Rating</span>
            <input
              type="number"
              min={0}
              max={10}
              value={anime.rating || 0}
              onChange={changeRating}
            />
            <span>/10</span>
          </div>

          {/* Progress Bar */}
          <div className="AC-progress">
            <div className="AC-progress-bar">
              <div
                className="AC-progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <p className="AC-progress-text">
              Progress: {anime.episodesWatched}/{anime.totalEpisodes}
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="AC-actions">
          {/* Episode Increase Only If Not Completed */}
          {anime.episodesWatched < anime.totalEpisodes && (
            <button className="AC-btn AC-episode" onClick={increaseEpisode}>
              +
            </button>
          )}

          {/* Edit Button */}
          <button className="AC-btn AC-edit" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      </div>

      {/* Edit Popup */}
      {editing && (
        <div className="AC-edit-overlay">
          <div className="AC-edit-box">
            <h3>Edit Anime</h3>

            <label>Status:</label>
            <select
              value={anime.status}
              onChange={(e) =>
                updateAnime(anime._id, { status: e.target.value })
              }
            >
              <option value="Watching">Watching</option>
              <option value="On Hold">On Hold</option>
              <option value="Dropped">Dropped</option>
              <option value="Plan to Watch">Plan to Watch</option>

              {anime.episodesWatched === anime.totalEpisodes && (
                <option value="Completed">Completed</option>
              )}
            </select>

            <button className="AC-close-btn" onClick={() => setEditing(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
