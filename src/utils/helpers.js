import { AVATAR_COLORS, CATEGORIES } from '../data/mockData';

export function colorForName(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function fmt(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }

export function pct(part, total) { return total ? Math.min(100, Math.round((part / total) * 100)) : 0; }

export function guessCategoryId(name) {
  if (!name) return null;
  const n = name.toLowerCase();
  const found = CATEGORIES.find(c => n.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(n));
  return found ? found.id : null;
}

export function dateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  let nextDay = 1;
  while (cells.length % 7 !== 0) { cells.push({ day: nextDay, current: false }); nextDay++; }
  return cells;
}
