import { createSlice } from "@reduxjs/toolkit";

// 🔥 pega do localStorage ao iniciar
const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  currentUser: getUserFromStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;

      // 💾 salva no localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.currentUser = null;

      // 🗑 remove do localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
