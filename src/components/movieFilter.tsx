import React, {useState} from "react";
import {Row, Col, Form, Button, ButtonGroup} from 'react-bootstrap';

export interface MovieFilterProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
  totalPages: number;
}

const MovieFilter: React.FC<MovieFilterProps> = (movieFilterProps) => {
  const {filterParams, setFilterParams, totalPages} = movieFilterProps;

  const [movieTitleSearch, setMovieTitleSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const handleMovieTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitleSearch(event.target.value);
    setPage(1);
  };

  const updatePageInFilters = (newPage: number) => {
    const filters = new Map<string, string | number>(filterParams);
    filters.set("page", newPage);
    setFilterParams(filters);
  };

  const previousPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage > 1 ? prevPage - 1 : prevPage;
      updatePageInFilters(newPage);
      return newPage;
    });
  };

  const nextPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      updatePageInFilters(newPage);
      return newPage;
    });
  };

  const applyFilters = () => {
    const filters = new Map<string, string | number>(filterParams);
    if (movieTitleSearch) {
      filters.set("query", movieTitleSearch);
    } else {
      filters.delete("query");
    }
    filters.set("page", page);
    setFilterParams(filters);
  };

  return (
    <>
      <Row>
        <Col className="mb-2">
          <Form.Control
            className="rounded-pill"
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
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end">
          <ButtonGroup>
            <Button className="rounded-pill me-2" variant="outline-primary" onClick={applyFilters}>
              Search
            </Button>
            <Button
              className="rounded-circle me-2"
              variant={`outline-secondary ${page === 1 ? "disabled" : ""}`}
              onClick={previousPage}
              disabled={page === 1}
            >
              &lt;
            </Button>
            <Button
              className="rounded-circle"
              variant={`outline-secondary ${page === totalPages ? "disabled" : ""}`}
              onClick={nextPage}
            >
              &gt;
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
};

export default MovieFilter;
