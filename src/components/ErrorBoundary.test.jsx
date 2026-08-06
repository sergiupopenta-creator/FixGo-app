import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function Bomb() {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('renders children normally when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>totul e bine</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('totul e bine')).toBeInTheDocument();
  });

  it('shows a fallback message instead of a blank page when a child throws', () => {
    // React logs the error to the console too; silence it for this expected-error test.
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByText('Ceva n-a mers bine')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
