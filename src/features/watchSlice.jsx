import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addMovie } = watchSlice.actions;

export default watchSlice.reducer;
