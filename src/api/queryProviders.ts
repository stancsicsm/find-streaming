import { Provider } from "../interfaces/providerInterfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

const queryProviders = (movie_id: number): Promise<Provider> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`,
    options
  )
    .then((response) => response.json())
    .then((response) => response as Provider)
    .catch((err) => {
      const emptyResponse: Provider = {
        id: 0,
        results: null,
      };

      console.error(err);
      return emptyResponse;
    });
};

export default queryProviders;
