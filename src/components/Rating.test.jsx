import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating', () => {
  it('renders the value rounded to one decimal', () => {
    render(<Rating value={4.9} />);
    expect(screen.getByText('4.9')).toBeInTheDocument();
  });

  it('shows the review count in parentheses when provided', () => {
    render(<Rating value={4.9} count={86} />);
    expect(screen.getByText('(86)')).toBeInTheDocument();
  });

  it('omits the count when not provided', () => {
    render(<Rating value={4.9} />);
    expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
  });
});
