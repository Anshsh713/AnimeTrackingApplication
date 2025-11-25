const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    maxMembers: { type: Number, default: 99999 }, // UNLIMITED by default
    coverImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", ClubSchema);
