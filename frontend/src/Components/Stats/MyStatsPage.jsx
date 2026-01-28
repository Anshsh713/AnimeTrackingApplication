import React from "react";
import { useAnimeList } from "../../Context/AnimeListContext";
import "./MyStatsPage.css";

export default function MyStatsPage() {
  const { animeList } = useAnimeList();

  if (!animeList || animeList.length === 0) {
    return (
      <div className="stats-container">
        <div className="stats-card">
          <h2 className="stats-title">📊 My Anime Statistics</h2>
          <p className="stats-line">
            No anime data to show yet. Start adding some!
          </p>
        </div>
      </div>
    );
  }

  // Total entries
  const totalEntries = animeList.length;

  // Sum watched episodes
  const totalWatchedEpisodes = animeList.reduce(
    (sum, a) => sum + (a.episodesWatched || 0),
    0
  );

  // Sum total episodes
  const totalEpisodes = animeList.reduce(
    (sum, a) => sum + (a.totalEpisodes || 0),
    0
  );

  // Count per status
  const statusCount = {
    Watching: animeList.filter((a) => a.status === "Watching").length,
    Completed: animeList.filter((a) => a.status === "Completed").length,
    OnHold: animeList.filter((a) => a.status === "On Hold").length,
    Dropped: animeList.filter((a) => a.status === "Dropped").length,
    Plan: animeList.filter((a) => a.status === "Plan to Watch").length,
  };

  // Completion rate
  const completionRate =
    totalEntries > 0
      ? ((statusCount.Completed / totalEntries) * 100).toFixed(1)
      : 0;

  // Average rating
  const ratedAnime = animeList.filter(
    (a) => typeof a.rating === "number" && a.rating > 0
  );

  const avgRating =
    ratedAnime.length > 0
      ? (
        ratedAnime.reduce((sum, a) => sum + a.rating, 0) / ratedAnime.length
      ).toFixed(1)
      : "N/A";

  // Top 3 by rating
  const topRated = [...animeList]
    .filter((a) => typeof a.rating === "number" && a.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="stats-container">
      <h1 className="stats-title">My Anime Statistics</h1>

      {/* Overview section */}
      <div className="stats-card">
        <h2>Overview</h2>
        <div className="stats-line">
          <span>Total Anime Entries</span>
          <b>{totalEntries}</b>
        </div>
        <div className="stats-line">
          <span>Total Episodes Watched</span>
          <b>{totalWatchedEpisodes}</b>
        </div>
        <div className="stats-line">
          <span>Total Episodes in List</span>
          <b>{totalEpisodes}</b>
        </div>
        <div className="stats-line">
          <span>Completion Rate</span>
          <b>{completionRate}%</b>
        </div>
        <div className="stats-line">
          <span>Average Rating</span>
          <b>{avgRating === "n/a" ? "N/A" : `${avgRating} / 10`}</b>
        </div>
      </div>

      {/* Status breakdown (Chips) */}
      <div className="stats-card">
        <h2>Status Breakdown</h2>
        <div className="stats-grid">
          <p className="status-watching">
            <span>{statusCount.Watching}</span>
            Watching
          </p>
          <p className="status-completed">
            <span>{statusCount.Completed}</span>
            Completed
          </p>
          <p className="status-onhold">
            <span>{statusCount.OnHold}</span>
            On Hold
          </p>
          <p className="status-dropped">
            <span>{statusCount.Dropped}</span>
            Dropped
          </p>
          <p className="status-plan">
            <span>{statusCount.Plan}</span>
            Planning
          </p>
        </div>
      </div>

      {/* Top rated anime */}
      {topRated.length > 0 && (
        <div className="stats-card">
          <h2>Top Rated Masterpieces</h2>
          {topRated.map((anime, idx) => (
            <div key={anime._id || idx} className="top-rated-item">
              <img
                src={
                  anime.image && anime.image.startsWith("http")
                    ? anime.image
                    : "https://placehold.co/60x85?text=No+Img"
                }
                alt={anime.title}
              />
              <div className="top-rated-info">
                <span className="title">{anime.title}</span>
                <span className="rating">Rating: {anime.rating}/10</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
