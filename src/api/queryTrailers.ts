import { TrailerResponse} from "../interfaces/trailerInterface";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

const queryTrailers = (movie_id: number): Promise<TrailerResponse> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => response as TrailerResponse)
    .catch((err) => {
      console.error(err);
      return { id: -1, results: [] };
    });
};

export default queryTrailers;
