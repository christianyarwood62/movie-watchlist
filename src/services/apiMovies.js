const API_URL = `https://www.omdbapi.com/?apikey=71f8f38f`;

// Used to search for movies and display in the movies list
// export async function fetchMovies(query) {
//   try {
//     // This URL fetched generic information
//     const res = await fetch(`${API_URL}&s=${query}`);
//     if (!res.ok) {
//       throw new Error(`Response Status: ${res.status}`);
//     }

//     const result = await res.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// Used when adding a movie to the watch list because this searches for that movie
export async function fetchMovie(query) {
  try {
    // the fetch URL is different because this returns more detailed information
    const res = await fetch(`${API_URL}&i=${query}`);
    if (!res.ok) {
      throw new Error(`Response Status: ${res.status}`);
    }

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
