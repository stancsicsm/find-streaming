import { render, screen } from '@testing-library/react';
import Footer from '../footer';

describe('Footer component', () => {
  it('renders the footer', () => {
    const filterParams = new Map<string, string | number>();
    filterParams.set('page', 1);
    render(<Footer totalPages={10} filterParams={filterParams} />);
    const footerElement = screen.getByText(/1 \/ 10/i);
    expect(footerElement).toBeInTheDocument();
  });
});
