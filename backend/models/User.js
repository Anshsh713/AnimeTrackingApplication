const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  avatar: {
    type: String,
    default: "https://i.imgur.com/sgcGa3S.png",
  },

  banner: {
    type: String,
    default: "https://wallpapercave.com/wp/wp9167142.jpg",
  },

  bio: { type: String, default: "Anime fan • Coder • Dreaming big" },

  favoriteAnime: [{ type: String }],
});

module.exports = mongoose.model("User", UserSchema);
