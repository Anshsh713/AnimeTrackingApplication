const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // ⭐ Image URL (AniList cover image)
    image: { type: String, default: "" },

    episodesWatched: { type: Number, default: 0 },
    totalEpisodes: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"],
      default: "Plan to Watch",
    },

    // ⭐ Rating 0–10
    rating: { type: Number, min: 0, max: 10, default: 0 },

    // Optional tags
    tags: { type: [String], default: [] },

    // ⭐ Link anime to logged-in user
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// ⭐ YOU FORGOT THIS EARLIER (THIS IS WHY IMAGE WASN’T SAVED)
module.exports = mongoose.model("Anime", animeSchema);
