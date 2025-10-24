import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnimeList() {
  // State to store the list of anime fetched from the backend
  const [animeList, setAnimeList] = useState([]);

  // State to store the ID of the anime currently being edited
  const [editingAnime, setEditingAnime] = useState(null);

  // State to store the form data while editing an anime
  const [editData, setEditData] = useState({});

  // State to store the current filter (All, Watching, Completed, etc.)
  const [filter, setFilter] = useState("All");

  // Filter anime based on selected filter
  const filteredAnime = animeList.filter((anime) => {
    return filter === "All" || anime.status === filter;
  });

  // Fetch all anime from the backend
  const fetchAnime = async () => {
    const res = await axios.get("http://localhost:5000/api/anime");
    setAnimeList(res.data);
  };

  // Fetch anime when the component mounts
  useEffect(() => {
    fetchAnime();
  }, []);

  // Delete an anime by ID and refresh the list
  const deleteAnime = async (id) => {
    await axios.delete(`http://localhost:5000/api/anime/${id}`);
    fetchAnime();
  };

  // Prepare an anime for editing
  const handleEdit = (anime) => {
    setEditingAnime(anime._id);
    setEditData({
      title: anime.title,
      episodesWatched: anime.episodesWatched,
      totalEpisodes: anime.totalEpisodes,
      status: anime.status,
    });
  };

  // Save the edited anime and refresh the list
  const handleSave = async (id) => {
    await axios.put(`http://localhost:5000/api/anime/${id}`, editData);
    setEditingAnime(null); // Exit edit mode
    fetchAnime(); // Refresh the list
  };

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
            onClick={() => setFilter(status)} // Update the filter state
            className={`px-3 py-1 rounded ${
              filter === status
                ? "bg-blue-600 text-white" // Highlight selected filter
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* If no anime available */}
      {filteredAnime.length === 0 ? (
        <p className="text-gray-500">No anime added yet.</p>
      ) : (
        // Display anime cards
        filteredAnime.map((anime) => (
          <div
            key={anime._id}
            className="border rounded-lg p-4 shadow-sm flex justify-between items-center bg-white"
          >
            {editingAnime === anime._id ? (
              // Edit Mode
              <div className="space-y-2 w-full">
                {/* Title input */}
                <input
                  className="border rounded p-1 w-full"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  {/* Episodes watched input */}
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
                  {/* Total episodes input */}
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
                  {/* Status select dropdown */}
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
                {/* Save and Cancel buttons */}
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
              // Display Mode
              <>
                <div>
                  <h3 className="text-lg font-semibold">{anime.title}</h3>
                  <p className="text-gray-600">
                    {anime.episodesWatched}/{anime.totalEpisodes} —{" "}
                    <strong>{anime.status}</strong>
                  </p>
                </div>
                <div className="flex gap-2">
                  {/* Edit button */}
                  <button
                    onClick={() => handleEdit(anime)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  {/* Delete button */}
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
