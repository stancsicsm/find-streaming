import { render, screen } from '@testing-library/react';
import PageNavigation from '../pageNavigation';

describe('PageNavigation component', () => {
  it('renders the page navigation', () => {
    render(
      <PageNavigation
        filterParams={new Map()}
        setFilterParams={() => {}}
        totalPages={10}
      />
    );
    const navigationElement = screen.getByText(/</i);
    expect(navigationElement).toBeInTheDocument();
  });
});
