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
  const [expandedReviews, setExpandedReviews] = useState({}); // Track expanded comments per review

  // Toggle comment thread
  const toggleComments = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));

    // Initialize comment input if not present
    if (commentText[reviewId] === undefined) {
      setCommentText(prev => ({ ...prev, [reviewId]: "" }));
    }
  };

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
    <div className="TR-container">
      {/* Feed Header */}
      <div className="TR-feed-header">
        <h2>{mine ? "Your Feed" : "For You"}</h2>
      </div>

      {/* Compose Review (Tweet-style) */}
      {!mine && (
        <div className="TR-compose">
          <div className="TR-avatar-side">
            <div className="TR-avatar-circle" style={{ background: "linear-gradient(135deg, #1d9bf0, #00ba7c)" }}>
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
          <div className="TR-compose-content">
            <textarea
              placeholder="What's your take on this anime?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="TR-compose-footer">
              <div className="TR-rating-input">
                <span>Rating:</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <button className="TR-post-btn" onClick={submitReview}>
                Post Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Feed */}
      <div className="TR-feed">
        {reviews.map((rev) => (
          <div className="TR-tweet" key={rev._id} onClick={() => toggleComments(rev._id)}>
            <div className="TR-avatar-side">
              <div
                className="TR-avatar-circle"
                style={{ background: `hsl(${(rev.user.name.length * 40) % 360}, 70%, 60%)` }}
              >
                {rev.user?.name?.charAt(0) || "U"}
              </div>
            </div>

            <div className="TR-tweet-content">
              {/* User Identity */}
              <div className="TR-user-info">
                <span className="TR-name">{rev.user.name}</span>
                <span className="TR-handle">@{rev.user.name.toLowerCase().replace(/\s/g, "")} · Review</span>
                <span className="TR-rating-badge">{rev.rating}/10</span>
              </div>

              {/* Review Text */}
              <div className="TR-text">
                {rev.text}
              </div>

              {/* Action Buttons (Twitter Style) */}
              <div className="TR-actions">
                <div
                  className={`TR-action reply ${expandedReviews[rev._id] ? "active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggleComments(rev._id); }}
                >
                  <i className={expandedReviews[rev._id] ? "fa-solid fa-comment" : "fa-regular fa-comment"}></i>
                  <span>{rev.comments?.length || 0}</span>
                </div>

                <div className="TR-action heart" onClick={(e) => { e.stopPropagation(); likeReview(rev._id); }}>
                  <i className={rev.likes?.includes(user?._id) ? "fa-solid fa-heart active" : "fa-regular fa-heart"}></i>
                  <span>{rev.likes?.length || 0}</span>
                </div>

                <div className="TR-action share" onClick={(e) => e.stopPropagation()}>
                  <i className="fa-regular fa-share-from-square"></i>
                </div>
              </div>

              {/* Comments Section (Threaded - Expanded on Click) */}
              {expandedReviews[rev._id] && (
                <div className="TR-comments-thread" onClick={(e) => e.stopPropagation()}>
                  {rev.comments.map((c, i) => (
                    <div key={i} className="TR-comment">
                      <div
                        className="TR-comment-avatar"
                        style={{ background: `hsl(${(c.user?.name?.length * 40 || 0) % 360}, 60%, 50%)` }}
                      >
                        {c.user?.name?.charAt(0) || "?"}
                      </div>
                      <div className="TR-comment-main">
                        <div className="TR-comment-info">
                          <span className="TR-name-small">{c.user?.name}</span>
                          <span className="TR-handle-small">@{c.user?.name?.toLowerCase().replace(/\s/g, "")}</span>
                        </div>
                        <div className="TR-comment-text">{c.text}</div>
                      </div>
                    </div>
                  ))}

                  {/* Add Comment Input */}
                  {user && (
                    <div className="TR-comment-compose">
                      <input
                        placeholder="Post your reply"
                        value={commentText[rev._id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [rev._id]: e.target.value,
                          }))
                        }
                        onKeyPress={(e) => e.key === 'Enter' && addComment(rev._id)}
                        autoFocus
                      />
                      <button onClick={() => addComment(rev._id)}>Reply</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
