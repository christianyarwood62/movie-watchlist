import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async function (query) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=71f8f38f&s=${query}`
    );
    const data = await res.json();
    return data.Search;
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
  reducers: {
    // This is used to initially search for movies
    searchMovies(state, action) {
      return { ...state, movies: action.payload };
    },
  },
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

export const { searchMovies } = movieSlice.actions;

export default movieSlice.reducer;
