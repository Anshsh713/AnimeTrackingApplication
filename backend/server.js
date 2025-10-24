// Import required modules
import express from "express"; // Framework for building web servers and APIs
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (frontend ↔ backend)
import dotenv from "dotenv"; // Loads environment variables from a .env file
import mongoose from "mongoose"; // MongoDB ODM (Object Data Modeling) library
import animeRoutes from "./routes/animeRoutes.js"; // Import your anime routes

// Load environment variables from .env file (e.g., MONGO_URL, PORT)
dotenv.config();

// Create an Express application
const app = express();

// Enable CORS to allow frontend requests (like from React)
app.use(cors());

// Parse incoming JSON data in request bodies (req.body)
app.use(express.json());

/**
 * 🟢 Function to connect to MongoDB using Mongoose
 * Uses MONGO_URL from the .env file
 */
async function connectToDB() {
  try {
    // Try connecting to MongoDB using the URL from environment variables
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    // If connection fails, log the error and exit the process
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Call the function to establish the database connection
connectToDB();

/**
 * 🧩 Base route to check if the server is running
 * Access: http://localhost:5000/
 */
app.get("/", (req, res) => res.send("Server is running 🚀"));

/**
 * 🧠 Use the anime routes for all API requests starting with '/api/anime'
 * Example:
 *  - GET  /api/anime          → get all anime
 *  - POST /api/anime          → add new anime
 *  - PUT  /api/anime/:id      → update anime
 *  - DELETE /api/anime/:id    → delete anime
 */
app.use("/api/anime", animeRoutes);

// Define the port for the server to run on (from .env or default 5000)
const PORT = process.env.PORT || 5000;

// Start the Express server and listen for requests
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
