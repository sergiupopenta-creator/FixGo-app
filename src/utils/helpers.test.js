import { describe, expect, it } from 'vitest';
import { colorForName, initials, fmt, pct, guessCategoryId, dateKey, getMonthGrid } from './helpers';

describe('initials', () => {
  it('takes the first letter of the first two words, uppercased', () => {
    expect(initials('Alexandru Popescu')).toBe('AP');
    expect(initials('maria')).toBe('M');
    expect(initials('Ana Maria Ionescu')).toBe('AM');
  });
});

describe('colorForName', () => {
  it('is deterministic for the same name', () => {
    expect(colorForName('Alexandru Popescu')).toBe(colorForName('Alexandru Popescu'));
  });

  it('returns a value from the avatar color palette', () => {
    const color = colorForName('Ion Marinescu');
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });
});

describe('fmt', () => {
  it('rounds and formats numbers with Romanian thousands separators', () => {
    expect(fmt(1500)).toBe('1.500');
    expect(fmt(7850.4)).toBe('7.850');
  });

  it('treats null/undefined as 0', () => {
    expect(fmt(null)).toBe('0');
    expect(fmt(undefined)).toBe('0');
  });
});

describe('pct', () => {
  it('computes a percentage capped at 100', () => {
    expect(pct(50, 100)).toBe(50);
    expect(pct(150, 100)).toBe(100);
  });

  it('returns 0 when total is falsy (avoids division by zero)', () => {
    expect(pct(10, 0)).toBe(0);
  });
});

describe('guessCategoryId', () => {
  it('matches a known category name', () => {
    expect(guessCategoryId('Electrician')).toBe('electrician');
    expect(guessCategoryId('instalator')).toBe('instalator');
  });

  it('returns null for an empty or unknown name', () => {
    expect(guessCategoryId('')).toBeNull();
    expect(guessCategoryId(null)).toBeNull();
  });
});

describe('dateKey', () => {
  it('formats year/month/day as YYYY-MM-DD, zero-padded', () => {
    expect(dateKey(2026, 0, 5)).toBe('2026-01-05');
    expect(dateKey(2026, 11, 25)).toBe('2026-12-25');
  });
});

describe('getMonthGrid', () => {
  it('returns a whole number of weeks (multiple of 7 cells)', () => {
    const cells = getMonthGrid(2026, 7); // August 2026
    expect(cells.length % 7).toBe(0);
  });

  it('marks the correct number of days as belonging to the current month', () => {
    const cells = getMonthGrid(2026, 7); // August has 31 days
    expect(cells.filter(c => c.current)).toHaveLength(31);
  });
});
