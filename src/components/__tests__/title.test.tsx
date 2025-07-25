import { render, screen } from '@testing-library/react';
import Title from '../title';

describe('Title component', () => {
  it('renders the title', () => {
    render(<Title />);
    const titleElement = screen.getByText(/Find Streaming/i);
    expect(titleElement).toBeInTheDocument();
  });
});
