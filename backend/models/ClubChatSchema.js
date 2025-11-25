const mongoose = require("mongoose");

const ClubMessageSchema = new mongoose.Schema(
  {
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    isSpoiler: { type: Boolean, default: false },
    rating: { type: Number, min: 1, max: 10 }, // OPTIONAL rating
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClubMessage", ClubMessageSchema);
