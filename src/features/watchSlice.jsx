import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovie(state, action) {
      state.push({ ...action.payload, watched: false });
    },
    removeMovie(state, action) {
      return state.filter((movie) => movie.imdbID !== action.payload);
    },
    toggleWatched(state, action) {
      return state.map((movie) =>
        movie.imdbID === action.payload
          ? { ...movie, watched: !movie.watched }
          : { ...movie }
      );
    },
  },
});

export const { addMovie, removeMovie, toggleWatched, state } =
  watchSlice.actions;

export default watchSlice.reducer;
