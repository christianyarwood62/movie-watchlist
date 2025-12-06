import styled from "styled-components";

const movies = [
  {
    name: "test1",
    imdb: "9",
    movieLength: "142",
    createDate: "1992",
  },
  {
    name: "test2",
    imdb: "8",
    movieLength: "101",
    createDate: "2010",
  },
  {
    name: "test1",
    imdb: "9",
    movieLength: "142",
    createDate: "1992",
  },
  {
    name: "test2",
    imdb: "8",
    movieLength: "101",
    createDate: "2010",
  },
  {
    name: "test1",
    imdb: "9",
    movieLength: "142",
    createDate: "1992",
  },
  {
    name: "test2",
    imdb: "8",
    movieLength: "101",
    createDate: "2010",
  },
];

const StyledMain = styled.main`
  width: 80%;
  margin: 6rem auto 6rem auto;
  padding-top: 6rem;
  max-width: 120rem;
`;

const MovieHeader = styled.p`
  color: var(--grey-color-600);
  font-weight: 600;
  font-size: 2rem;
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
  border: solid, 1px, rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
`;

const MovieDetails = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const AddButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  background-color: rgba(31, 12, 81, 0.708);
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
  flex-direction: column;
  padding: 1rem;
  gap: 1.2rem;
`;

function MovieList() {
  return (
    <StyledMain>
      <input placeholder="Search for movies" type="text" />
      <StyledSection>
        {movies.map((movie) => (
          <MovieContainer key={movie.name}>
            <AddButton>+</AddButton>
            <img src="../../public/Road-To-City-Movie-Poster-and-Flyer-Psd-Template.jpg" />
            <MovieText>
              <MovieHeader>{movie.name}</MovieHeader>
              <MovieDetails>
                <MovieDetail>{movie.imdb}</MovieDetail>
                <MovieDetail>{movie.movieLength}</MovieDetail>
                <MovieDetail>{movie.createDate}</MovieDetail>
              </MovieDetails>
            </MovieText>
          </MovieContainer>
        ))}
      </StyledSection>
    </StyledMain>
  );
}

export default MovieList;
