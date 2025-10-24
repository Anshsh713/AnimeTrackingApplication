// Import React hooks and the two child components
import React, { useState } from "react";
import AddAnimeForm from "./Forms/AddAnimeForm"; // Form to add new anime
import AnimeList from "./Components/AnimeList"; // List to display existing anime

function App() {
  // 🧠 State to trigger a refresh in AnimeList after adding a new anime
  const [refresh, setRefresh] = useState(false);

  /**
   * 🔄 Function called by AddAnimeForm after a new anime is added
   * Toggles the refresh state to tell AnimeList to fetch latest data
   */
  const handleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      {/* Page title */}
      <h1>Anime Tracker</h1>

      {/* AddAnimeForm component */}
      {/* Pass handleAdded function so it can trigger a refresh */}
      <AddAnimeForm onAdded={handleAdded} />

      {/* AnimeList component */}
      {/* Pass refresh state so it refetches anime list when toggle changes */}
      <AnimeList refresh={refresh} />
    </div>
  );
}

export default App;
