import React from "react";
import "./ProfileStats.css";

export default function ProfileStats({ animeList }) {
  // If list is empty, do not render the component
  if (!animeList.length) return null;

  // Total anime count
  const total = animeList.length;

  // Total episodes the user has watched
  const episodesWatched = animeList.reduce(
    (sum, a) => sum + a.episodesWatched,
    0
  );

  // Total episodes across all anime
  const totalEpisodes = animeList.reduce((sum, a) => sum + a.totalEpisodes, 0);

  // Average rating of anime
  const avgRating = (
    animeList.reduce((sum, a) => sum + (a.rating || 0), 0) / total
  ).toFixed(1);

  // Count anime by status
  const statusCounts = {
    Watching: animeList.filter((a) => a.status === "Watching").length,
    Completed: animeList.filter((a) => a.status === "Completed").length,
    OnHold: animeList.filter((a) => a.status === "On Hold").length,
    Dropped: animeList.filter((a) => a.status === "Dropped").length,
    Plan: animeList.filter((a) => a.status === "Plan to Watch").length,
  };

  // Convert episodes watched into approximate hours (24 minutes each)
  const hoursSpent = ((episodesWatched * 24) / 60).toFixed(1);

  // Percentage of anime marked completed
  const completionRate = ((statusCounts.Completed / total) * 100).toFixed(1);

  return (
    <div className="profile-card stats-overview">
      {/* Section Title */}
      <h2>Anime Statistics</h2>

      {/* Grid displaying main statistics */}
      <div className="stats-grid">
        <div>
          <b>Total Anime</b> <span>{total}</span>
        </div>
        <div>
          <b>Episodes Watched</b> <span>{episodesWatched}</span>
        </div>
        <div>
          <b>Total Episodes</b> <span>{totalEpisodes}</span>
        </div>
        <div>
          <b>Average Rating</b> <span>{avgRating}</span>
        </div>
        <div>
          <b>Hours Spent</b> <span>{hoursSpent} hrs</span>
        </div>
        <div>
          <b>Completion Rate</b> <span>{completionRate}%</span>
        </div>
      </div>

      {/* Status breakdown */}
      <h3 className="status-title">Status Breakdown</h3>

      <div className="status-grid">
        <p>Watching: {statusCounts.Watching}</p>
        <p>Completed: {statusCounts.Completed}</p>
        <p>On Hold: {statusCounts.OnHold}</p>
        <p>Dropped: {statusCounts.Dropped}</p>
        <p>Plan to Watch: {statusCounts.Plan}</p>
      </div>
    </div>
  );
}
