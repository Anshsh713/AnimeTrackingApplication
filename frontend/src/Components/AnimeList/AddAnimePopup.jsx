import React, { useState } from "react";
import { useAnimeList } from "../../Context/AnimeListContext";
import "./AddAnimePopup.css";

export default function AddFromSearch({ anime, onClose }) {
  const { addAnime } = useAnimeList();

  // Total episodes pulled from API
  const totalEpisodes = anime.episodes || 0;

  // Form state
  const [form, setForm] = useState({
    title: anime.title.romaji || "Untitled Anime",
    episodesWatched: 0,
    totalEpisodes: totalEpisodes,
    rating: "",
  });

  // Determine status based on progress
  const getStatus = () => {
    if (form.totalEpisodes > 0 && form.episodesWatched === form.totalEpisodes)
      return "Completed";

    if (form.episodesWatched === 0) return "Plan to Watch";

    return "Watching";
  };

  // Submit new anime entry
  const handleSubmit = (e) => {
    e.preventDefault();

    addAnime({
      ...form,
      image: anime.coverImage.large,
      status: getStatus(),

      episodesWatched: Number(form.episodesWatched),
      totalEpisodes: Number(form.totalEpisodes),
      rating: Number(form.rating || 0),
    });

    onClose();
  };

  return (
    <div className="AFS-overlay">
      <div className="AFS-box">
        {/* Modal Title */}
        <h2>Add Anime</h2>

        {/* Add Anime Form */}
        <form className="AFS-form" onSubmit={handleSubmit}>
          {/* Title */}
          <label>Title</label>
          <input type="text" value={form.title} disabled />

          {/* Total Episodes */}
          <label>Total Episodes</label>
          <input type="number" value={form.totalEpisodes} disabled />

          {/* Episodes Watched */}
          <label>Episodes Watched</label>
          <input
            type="number"
            min={0}
            max={form.totalEpisodes}
            value={form.episodesWatched}
            onChange={(e) =>
              setForm({ ...form, episodesWatched: Number(e.target.value) })
            }
          />

          {/* Rating */}
          <label>Rating (0–10)</label>
          <input
            type="number"
            min={0}
            max={10}
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          />

          {/* Buttons */}
          <div className="AFS-buttons">
            <button type="submit" className="AFS-add">
              Add
            </button>

            <button type="button" className="AFS-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
