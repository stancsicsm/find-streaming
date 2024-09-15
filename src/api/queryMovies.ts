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

  let baseUrl: string;
  const urlParams = new URLSearchParams({
    include_adult: "false",
    sort_by: "popularity.desc",
    ...Object.fromEntries(filterParams.entries())
  });

  if (filterParams.get("query")) {
    baseUrl = "https://api.themoviedb.org/3/search/movie";
  } else {
    baseUrl = "https://api.themoviedb.org/3/discover/movie";
  }

  return fetch(`${baseUrl}?${urlParams.toString()}`, options)
    .then((response) => response.json())
    .then((response) => response as Movies)
    .then((response) => response.results as Movie[])
    .catch((err) => {
      console.error(err);
      return [] as Movie[];
    });
};

export default queryMovies;
