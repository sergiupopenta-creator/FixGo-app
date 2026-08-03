import { useState } from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES, WORKERS } from '../data/mockData';
import { C } from '../styles/theme';
import CategoryChip from '../components/CategoryChip';
import EmptyState from '../components/EmptyState';
import WorkerRow from '../components/WorkerRow';

export default function SearchScreen({ push, initialCategory }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || null);

  const filtered = WORKERS.filter(w => {
    const matchCat = activeCategory ? w.categoryId === activeCategory : true;
    const q = query.toLowerCase();
    const matchQuery = query ? (w.name.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)) : true;
    return matchCat && matchQuery;
  });

  return (
    <div className="pb-6">
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2.5 min-w-0">
            <Search size={16} color={C.textMuted} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută meseriaș sau serviciu..." className="bg-transparent outline-none text-sm flex-1 min-w-0" style={{ color: C.text }} />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryChip label="Toate" active={!activeCategory} onClick={() => setActiveCategory(null)} />
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={activeCategory === c.id} onClick={() => setActiveCategory(c.id)} />
          ))}
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <div className="text-xs mb-1" style={{ color: C.textMuted }}>{filtered.length} meseriași găsiți</div>
        {filtered.map(w => <WorkerRow key={w.id} worker={w} onClick={() => push('worker', { worker: w })} />)}
        {filtered.length === 0 && <EmptyState text="Niciun meseriaș găsit pentru filtrele alese." />}
      </div>
    </div>
  );
}
