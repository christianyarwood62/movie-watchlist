import { useDispatch } from "react-redux";
import { removeMovie } from "../features/watchSlice";
import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

const StyledMovieItem = styled.div`
  display: flex;
  background-color: var(--color-blue-600);
  border-radius: 1rem;
  border: solid rgba(184, 184, 184, 0.3) 1px;
  padding: 2rem;
`;

const Poster = styled.img`
  height: 18rem;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & p {
    font-size: 1.6rem;
  }

  & > p {
    font-size: 2.4rem;
  }
`;

const MovieText = styled.div`
  /* display: flex; */
`;

const RemoveBtn = styled.button`
  all: unset;
  color: red;
  font-size: 1.6rem;
  margin-top: auto;
`;

const StyledDetailsContainers = styled.div`
  display: flex;
`;

function MovieWatchListItem({ movie }) {
  const dispatch = useDispatch();

  function handleRemoveMovie(id) {
    dispatch(removeMovie(id));
    toast("Movie deleted from watch list");
  }

  return (
    <StyledMovieItem>
      <Poster src={movie.Poster} />
      <MovieDetails>
        <p>{movie.Title}</p>
        <MovieText>
          <StyledDetailsContainers>
            <p>{movie.Year}</p>
            <p>{movie.Runtime}</p>
            <p>{movie.imdbRating}</p>
          </StyledDetailsContainers>
          <StyledDetailsContainers>
            <p>{movie.Genre}</p>
            <p>{movie.Rated}</p>
          </StyledDetailsContainers>
          <StyledDetailsContainers>
            <p>{movie.Actors}</p>
          </StyledDetailsContainers>
        </MovieText>
        <RemoveBtn onClick={() => handleRemoveMovie(movie.imdbID)}>
          <RiDeleteBinLine />
          Remove
        </RemoveBtn>
      </MovieDetails>
    </StyledMovieItem>
  );
}

export default MovieWatchListItem;
