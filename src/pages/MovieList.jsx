import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMovie } from "../services/apiMovies";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../features/watchSlice";
import { useLoaderData } from "react-router-dom";
import { searchMovies, fetchMovies } from "../features/movieSlice";
import Loader from "../UI/Loader";

const StyledMain = styled.main`
  width: 80%;
  margin: 6rem auto 6rem auto;
  padding-top: 6rem;
  max-width: 120rem;
`;

const MovieHeader = styled.p`
  color: var(--grey-color-600);
  font-weight: 600;
  font-size: 2rem;
`;

const MovieDetail = styled.p`
  color: var(--grey-color-500);
  font-size: 1.2rem;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3.6rem;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1.2rem;
  border: solid, 1px, rgba(255, 255, 255, 0.2);
  border-radius: 1rem;

  &:hover {
  }
`;

const MovieDetails = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const AddButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  background-color: rgba(31, 12, 81, 0.708);
  border-radius: 100rem;
  width: 3.6rem;
  height: 3.6rem;
  color: var(--color-grey-700);
  font-weight: 700;
  font-size: 2.4rem;
  border: none;

  &:hover {
    background-color: rgb(89, 63, 255);
  }
`;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.2rem;
`;

function MovieList() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // This stores the initially loaded movies to the reducer movies state upon component mount
  useEffect(() => {
    dispatch(fetchMovies("spiderman"));
  }, []);

  // Selects the movie list from the movies state in the reducer
  const searchedMovies = useSelector((state) => state.movieList.movies);

  const isLoading = useSelector((state) => state.movieList.isLoading);

  // searches the API for generic info about the movie and adds it to the movieSlice reducer state
  async function handleSearchMovie(movie) {
    const movies = await fetchMovies(movie);
    dispatch(searchMovies(movies.Search));
  }

  // Searches the APi for more detailed info about the selected movie and adds it to the watchList reducer state
  async function addMovieToWatchList(id) {
    const searchedMovie = await fetchMovie(id);
    dispatch(addMovie(searchedMovie));
  }

  return (
    <StyledMain>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchMovie(input);
        }}
      >
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for movies"
          type="text"
        />
      </form>
      <StyledSection>
        {isLoading ? (
          <Loader />
        ) : searchedMovies?.length > 0 ? (
          searchedMovies?.map((movie) => (
            <MovieContainer key={movie.imdbID}>
              <AddButton onClick={() => addMovieToWatchList(movie.imdbID)}>
                +
              </AddButton>
              <img src={movie.Poster} />
              <MovieText>
                <MovieHeader>{movie.Title}</MovieHeader>
                <MovieDetails>
                  <MovieDetail>{movie.imdbRating}</MovieDetail>
                  <MovieDetail>{movie.movieLength}</MovieDetail>
                  <MovieDetail>{movie.Year}</MovieDetail>
                </MovieDetails>
              </MovieText>
            </MovieContainer>
          ))
        ) : (
          <p>no movies</p>
        )}
      </StyledSection>
    </StyledMain>
  );
}

// calls the API function to initially fetch a set of movies since OMDB doesnt provide movies unless prompted
export async function loader() {
  const movies = await fetchMovies("spiderman");
  console.log(movies);
  return movies;
}

export default MovieList;
