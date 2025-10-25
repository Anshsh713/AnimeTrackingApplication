// Import required modules
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For token generation
import User from "../models/User.js"; // User model

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// 🟢 Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get data from request

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔵 Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Get login data

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token (valid for 3 days)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3d" });

    // Send response with token and user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
