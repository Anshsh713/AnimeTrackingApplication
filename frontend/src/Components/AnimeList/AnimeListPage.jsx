import React, { useState, useEffect } from "react";
import AnimeCard from "./AnimeListcard";
import { useAnimeList } from "../../Context/AnimeListContext";
import { useAnime } from "../../Context/AnimeContext";
import AddFromSearch from "./AddAnimePopup";

import "./AnimeListPage.css";

export default function AnimeListPage() {
  // User's anime list from context
  const { animeList, loading } = useAnimeList();

  // Anime search API + suggestions
  const { searchAnimeAPI, suggestions } = useAnime();

  // Local component state
  const [filter, setFilter] = useState("All");
  const [searchPopup, setSearchPopup] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchText.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        const res = await searchAnimeAPI(searchText);

        // Filter results by title
        const filtered = res.filter(
          (anime) =>
            anime.title.romaji
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            (anime.title.english &&
              anime.title.english
                .toLowerCase()
                .includes(searchText.toLowerCase()))
        );

        setResults(filtered);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchText, searchAnimeAPI]);

  // Loading screen
  if (loading) return <p>Loading...</p>;

  return (
    <div className="ALP-container">
      {/* Page Title */}
      <h1 className="ALP-title">My Anime List</h1>

      <div className="ALP-top-bar">
        {/* Search Button */}
        <div className="ALP-top-buttons">
          <button className="ALP-btn" onClick={() => setSearchPopup(true)}>
            + Add New Anime
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="ALP-filters">
          {[
            "All",
            "Watching",
            "Completed",
            "On Hold",
            "Dropped",
            "Plan to Watch",
          ].map((status) => (
            <button
              key={status}
              className={`ALP-filter-btn ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Empty list message */}
      {!loading && animeList.length === 0 && (
        <div className="ALP-empty">
          <p>Your anime list is currently empty. Start by adding some favorites!</p>
        </div>
      )}

      {/* Filtered Anime Cards */}
      <div className="ALP-list">
        {animeList
          .filter((a) => filter === "All" || a.status === filter)
          .map((anime) => (
            <AnimeCard key={anime._id} anime={anime} />
          ))}
      </div>

      {/* Search Popup */}
      {searchPopup && (
        <div className="ALP-popup-overlay">
          <div className="ALP-popup">
            {/* Close Popup */}
            <button className="ALP-close" onClick={() => setSearchPopup(false)}>
              ✕
            </button>

            {/* Search Header */}
            <h3>Quick Search</h3>

            {/* Search Input */}
            <input
              className="ALP-search-input"
              type="text"
              placeholder="Start typing anime title..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
            />

            {/* Suggestions (when text is empty) */}
            {searchText.trim().length < 2 && suggestions.length > 0 && (
              <div className="ALP-results-list">
                <h3>Recommended For You</h3>
                {suggestions.map((anime) => (
                  <div key={anime.id} className="ALP-result">
                    <div className="ALP-result-left">
                      <img
                        src={anime.coverImage?.large}
                        alt={anime.title?.romaji}
                      />
                      <div>
                        <div className="ALP-result-title">
                          {anime.title?.romaji}
                        </div>
                        <div className="ALP-result-small">
                          {anime.title?.english}
                        </div>
                      </div>
                    </div>

                    <button
                      className="ALP-add-btn"
                      onClick={() => setSelectedAnime(anime)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {searchText.trim().length >= 2 && results.length === 0 && (
              <div className="ALP-no-results">
                <p>No titles found matching "{searchText}"</p>
              </div>
            )}

            {/* Search Results */}
            <div className="ALP-results-list">
              {searchText.trim().length >= 2 &&
                results.map((anime) => (
                  <div key={anime.id} className="ALP-result">
                    <div className="ALP-result-left">
                      <img
                        src={anime.coverImage?.large}
                        alt={anime.title?.romaji}
                      />
                      <div>
                        <div className="ALP-result-title">
                          {anime.title?.romaji}
                        </div>
                        <div className="ALP-result-small">
                          {anime.title?.english}
                        </div>
                      </div>
                    </div>

                    <button
                      className="ALP-add-btn"
                      onClick={() => setSelectedAnime(anime)}
                    >
                      Add
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Add anime popup */}
      {selectedAnime && (
        <AddFromSearch
          anime={selectedAnime}
          onClose={() => {
            setSelectedAnime(null);
            setSearchText("");
            setResults([]);
            setSearchPopup(false);
          }}
        />
      )}
    </div>
  );
}
