const express = require("express"); // import express
const {
  getAllAnime,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/animeListController"); // import controllers
const { protect } = require("../middleware/authMiddleware"); // import auth middleware

const router = express.Router(); // create router instance
console.log("AnimeList GET hit"); // debug log

router.get("/", protect, getAllAnime); // get user's anime list
router.post("/", protect, createAnime); // add new anime to list
router.put("/:id", protect, updateAnime); // update anime entry
router.delete("/:id", protect, deleteAnime); // delete anime entry

module.exports = router; // export router
