import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export interface PageNavigationProps {
  filterParams: Map<string, string | number>;
  setFilterParams: (filters: Map<string, string | number>) => void;
  totalPages: number;
}

const PageNavigation: React.FC<PageNavigationProps> = (pageNavigationProps) => {
  const { filterParams, setFilterParams, totalPages } = pageNavigationProps;

  const [page, setPage] = useState<number>(1);

  const updatePageInFilters = (newPage: number) => {
    const filters = new Map<string, string | number>(filterParams);
    filters.set('page', newPage);
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

  return (
    <nav className="mt-4 flex items-center justify-center gap-3">
      <button
        type="button"
        className="btn btn-ghost h-11 w-11 p-0"
        onClick={previousPage}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        className="btn btn-ghost h-11 w-11 p-0"
        onClick={nextPage}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default PageNavigation;
