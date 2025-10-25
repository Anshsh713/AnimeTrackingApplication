// Import modules
import express from "express";
import { signup, login } from "../controllers/authController.js";
// Create router
const router = express.Router();

// Routes
router.post("/signup", signup); // Signup route
router.post("/login", login); // Login route

// Export router
export default router;
