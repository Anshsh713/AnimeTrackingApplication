// Import the Anime model to interact with the Anime collection in MongoDB
import Anime from "../models/Anime.js";

/**
 * 🟢 Get all anime entries from the database
 * - Sorted by 'createdAt' in descending order (newest first)
 */
export const getAllAnime = async (req, res) => {
  try {
    // Fetch all anime entries and sort by creation date (latest first)
    const list = await Anime.find().sort({ createdAt: -1 });

    // Send the list of anime as a JSON response
    res.json(list);
  } catch (error) {
    // Handle any server error
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * 🟡 Create a new anime entry
 * - Data comes from the request body (req.body)
 */
export const createAnime = async (req, res) => {
  try {
    // Create a new Anime document using the data sent by the client
    const newAnime = new Anime(req.body);

    // Save the new anime to the database
    const saved = await newAnime.save();

    // Respond with the saved anime and status code 201 (Created)
    res.status(201).json(saved);
  } catch (error) {
    // Handle validation or bad request errors
    res.status(400).json({
      message: "Bad Request",
      error: error.message,
    });
  }
};

/**
 * 🟠 Update an existing anime entry by ID
 * - The ID comes from the URL parameter (req.params.id)
 * - Updated data comes from req.body
 */
export const updateAnime = async (req, res) => {
  try {
    // Find the anime by ID and update it with new data
    const updated = await Anime.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document instead of the old one
    });

    // If no anime found with that ID, return a 404 response
    if (!updated) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    // Send back the updated anime data
    res.json(updated);
  } catch (error) {
    // Handle validation or request errors
    res.status(400).json({
      message: "Bad Request",
      error: error.message,
    });
  }
};

/**
 * 🔴 Delete an anime entry by ID
 * - The ID comes from the URL parameter (req.params.id)
 */
export const deleteAnime = async (req, res) => {
  try {
    // Find and delete the anime by its ID
    const deleted = await Anime.findByIdAndDelete(req.params.id);

    // If anime not found, return 404
    if (!deleted) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    // Send success message
    res.json({ message: "Anime deleted successfully" });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
