import React, { useRef, useEffect } from "react";
import { useAnime } from "../../Context/AnimeContext";
import AnimeCard from "../Animes/Animescard";
import "./AllAnime.css";

export default function AllAnime() {
  const { upcoming, popular, topRated, running, suggestions, loading } =
    useAnime();

  // Refs for each slider row
  const upcomingRef = useRef();
  const popularRef = useRef();
  const topRef = useRef();
  const runningRef = useRef();
  const suggestionsRef = useRef();

  // Duplicate list 3x to achieve infinite loop scrolling
  const loopList = (list) =>
    list.length > 0 ? [...list, ...list, ...list] : [];

  const loopUpcoming = loopList(upcoming);
  const loopPopular = loopList(popular);
  const loopTopRated = loopList(topRated);
  const loopRunning = loopList(running);
  const loopSuggestions = loopList(suggestions);

  const CARD_WIDTH = 165;

  // Ensure infinite looping by resetting scrollLeft when overshooting
  const handleLoop = (ref, originalList) => {
    const slider = ref.current;
    if (!slider) return;

    const totalWidth = CARD_WIDTH * originalList.length;

    if (slider.scrollLeft <= 0) {
      slider.scrollLeft = totalWidth;
    } else if (slider.scrollLeft >= totalWidth * 2) {
      slider.scrollLeft = totalWidth;
    }
  };

  // Setup each slider after data finishes loading
  useEffect(() => {
    if (loading) return;

    const bindScroll = (ref, list) => {
      const slider = ref.current;
      if (!slider || list.length === 0) return;

      // Start centered
      slider.scrollLeft = list.length * CARD_WIDTH;

      const onScroll = () => handleLoop(ref, list);
      slider.addEventListener("scroll", onScroll);
      return () => slider.removeEventListener("scroll", onScroll);
    };

    bindScroll(upcomingRef, upcoming);
    bindScroll(popularRef, popular);
    bindScroll(topRef, topRated);
    bindScroll(runningRef, running);
    bindScroll(suggestionsRef, suggestions);
  }, [loading]);

  // Arrow button movement
  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollLeft -= 300;
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollLeft += 300;
  };

  if (loading) return <div className="loading">Loading Anime...</div>;

  return (
    <div className="home-container">
      {/* Reusable Section Component */}
      {[
        { title: "Top Upcoming Anime", ref: upcomingRef, list: loopUpcoming },
        { title: "Most Popular Anime", ref: popularRef, list: loopPopular },
        { title: "Top Rated Anime", ref: topRef, list: loopTopRated },
        { title: "Running Anime Show", ref: runningRef, list: loopRunning },
        {
          title: "Suggestions For You",
          ref: suggestionsRef,
          list: loopSuggestions,
        },
      ].map((section, index) => (
        <section className="anime-section" key={index}>
          <h2>{section.title}</h2>

          <div className="slider-container">
            {/* Left Arrow */}
            <button
              className="scroll-btn left-btn"
              onClick={() => scrollLeft(section.ref)}
            >
              ◀
            </button>

            {/* Slider */}
            <div className="anime-slider" ref={section.ref}>
              {section.list.map((anime, i) => (
                <AnimeCard key={i} anime={anime} />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className="scroll-btn right-btn"
              onClick={() => scrollRight(section.ref)}
            >
              ▶
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
