import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async function (query) {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=71f8f38f&s=${query}`
      );
      const data = await res.json();
      // if the user search for movie that doesn't exist then the error is caught
      if (data.Search.length > 0) {
        return data.Search;
      }
      console.log(data);

      // return [];
    } catch (error) {
      console.log(error.Error);
      throw new Error(error.Error);
    }
  }
);

const initialState = {
  movies: [],
  isLoading: false,
  error: "",
};

const movieSlice = createSlice({
  name: "movieList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
