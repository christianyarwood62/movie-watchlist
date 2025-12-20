import { useDispatch } from "react-redux";
import { removeMovie, toggleWatched } from "../features/watchSlice";
import styled, { css } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const WatchedButton = styled.button`
  all: unset;
  font-size: 1.4rem;

  &:hover * {
    color: var(--color-grey-500);
  }
`;

const StyledWatched = styled.div`
  font-size: 10rem;
`;

const StyledMovieItem = styled.div`
  display: flex;
  background-color: var(--color-blue-600);
  border-radius: 1rem;
  border: solid rgba(184, 184, 184, 0.3) 1px;
  padding: 2rem;
  max-width: 1000px;
  gap: 50px;

  & p,
  & h3,
  ${WatchedButton} {
    ${(props) =>
      props.$watched &&
      css`
        color: var(--color-grey-400);
      `}
  }

  & ${StyledWatched} {
    ${(props) =>
      props.$watched &&
      css`
        background-color: rgba(0, 110, 35, 0.597);
        padding: 4px 8px;
        border-radius: 5px;
      `}
  }

  & ${StyledWatched} p {
    ${(props) =>
      props.$watched &&
      css`
        color: rgba(17, 255, 0, 0.777);
      `}
  }
`;

const Poster = styled.img`
  height: 18rem;

  ${(props) =>
    props.$watched &&
    css`
      opacity: 0.5;
    `}
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & p {
    font-size: 1.6rem;
  }
`;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RemoveBtn = styled.button`
  all: unset;
  color: red;
  font-size: 1.6rem;
  margin-top: auto;

  &:hover {
    color: rgb(255, 98, 98);
  }
`;

const StyledDetailsContainers = styled.div`
  display: flex;
  gap: 50px;
`;

const StyledTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 400;

  ${(props) =>
    props.$watched &&
    css`
      text-decoration: line-through;
      font-weight: 300;
    `}
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 30px;
`;

function MovieWatchListItem({ movie }) {
  const dispatch = useDispatch();

  function handleRemoveMovie(id) {
    dispatch(removeMovie(id));
    toast("Movie deleted from watch list");
  }

  function handleToggleWatched(id) {
    dispatch(toggleWatched(id));
  }

  return (
    <StyledMovieItem $watched={movie.watched}>
      <Poster $watched={movie.watched} src={movie.Poster} />
      <MovieDetails>
        <StyledHeader>
          <StyledTitle $watched={movie.watched}>{movie.Title}</StyledTitle>
          {movie.watched ? (
            <StyledWatched>
              <p>Watched</p>
            </StyledWatched>
          ) : (
            ""
          )}
        </StyledHeader>
        <MovieText>
          <StyledDetailsContainers>
            <p>⭐️ {movie.imdbRating}/10, </p>
            <p>{movie.Year}, </p>
            <p>{movie.Runtime}, </p>
          </StyledDetailsContainers>
          <StyledDetailsContainers>
            <p>{movie.Genre}, </p>
            <p>{movie.Rated}, </p>
          </StyledDetailsContainers>
          <StyledDetailsContainers>
            <p>{movie.Actors}</p>
          </StyledDetailsContainers>
        </MovieText>
        <Buttons>
          <WatchedButton
            $watched={movie.watched}
            onClick={() => handleToggleWatched(movie.imdbID)}
          >
            {movie.watched ? (
              <>
                <IoEyeOffOutline /> <span>Mark as Unwatched</span>
              </>
            ) : (
              <>
                <IoEyeOffOutline /> <span>Mark as Watched</span>
              </>
            )}
          </WatchedButton>
          <RemoveBtn onClick={() => handleRemoveMovie(movie.imdbID)}>
            <RiDeleteBinLine />
            Remove
          </RemoveBtn>
        </Buttons>
      </MovieDetails>
    </StyledMovieItem>
  );
}

export default MovieWatchListItem;
