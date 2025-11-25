const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// custom response functions
const { successResponse, errorResponse } = require("../ultils/responseHandler");

// ===============================
// SIGNUP CONTROLLER
// ===============================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const exist = await User.findOne({ email });
    if (exist)
      return errorResponse(res, new Error("Email already exists"), 400);

    const username = await User.findOne({ name });
    if (username)
      return errorResponse(res, new Error("Name already taken"), 400);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return successResponse(
      res,
      { message: "User created successfully", user: newUser },
      201
    );
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

// ===============================
// LOGIN CONTROLLER
// ===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, new Error("Invalid Email"), 400);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return errorResponse(res, new Error("Incorrect Password"), 400);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return successResponse(res, {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return successResponse(res, { user });
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  try {
    const { avatar, banner, bio, favoriteAnime, name } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { avatar, banner, bio, favoriteAnime, name },
      { new: true }
    ).select("-password");

    return successResponse(res, { user: updated });
  } catch (err) {
    return errorResponse(res, err, 500);
  }
};
