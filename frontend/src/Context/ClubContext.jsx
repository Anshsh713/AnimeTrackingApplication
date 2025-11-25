import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api"; // axios instance
import { useAuth } from "./AuthContext"; // get current user

// create context
const ClubContext = createContext();

// export custom hook
export const useClubs = () => useContext(ClubContext);

export const ClubProvider = ({ children }) => {
  const { user } = useAuth(); // get logged-in user

  // state for all clubs
  const [clubs, setClubs] = useState([]);
  // loading state
  const [loading, setLoading] = useState(true);

  // fetch all clubs from backend
  const fetchClubs = async () => {
    setLoading(true); // start loading
    const res = await API.get("/clubs"); // GET request
    setClubs(res.data); // update state
    setLoading(false); // stop loading
  };

  // create new club
  const createClub = async (data) => {
    const res = await API.post("/clubs", data); // POST new club
    fetchClubs(); // refresh list
    return res.data; // return response
  };

  // join a club
  const joinClub = async (id) => {
    await API.post(`/clubs/${id}/join`); // join request
    fetchClubs(); // refresh list
  };

  // leave a club
  const leaveClub = async (id) => {
    await API.post(`/clubs/${id}/leave`); // leave request
    fetchClubs(); // refresh list
  };

  // delete a club
  const deleteClub = async (id) => {
    await API.delete(`/clubs/${id}`); // delete request
    fetchClubs(); // refresh list
  };

  // clubs created by current user
  const createdClubs = clubs.filter((c) => c.creator?._id === user?._id);

  // clubs the user is a member of
  const myClubs = clubs.filter((c) => c.members.includes(user?._id));

  // clubs the user hasn't joined
  const otherClubs = clubs.filter((c) => !c.members.includes(user?._id));

  // fetch clubs on mount
  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <ClubContext.Provider
      value={{
        clubs, // all clubs
        loading, // loading state
        createClub,
        joinClub,
        leaveClub,
        deleteClub,

        // filtered club lists
        createdClubs,
        myClubs,
        otherClubs,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
