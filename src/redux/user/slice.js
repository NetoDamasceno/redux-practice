import { createSlice } from "@reduxjs/toolkit";

const USER_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7 dias

// 🔥 pegar do localStorage com expiração
const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("user");

    if (!stored) return null;

    const parsed = JSON.parse(stored);

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("user");
      return null;
    }

    return parsed.data || null;
  } catch {
    return null;
  }
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

      const payload = {
        data: action.payload,
        expiresAt: Date.now() + USER_EXPIRATION_TIME,
      };

      localStorage.setItem("user", JSON.stringify(payload));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
