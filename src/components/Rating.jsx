import { Star } from 'lucide-react';
import { C, MONO } from '../styles/theme';

export default function Rating({ value, count, size = 13 }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={size} fill={C.amber} color={C.amber} />
      <span style={{ fontFamily: MONO, color: C.text }} className="text-xs font-semibold">{value.toFixed(1)}</span>
      {count != null && <span className="text-xs" style={{ color: C.textMuted }}>({count})</span>}
    </div>
  );
}
