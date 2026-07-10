import { Search } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export interface MovieFilterProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = (movieFilterProps) => {
  const { filterParams, setFilterParams } = movieFilterProps;

  const [movieTitleSearch, setMovieTitleSearch] = useState<string>('');

  const applyFilters = () => {
    const filters = new Map<string, string | number>(filterParams);
    if (movieTitleSearch) {
      filters.set('query', movieTitleSearch);
    } else {
      filters.delete('query');
    }
    filters.set('page', 1);
    setFilterParams(filters);
  };

  return (
    <form
      className="mb-4 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters();
      }}
    >
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          className="input rounded-full pl-11"
          placeholder="Movie title"
          value={movieTitleSearch}
          onChange={(e) => setMovieTitleSearch(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default MovieFilter;
