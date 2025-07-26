import { render, screen } from '@testing-library/react';
import MovieFilter from '../movieFilter';

describe('MovieFilter component', () => {
  it('renders the movie filter', () => {
    render(
      <MovieFilter
        filterParams={new Map()}
        setFilterParams={() => {}}
      />
    );
    const filterElement = screen.getByPlaceholderText(/Movie Title/i);
    expect(filterElement).toBeInTheDocument();
  });
});
