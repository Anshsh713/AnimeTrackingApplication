import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // import Redux hook

// create user context
const UserContext = createContext();

// export custom hook
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  // get token from Redux store
  const reduxToken = useSelector((state) => state.auth.token);

  // local state for user data
  const [user, setUser] = useState(null);

  // axios headers with auth token
  const headers = {
    headers: { Authorization: `Bearer ${reduxToken}` },
  };

  // fetch current user data
  const fetchUser = async () => {
    if (!reduxToken) {
      setUser(null); // clear user if no token
      return;
    }

    try {
      const res = await axios.get("http://localhost:4000/api/auth/me", headers); // get user info
      setUser(res.data.user); // store user
    } catch (err) {
      console.log("Failed to fetch user:", err); // log error
      setUser(null); // clear on failure
    }
  };

  // refetch when token changes
  useEffect(() => {
    fetchUser();
  }, [reduxToken]); // run again if token updates

  // update user profile
  const updateProfile = async (data) => {
    const res = await axios.put(
      "http://localhost:4000/api/auth/update",
      data,
      headers
    ); // send update request
    setUser(res.data.user); // update local user state
  };

  // context provider
  return (
    <UserContext.Provider value={{ user, updateProfile, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
