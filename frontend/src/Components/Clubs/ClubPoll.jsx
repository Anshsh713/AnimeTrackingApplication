import React, { useState, useEffect } from "react"; // React + hooks
import API from "../../api/api"; // Axios instance
import { useParams } from "react-router-dom"; // Get URL params
import "./ClubPoll.css"; // Stylesheet

export default function ClubPolls() {
  const { id } = useParams(); // Club ID from URL

  const [polls, setPolls] = useState([]); // All polls
  const [question, setQuestion] = useState(""); // New poll question
  const [options, setOptions] = useState(["", "", ""]); // 3 default options

  // Fetch all polls for this club
  const fetchPolls = async () => {
    const res = await API.get(`/polls/${id}/polls`); // GET polls
    setPolls(res.data); // Store polls
  };

  // Create a new poll
  const createPoll = async () => {
    await API.post(`/polls/${id}/poll`, { question, options }); // POST poll
    setQuestion(""); // Reset input
    setOptions(["", "", ""]); // Reset options
    fetchPolls(); // Refresh list
  };

  // Send a vote
  const vote = async (pollId, index) => {
    await API.post(`/polls/${id}/poll/${pollId}/vote`, {
      // POST vote
      optionIndex: index,
    });
    fetchPolls(); // Refresh
  };

  // Load polls on page load
  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className="club-polls">
      {" "}
      {/* Main container */}
      <h2>Polls</h2>
      {/* Create poll UI */}
      <div className="create-poll">
        <input
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)} // Update question
        />
        {options.map((op, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={op}
            onChange={(e) => {
              let copy = [...options]; // Copy array
              copy[i] = e.target.value; // Edit option
              setOptions(copy); // Update list
            }}
          />
        ))}
        <button onClick={createPoll}>Create Poll</button> {/* Create button */}
      </div>
      {/* Display existing polls */}
      {polls.map((poll) => (
        <div className="poll-card" key={poll._id}>
          {" "}
          {/* Poll card */}
          <h3>{poll.question}</h3>
          {poll.options.map((op, i) => (
            <button key={i} onClick={() => vote(poll._id, i)}>
              {op}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
