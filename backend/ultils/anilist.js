const axios = require("axios"); // import axios for HTTP requests

// Function to fetch data from AniList GraphQL API
exports.fetchAniList = async (query, variables = {}) => {
  const URL = "https://graphql.anilist.co"; // AniList GraphQL endpoint

  try {
    // Send POST request with query + variables
    const response = await axios.post(URL, { query, variables });

    return response.data.data; // return actual API data
  } catch (error) {
    // log error response if available, otherwise full error
    console.error("AniList API error:", error.response?.data || error);

    // throw custom error so controller can catch it
    throw new Error("Failed to fetch data from AniList");
  }
};
