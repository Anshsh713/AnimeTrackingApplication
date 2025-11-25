import React from "react";
import { useAnimeList } from "../../Context/AnimeListContext"; // access anime list
import "./MyStatsPage.css"; // import styles

export default function MyStatsPage() {
  const { animeList } = useAnimeList(); // get anime list from context

  // If list is empty, show message
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

  // Filter anime that have ratings
  const ratedAnime = animeList.filter(
    (a) => typeof a.rating === "number" && a.rating > 0
  );

  // Average rating
  const avgRating =
    ratedAnime.length > 0
      ? (
          ratedAnime.reduce((sum, a) => sum + a.rating, 0) / ratedAnime.length
        ).toFixed(1)
      : "N/A";

  // Top 3 by rating
  const topRated = [...animeList]
    .filter((a) => typeof a.rating === "number")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="stats-container">
      <h1 className="stats-title"> My Anime Statistics</h1>

      {/* Overview section */}
      <div className="stats-card">
        <h2>Overview</h2>
        <p className="stats-line">
          <b>Total Anime Entries:</b> {totalEntries}
        </p>
        <p className="stats-line">
          <b>Total Episodes Watched:</b> {totalWatchedEpisodes}
        </p>
        <p className="stats-line">
          <b>Total Episodes in List:</b> {totalEpisodes}
        </p>
        <p className="stats-line">
          <b>Completion Rate:</b> {completionRate}%
        </p>
        <p className="stats-line">
          <b>Average Rating:</b>{" "}
          {avgRating === "N/A" ? "N/A" : `${avgRating} / 10`}
        </p>
      </div>

      {/* Status breakdown */}
      <div className="stats-card">
        <h2>Status Breakdown</h2>
        <div className="stats-grid">
          <p>Watching: {statusCount.Watching}</p>
          <p>Completed: {statusCount.Completed}</p>
          <p>On Hold: {statusCount.OnHold}</p>
          <p>Dropped: {statusCount.Dropped}</p>
          <p>Plan to Watch: {statusCount.Plan}</p>
        </div>
      </div>

      {/* Top rated anime */}
      {topRated.length > 0 && (
        <div className="stats-card">
          <h2>Top Rated</h2>
          {topRated.map((anime) => (
            <div key={anime._id} className="top-rated-item">
              <img
                src={
                  anime.image && anime.image.startsWith("http")
                    ? anime.image
                    : "https://placehold.co/60x85?text=No+Img"
                }
                alt={anime.title}
              />
              <div>
                <p>
                  <b>{anime.title}</b>
                </p>
                <p>Rating: {anime.rating}/10</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
