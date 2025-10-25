// Import mongoose
import mongoose from "mongoose";
// Anime schema
const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Anime title
    episodesWatched: { type: Number, default: 0 }, // Episodes watched
    totalEpisodes: { type: Number, default: 0 }, // Total episodes
    status: {
      type: String,
      enum: ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"],
      default: "Plan to Watch",
    }, // Watch status
    tags: { type: [String], default: [] }, // Tags or genres
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User ID (owner)
  },
  { timestamps: true } // Auto adds createdAt & updatedAt
);

// Create model
const Anime = mongoose.model("Anime", animeSchema);

// Export model
export default Anime;
