const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema(
  {
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    question: String,
    options: [String],
    votes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        optionIndex: Number,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Poll", PollSchema);
