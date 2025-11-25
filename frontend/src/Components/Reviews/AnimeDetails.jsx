import React from "react";
import { useParams } from "react-router-dom";
import AnimeReviews from "./AnimeReviews";

export default function AnimeDetails() {
  // Read anime ID from URL
  const { id } = useParams();

  return (
    <div style={{ padding: "20px", color: "white" }}>
      {/* You can place full anime info here */}
      <h1>Anime Details Page</h1>

      {/* Reviews for this specific anime */}
      <AnimeReviews animeId={id} />
    </div>
  );
}
