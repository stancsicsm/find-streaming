import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setPrimaryReleaseYear(
      (filterParams.get("primary_release_year") as string) || ""
    );
    setGenre((filterParams.get("genre") as string) || "");
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

  const applyFilters = () => {
    const filters = new Map<string, string | number>(filterParams);
    if (primaryReleaseYear) {
      filters.set("primary_release_year", primaryReleaseYear);
    } else {
      filters.delete("primary_release_year");
    }
    if (genre) {
      filters.set("with_genres", genre);
    } else if (genre === "") {
      filters.delete("with_genres");
    } else {
      filters.delete("with_genres");
    }
    setFilterParams(filters);
  };

  return (
    <div>
      <label>
        Release Year:
        <input
          type="text"
          value={primaryReleaseYear}
          onChange={handleYearChange}
        />
      </label>
      <label>
        Genre:
        <select value={genre} onChange={handleGenreChange}>
          <option key={-1} value={""}>
            All
          </option>
          {genreOptions.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
