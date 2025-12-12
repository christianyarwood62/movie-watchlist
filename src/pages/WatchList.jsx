import { useSelector } from "react-redux";
import MovieWatchListItem from "../features/MovieWatchListItem";
import styled from "styled-components";

const WatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

function Watchlist() {
  const watchList = useSelector((state) => state.watchList);

  return (
    <WatchList>
      <h1>My Watch List</h1>
      {watchList.map((movie) => (
        <MovieWatchListItem key={movie.imdbID} movie={movie} />
      ))}
    </WatchList>
  );
}

export default Watchlist;
