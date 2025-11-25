const { fetchAniList } = require("../ultils/anilist");

// ================================
// 1. UPCOMING Anime
// ================================
exports.getUpcomingAnime = async (req, res) => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, status: NOT_YET_RELEASED, sort: START_DATE) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          season
          seasonYear
        }
      }
    }
  `;

  try {
    const data = await fetchAniList(query);
    res.json({ success: true, results: data.Page.media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// 2. MOST POPULAR Anime
// ================================
exports.getPopularAnime = async (req, res) => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          popularity
        }
      }
    }
  `;

  try {
    const data = await fetchAniList(query);
    res.json({ success: true, results: data.Page.media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// 3. TOP RATED Anime
// ================================
exports.getTopRatedAnime = async (req, res) => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          averageScore
        }
      }
    }
  `;

  try {
    const data = await fetchAniList(query);
    res.json({ success: true, results: data.Page.media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// 4. RUNNING (CURRENTLY AIRING) Anime
// ================================
exports.getRunningAnime = async (req, res) => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, status: RELEASING, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          episodes
          season
          seasonYear
        }
      }
    }
  `;

  try {
    const data = await fetchAniList(query);
    res.json({ success: true, results: data.Page.media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// 5. Suggested Anime
// ================================
exports.getRandomAnime = async (req, res) => {
  const query = `
    query {
      Page(page: ${Math.floor(Math.random() * 100) + 1}, perPage: 20) {
        media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
          averageScore
          episodes
        }
      }
    }
  `;

  try {
    const data = await fetchAniList(query);
    res.json({ success: true, results: data.Page.media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// SEARCH Anime by name
// ================================
// ================================
// SEARCH Anime by name
// ================================
exports.searchAnime = async (req, res) => {
  const queryText = req.query.q;

  if (!queryText) {
    return res.json({ success: true, results: [] });
  }

  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 10) {
        media(search: $search, type: ANIME , isAdult: false) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          episodes
        }
      }
    }
  `;

  try {
    // ⭐ FIXED: Correct variable passing
    const data = await fetchAniList(query, { search: queryText });

    res.json({ success: true, results: data.Page.media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
