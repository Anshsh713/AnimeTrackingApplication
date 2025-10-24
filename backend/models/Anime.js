// Import mongoose to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Define the schema (structure) for the Anime collection
const animeSchema = new mongoose.Schema(
  {
    // Title of the anime (required field)
    title: {
      type: String,
      required: true,
    },

    // Number of episodes the user has watched
    episodesWatched: {
      type: Number,
      default: 0, // starts from 0
    },

    // Total number of episodes in the anime
    totalEpisodes: {
      type: Number,
      default: 0, // can be updated later if unknown initially
    },

    // Current watching status of the anime
    status: {
      type: String,
      enum: ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"], // allowed values
      default: "Plan to Watch", // default choice if not specified
    },

    // Tags or genres associated with the anime (like "Action", "Comedy")
    tags: {
      type: [String],
      default: [], // empty array by default
    },

    // ID of the user who added this anime (for user-specific tracking)
    userId: {
      type: String, // references the user's ID (could be from authentication)
    },
  },

  // Automatically adds 'createdAt' and 'updatedAt' timestamps
  { timestamps: true }
);

// Create a Mongoose model named "Anime" using the schema
const Anime = mongoose.model("Anime", animeSchema);

// Export the model so it can be used in other files (like routes or controllers)
export default Anime;
