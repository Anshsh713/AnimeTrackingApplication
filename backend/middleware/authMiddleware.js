// Import JWT
import jwt from "jsonwebtoken";

// Secret key
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Middleware to protect routes
export const protect = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id }; // Attach user ID to request
    next(); // Continue to next middleware
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
