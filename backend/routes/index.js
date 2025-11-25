const express = require("express"); // import express
const router = express.Router(); // create router instance

// GET / → basic welcome route
router.get("/", (req, res) => {
  res.send("Welcome to Anime Tracking Backend 🚀"); // send response message
});

module.exports = router; // export router
