const express = require("express"); // import express
const { signup, login, getMe } = require("../controllers/authController"); // import auth handlers
const { protect } = require("../middleware/authMiddleware"); // import auth middleware
const router = express.Router(); // create router
const { updateProfile, getProfile } = require("../controllers/authController"); // import profile handlers

router.post("/signup", signup); // register user
router.post("/login", login); // login user
router.get("/me", protect, getMe); // get logged-in user info
router.get("/profile", protect, getProfile); // get user profile
router.put("/update", protect, updateProfile); // update user profile

module.exports = router; // export router
