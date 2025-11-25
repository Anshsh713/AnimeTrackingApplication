import React from "react";
import GlobalReviews from "./AnimeReviews";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  return (
    // Page wrapper
    <div className="reviews-page-container">
      {/* Page title */}
      <h1 className="reviews-title">Reviews</h1>

      {/* Global reviews feed */}
      <GlobalReviews mine={false} />
    </div>
  );
}
