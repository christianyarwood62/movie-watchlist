import { useSelector } from "react-redux";
import MovieWatchListItem from "../features/MovieWatchListItem";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

function Watchlist() {
  const { userWatchLists } = useSelector((state) => state.watchList);

  const { loggedInUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) navigate("/login");
  }, [navigate, loggedInUser]);

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
