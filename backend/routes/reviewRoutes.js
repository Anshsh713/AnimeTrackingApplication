const express = require("express"); // import express
const router = express.Router(); // create router instance
const Review = require("../models/Review"); // import Review model
const { protect } = require("../middleware/authMiddleware"); // auth middleware

// ===============================
// GET all reviews (global feed)
// ===============================
router.get("/", protect, async (req, res) => {
  const reviews = await Review.find() // fetch all reviews
    .populate("user", "name avatar") // populate user info
    .populate("comments.user", "name avatar") // populate commenters
    .sort({ createdAt: -1 }); // latest first

  res.json(reviews); // send response
});

// ===============================
// GET only the logged-in user's reviews
// ===============================
router.get("/mine", protect, async (req, res) => {
  const reviews = await Review.find({ user: req.user.id }) // filter by user
    .populate("user", "name avatar") // populate user
    .populate("comments.user", "name avatar") // populate commenters
    .sort({ createdAt: -1 }); // sort newest first

  res.json(reviews); // send result
});

// ===============================
// Create a new review
// ===============================
router.post("/", protect, async (req, res) => {
  const { text, rating } = req.body; // extract fields

  const review = await Review.create({
    text, // review text
    rating, // rating out of 10
    user: req.user.id, // logged-in user
  });

  res.json(review); // return created review
});

// ===============================
// Add comment to a review
// ===============================
router.post("/:reviewId/comment", protect, async (req, res) => {
  const review = await Review.findById(req.params.reviewId); // find review

  review.comments.push({
    user: req.user.id, // user who commented
    text: req.body.text, // comment text
  });

  await review.save(); // save updated review
  res.json(review); // respond with updated version
});

// ===============================
// LIKE a review
// ===============================
router.post("/:reviewId/like", protect, async (req, res) => {
  const review = await Review.findById(req.params.reviewId); // fetch review

  if (!review.likes.includes(req.user.id)) {
    review.likes.push(req.user.id); // add like
    review.dislikes = review.dislikes.filter(
      (id) => id.toString() !== req.user.id // remove dislike if exists
    );
  }

  await review.save(); // save
  res.json(review); // respond
});

// ===============================
// DISLIKE a review
// ===============================
router.post("/:reviewId/dislike", protect, async (req, res) => {
  const review = await Review.findById(req.params.reviewId); // find review

  if (!review.dislikes.includes(req.user.id)) {
    review.dislikes.push(req.user.id); // add dislike
    review.likes = review.likes.filter(
      (id) => id.toString() !== req.user.id // remove like if exists
    );
  }

  await review.save(); // save
  res.json(review); // return updated review
});

module.exports = router; // export router
