import {MoviesResponse} from "../interfaces/movieInterfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("tmdbApiKey")}`,
  },
};

const queryMovies = (
  filterParams: Map<string, string | number> = new Map()
): Promise<MoviesResponse> => {

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
    .then((response) => response as MoviesResponse)
    .catch((err) => {
      console.error(err);
      return {
        results: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
      } as MoviesResponse;
    });
};

export default queryMovies;
