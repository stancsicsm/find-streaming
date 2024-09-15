import React from "react";
import {Form} from "react-bootstrap";
import {Country} from "../interfaces/countryInterface";

interface CountryFilterProps {
  countries: Country[];
  selectedCountryId: string,
  setSelectedCountryId: (country_id: string) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({countries, selectedCountryId, setSelectedCountryId}) => {
  const handleSelectedCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryId(event.target.value);
  };

  return (
    <Form.Select
      className="rounded-pill"
      value={selectedCountryId}
      onChange={handleSelectedCountryChange}
    >
      {countries.map((c) => (
        <option key={c.iso_3166_1} value={c.iso_3166_1}>
          {c.english_name}
        </option>
      ))}
    </Form.Select>
  )
}

export default CountryFilter;