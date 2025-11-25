const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createClub,
  getAllClubs,
  getClubDetails,
  joinClub,
  leaveClub,
} = require("../controllers/ClubController");

// Create club
router.post("/", protect, createClub);

// Get all clubs
router.get("/", protect, getAllClubs);

// Get one club details
router.get("/:id", protect, getClubDetails);

// Join club
router.post("/:id/join", protect, joinClub);

// Leave club
router.post("/:id/leave", protect, leaveClub);

module.exports = router;
