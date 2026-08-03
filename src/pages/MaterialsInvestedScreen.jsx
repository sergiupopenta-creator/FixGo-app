import { C, MONO } from '../styles/theme';
import { fmt } from '../utils/helpers';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function MaterialsInvestedScreen({ materialsLists, chats, goBack }) {
  const entries = Object.entries(materialsLists)
    .map(([key, data]) => {
      const items = data.items || [];
      const laborCost = data.laborCost || 0;
      if (items.length === 0 && !(laborCost > 0)) return null;
      const chat = chats.find(c => String(c.workerId) === String(key));
      const name = chat ? chat.workerName : 'Client';
      const materialsTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
      return { key, name, materialsTotal, laborCost, total: materialsTotal + laborCost, itemCount: items.length };
    })
    .filter(Boolean);

  const grandTotal = entries.reduce((sum, e) => sum + e.total, 0);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Materiale investite</h1>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs mb-1" style={{ color: C.textMuted }}>Total investit</div>
          <div className="text-xl font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(grandTotal)} RON</div>
        </div>
        <div className="text-xs" style={{ color: C.textMuted }}>{entries.length} clienți</div>
      </div>

      {entries.length === 0 && <EmptyState text="Nu ai nicio listă de materiale trimisă încă unui client." />}
      <div className="flex flex-col gap-3">
        {entries.map(e => (
          <div key={e.key} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
            <div className="flex items-center gap-3 mb-2">
              <Avatar name={e.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{e.name}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>{e.itemCount} materiale</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <span style={{ color: C.textMuted }}>Materiale</span>
                <span style={{ fontFamily: MONO, color: C.text }}>{fmt(e.materialsTotal)} RON</span>
              </div>
              {e.laborCost > 0 && (
                <div className="flex items-center justify-between">
                  <span style={{ color: C.textMuted }}>Manoperă</span>
                  <span style={{ fontFamily: MONO, color: C.text }}>{fmt(e.laborCost)} RON</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1.5 mt-0.5" style={{ borderTop: `1px solid ${C.border}` }}>
                <span className="font-semibold" style={{ color: C.text }}>Total</span>
                <span className="font-bold" style={{ fontFamily: MONO, color: C.purple }}>{fmt(e.total)} RON</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
