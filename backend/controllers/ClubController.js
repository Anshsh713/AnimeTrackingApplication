const Club = require("../models/Club");
const ClubMessage = require("../models/ClubChatSchema");
const Poll = require("../models/Poll");

// CREATE CLUB
exports.createClub = async (req, res) => {
  try {
    let { name, description, maxMembers, coverImage } = req.body;

    if (!maxMembers) maxMembers = 99999;

    const club = await Club.create({
      name,
      description,
      maxMembers,
      creator: req.user.id,
      members: [req.user.id],
      coverImage,
    });

    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL CLUBS
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate("creator", "name avatar");
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE CLUB DETAILS
exports.getClubDetails = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate("creator", "name avatar")
      .populate("members", "name avatar");

    res.json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// JOIN CLUB
exports.joinClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ message: "Club not found" });

    if (club.members.includes(req.user.id))
      return res.status(400).json({ message: "Already a member" });

    if (club.maxMembers !== 99999 && club.members.length >= club.maxMembers)
      return res.status(400).json({ message: "Club is full" });

    club.members.push(req.user.id);
    await club.save();

    res.json({ message: "Joined successfully", club });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LEAVE CLUB
exports.leaveClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ message: "Club not found" });

    // creator cannot leave (must delete)
    if (club.creator.toString() === req.user.id.toString()) {
      return res
        .status(400)
        .json({ message: "Creator cannot leave their own club" });
    }

    club.members = club.members.filter(
      (m) => m.toString() !== req.user.id.toString()
    );

    await club.save();

    res.json({ message: "Left club" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CLUB (creator only)
exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (club.creator.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Only creator can delete club" });
    }

    await ClubMessage.deleteMany({ clubId: club._id });
    await Poll.deleteMany({ clubId: club._id });
    await Club.findByIdAndDelete(club._id);

    res.json({ message: "Club deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
