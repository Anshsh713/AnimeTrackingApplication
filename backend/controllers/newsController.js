const axios = require("axios");

const REDDIT_URL = "https://www.reddit.com/r/anime/hot.json?limit=50";

// Popular anime names (expand anytime)
const POPULAR_KEYWORDS = [
  "Attack on Titan",
  "AOT",
  "One Piece",
  "Naruto",
  "Bleach",
  "Jujutsu Kaisen",
  "JJK",
  "Demon Slayer",
  "Kimetsu",
  "My Hero Academia",
  "MHA",
  "Chainsaw Man",
  "Death Note",
  "Tokyo Ghoul",
  "Dragon Ball",
  "DBZ",
  "Spy x Family",
  "Solo Leveling",
];

exports.getLatestNews = async (req, res) => {
  try {
    const { data } = await axios.get(REDDIT_URL, {
      headers: { "User-Agent": "AnimeTrackerApp/1.0" },
    });

    const posts = data?.data?.children || [];

    const formatted = posts.map((post) => {
      const p = post.data;

      let image = null;

      if (p.preview?.images?.length > 0) {
        image = p.preview.images[0].source.url.replace(/&amp;/g, "&");
      } else if (p.thumbnail?.startsWith("http")) {
        image = p.thumbnail;
      } else {
        image = "https://via.placeholder.com/350x200?text=Anime+News";
      }

      return {
        title: p.title,
        url: "https://reddit.com" + p.permalink,
        image,
        date: new Date(p.created_utc * 1000),
        excerpt: p.selftext || "",
      };
    });

    // PRIORITY SORTING: posts with popular anime names come first
    const sorted = formatted.sort((a, b) => {
      const aMatch = POPULAR_KEYWORDS.some((key) =>
        a.title.toLowerCase().includes(key.toLowerCase())
      );
      const bMatch = POPULAR_KEYWORDS.some((key) =>
        b.title.toLowerCase().includes(key.toLowerCase())
      );

      return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
    });

    res.json({
      success: true,
      news: sorted.slice(0, 20),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
