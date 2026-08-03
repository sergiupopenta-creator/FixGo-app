import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { C, GRADIENT, MONO, inputStyle } from '../styles/theme';
import { fmt } from '../utils/helpers';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function MyNotesListScreen({ lists, onAdd, onOpen, goBack }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');

  function submit() {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
    setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Notițele mele</h1>
      </div>
      <p className="text-xs mb-4" style={{ color: C.textMuted }}>Listele tale personale de materiale — doar pentru tine, nu se trimit nimănui.</p>

      <div className="flex flex-col gap-3 mb-5">
        {lists.length === 0 && <EmptyState text="Nu ai nicio listă încă." />}
        {lists.map(l => {
          const total = l.items.reduce((sum, i) => sum + i.qty * i.price, 0);
          return (
            <button key={l.id} onClick={() => onOpen(l.id)} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full text-left rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold" style={{ color: C.text }}>{l.title}</span>
                <ChevronRight size={16} color={C.textFaint} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: C.textMuted }}>{l.items.length} materiale</span>
                <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(total)} RON</span>
              </div>
            </button>
          );
        })}
      </div>

      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-3">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nume listă (ex. Instalație baie)" style={inputStyle} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold">
              <span style={{ color: C.textMuted }}>Anulează</span>
            </button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">Creează</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Listă nouă</span>
        </button>
      )}
    </div>
  );
}
