const ClubMessage = require("../models/ClubChatSchema");
const Club = require("../models/Club");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const { text, isSpoiler, rating } = req.body;

    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (!club.members.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You must join the club to chat" });
    }

    const msg = await ClubMessage.create({
      clubId: req.params.id,
      sender: req.user.id,
      text,
      isSpoiler,
      rating,
    });

    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MESSAGES OF CLUB (members only)
exports.getMessages = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (!club.members.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You must join the club to see messages" });
    }

    const messages = await ClubMessage.find({ clubId: req.params.id })
      .populate("sender", "name avatar")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
