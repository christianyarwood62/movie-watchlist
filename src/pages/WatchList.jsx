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

  console.log(watchList);
  return (
    <WatchList>
      <h1>My Watch List</h1>
      {watchList.length === 0 ? (
        <h3>Add some movies!</h3>
      ) : (
        watchList.map((movie) => (
          <MovieWatchListItem key={movie.imdbID} movie={movie} />
        ))
      )}
    </WatchList>
  );
}

export default Watchlist;
