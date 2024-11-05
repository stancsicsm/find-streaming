import React, {useState} from "react";
import {Row, Col, Form, Button} from 'react-bootstrap';

export interface MovieFilterProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = (movieFilterProps) => {
  const {filterParams, setFilterParams} = movieFilterProps;

  const [movieTitleSearch, setMovieTitleSearch] = useState<string>("");

  const handleMovieTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitleSearch(event.target.value);
  };

  const applyFilters = () => {
    const filters = new Map<string, string | number>(filterParams);
    if (movieTitleSearch) {
      filters.set("query", movieTitleSearch);
    } else {
      filters.delete("query");
    }
    filters.set("page", 1);
    setFilterParams(filters);
  };

  return (
    <Row>
      <Col className="mb-2 d-flex">
        <Form.Control
          className="rounded-pill me-2 focus-ring focus-ring-secondary border"
          type="text"
          placeholder="Movie Title"
          value={filterParams.get("movie_title") as string}
          onChange={handleMovieTitleSearchChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              applyFilters();
            }
          }}
        />
        <Button className="rounded-pill" variant="outline-secondary" onClick={applyFilters}>
          Search
        </Button>
      </Col>
    </Row>
  );
};

export default MovieFilter;
