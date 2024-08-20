import { Movie, Movies } from "../interfaces/movieInterfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

const queryMovies = (
  filterParams: Map<string, string | number> = new Map()
): Promise<Movie[]> => {
  const baseUrl =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false";

  let queryParams = "";
  for (const [key, value] of filterParams.entries()) {
    queryParams += `&${key}=${value}`;
  }

  return fetch(baseUrl + queryParams, options)
    .then((response) => response.json())
    .then((response) => response as Movies)
    .then((response) => response.results as Movie[])
    .catch((err) => {
      console.error(err);
      return [] as Movie[];
    });
};

export default queryMovies;
