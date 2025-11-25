import { createContext, useContext, useState, useEffect } from "react";
import { getLatestNews } from "./NewsAPI"; // function to fetch news

// create context
const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  // state to store news list
  const [latestNews, setLatestNews] = useState([]);
  // state for loading status
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    // function to load news
    const loadNews = async () => {
      try {
        const news = await getLatestNews(); // fetch news
        setLatestNews(news); // update state
      } catch (err) {
        console.error("Error fetching news:", err); // log error
      } finally {
        setLoadingNews(false); // stop loading
      }
    };

    loadNews(); // call fetch
  }, []); // run once on mount

  // provide data to children
  return (
    <NewsContext.Provider value={{ latestNews, loadingNews }}>
      {children}
    </NewsContext.Provider>
  );
};

// custom hook to use this context
export const useNews = () => useContext(NewsContext);
