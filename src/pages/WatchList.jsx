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
  const { userWatchLists } = useSelector((state) => state.watchList);

  const { loggedInUser } = useSelector((state) => state.auth);

  return (
    <WatchList>
      <h1>My Watch List</h1>
      {loggedInUser ? (
        userWatchLists[loggedInUser.username] !== undefined &&
        userWatchLists[loggedInUser.username].map((movie) => (
          <MovieWatchListItem key={movie.imdbID} movie={movie} />
        ))
      ) : (
        <div>Log in</div>
      )}
    </WatchList>
  );
}

export default Watchlist;
