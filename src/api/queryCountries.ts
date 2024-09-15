import { Country } from "../interfaces/countryInterface";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

const queryCountries = (): Promise<Country[]> => {
  return fetch(
    "https://api.themoviedb.org/3/configuration/countries",
    options
  )
    .then((response) => response.json())
    .then((response) => response as Country[])
    .catch((err) => {
      console.error(err);
      return [] as Country[];
    });
};

export default queryCountries;
