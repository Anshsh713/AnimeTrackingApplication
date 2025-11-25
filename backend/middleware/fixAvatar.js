const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/YOUR_DB_NAME")
  .then(() => {
    console.log("Connected");

    const User = require("../models/User");

    return User.updateMany(
      {},
      { $set: { avatar: "https://i.imgur.com/sgcGa3S.png" } }
    );
  })
  .then(() => {
    console.log("Fixed all avatars");
    process.exit();
  })
  .catch((err) => console.error(err));
