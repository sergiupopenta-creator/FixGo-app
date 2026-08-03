import { useState } from 'react';
import { Heart, MapPin, MessageCircle, Phone, Share2, ShieldCheck, Star } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import PortfolioGallery from '../components/PortfolioGallery';
import Rating from '../components/Rating';
import StatBox from '../components/StatBox';

export default function WorkerProfileScreen({ worker, push, goBack, favorites, setFavorites, userReviews, onAddReview, onOpenShare }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const isFav = favorites.includes(worker.id);
  const categoryColor = CATEGORIES.find(c => c.id === worker.categoryId)?.color || C.purple;
  const allReviews = [...worker.reviewsSample, ...(userReviews || [])];

  function submitReview() {
    if (!reviewText.trim()) return;
    onAddReview({ rating, text: reviewText.trim() });
    setReviewText('');
    setRating(5);
  }

  return (
    <div className="pb-6">
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <BackButton onClick={goBack} />
        <div className="flex gap-2">
          <button onClick={() => setFavorites(f => isFav ? f.filter(id => id !== worker.id) : [...f, worker.id])} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center">
            <Heart size={16} color={isFav ? C.red : C.text} fill={isFav ? C.red : 'none'} />
          </button>
          <button onClick={() => onOpenShare(worker)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center">
            <Share2 size={16} color={C.text} />
          </button>
        </div>
      </div>

      <div className="px-5 pb-4 flex items-center gap-4">
        <Avatar name={worker.name} size={72} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h1 className="text-lg font-bold" style={{ color: C.text }}>{worker.name}</h1>
            {worker.verified && (
              <span style={{ background: 'rgba(253,224,71,0.15)', color: C.cyan }} className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                <ShieldCheck size={10} /> Verificat
              </span>
            )}
          </div>
          <div className="text-sm mb-1" style={{ color: C.textMuted }}>{worker.category}</div>
          <Rating value={worker.rating} count={worker.reviews} />
        </div>
      </div>

      <div className="px-5 flex items-center gap-1.5 mb-4 text-xs" style={{ color: C.textMuted }}>
        <MapPin size={13} /> {worker.area}
      </div>

      <div className="px-5 grid grid-cols-3 gap-2 mb-5">
        <StatBox label="Experiență" value={worker.experience} />
        <StatBox label="Răspuns" value={worker.responseTime} />
        <StatBox label="Lucrări" value={worker.completedJobs} />
      </div>

      <div className="px-5 mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Despre mine</h2>
        <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{worker.bio}</p>
      </div>

      {worker.portfolio && worker.portfolio.length > 0 && (
        <div className="px-5 mb-5">
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Lucrări recente</h2>
          <PortfolioGallery items={worker.portfolio} color={categoryColor} />
        </div>
      )}

      <div className="px-5 mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Servicii</h2>
        <div className="flex flex-wrap gap-2">
          {worker.services.map(s => (
            <span key={s} style={{ background: C.surface2, border: `1px solid ${C.border}`, color: C.text }} className="text-xs px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      <div className="px-5 mb-6">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Recenzii recente</h2>
        <div className="flex flex-col gap-2 mb-3">
          {allReviews.map((r, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold" style={{ color: C.text }}>{r.name || 'Tu'}</span>
                <Rating value={r.rating} />
              </div>
              <p className="text-xs" style={{ color: C.textMuted }}>{r.text}</p>
            </div>
          ))}
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
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} placeholder="Cum a fost experiența cu acest meseriaș?" style={{ ...inputStyle, resize: 'none' }} />
          </div>
          <button
            onClick={submitReview}
            disabled={!reviewText.trim()}
            style={{ background: reviewText.trim() ? GRADIENT : C.surface2, opacity: reviewText.trim() ? 1 : 0.6 }}
            className="w-full rounded-xl py-2.5 text-sm font-semibold text-white"
          >
            Trimite recenzia
          </button>
        </div>
      </div>

      <div className="px-5 flex gap-2">
        <button style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold">
          <Phone size={15} color={C.text} /> <span style={{ color: C.text }}>Sună</span>
        </button>
        <button onClick={() => push('chat', { workerId: worker.id, workerName: worker.name })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold">
          <MessageCircle size={15} color={C.text} /> <span style={{ color: C.text }}>Chat</span>
        </button>
        <button onClick={() => push('postJob', { worker })} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-3 text-sm font-semibold text-white text-center">
          Programează
        </button>
      </div>
    </div>
  );
}
