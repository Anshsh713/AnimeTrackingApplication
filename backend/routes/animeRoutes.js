// Import modules
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllAnime,
  createAnime,
  updateAnime,
  deleteAnime,
} from "../controllers/animeController.js";

// Create router
const router = express.Router();

// Routes
router.get("/", protect, getAllAnime); // Get all anime
router.post("/", protect, createAnime); // Add new anime (protected)
router.put("/:id", protect, updateAnime); // Update anime by ID (protected)
router.delete("/:id", protect, deleteAnime); // Delete anime by ID (protected)

// Export router
export default router;
