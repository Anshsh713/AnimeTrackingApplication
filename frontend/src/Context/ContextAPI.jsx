import axios from "axios"; // import axios for API calls

// base URL for all anime routes
const BASE_URL = "http://localhost:4000/api/anime";

// get upcoming anime list
export const getUpcomingAnime = async () => {
  const res = await axios.get(`${BASE_URL}/upcoming`); // send GET request
  return res.data.results; // return results
};

// get popular anime list
export const getPopularAnime = async () => {
  const res = await axios.get(`${BASE_URL}/popular`); // send GET request
  return res.data.results; // return results
};

// get top-rated anime list
export const getTopRatedAnime = async () => {
  const res = await axios.get(`${BASE_URL}/top-rated`); // send GET request
  return res.data.results; // return results
};

// get currently running anime
export const getRunningAnime = async () => {
  const res = await axios.get(`${BASE_URL}/running`); // send GET request
  return res.data.results; // return results
};

// get anime suggestions
export const getSuggestions = async () => {
  const res = await axios.get(`${BASE_URL}/suggestions`); // send GET request
  return res.data.results; // return results
};

// search anime by query
export const searchAnimeAPI = async (query) => {
  if (!query || query.length < 2) return []; // return empty if too short

  const res = await axios.get(
    `http://localhost:4000/api/anime/search?q=${query}` // GET search endpoint
  );

  return res.data.results; // return search results
};
