import React from "react";

import CountryFilter, {CountryFilterProps} from "./countryFilter";
import MovieFilter, {MovieFilterProps} from "./movieFilter";

interface FilterProps {
  countryFilterProps: CountryFilterProps,
  movieFilterProps: MovieFilterProps
}

const Filters: React.FC<FilterProps> = (filterProps) => {
  const {countryFilterProps, movieFilterProps} = filterProps;

  return (
    <>
      <CountryFilter {...countryFilterProps} />
      <MovieFilter {...movieFilterProps} />
    </>
  )
}

export default Filters;