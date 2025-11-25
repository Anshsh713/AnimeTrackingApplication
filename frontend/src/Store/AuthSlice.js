import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // ✔ correct
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
