import React, { useState, useEffect } from "react"; // React + hooks
import API from "../../api/api"; // Axios instance
import { useParams } from "react-router-dom"; // Get club ID
import { useAuth } from "../../Context/AuthContext"; // User context
import "./ClubChat.css"; // Styles
import PollMessage from "./PollMessage"; // Poll component

export default function ClubChat() {
  const { id } = useParams(); // Club ID from URL
  const { user } = useAuth(); // Logged-in user

  const [messages, setMessages] = useState([]); // Chat messages
  const [text, setText] = useState(""); // Message text
  const [isSpoiler, setIsSpoiler] = useState(false); // Spoiler toggle
  const [rating, setRating] = useState(""); // Rating input

  // Poll creation fields
  const [showPollBox, setShowPollBox] = useState(false);
  const [question, setQuestion] = useState(""); // Poll question
  const [options, setOptions] = useState(["", "", ""]); // Poll choices

  const [spoilerReveal, setSpoilerReveal] = useState({}); // Reveal state

  // Fetch chat messages
  const fetchMessages = async () => {
    const res = await API.get(`/chat/${id}/messages`);
    setMessages(res.data.reverse()); // Show latest at bottom
  };

  // Send normal message or rating message
  const sendMessage = async () => {
    if (!text && !rating) return; // Block empty message

    await API.post(`/chat/${id}/message`, {
      text,
      rating: rating ? Number(rating) : null,
      isSpoiler,
    });

    setText(""); // Reset fields
    setRating("");
    setIsSpoiler(false);
    fetchMessages(); // Refresh chat
  };

  // Create poll
  const createPoll = async () => {
    const poll = await API.post(`/polls/${id}/poll`, { question, options });

    // Insert poll reference into chat
    await API.post(`/chat/${id}/message`, {
      text: `poll:${poll.data._id}`,
      isSpoiler: false,
    });

    setQuestion(""); // Reset
    setOptions(["", "", ""]);
    setShowPollBox(false);
    fetchMessages();
  };

  // Vote in poll
  const vote = async (pollId, optionIndex) => {
    await API.post(`/polls/${id}/poll/${pollId}/vote`, { optionIndex });
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages(); // Run on page load
  }, []);

  const toggleSpoiler = (msgId) =>
    setSpoilerReveal((prev) => ({ ...prev, [msgId]: !prev[msgId] }));

  return (
    <div className="club-chat">
      <h2>Club Chat</h2>

      {/* Messages section */}
      <div className="messages">
        {messages.map((msg) => {
          const mine = msg.sender?._id === user?._id; // My message?
          const cls = "message " + (mine ? "mine" : ""); // Bubble class

          // Poll message renderer
          if (msg.text.startsWith("poll:")) {
            const pollId = msg.text.split(":")[1];
            return (
              <PollMessage
                key={msg._id}
                pollId={pollId}
                clubId={id}
                vote={vote}
              />
            );
          }

          // Normal messages
          return (
            <div key={msg._id} className={cls}>
              <b>{msg.sender?.name}: </b>

              {msg.isSpoiler ? (
                <span
                  className={
                    "spoiler " + (spoilerReveal[msg._id] ? "revealed" : "blur")
                  }
                  onClick={() => toggleSpoiler(msg._id)}
                >
                  {msg.text}
                </span>
              ) : (
                <span>{msg.text}</span>
              )}

              {msg.rating && (
                <span className="rating-tag">⭐ {msg.rating}/10</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Poll creation box */}
      {showPollBox && (
        <div className="poll-popup">
          <input
            placeholder="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((op, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={op}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}

          <button className="send-btn" onClick={createPoll}>
            Create Poll
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="chat-input">
        <textarea
          placeholder="Write message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="input-row">
          <label className="spoiler-check">
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={() => setIsSpoiler(!isSpoiler)}
            />
            Spoiler
          </label>

          <input
            type="number"
            min="1"
            max="10"
            placeholder="⭐ Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button
            className="poll-btn"
            onClick={() => setShowPollBox(!showPollBox)}
          >
            📊 Poll
          </button>

          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
