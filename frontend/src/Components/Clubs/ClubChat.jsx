import React, { useState, useEffect, useRef } from "react"; // React + hooks
import API from "../../api/api"; // Axios instance
import { useParams, useNavigate } from "react-router-dom"; // Get club ID
import { useAuth } from "../../Context/AuthContext"; // User context
import "./ClubChat.css"; // Styles
import PollMessage from "./PollMessage"; // Poll component

export default function ClubChat() {
  const { id } = useParams(); // Club ID from URL
  const navigate = useNavigate();
  const { user } = useAuth(); // Logged-in user

  const [club, setClub] = useState(null); // Club details
  const [messages, setMessages] = useState([]); // Chat messages
  const [text, setText] = useState(""); // Message text
  const [isSpoiler, setIsSpoiler] = useState(false); // Spoiler toggle
  const [rating, setRating] = useState(""); // Rating input

  // Poll creation fields
  const [showPollBox, setShowPollBox] = useState(false);
  const [question, setQuestion] = useState(""); // Poll question
  const [options, setOptions] = useState(["", "", ""]); // Poll choices

  const [spoilerReveal, setSpoilerReveal] = useState({}); // Reveal state
  const messagesEndRef = useRef(null);

  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/chat/${id}/messages`);
      setMessages(res.data.reverse()); // Show latest at bottom
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  // Fetch Club Details (for Header)
  const fetchClubDetails = async () => {
    try {
      const res = await API.get(`/clubs/${id}`);
      setClub(res.data);
    } catch (err) {
      console.error("Failed to fetch club details", err);
    }
  };

  // Send normal message or rating message
  const sendMessage = async () => {
    if (!text.trim() && !rating) return; // Block empty message

    try {
      await API.post(`/chat/${id}/message`, {
        text,
        rating: rating ? Number(rating) : null,
        isSpoiler,
      });

      setText(""); // Reset fields
      setRating("");
      setIsSpoiler(false);
      fetchMessages(); // Refresh chat
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Create poll
  const createPoll = async () => {
    try {
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
    } catch (err) {
      console.error("Failed to create poll", err);
    }
  };

  // Vote in poll
  const vote = async (pollId, optionIndex) => {
    try {
      await API.post(`/polls/${id}/poll/${pollId}/vote`, { optionIndex });
      fetchMessages();
    } catch (err) {
      console.error("Failed to vote", err);
    }
  };

  useEffect(() => {
    fetchClubDetails();
    fetchMessages(); // Run on page load
    // Optional: Set up an interval or socket listener here for real-time
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSpoiler = (msgId) =>
    setSpoilerReveal((prev) => ({ ...prev, [msgId]: !prev[msgId] }));

  return (
    <div className="club-chat-container">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="club-info">
          {club ? (
            <>
              {/* Placeholder Avatar */}
              <div className="club-avatar">
                {club.name.charAt(0).toUpperCase()}
              </div>
              <div className="club-text">
                <h3>{club.name}</h3>
                <span className="member-count">
                  {club.members?.length || 0} members
                </span>
              </div>
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => navigate(`/clubs/${id}`)}>
            <i className="fa-solid fa-info-circle"></i>
          </button>
        </div>
      </div>

      {/* Messages section */}
      <div className="messages-area">
        {messages.map((msg) => {
          const mine = msg.sender?._id === user?._id; // My message?
          const cls = "message-row " + (mine ? "mine" : "others");

          // Poll message renderer
          if (msg.text.startsWith("poll:")) {
            const pollId = msg.text.split(":")[1];
            return (
              <div key={msg._id} className={cls}>
                <div className="message-bubble poll-bubble">
                  <PollMessage
                    pollId={pollId}
                    clubId={id}
                    vote={vote}
                  />
                  <span className="message-time">12:00 PM</span>
                </div>
              </div>
            );
          }

          // Normal messages
          return (
            <div key={msg._id} className={cls}>
              <div className="message-bubble">
                {!mine && <div className="sender-name">{msg.sender?.name}</div>}

                {msg.isSpoiler ? (
                  <span
                    className={
                      "spoiler " +
                      (spoilerReveal[msg._id] ? "revealed" : "blur")
                    }
                    onClick={() => toggleSpoiler(msg._id)}
                  >
                    {msg.text}
                  </span>
                ) : (
                  <span className="message-text">{msg.text}</span>
                )}

                {msg.rating && (
                  <div className="rating-tag">⭐ {msg.rating}/10</div>
                )}

                {/* Timestamp placeholder - if real date exists in msg, use it */}
                <span className="message-time">
                  {/* {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} */}
                  Just now
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Poll creation box */}
      {
        showPollBox && (
          <div className="poll-overlay">
            <div className="poll-popup">
              <h3>Create a Poll</h3>
              <input
                placeholder="Ask a question..."
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

              <div className="poll-actions">
                <button className="cancel-btn" onClick={() => setShowPollBox(false)}>Cancel</button>
                <button className="create-btn" onClick={createPoll}>Create</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Input area */}
      <div className="chat-input-area">
        <button
          className="action-btn"
          onClick={() => setShowPollBox(!showPollBox)}
          title="Create Poll"
        >
          <i className="fa-solid fa-square-poll-vertical"></i>
        </button>

        <div className="input-wrapper">
          <textarea
            placeholder="Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
        </div>

        {/* Extra Actions Trigger (Rating/Spoiler) */}
        <div className="extra-actions">
          <label className={`action-btn ${isSpoiler ? 'active' : ''}`} title="Spoiler">
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={() => setIsSpoiler(!isSpoiler)}
              style={{ display: 'none' }}
            />
            <i className="fa-solid fa-eye-slash"></i>
          </label>

          <div className="rating-input-wrapper">
            <input
              type="number"
              min="1"
              max="10"
              placeholder="⭐"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="rating-input-mini"
            />
          </div>
        </div>

        <button className="send-btn-round" onClick={sendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div >
  );
}
