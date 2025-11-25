const Poll = require("../models/Poll");
const Club = require("../models/Club");

// CREATE A POLL
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (!club.members.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You must join the club to create poll" });
    }

    const poll = await Poll.create({
      clubId: req.params.id,
      question,
      options,
    });

    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET POLLS OF CLUB
exports.getPolls = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (!club.members.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You must join the club to view polls" });
    }

    const polls = await Poll.find({ clubId: req.params.id });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VOTE A POLL
exports.votePoll = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    if (!club.members.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "You must join the club to vote on polls" });
    }

    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.pollId);

    // prevent double voting
    poll.votes = poll.votes.filter(
      (v) => v.user.toString() !== req.user.id.toString()
    );

    poll.votes.push({ user: req.user.id, optionIndex });

    await poll.save();

    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSinglePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
