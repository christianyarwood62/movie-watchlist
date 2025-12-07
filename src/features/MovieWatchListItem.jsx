import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";

function MovieWatchListItem({ movie }) {
  const StyledMovieItem = styled.div`
    display: flex;
    background-color: var(--color-blue-600);
    border-radius: 1rem;
    border: solid rgba(184, 184, 184, 0.3) 1px;
    margin: 4rem;
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
        <RemoveBtn>
          <RiDeleteBinLine />
          Remove
        </RemoveBtn>
      </MovieDetails>
    </StyledMovieItem>
  );
}

export default MovieWatchListItem;
