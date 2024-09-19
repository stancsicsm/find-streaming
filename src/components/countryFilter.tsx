import React from "react";
import {Row, Col, Form} from "react-bootstrap";

import {Country} from "../interfaces/countryInterface";

export interface CountryFilterProps {
  countries: Country[];
  selectedCountryId: string,
  setSelectedCountryId: (country_id: string) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = (countryFilterProps) => {
  const {countries, selectedCountryId, setSelectedCountryId} = countryFilterProps;

  const handleSelectedCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryId(event.target.value);
  };

  return (
    <Row className="justify-content-md-center mb-2">
      <Col>
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
      </Col>
    </Row>
  )
}

export default CountryFilter;