import { Star, TrendingUp } from 'lucide-react';
import { C, MONO } from '../styles/theme';

export default function ProStatCard({ label, value, delta, isRating, onClick }) {
  return (
    <button onClick={onClick} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 text-left w-full">
      <div className="text-xs mb-2" style={{ color: C.textMuted }}>{label}</div>
      <div className="flex items-end justify-between">
        <span className="text-lg font-bold" style={{ color: C.text, fontFamily: MONO }}>{value}</span>
        {isRating ? (
          <Star size={14} fill={C.amber} color={C.amber} />
        ) : (
          <span className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: C.green }}>
            <TrendingUp size={11} />{delta}
          </span>
        )}
      </div>
    </button>
  );
}
