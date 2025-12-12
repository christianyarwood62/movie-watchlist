import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = [];

const watchSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
      toast("Movie added to your watch list!");
    },
    removeMovie(state, action) {
      state;
    },
  },
});

export const { addMovie } = watchSlice.actions;

export default watchSlice.reducer;
