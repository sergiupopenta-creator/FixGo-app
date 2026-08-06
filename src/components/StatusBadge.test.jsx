import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';
import { STATUS_STYLES } from '../data/mockData';

describe('StatusBadge', () => {
  it('renders the status text with its matching color', () => {
    render(<StatusBadge status="Confirmată" />);
    const badge = screen.getByText('Confirmată');
    expect(badge).toHaveStyle({ color: STATUS_STYLES['Confirmată'].color });
  });

  it('falls back to the "Nou" style for an unrecognized status', () => {
    render(<StatusBadge status="ceva-necunoscut" />);
    const badge = screen.getByText('ceva-necunoscut');
    expect(badge).toHaveStyle({ color: STATUS_STYLES['Nou'].color });
  });
});
