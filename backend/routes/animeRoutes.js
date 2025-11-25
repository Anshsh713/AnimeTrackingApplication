const express = require("express"); // import express
const router = express.Router(); // create router instance

// import anime controller functions
const {
  getUpcomingAnime,
  getPopularAnime,
  getTopRatedAnime,
  getRunningAnime,
  getRandomAnime,
  searchAnime,
} = require("../controllers/animeController");

console.log("Anime UPDATE hit"); // debug log

router.get("/upcoming", getUpcomingAnime); // fetch upcoming anime
router.get("/popular", getPopularAnime); // fetch popular anime
router.get("/top-rated", getTopRatedAnime); // fetch top-rated anime
router.get("/running", getRunningAnime); // fetch currently airing anime
router.get("/suggestions", getRandomAnime); // fetch suggested anime
router.get("/search", searchAnime); // search anime by query

module.exports = router; // export router
