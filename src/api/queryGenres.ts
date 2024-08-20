import { Genres } from "../interfaces/genreInterface";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

const queryGenres = (): Promise<Genres> => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  )
    .then((response) => response.json())
    .then((response) => response as Genres)
    .catch((err) => {
      console.error(err);
      return { genres: [] } as Genres;
    });
};

export default queryGenres;
