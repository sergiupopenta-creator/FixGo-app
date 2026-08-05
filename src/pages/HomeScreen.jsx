import { Bell, Bot, ChevronDown, ChevronRight, MapPin, Package, Search } from 'lucide-react';
import { CATEGORIES, WORKERS } from '../data/mockData';
import { C, GRADIENT } from '../styles/theme';
import WorkerRow from '../components/WorkerRow';

export default function HomeScreen({ push, firstName, hasUnreadNotifications, location }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => push('locationPicker', {})} style={{ background: 'none', border: 'none', padding: 0, color: C.textMuted }} className="flex items-center gap-1.5">
          <MapPin size={14} />
          <span className="text-xs font-medium">{location}, România</span>
          <ChevronDown size={14} />
        </button>
        <button onClick={() => push('notifications', {})} aria-label="Notificări" style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center relative">
          <Bell size={16} color={C.text} />
          {hasUnreadNotifications && <span style={{ background: C.red, position: 'absolute', top: 7, right: 8 }} className="w-1.5 h-1.5 rounded-full" />}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-1" style={{ color: C.text, letterSpacing: '-0.02em' }}>Bună, {firstName}! 👋</h1>
      <p className="text-sm mb-5" style={{ color: C.textMuted }}>Cu ce te putem ajuta astăzi?</p>

      <button onClick={() => push('search', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-6 text-left">
        <Search size={18} color={C.textMuted} />
        <span className="text-sm" style={{ color: C.textFaint }}>Caută un serviciu...</span>
      </button>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold" style={{ color: C.text }}>Categorii populare</h2>
        <button onClick={() => push('search', {})} className="text-xs font-medium" style={{ color: C.purple }}>Vezi toate</button>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => push('search', { category: cat.id })} className="flex flex-col items-center gap-2">
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `${cat.color}1A`, fontSize: 24 }} className="flex items-center justify-center">
              {cat.emoji}
            </div>
            <span className="text-xs text-center leading-tight" style={{ color: C.textMuted, fontSize: 11 }}>{cat.name}</span>
          </button>
        ))}
      </div>

      <button onClick={() => push('estimator', {})} style={{ background: GRADIENT }} className="w-full rounded-2xl p-4 mb-4 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div style={{ background: 'rgba(255,255,255,0.16)' }} className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">AI Estimator</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Află prețul estimativ pentru lucrare</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.18)' }} className="inline-flex items-center gap-1 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          Cere estimare <ChevronRight size={13} />
        </div>
      </button>

      <button onClick={() => push('postQuickTask', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-6 flex items-center justify-between text-left">
        <div className="flex items-center gap-3 min-w-0">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package size={20} color={C.purple} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold" style={{ color: C.text }}>Task rapid</div>
            <div className="text-xs" style={{ color: C.textMuted }}>Ajutor pentru o treabă mică, cu un mic bonus</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>

      <h2 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Meseriași de top lângă tine</h2>
      <div className="flex flex-col gap-3">
        {WORKERS.slice(0, 4).map(w => (
          <WorkerRow key={w.id} worker={w} onClick={() => push('worker', { worker: w })} />
        ))}
      </div>
    </div>
  );
}
