import {Country} from "../interfaces/countryInterface";
import {getTmdbOptions} from "../utils";

const queryCountries = (): Promise<Country[]> => {
  return fetch(
    "https://api.themoviedb.org/3/configuration/countries",
    getTmdbOptions()
  )
    .then((response) => response.json())
    .then((response) => {
      return response.success === false ? [] : response as Country[];
    })
    .catch((err) => {
      console.error(err);
      return [] as Country[];
    });
};
export default queryCountries;
