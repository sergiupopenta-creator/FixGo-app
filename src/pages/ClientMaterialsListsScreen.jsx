import { ChevronRight, Plus } from 'lucide-react';
import { C, MONO } from '../styles/theme';
import { fmt } from '../utils/helpers';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function ClientMaterialsListsScreen({ materialsLists, chats, push, goBack }) {
  const entries = Object.entries(materialsLists)
    .map(([key, data]) => {
      const items = data.items || [];
      const laborCost = data.laborCost || 0;
      if (items.length === 0 && !(laborCost > 0)) return null;
      const chat = chats.find(c => String(c.workerId) === String(key));
      const name = chat ? chat.workerName : 'Client';
      const total = items.reduce((sum, i) => sum + i.qty * i.price, 0) + laborCost;
      return { key, name, total, itemCount: items.length };
    })
    .filter(Boolean);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Liste pentru clienți</h1>
      </div>

      {entries.length === 0 && <EmptyState text="Nu ai nicio listă trimisă unui client încă." />}
      <div className="flex flex-col gap-3 mb-5">
        {entries.map(e => (
          <button key={e.key} onClick={() => push('chat', { workerId: e.key, workerName: e.name })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full text-left rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold" style={{ color: C.text }}>{e.name}</span>
              <ChevronRight size={16} color={C.textFaint} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: C.textMuted }}>{e.itemCount} materiale</span>
              <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(e.total)} RON</span>
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => push('newClientMaterialsList', {})} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
        <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Listă nouă pentru client</span>
      </button>
    </div>
  );
}
