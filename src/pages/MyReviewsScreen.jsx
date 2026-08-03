import { Star } from 'lucide-react';
import { MY_REVIEWS } from '../data/mockData';
import { C, MONO } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import Rating from '../components/Rating';

export default function MyReviewsScreen({ goBack }) {
  const avg = (MY_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MY_REVIEWS.length).toFixed(1);
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Recenziile mele</h1>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs mb-1" style={{ color: C.textMuted }}>Rating mediu</div>
          <div className="flex items-center gap-1.5">
            <Star size={18} fill={C.amber} color={C.amber} />
            <span className="text-xl font-bold" style={{ color: C.text, fontFamily: MONO }}>{avg}</span>
          </div>
        </div>
        <div className="text-xs" style={{ color: C.textMuted }}>{MY_REVIEWS.length} recenzii</div>
      </div>

      <div className="flex flex-col gap-3">
        {MY_REVIEWS.map(r => (
          <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
            <div className="flex items-center gap-3 mb-2">
              <Avatar name={r.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{r.name}</div>
                <div className="text-xs" style={{ color: C.textFaint }}>{r.date}</div>
              </div>
              <Rating value={r.rating} />
            </div>
            <p className="text-sm" style={{ color: C.textMuted }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
