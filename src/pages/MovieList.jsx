import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMovie } from "../services/apiMovies";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../features/watchSlice";
import { fetchMovies } from "../features/movieSlice";
import { toast } from "react-toastify";
import { IoMdCheckmark } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Spinner from "../UI/Spinner";

const StyledMain = styled.main`
  width: 80%;
  margin: 6rem auto 6rem auto;
  padding-top: 2rem;
  max-width: 120rem;
`;

const MovieHeader = styled.p`
  color: var(--grey-color-600);
  font-weight: 600;
  font-size: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
  padding-left: 1rem;
  text-align: center;
  margin-bottom: 4rem;
  background-color: var(--color-grey-300);
  border-radius: 1rem;
  height: 3.6rem;
  font-size: 1.4rem;
`;

const StyledInput = styled.input`
  all: unset;
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
  background-color: var(--color-blue-600);
  border: solid, 1px, rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  justify-content: space-between;

  &:hover {
  }
`;

const MovieDetails = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
  top: 10px;
  background-color: ${({ $added }) =>
    $added ? "green" : "rgba(31, 12, 81, 0.708)"};
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
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  gap: 1.2rem;
`;

function MovieList() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // Grabs the state from the redux store
  const { isLoading, movies } = useSelector((state) => state.movieList);

  // Grab the watch list state, so all the movies added to the watchlist
  const { userWatchLists } = useSelector((state) => state.watchList);

  // Destructure the logged in user from the auth slice
  const { loggedInUser } = useSelector((state) => state.auth);

  // If the movie list from redux store is empty, then it grabs a bunch of initial movies
  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies("interstellar"));
    }
  }, [dispatch, movies.length]);

  // Searches the API for generic info about the movie and adds it to the movieSlice reducer state
  async function handleSearchMovie(movie) {
    dispatch(fetchMovies(movie));
  }

  // Searches the API for more detailed info about the selected movie and adds it to the watchList reducer state
  async function addMovieToWatchList(id) {
    const searchedMovie = await fetchMovie(id);
    if (!loggedInUser) return;
    dispatch(addMovie({ user: loggedInUser.username, movie: searchedMovie }));
    toast("Movie added to your watch list!");
  }

  // Remove the selected movie matching the id in the movie state with the currently logged in user
  function removeMovieFromWatchList(id) {
    dispatch(removeMovie({ user: loggedInUser.username, id }));
    toast("Movie removed from your watch list!");
  }

  // Checks if the movie is already added to the watch list, to conditionally render the add or remove button in the icon
  const isMovieAlreadyAdded = movies.map((movie) =>
    userWatchLists[loggedInUser?.username]?.some(
      (watchMovie) => watchMovie.imdbID === movie.imdbID
    )
  );

  function handleOnAddOrRemove(imdb, i) {
    // If no user is currently logged in, notify with this message
    if (!loggedInUser) toast("Login to add movies to your list");

    // Iterate through the fetched movie list and check if it is already added in to the logged in users watchlist
    if (isMovieAlreadyAdded[i]) removeMovieFromWatchList(imdb);
    // If the current user doesnt have this movie added, add it to their watch list
    else addMovieToWatchList(imdb);
  }
  return (
    <StyledMain>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchMovie(input);
        }}
      >
        <FaMagnifyingGlass />
        <StyledInput
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for movies..."
          type="text"
        />
      </StyledForm>
      <StyledSection>
        {isLoading ? (
          <Spinner />
        ) : movies?.length > 0 ? (
          movies?.map((movie, i) => (
            <MovieContainer key={movie.imdbID}>
              <AddButton
                $added={isMovieAlreadyAdded[i]}
                onClick={() => handleOnAddOrRemove(movie.imdbID, i)}
              >
                {isMovieAlreadyAdded[i] ? (
                  <IoMdCheckmark style={{ strokeWidth: "50" }} />
                ) : (
                  <FaPlus style={{ strokeWidth: "10" }} />
                )}
              </AddButton>
              <img style={{ margin: "auto 0" }} src={movie.Poster} />
              <MovieText>
                <MovieHeader>{movie.Title}</MovieHeader>
                <MovieDetails>
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
// export async function loader() {
//   const movies = await fetchMovies("spiderman");
//   console.log(movies);
//   return movies;
// }

export default MovieList;
