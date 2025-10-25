// Import mongoose for MongoDB modeling
import mongoose from "mongoose";

// Define user schema (structure of user data)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true }, // Hashed password
});

// Export User model
export default mongoose.model("User", userSchema);
