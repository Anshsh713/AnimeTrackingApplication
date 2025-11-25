const express = require("express");
const router = express.Router();

const { getLatestNews } = require("../controllers/newsController");

// GET Reddit Anime News
router.get("/latest", getLatestNews);

module.exports = router;
