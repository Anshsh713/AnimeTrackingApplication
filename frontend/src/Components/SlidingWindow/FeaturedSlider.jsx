import React, { useRef, useEffect, useState } from "react";
import { useAnime } from "../../Context/AnimeContext";
import "./FeaturedSlider.css";
import AniRealm from "../../Images/AniRealm.gif";

export default function FeaturedSlider() {
  // Extract anime lists from context
  const { running, upcoming, topRated, popular } = useAnime();

  // Reference to slider container
  const slider = useRef(null);

  // Track currently active slide index
  const [index, setIndex] = useState(0);

  // First slide: static GIF slide
  const gifSlide = {
    type: "gif",
    img: AniRealm,
    title: "Welcome to AniRealm",
    label: "Featured",
  };

  // Build final list of slides
  const items = [
    gifSlide,
    { label: "Airing", data: running[0] },
    { label: "Upcoming", data: upcoming[0] },
    { label: "Top Rated", data: topRated[0] },
    { label: "Popular", data: popular[0] },
  ].filter((i) => i.data || i.type === "gif");

  // Scroll slider to a given index
  const scrollToIndex = (idx) => {
    if (!slider.current) return;
    slider.current.scrollTo({
      left: slider.current.clientWidth * idx,
      behavior: "smooth",
    });
  };

  // Move to next slide
  const nextSlide = () => {
    setIndex((prev) => {
      if (items.length === 0) return prev;
      const newIndex = (prev + 1) % items.length;
      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  // Move to previous slide
  const prevSlide = () => {
    setIndex((prev) => {
      if (items.length === 0) return prev;
      let newIndex = prev - 1;
      if (newIndex < 0) newIndex = items.length - 1;
      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="featured-wrapper">
      {/* Previous Button */}
      <button className="featured-btn left" onClick={prevSlide}>
        ◀
      </button>

      {/* Slider Container */}
      <div className="featured-slider" ref={slider}>
        {items.map((item, idx) => (
          <div className="featured-card" key={idx}>
            {/* GIF Slide */}
            {item.type === "gif" ? (
              <div className="video-container">
                <img src={item.img} className="gif-slide" alt="AniRealm" />
                <div className="featured-info video-info">
                  <p className="featured-tag">{item.label}</p>
                  <h2>{item.title}</h2>
                </div>
              </div>
            ) : (
              <>
                {/* Blurred Background */}
                <div
                  className="blur-bg"
                  style={{
                    backgroundImage: `url(${
                      item.data.bannerImage || item.data.coverImage?.large
                    })`,
                  }}
                ></div>

                {/* Portrait */}
                <img
                  className="featured-portrait"
                  src={item.data.coverImage?.large}
                  alt=""
                />

                {/* Title & Label */}
                <div className="featured-info">
                  <p className="featured-tag">{item.label}</p>
                  <h2>{item.data.title?.romaji}</h2>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button className="featured-btn right" onClick={nextSlide}>
        ▶
      </button>
    </div>
  );
}
