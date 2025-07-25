import {getTmdbOptions} from "../utils";

const queryTmdbHealth = (apiKey?: string) => {
  const url = "https://api.themoviedb.org/3/authentication";
  return fetch(url, getTmdbOptions(apiKey));
};

export default queryTmdbHealth;
