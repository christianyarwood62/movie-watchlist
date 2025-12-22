import { createSlice } from "@reduxjs/toolkit";

const initialState = { userWatchLists: {} };

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

    removeMovie(state, action) {
      const { user, id } = action.payload;

      if (state.userWatchLists[user]) {
        state.userWatchLists[user] = state.userWatchLists[user].filter(
          (movie) => movie.imdbID !== id
        );
      }
    },
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
