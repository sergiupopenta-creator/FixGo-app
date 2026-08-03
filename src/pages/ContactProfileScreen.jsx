import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { C, GRADIENT, MONO, inputStyle } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import Rating from '../components/Rating';
import StatusBadge from '../components/StatusBadge';

export default function ContactProfileScreen({ name, location, clientRequests, reviews, onAddReview, goBack }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  function submit() {
    if (!text.trim()) return;
    onAddReview({ rating, text: text.trim() });
    setText('');
    setRating(5);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Profil client</h1>
      </div>

      <div className="flex flex-col items-center text-center py-6">
        <Avatar name={name} size={88} />
        <h2 className="text-lg font-bold mt-4" style={{ color: C.text }}>{name}</h2>
        <p className="text-xs mt-1" style={{ color: C.textMuted }}>Client FixGo</p>
      </div>

      {location && (
        <div className="flex items-center gap-1.5 justify-center mb-6 text-xs" style={{ color: C.textMuted }}>
          <MapPin size={13} /> {location}
        </div>
      )}

      {clientRequests && clientRequests.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Ce dorește</h2>
          <div className="flex flex-col gap-2">
            {clientRequests.map(r => (
              <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: C.text }}>{r.title}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="text-xs mb-1.5" style={{ color: C.textMuted }}>{r.category} · {r.address}</div>
                {r.description && <p className="text-xs mb-1.5" style={{ color: C.textMuted }}>{r.description}</p>}
                <span className="text-xs font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{r.budget}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Recenziile tale despre acest client</h2>
        {(!reviews || reviews.length === 0) && (
          <p className="text-xs mb-2" style={{ color: C.textMuted }}>Nu ai adăugat încă nicio recenzie.</p>
        )}
        <div className="flex flex-col gap-2">
          {reviews && reviews.map(r => (
            <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <Rating value={r.rating} />
                <span className="text-xs" style={{ color: C.textFaint }}>{r.date}</span>
              </div>
              <p className="text-xs" style={{ color: C.textMuted }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă o recenzie</div>
        <div className="flex items-center gap-1.5 mb-3">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setRating(n)} style={{ background: 'none', border: 'none', padding: 0 }}>
              <Star size={22} fill={n <= rating ? C.amber : 'none'} color={C.amber} />
            </button>
          ))}
        </div>
        <div className="mb-3">
          <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="Cum a fost experiența cu acest client?" style={{ ...inputStyle, resize: 'none' }} />
        </div>
        <button
          onClick={submit}
          disabled={!text.trim()}
          style={{ background: text.trim() ? GRADIENT : C.surface2, opacity: text.trim() ? 1 : 0.6 }}
          className="w-full rounded-xl py-2.5 text-sm font-semibold text-white"
        >
          Trimite recenzia
        </button>
      </div>
    </div>
  );
}
