const Anime = require("../models/Anime");

// GET USER'S ANIME ONLY
exports.getAllAnime = async (req, res) => {
  try {
    const list = await Anime.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    console.log("FETCH for USER:", req.user._id);

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE ANIME
exports.createAnime = async (req, res) => {
  try {
    const newAnime = new Anime({
      ...req.body,
      userId: req.user._id,
    });

    const saved = await newAnime.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ANIME (only user's anime)
exports.updateAnime = async (req, res) => {
  try {
    const updated = await Anime.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Anime not found or not yours" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE ANIME
exports.deleteAnime = async (req, res) => {
  try {
    const deleted = await Anime.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Not found or not yours" });

    res.json({ message: "Anime deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
