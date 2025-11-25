import React, { useRef, useEffect } from "react";
import { useNews } from "../../Context/NewsContext";
import "./News.css";

export default function NewsList() {
  // Access anime news context
  const { latestNews, loadingNews } = useNews();

  // Ref for horizontal scroll container
  const newsRef = useRef();

  // Card width used for infinite scroll calculations
  const CARD_WIDTH = 260;

  // Duplicate list 3 times for seamless infinite scrolling
  const loopNews =
    latestNews.length > 0 ? [...latestNews, ...latestNews, ...latestNews] : [];

  // Maintain infinite horizontal loop scroll
  const handleLoop = (ref, originalList) => {
    const slider = ref.current;
    if (!slider) return;

    const totalWidth = CARD_WIDTH * originalList.length;

    if (slider.scrollLeft <= 0) {
      slider.scrollLeft = totalWidth; // jump forward
    } else if (slider.scrollLeft >= totalWidth * 2) {
      slider.scrollLeft = totalWidth; // jump back
    }
  };

  // Attach scroll listener once news is loaded
  useEffect(() => {
    if (loadingNews) return;

    const slider = newsRef.current;
    if (!slider || latestNews.length === 0) return;

    // Start scrolling from the middle duplicated section
    slider.scrollLeft = latestNews.length * CARD_WIDTH;

    const onScroll = () => handleLoop(newsRef, latestNews);
    slider.addEventListener("scroll", onScroll);

    return () => slider.removeEventListener("scroll", onScroll);
  }, [loadingNews, latestNews]);

  // Manual scroll left
  const scrollLeft = () => {
    if (newsRef.current) newsRef.current.scrollLeft -= 300;
  };

  // Manual scroll right
  const scrollRight = () => {
    if (newsRef.current) newsRef.current.scrollLeft += 300;
  };

  // Show loading message
  if (loadingNews) return <div>Loading News...</div>;

  return (
    <div className="news-container">
      {/* Section Title */}
      <h2>Anime News & Updates</h2>

      {/* Wrapper for the scrollable slider */}
      <div className="slider-wrapper">
        {/* Scroll Left Button */}
        <button className="scroll-btn left-btn" onClick={scrollLeft}>
          ◀
        </button>

        {/* Infinite Scroll Row */}
        <div className="news-grid" ref={newsRef}>
          {loopNews.map((item, index) => {
            const imageSrc =
              item.image ||
              "https://placehold.co/350x200?text=Anime+News&font=roboto";

            return (
              <div className="news-card" key={index}>
                <img src={imageSrc} alt="news" />

                <h3>{item.title || "No Title"}</h3>

                <p className="news-date">
                  {item.date
                    ? new Date(item.date).toDateString()
                    : "Unknown Date"}
                </p>

                <p className="news-text">
                  {item.excerpt
                    ? item.excerpt.slice(0, 120) + "..."
                    : "No description available."}
                </p>

                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Read More →
                </a>
              </div>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button className="scroll-btn right-btn" onClick={scrollRight}>
          ▶
        </button>
      </div>
    </div>
  );
}
