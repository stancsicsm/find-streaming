import { getTmdbOptions } from "../utils";

const queryTmdbHealth = () => {
  const url = "https://api.themoviedb.org/3/authentication";
  return fetch(url, getTmdbOptions());
};

export default queryTmdbHealth;
