import { useSelector } from "react-redux";
import MovieWatchListItem from "../features/MovieWatchListItem";

function Watchlist() {
  const watchList = useSelector((state) => state.watchList);

  return (
    <div>
      {watchList.map((movie) => (
        <MovieWatchListItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default Watchlist;
