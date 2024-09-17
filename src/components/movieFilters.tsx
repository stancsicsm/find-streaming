import React, { useState, useEffect, useRef } from "react";
import { Form, Button, ButtonGroup, InputGroup, Row, Col } from 'react-bootstrap';
import queryGenres from "../api/queryGenres";
import { Genre } from "../interfaces/genreInterface";

interface FilterProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
  totalPages: number;
}

const Filter: React.FC<FilterProps> = ({ filterParams, setFilterParams, totalPages}) => {
  const [primaryReleaseYear, setPrimaryReleaseYear] = useState<string>("");
  const [genreOptions, setGenreOptions] = useState<Genre[]>([]);
  const [genre, setGenre] = useState<string>("");
  const [movieTitleSearch, setMovieTitleSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      setPrimaryReleaseYear(
        (filterParams.get("primary_release_year") as string) || ""
      );
      setGenre((filterParams.get("with_genres") as string) || "");
      isMounted.current = true;
    }
  }, [filterParams]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await queryGenres();
        setGenreOptions(response.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [genre]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryReleaseYear(event.target.value);
    setPage(1);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
    setPage(1);
  };

  const handleMovieTitleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitleSearch(event.target.value);
    setPage(1);
  }

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
    if (primaryReleaseYear) {
      filters.set("primary_release_year", primaryReleaseYear);
    } else {
      filters.delete("primary_release_year");
    }
    if (genre) {
      filters.set("with_genres", genre);
    } else {
      filters.delete("with_genres");
    }
    if (movieTitleSearch) {
      filters.set("query", movieTitleSearch);
    } else {
      filters.delete("query");
    }
    filters.set("page", page);
    setFilterParams(filters);
  };

  return (
    <Form>
      <Row className="align-items-center mb-2">
        <Col md="8">
          <InputGroup>
            <Form.Control
              className="rounded-pill me-2"
              type="number"
              placeholder="Release Year"
              value={primaryReleaseYear}
              onChange={handleYearChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyFilters();
                }
              }}
            />
            <Form.Select
              className="rounded-pill"
              value={genre}
              onChange={handleGenreChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyFilters();
                }
              }}
            >
              <option key={-1} value="">
                All Genres
              </option>
              {genreOptions.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mb-2 mb-md-0">
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
        <Col md="4" className="d-flex justify-content-end">
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
    </Form>
  );
};

export default Filter;
