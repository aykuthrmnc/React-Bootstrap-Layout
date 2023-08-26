import store from "~/store";
// import { apiSlice } from "~/store/api/apiSlice";
import { getTheme, getUser, logoutUser, setTheme, setUser } from "~/store/auth";
import { Theme } from "~/types";

//! USER
export const getUserHandle = () => {
  store.dispatch(getUser());
};

export const userLoginHandle = (data: any) => {
  store.dispatch(setUser(data));
};

export const userLogoutHandle = () => {
  store.dispatch(logoutUser());
  // store.dispatch(apiSlice.util.resetApiState());
  // Reset specific caches
  // store.dispatch(apiSlice.util.invalidateTags(["Category"])
};

export const getThemeHandle = () => {
  store.dispatch(getTheme());
};

export const setThemeHandle = (data: Theme) => {
  store.dispatch(setTheme(data));
};
