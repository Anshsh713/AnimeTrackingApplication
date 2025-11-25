import React from "react";
import "./FavoriteAnime.css";

export default function FavoriteAnime({ animeList }) {
  // Sort anime by rating (highest first) and take top 5
  const topFavorites = [...animeList]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="profile-card favorite-section">
      {/* Section Title */}
      <h2>Favorite Anime</h2>

      {/* Grid of top-rated anime */}
      <div className="fav-grid">
        {topFavorites.map((anime) => {
          // Fallback image if no image exists
          const imgSrc =
            anime.image && anime.image.trim() !== ""
              ? anime.image
              : "https://placehold.co/300x400?text=No+Image&font=roboto";

          return (
            <div className="fav-item" key={anime._id}>
              {/* Anime cover image */}
              <img
                src={imgSrc}
                alt={anime.title}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/300x400?text=No+Image&font=roboto";
                }}
              />

              {/* Anime title */}
              <p>{anime.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
