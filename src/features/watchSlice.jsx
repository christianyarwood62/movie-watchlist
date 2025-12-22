import { createSlice } from "@reduxjs/toolkit";

const initialState = { userWatchLists: {} };

const watchSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovie(state, action) {
      // Destructure the payload
      const { user, movie } = action.payload;

      // If the user doesnt have a watch list, then create an empty array so further movies can be added
      if (!state.userWatchLists[user]) {
        state.userWatchLists[user] = [];
      }
      // The user has a an array watch list currently, so push the new movie to that array
      state.userWatchLists[user].push({ ...movie, watched: false });
    },

    removeMovie(state, action) {
      // Destructure the payload
      const { user, id } = action.payload;

      // Check if this user's watchList exists first because otherwise it would be undefined and filter wont run
      if (state.userWatchLists[user]) {
        // If the clicked movie ID matches the ID in the watchlist, it removes it from the state
        state.userWatchLists[user] = state.userWatchLists[user].filter(
          (movie) => movie.imdbID !== id
        );
      }
    },
    toggleWatched(state, action) {
      const { user, id } = action.payload;

      // Iterate through the users watch list and if id matches, toggle the watched attribute
      state.userWatchLists[user] = state.userWatchLists[user].map((movie) =>
        movie.imdbID === id
          ? { ...movie, watched: !movie.watched }
          : { ...movie }
      );
    },
  },
});

export const { addMovie, removeMovie, toggleWatched, state, loadUser } =
  watchSlice.actions;

export default watchSlice.reducer;
