import axios from "axios"; // Import axios for API requests

// Create axios instance with base backend URL
const API = axios.create({
  baseURL: "http://localhost:4000/api", // Default API base path
});

// Add authorization token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Get stored JWT token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return req; // Return modified request
});

export default API; // Export for use in app
