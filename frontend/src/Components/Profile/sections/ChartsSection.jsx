import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import "./ChartsSection.css";

export default function ChartsSection({ animeList }) {
  // Prepare pie chart data for status distribution
  const statusData = {
    labels: ["Watching", "Completed", "On Hold", "Dropped", "Plan"],
    datasets: [
      {
        data: [
          animeList.filter((a) => a.status === "Watching").length,
          animeList.filter((a) => a.status === "Completed").length,
          animeList.filter((a) => a.status === "On Hold").length,
          animeList.filter((a) => a.status === "Dropped").length,
          animeList.filter((a) => a.status === "Plan to Watch").length,
        ],
        backgroundColor: [
          "#4caf50", // Watching
          "#2196f3", // Completed
          "#ff9800", // On Hold
          "#e91e63", // Dropped
          "#9c27b0", // Plan to Watch
        ],
      },
    ],
  };

  // Prepare bar chart data for user ratings
  const ratingData = {
    labels: animeList.map((a) => a.title),
    datasets: [
      {
        label: "Rating",
        data: animeList.map((a) => a.rating),
        backgroundColor: "#4caf50",
      },
    ],
  };

  return (
    <div className="charts-card">
      {/* Header */}
      <h2>Your Anime Stats</h2>

      {/* Two chart sections: Pie and Bar */}
      <div className="charts-grid">
        {/* Pie chart: Status breakdown */}
        <div className="chart-box">
          <h3>Status Distribution</h3>
          <Pie data={statusData} />
        </div>

        {/* Bar chart: Ratings */}
        <div className="chart-box">
          <h3>Ratings</h3>
          <Bar data={ratingData} />
        </div>
      </div>
    </div>
  );
}
