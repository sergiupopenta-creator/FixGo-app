import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { C, MONO, inputStyle } from '../styles/theme';
import { fmt } from '../utils/helpers';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function MyNotesDetailScreen({ list, onUpdateItems, onDelete, goBack }) {
  const [items, setItems] = useState(list.items);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('1');
  const [price, setPrice] = useState('');

  function addItem() {
    if (!name.trim() || !price) return;
    const newItems = [...items, { id: Date.now(), name: name.trim(), qty: Number(qty) || 1, price: Number(price) || 0 }];
    setItems(newItems);
    onUpdateItems(newItems);
    setName(''); setQty('1'); setPrice('');
  }
  function removeItem(id) {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    onUpdateItems(newItems);
  }

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <BackButton onClick={goBack} />
          <h1 className="text-base font-semibold truncate" style={{ color: C.text }}>{list.title}</h1>
        </div>
        <button onClick={() => { onDelete(list.id); goBack(); }} aria-label="Șterge lista" style={{ background: C.surface2 }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
          <Trash2 size={15} color={C.red} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {items.length === 0 && <EmptyState text="Nu ai adăugat încă niciun material." />}
        {items.map(item => (
          <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{item.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{item.qty} buc × {fmt(item.price)} RON</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(item.qty * item.price)} RON</span>
              <button onClick={() => removeItem(item.id)} aria-label={`Șterge ${item.name}`} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <X size={13} color={C.textMuted} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă material</div>
        <div className="mb-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Denumire material" style={inputStyle} />
        </div>
        <div className="flex gap-2 mb-2">
          <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" placeholder="Cantitate" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" placeholder="Preț unitar (RON)" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
        </div>
        <button onClick={addItem} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-full rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
          <Plus size={14} color={C.text} /> <span style={{ color: C.text }}>Adaugă în listă</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-semibold" style={{ color: C.text }}>Total</span>
        <span className="text-base font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(total)} RON</span>
      </div>
    </div>
  );
}
