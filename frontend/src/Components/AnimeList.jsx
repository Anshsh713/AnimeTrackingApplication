import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnimeList() {
  // States
  const [animeList, setAnimeList] = useState([]);
  const [editingAnime, setEditingAnime] = useState(null);
  const [editData, setEditData] = useState({});
  const [filter, setFilter] = useState("All");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Axios config with auth header
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch anime from backend
  const fetchAnime = async () => {
    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

      // Make request with token
      const res = await axios.get(
        "http://localhost:5000/api/anime",
        axiosConfig
      );
      setAnimeList(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch anime:",
        err.response?.data || err.message
      );
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchAnime();
  }, []);

  // Delete anime
  const deleteAnime = async (id) => {
    await axios.delete(`http://localhost:5000/api/anime/${id}`, axiosConfig);
    fetchAnime();
  };

  // Edit setup
  const handleEdit = (anime) => {
    setEditingAnime(anime._id);
    setEditData({
      title: anime.title,
      episodesWatched: anime.episodesWatched,
      totalEpisodes: anime.totalEpisodes,
      status: anime.status,
    });
  };

  // Save edited anime
  const handleSave = async (id) => {
    await axios.put(
      `http://localhost:5000/api/anime/${id}`,
      editData,
      axiosConfig
    );
    setEditingAnime(null);
    fetchAnime();
  };

  // Filter list
  const filteredAnime = animeList.filter(
    (anime) => filter === "All" || anime.status === filter
  );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-700">📺 Your Anime List</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          "All",
          "Watching",
          "Completed",
          "On Hold",
          "Dropped",
          "Plan to Watch",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Anime Cards */}
      {filteredAnime.length === 0 ? (
        <p className="text-gray-500">No anime added yet.</p>
      ) : (
        filteredAnime.map((anime) => (
          <div
            key={anime._id}
            className="border rounded-lg p-4 shadow-sm flex justify-between items-center bg-white"
          >
            {editingAnime === anime._id ? (
              // Edit Mode
              <div className="space-y-2 w-full">
                <input
                  className="border rounded p-1 w-full"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="border rounded p-1 w-1/3"
                    value={editData.episodesWatched}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        episodesWatched: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    className="border rounded p-1 w-1/3"
                    value={editData.totalEpisodes}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        totalEpisodes: e.target.value,
                      })
                    }
                  />
                  <select
                    className="border rounded p-1 w-1/3"
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    <option>Watching</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                    <option>Dropped</option>
                    <option>Plan to Watch</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSave(anime._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingAnime(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div>
                  <h3 className="text-lg font-semibold">{anime.title}</h3>
                  <p className="text-gray-600">
                    {anime.episodesWatched}/{anime.totalEpisodes} —{" "}
                    <strong>{anime.status}</strong>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(anime)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAnime(anime._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
