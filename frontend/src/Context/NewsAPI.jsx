import axios from "axios"; // import axios for API calls

// base URL for all news routes
const BASE_URL = "http://localhost:4000/api/news";

// fetch latest news
export const getLatestNews = async () => {
  const res = await axios.get(`${BASE_URL}/latest`); // send GET request
  return res.data.news; // return news data
};

// fetch news related to a specific anime
export const getAnimeNews = async (id) => {
  const res = await axios.get(`${BASE_URL}/anime/${id}`); // send GET request with ID
  return res.data.news; // return news list
};
