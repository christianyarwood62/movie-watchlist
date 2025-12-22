import { createSlice } from "@reduxjs/toolkit";

const initialState = { userWatchLists: { chris: [1, 2, 3], kelly: [4, 5, 6] } };

const watchSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovie(state, action) {
      const { user, movie } = action.payload;

      if (!state.userWatchLists[user]) {
        state.userWatchLists[user] = [];
      }
      state.userWatchLists[user].push({ ...movie, watched: false });
    },
    // removeMovie(state, action) {
    //   return state.userWatchLists.filter(
    //     (movie) => movie.imdbID !== action.payload
    //   );
    // },
    // toggleWatched(state, action) {
    //   return state.userWatchList.watchList.map((movie) =>
    //     movie.imdbID === action.payload
    //       ? { ...movie, watched: !movie.watched }
    //       : { ...movie }
    //   );
    // },
  },
});

export const { addMovie, removeMovie, toggleWatched, state, loadUser } =
  watchSlice.actions;

export default watchSlice.reducer;
