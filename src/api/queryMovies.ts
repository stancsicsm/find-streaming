import { Movie, Movies } from "../interfaces/movieInterfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

const queryMovies = (params?: string[]): Promise<Movie[]> => {
  const baseUrl = "https://api.themoviedb.org/3/discover/movie?";
  const queryParams =
    "include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  return fetch(baseUrl + queryParams, options)
    .then((response) => response.json())
    .then((response) => response as Movies)
    .then((response) => response.results)
    .catch((err) => {
      console.error(err);
      return [] as Movie[];
    });
};

export default queryMovies;
