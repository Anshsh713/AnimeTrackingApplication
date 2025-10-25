// Import model
import Anime from "../models/Anime.js";

// Get all anime
export const getAllAnime = async (req, res) => {
  try {
    const list = await Anime.find({ userId: req.user.id }); // Latest first
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create new anime
export const createAnime = async (req, res) => {
  try {
    const { title, episodesWatched, totalEpisodes, status } = req.body;
    const newAnime = new Anime({
      title,
      episodesWatched,
      totalEpisodes,
      status,
      userId: req.user.id,
    });
    const saved = await newAnime.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update anime by ID
export const updateAnime = async (req, res) => {
  try {
    const updated = await Anime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Return updated doc
    if (!updated) return res.status(404).json({ message: "Not Found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

// Delete anime by ID
export const deleteAnime = async (req, res) => {
  try {
    const deleted = await Anime.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    res.json({ message: "Anime deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
