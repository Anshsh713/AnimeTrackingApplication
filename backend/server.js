// Import modules
import dotenv from "dotenv";
// Load .env variables
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import animeRoutes from "./routes/animeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
}
connectToDB();

// Test route
app.get("/", (req, res) => res.send("Server is running 🚀"));

// Routes
app.use("/api/anime", animeRoutes); // Anime routes
app.use("/api/auth", authRoutes); // Auth routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
