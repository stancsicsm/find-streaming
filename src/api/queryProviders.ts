import {ProvidersResponse} from "../interfaces/providerInterfaces";
import {getTmdbOptions} from "../utils";

const queryProviders = (movie_id: number): Promise<ProvidersResponse> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`,
    getTmdbOptions()
  )
    .then((response) => response.json())
    .then((response) => response as ProvidersResponse)
    .catch((err) => {
      const emptyResponse: ProvidersResponse = {
        id: 0,
        results: {},
      };
      console.error(err);
      return emptyResponse;
    });
};

export default queryProviders;
