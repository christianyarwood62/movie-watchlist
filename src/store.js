import { configureStore } from "@reduxjs/toolkit";
import watchReducer from "./features/watchSlice";
import movieReducer from "./features/movieSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    watchList: watchReducer,
    movieList: movieReducer,
    auth: authReducer,
  },
});
