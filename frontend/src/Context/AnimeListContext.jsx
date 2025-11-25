import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// create context
const AnimeListContext = createContext();

// export custom hook
export function useAnimeList() {
  return useContext(AnimeListContext);
}

export function AnimeListProvider({ children }) {
  // store anime list
  const [animeList, setAnimeList] = useState([]);
  // loading state
  const [loading, setLoading] = useState(false);

  // store token in state
  const [token, setToken] = useState(localStorage.getItem("token"));

  // base API url
  const API = "http://localhost:4000/api/animeList";

  // headers with token
  const authHeaders = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  // check for token changes in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("token"); // read token
      if (stored !== token) {
        setToken(stored); // update state
      }
    }, 300);

    return () => clearInterval(interval); // cleanup
  }, [token]);

  // fetch anime list from API
  const fetchAnime = async () => {
    if (!token) {
      setAnimeList([]); // clear list if not logged in
      return;
    }

    try {
      setLoading(true); // start loading
      const res = await axios.get(API, authHeaders); // GET request
      setAnimeList(res.data); // update list
    } catch (err) {
      console.error("Failed to fetch anime:", err); // log error
    } finally {
      setLoading(false); // stop loading
    }
  };

  // fetch whenever token changes
  useEffect(() => {
    fetchAnime();
  }, [token]);

  // add new anime
  const addAnime = async (animeData) => {
    try {
      const res = await axios.post(API, animeData, authHeaders); // POST request
      setAnimeList((prev) => [res.data, ...prev]); // add to list
    } catch (err) {
      console.error("Add anime failed:", err); // log error
    }
  };

  // update anime by id
  const updateAnime = async (id, updatedData) => {
    try {
      await axios.put(`${API}/${id}`, updatedData, authHeaders); // PUT request
      fetchAnime(); // refresh list
    } catch (err) {
      console.error("Update anime failed:", err); // log error
    }
  };

  // delete anime by id
  const deleteAnime = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, authHeaders); // DELETE request
      setAnimeList((prev) => prev.filter((a) => a._id !== id)); // remove from list
    } catch (err) {
      console.error("Delete anime failed:", err); // log error
    }
  };

  // provide values to components
  return (
    <AnimeListContext.Provider
      value={{
        animeList,
        loading,
        addAnime,
        updateAnime,
        deleteAnime,
        fetchAnime,
      }}
    >
      {children}
    </AnimeListContext.Provider>
  );
}
