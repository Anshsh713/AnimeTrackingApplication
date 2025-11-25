import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useAuth } from "../../Context/AuthContext";
import "./AnimeReviews.css";

// GlobalReviews: Displays all reviews or user's own reviews
export default function GlobalReviews({ mine = false }) {
  const { user } = useAuth(); // Logged-in user
  const [reviews, setReviews] = useState([]); // All reviews from backend
  const [text, setText] = useState(""); // New review input
  const [rating, setRating] = useState(10); // Rating input
  const [commentText, setCommentText] = useState({}); // Comment input per review

  // Fetch all reviews
  const fetchReviews = async () => {
    const url = mine ? "/reviews/mine" : "/reviews";
    const res = await API.get(url);
    setReviews(res.data);
  };

  // Submit a new review
  const submitReview = async () => {
    if (!text.trim()) return;

    await API.post("/reviews", { text, rating });
    setText(""); // clear input
    fetchReviews();
  };

  // Add comment to a review
  const addComment = async (reviewId) => {
    if (!commentText[reviewId]) return;

    await API.post(`/reviews/${reviewId}/comment`, {
      text: commentText[reviewId],
    });

    // Clear only this comment field
    setCommentText((prev) => ({
      ...prev,
      [reviewId]: "",
    }));

    fetchReviews();
  };

  // Like review
  const likeReview = async (id) => {
    await API.post(`/reviews/${id}/like`);
    fetchReviews();
  };

  // Dislike review
  const dislikeReview = async (id) => {
    await API.post(`/reviews/${id}/dislike`);
    fetchReviews();
  };

  // Load reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="review-container">
      {/* Dynamic title */}
      <h2>{mine ? "Your Reviews" : "All Reviews"}</h2>

      {/* Write a new review */}
      <div className="review-create">
        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={submitReview}>Post Review</button>
      </div>

      {/* Review cards */}
      <div className="review-list">
        {reviews.map((rev) => (
          <div className="review-card" key={rev._id}>
            {/* Review header */}
            <h4>
              {rev.user.name} — Rating: {rev.rating}/10
            </h4>

            {/* Review text */}
            <p>{rev.text}</p>

            {/* Like / Dislike actions */}
            <div className="review-actions">
              <button onClick={() => likeReview(rev._id)}>
                Like {rev.likes?.length}
              </button>

              <button onClick={() => dislikeReview(rev._id)}>
                Dislike {rev.dislikes?.length}
              </button>
            </div>

            {/* Comments section */}
            <div className="comment-box">
              <h5>Comments</h5>

              {rev.comments.map((c, i) => (
                <p key={i} className="comment-item">
                  <strong>{c.user?.name}: </strong> {c.text}
                </p>
              ))}

              {/* Input only shown if logged in */}
              {user && (
                <div className="comment-input">
                  <input
                    placeholder="Add a comment..."
                    value={commentText[rev._id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [rev._id]: e.target.value,
                      }))
                    }
                  />

                  <button onClick={() => addComment(rev._id)}>Comment</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
