const API_URL = `https://www.omdbapi.com/?apikey=71f8f38f`;

// Used when adding a movie to the watch list because this searches for that movie
export async function fetchMovie(query) {
  try {
    console.log("test");
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
