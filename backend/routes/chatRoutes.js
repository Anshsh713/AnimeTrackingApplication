const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { sendMessage, getMessages } = require("../controllers/ChatController");

// Send message to club
router.post("/:id/message", protect, sendMessage);

// Get all messages from club
router.get("/:id/messages", protect, getMessages);

module.exports = router;
