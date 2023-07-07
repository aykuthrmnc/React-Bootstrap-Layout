import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "~/types";
import { decryptValue, encryptValue } from "~/utils/functions";

const initialState: Auth = {
  user: null,
  theme: "dark",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state) => {
      const value = localStorage.getItem(import.meta.env.VITE_AUTH_LOCALSTORAGE_KEY);

      if (value) {
        const userValue = decryptValue(value);
        state.user = userValue ? JSON.parse(userValue) : null;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        const value = encryptValue(action.payload);

        localStorage.setItem(import.meta.env.VITE_AUTH_LOCALSTORAGE_KEY, value);
      } else {
        localStorage.removeItem(import.meta.env.VITE_AUTH_LOCALSTORAGE_KEY);
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem(import.meta.env.VITE_AUTH_LOCALSTORAGE_KEY);
    },
    getTheme: (state) => {
      if (
        localStorage[import.meta.env.VITE_THEME_KEY] === "dark" ||
        (!(import.meta.env.VITE_THEME_KEY in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        state.theme = "dark";
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        state.theme = "light";
        document.documentElement.setAttribute("data-bs-theme", "light");
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem(import.meta.env.VITE_THEME_KEY, action.payload);
      document.documentElement.setAttribute("data-bs-theme", action.payload);
    },
  },
});

export const { getUser, setUser, logoutUser, getTheme, setTheme } = auth.actions;
export default auth.reducer;
