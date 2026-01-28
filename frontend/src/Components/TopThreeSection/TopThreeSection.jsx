import React from "react";
import { useAnime } from "../../Context/AnimeContext";
import "./TopThreeSection.css";

export default function TopThreeSection() {
  const { running, upcoming, popular } = useAnime();

  const pickTop3 = (list) => (list ? list.slice(0, 3) : []);

  const sections = [
    { title: "Top 3 Airing Anime", list: pickTop3(running) },
    { title: "Top 3 Upcoming", list: pickTop3(upcoming) },
    { title: "Most Popular", list: pickTop3(popular) },
  ];

  return (
    <div className="top3-container">
      {sections.map((section, sIdx) => (
        <div className="top3-group" key={sIdx}>
          <h2 className="top3-title">{section.title}</h2>
          {section.list.map((anime, aIdx) => {
            const imageSrc = anime.coverImage?.large || anime.image;
            return (
              <div className="top3-card" key={anime.id || aIdx} style={{ "--rank": `'${aIdx + 1}'` }}>
                <img src={imageSrc} alt={anime.title?.romaji || "Anime"} />
                <p>{anime.title?.romaji || anime.title || "Untitled"}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
