import React from "react";
import { useAnime } from "../../Context/AnimeContext"; // import anime data context
import "./TopThreeSection.css"; // import styles

export default function TopThreeSection() {
  // get anime lists from context
  const { running, upcoming, popular } = useAnime();

  // pick first 3 items from a list
  const pickTop3 = (list) => list.slice(0, 3);

  // top 3 lists
  const topAiring = pickTop3(running);
  const topUpcoming = pickTop3(upcoming);
  const topPopular = pickTop3(popular);

  return (
    // main container
    <div className="top3-container">
      {/* Airing section title */}
      <h2 className="top3-title"> Top 3 Airing Anime</h2>

      {/* map over top 3 airing */}
      {topAiring.map((anime) => (
        <div className="top3-card" key={anime.id}>
          {" "}
          {/* anime card */}
          <img
            src={anime.coverImage.large} // anime image
            alt={anime.title.romaji} // alt text
          />
          <p>{anime.title.romaji}</p> {/* anime title */}
        </div>
      ))}

      {/* Upcoming section title */}
      <h2 className="top3-title"> Top 3 Upcoming</h2>

      {/* map over top 3 upcoming */}
      {topUpcoming.map((anime) => (
        <div className="top3-card" key={anime.id}>
          <img src={anime.coverImage.large} alt={anime.title.romaji} />
          <p>{anime.title.romaji}</p>
        </div>
      ))}

      {/* Popular section title */}
      <h2 className="top3-title"> Most Popular</h2>

      {/* map over most popular */}
      {topPopular.map((anime) => (
        <div className="top3-card" key={anime.id}>
          <img src={anime.coverImage.large} alt={anime.title.romaji} />
          <p>{anime.title.romaji}</p>
        </div>
      ))}
    </div>
  );
}
