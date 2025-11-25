require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const animeListRoutes = require("./routes/animeListRoutes");
const authRoutes = require("./routes/authRoutes");
const animeRoutes = require("./routes/animeRoutes");
const newsRoutes = require("./routes/newsRoutes");
const routes = require("./routes/index");
const reviewRoutes = require("./routes/reviewRoutes");

// NEW CLUB SYSTEM ROUTES
const clubRoutes = require("./routes/clubRoutes");
const chatRoutes = require("./routes/chatRoutes");
const pollRoutes = require("./routes/pollRoutes");

const { errorHandler, NotFoundHandler } = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// ======================================
//              API ROUTES
// ======================================
app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/animeList", animeListRoutes);
app.use("/api/reviews", reviewRoutes);

// ⭐ NEW CLUB ROUTES ⭐
app.use("/api/clubs", clubRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/polls", pollRoutes);

// ======================================
// FRONTEND ROUTES
// ======================================
app.use("/", routes);

// ======================================
// 404 HANDLER
// ======================================
app.use(NotFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
