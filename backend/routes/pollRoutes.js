const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createPoll,
  getPolls,
  getSinglePoll, // 👈 add this
  votePoll,
} = require("../controllers/PollController");

// Create poll
router.post("/:id/poll", protect, createPoll);

// Get all polls
router.get("/:id/polls", protect, getPolls);

// 🔥 Get a single poll (needed for chat)
router.get("/:id/poll/:pollId", protect, getSinglePoll);

// Vote
router.post("/:id/poll/:pollId/vote", protect, votePoll);

module.exports = router;
