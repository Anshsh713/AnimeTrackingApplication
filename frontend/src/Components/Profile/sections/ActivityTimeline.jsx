import React from "react";
import "./ActivityTimeline.css";

export default function ActivityTimeline({ animeList }) {
  // Take the last 5 updated anime and reverse to show most recent first
  const recent = [...animeList].slice(-5).reverse();

  return (
    <div className="profile-card activity-section">
      {/* Section title */}
      <h2>Recent Activity</h2>

      {/* Timeline list */}
      <ul className="timeline">
        {recent.map((a) => (
          <li key={a._id}>
            Updated <b>{a.title}</b> — {a.episodesWatched} / {a.totalEpisodes}
          </li>
        ))}
      </ul>
    </div>
  );
}
