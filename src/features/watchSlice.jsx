import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      return state.filter((movie) => movie.imdbID !== action.payload);
    },
  },
});

export const { addMovie, removeMovie, state } = watchSlice.actions;

export default watchSlice.reducer;
