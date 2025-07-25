import {TrailerResponse} from "../interfaces/trailerInterface";
import {getTmdbOptions} from "../utils";

const queryTrailers = (movie_id: number): Promise<TrailerResponse> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
    getTmdbOptions()
  )
    .then((response) => response.json())
    .then((response) => response as TrailerResponse)
    .catch((err) => {
      console.error(err);
      return { id: -1, results: [] };
    });
};

export default queryTrailers;
