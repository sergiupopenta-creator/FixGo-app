import { useState } from 'react';
import { CheckCircle2, MapPin, Search } from 'lucide-react';
import { ROMANIAN_CITIES } from '../data/mockData';
import { C } from '../styles/theme';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function LocationPickerScreen({ currentLocation, onSelect, goBack }) {
  const [query, setQuery] = useState('');
  const filtered = ROMANIAN_CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Alege locația</h1>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-4">
        <Search size={16} color={C.textMuted} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută un oraș..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
      </div>

      <div className="flex flex-col">
        {filtered.map(city => {
          const isActive = city === currentLocation;
          return (
            <button
              key={city}
              onClick={() => { onSelect(city); goBack(); }}
              style={{ borderBottom: `1px solid ${C.border}` }}
              className="w-full flex items-center gap-3 py-3.5 text-left"
            >
              <MapPin size={16} color={isActive ? C.purple : C.textMuted} />
              <span className="text-sm flex-1" style={{ color: isActive ? C.purple : C.text, fontWeight: isActive ? 600 : 400 }}>{city}</span>
              {isActive && <CheckCircle2 size={16} color={C.purple} />}
            </button>
          );
        })}
        {filtered.length === 0 && <EmptyState text="Niciun oraș găsit." />}
      </div>
    </div>
  );
}
