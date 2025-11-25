import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api"; // axios instance
import { useDispatch, useSelector } from "react-redux"; // redux hooks
import {
  login as loginAction,
  logout as logoutAction,
} from "../Store/AuthSlice"; // redux actions

// create context
const AuthContext = createContext();

// export custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch(); // redux dispatcher
  const reduxToken = useSelector((state) => state.auth.token); // get token from redux

  const [user, setUser] = useState(null); // local user state
  const isAuthenticated = Boolean(reduxToken); // logged in or not

  // user login
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password }); // send login request
      const { token, user: userData } = res.data.data; // extract token and user
      dispatch(loginAction({ userData, token })); // store in redux
      setUser(userData); // update state
      return { success: true }; // return success
    } catch (err) {
      return { success: false, message: err.response?.data?.message }; // return error
    }
  };

  // user signup
  const signup = async (name, email, password) => {
    try {
      const res = await API.post("/auth/signup", { name, email, password }); // send signup request
      return { success: true, data: res.data }; // return success
    } catch (err) {
      return { success: false, message: err.response?.data?.message }; // return error
    }
  };

  // user logout
  const logout = () => {
    dispatch(logoutAction()); // clear redux
    setUser(null); // clear local state
  };

  // fetch logged-in user info
  const fetchUser = async () => {
    if (!reduxToken) {
      setUser(null); // clear if no token
      return;
    }

    try {
      const res = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${reduxToken}` }, // send token
      });

      setUser(res.data.data.user); // update user state
    } catch (err) {
      console.log("Failed to fetch user:", err); // log error
      setUser(null); // clear on failure
    }
  };

  // refetch user when token changes
  useEffect(() => {
    fetchUser();
  }, [reduxToken]); // runs on token change

  // update profile info
  const updateProfile = async (data) => {
    try {
      const res = await API.put("/auth/update", data, {
        headers: { Authorization: `Bearer ${reduxToken}` }, // send token
      });
      setUser(res.data.data.user); // update updated user
      return { success: true }; // return success
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message, // return error
      };
    }
  };

  // context provider
  return (
    <AuthContext.Provider
      value={{
        user, // current user
        token: reduxToken, // token from redux
        login,
        signup,
        logout,
        updateProfile,
        fetchUser,
        isAuthenticated, // true/false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
