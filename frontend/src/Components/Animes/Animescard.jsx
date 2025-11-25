import "./Animescard.css";

export default function AnimeCard({ anime }) {
  // Fallback image if API fails
  const cover =
    anime?.coverImage?.large ||
    "https://placehold.co/300x400?text=No+Image&font=roboto";

  // Title fallback
  const title =
    anime?.title?.english || anime?.title?.romaji || "Untitled Anime";

  return (
    <div className="anime-card">
      {/* Cover Image */}
      <img
        src={cover}
        alt={title}
        onError={(e) => {
          e.target.src =
            "https://placehold.co/300x400?text=No+Image&font=roboto";
        }}
      />

      {/* Title Overlay */}
      <h4 className="anime-title">{title}</h4>
    </div>
  );
}
