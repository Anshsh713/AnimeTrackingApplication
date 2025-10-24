// Import the Express library to create a router
import express from "express";

// Import controller functions that handle different anime-related operations
import {
  getAllAnime, // Get all anime from the database
  createAnime, // Add a new anime
  updateAnime, // Update an existing anime
  deleteAnime, // Delete an anime
} from "../controllers/animeController.js";

// Create a new router instance using Express
const router = express.Router();

/**
 * 🧩 Define API routes for Anime operations
 * Each route corresponds to a function in the controller
 */

// ✅ GET request → Fetch all anime
// Example: GET /api/anime
router.get("/", getAllAnime);

// ✅ POST request → Add a new anime entry
// Example: POST /api/anime
router.post("/", createAnime);

// ✅ PUT request → Update an anime by its ID
// Example: PUT /api/anime/65432abcd123
router.put("/:id", updateAnime);

// ✅ DELETE request → Remove an anime by its ID
// Example: DELETE /api/anime/65432abcd123
router.delete("/:id", deleteAnime);

// Export the router so it can be used in the main server file (e.g., server.js)
export default router;
