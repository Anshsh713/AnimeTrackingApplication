import { createContext, useContext, useState, useEffect } from "react";
import {
  getUpcomingAnime,
  getPopularAnime,
  getTopRatedAnime,
  getRunningAnime,
  getSuggestions,
  searchAnimeAPI, // ⭐ NEW
} from "./ContextAPI.jsx";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [running, setRunning] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimeData = async () => {
      try {
        const [
          upcomingData,
          popularData,
          topRatedData,
          runningData,
          suggestionsData,
        ] = await Promise.all([
          getUpcomingAnime(),
          getPopularAnime(),
          getTopRatedAnime(),
          getRunningAnime(),
          getSuggestions(),
        ]);

        setUpcoming(upcomingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setRunning(runningData);
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimeData();
  }, []);

  return (
    <AnimeContext.Provider
      value={{
        upcoming,
        popular,
        topRated,
        running,
        suggestions,
        searchAnimeAPI, // ⭐ NEW
        loading,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnime = () => useContext(AnimeContext);
