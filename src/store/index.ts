import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import { apiSlice } from "~/store/api/apiSlice";

const store = configureStore({
  reducer: {
    auth,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
  // devTools: import.meta.env.NODE_ENV === "development",
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
