import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import queryGenres from "../api/queryGenres";
import { Genre } from "../interfaces/genreInterface";

interface FilterProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
}

const Filter: React.FC<FilterProps> = ({ filterParams, setFilterParams }) => {
  const [primaryReleaseYear, setPrimaryReleaseYear] = useState<string>("");
  const [genreOptions, setGenreOptions] = useState<Genre[]>([]);
  const [genre, setGenre] = useState<string>("");
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

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryReleaseYear(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
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
    filters.set("page", page);
    setFilterParams(filters);
  };

  return (
    <Form>
      <Row>
        <Col md="4">
          <Form.Control
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
        </Col>
        <Col md="4">
          <Form.Select
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
              All
            </option>
            {genreOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md="2">
          <Button variant="primary" onClick={applyFilters}>
            Search
          </Button>
        </Col>
        <Col md="1">
          <Button
            variant={`secondary ${page === 1 ? "disabled" : ""}`}
            onClick={previousPage}
            disabled={page === 1}
          >
            &lt;
          </Button>
        </Col>
        <Col md="1">
          <Button
            variant={`secondary ${page === 1 ? "disabled" : ""}`}
            onClick={nextPage}
          >
            &gt;
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
