import { useEffect, useState } from 'react';

const PREFIX = 'fixgo:';

function readStored(key, initialValue) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return typeof initialValue === 'function' ? initialValue() : initialValue;
    return JSON.parse(raw);
  } catch {
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  }
}

// Same shape as useState, but the value is read from (and written back to)
// localStorage, so app data survives a page refresh instead of resetting
// to the mock seed data every time.
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => readStored(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // localStorage can be unavailable (private browsing, quota exceeded, etc.) — fail silently.
    }
  }, [key, value]);

  return [value, setValue];
}
