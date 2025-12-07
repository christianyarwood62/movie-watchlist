function MovieWatchListItem({ movie }) {
  return (
    <div>
      <img src={movie.Poster} />
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
      <p>{movie.Released}</p>
      <p>{movie.imdbVotes}</p>
    </div>
  );
}

export default MovieWatchListItem;
