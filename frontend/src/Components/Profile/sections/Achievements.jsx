import React from "react";
import "./Achievements.css";

export default function Achievements({ animeList }) {
  // Total episodes watched
  const episodes = animeList.reduce(
    (sum, a) => sum + (a.episodesWatched || 0),
    0
  );

  // Achievement badges list
  const badges = [];

  // Add achievements based on conditions
  if (animeList.length >= 10) badges.push("10 Anime Watched");
  if (episodes >= 100) badges.push("100 Episodes Watched");
  if (episodes >= 500) badges.push("500 Episodes Veteran");
  if (animeList.some((a) => a.rating === 10))
    badges.push("Perfect Rating Achieved");

  return (
    <div className="profile-card achievement-section">
      {/* Section Heading */}
      <h2>Achievements</h2>

      {/* No achievements yet */}
      {badges.length === 0 && <p>No achievements yet.</p>}

      {/* Achievements Grid */}
      <div className="badge-grid">
        {badges.map((b, i) => (
          <div className="badge" key={i}>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
