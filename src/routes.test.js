import { describe, expect, it } from 'vitest';
import { buildPath, parseId } from './routes';

describe('parseId', () => {
  it('converts pure-digit strings to numbers', () => {
    expect(parseId('42')).toBe(42);
  });

  it('leaves synthetic string ids (e.g. "employee-3") untouched', () => {
    expect(parseId('employee-3')).toBe('employee-3');
    expect(parseId('client-1')).toBe('client-1');
  });

  it('returns undefined for empty/nullish input', () => {
    expect(parseId('')).toBeUndefined();
    expect(parseId(undefined)).toBeUndefined();
    expect(parseId(null)).toBeUndefined();
  });
});

describe('buildPath', () => {
  it('builds a worker profile path from a worker object', () => {
    expect(buildPath('worker', { worker: { id: 7 } })).toBe('/worker/7');
  });

  it('builds a search path with an optional category query param', () => {
    expect(buildPath('search', {})).toBe('/search');
    expect(buildPath('search', { category: 'electrician' })).toBe('/search?category=electrician');
  });

  it('builds a chat path with the worker name as a query param', () => {
    expect(buildPath('chat', { workerId: 3, workerName: 'Maria Ionescu' })).toBe('/chat/3?name=Maria%20Ionescu');
  });

  it('falls back to the plain ROUTES table entry for simple screens', () => {
    expect(buildPath('home')).toBe('/');
    expect(buildPath('proDashboard')).toBe('/pro');
  });

  it('builds a job details / edit job path from a job object', () => {
    expect(buildPath('jobDetails', { job: { id: 12 } })).toBe('/jobs/12');
    expect(buildPath('editJob', { job: { id: 12 } })).toBe('/jobs/12/edit');
  });
});
