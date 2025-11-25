import React, { useEffect, useState } from "react"; // React + hooks
import API from "../../api/api"; // API instance
import "./PollMessage.css"; // Styles

export default function PollMessage({ pollId, clubId, vote }) {
  const [poll, setPoll] = useState(null); // Store poll data

  const fetchPoll = async () => {
    const res = await API.get(`/polls/${clubId}/poll/${pollId}`); // Fetch poll
    setPoll(res.data); // Save poll
  };

  useEffect(() => {
    fetchPoll(); // Load poll when pollId changes
  }, [pollId]);

  if (!poll) return null; // If no poll, show nothing

  const totalVotes = poll.votes.length; // Total number of votes

  return (
    <div className="message poll-message">
      {" "}
      {/* Poll message block */}
      <h4>📊 {poll.question}</h4> {/* Poll question */}
      <div className="poll-options">
        {" "}
        {/* Options wrapper */}
        {poll.options.map((op, i) => {
          const voteCount = poll.votes.filter(
            (v) => v.optionIndex === i // Count votes for option
          ).length;

          const percentage =
            totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100); // % calc

          return (
            <button
              key={i} // Unique key
              className="poll-btn-option" // Option button
              onClick={async () => {
                await vote(poll._id, i); // Submit vote
                fetchPoll(); // Refresh poll
              }}
            >
              {op} — {voteCount} votes ({percentage}%)
            </button>
          );
        })}
      </div>
    </div>
  );
}
