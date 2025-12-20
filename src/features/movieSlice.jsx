import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async function (query) {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=71f8f38f&s=${query}`
      );

      // If the api fetch doesnt work
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      // if the user searches for movie that doesn't exist
      if (!data.Search || data.Search.length === 0) {
        return [];
      }

      // On a successful fetch request, return the search results
      return data.Search;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
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
        state.movies = [];
      });
  },
});

export default movieSlice.reducer;
