import React, { useState } from "react";
import AnimeList from "./Components/AnimeList.jsx";
import AddAnimeForm from "./Forms/AddAnimeForm.jsx";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        🎬 Anime Tracker
      </h1>

      {!isLoggedIn ? (
        <>
          {showSignup ? (
            <Signup onSignup={() => setShowSignup(false)} />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}
          <p className="text-center mt-2">
            {showSignup ? (
              <button
                onClick={() => setShowSignup(false)}
                className="text-blue-500"
              >
                Already have an account? Login
              </button>
            ) : (
              <button
                onClick={() => setShowSignup(true)}
                className="text-blue-500"
              >
                New user? Signup here
              </button>
            )}
          </p>
        </>
      ) : (
        <>
          <AddAnimeForm onAdded={() => window.location.reload()} />
          <AnimeList />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
            className="bg-red-600 text-white px-3 py-1 mt-3 rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;
