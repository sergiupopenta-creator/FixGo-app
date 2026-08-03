import { useState } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function AddressesScreen({ addresses, onAdd, onRemove, goBack }) {
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');

  function submit() {
    if (!label.trim() || !address.trim()) return;
    onAdd({ label: label.trim(), address: address.trim() });
    setLabel(''); setAddress(''); setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Adresele mele</h1>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {addresses.length === 0 && <EmptyState text="Nu ai nicio adresă salvată." />}
        {addresses.map(a => (
          <div key={a.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center gap-3">
            <div style={{ background: C.surface2 }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={17} color={C.purple} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{a.label}</div>
              <div className="text-xs truncate" style={{ color: C.textMuted }}>{a.address}</div>
            </div>
            <button onClick={() => onRemove(a.id)} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <Trash2 size={14} color={C.red} />
            </button>
          </div>
        ))}
      </div>
      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-2"><input value={label} onChange={e => setLabel(e.target.value)} placeholder="Etichetă (ex. Acasă)" style={inputStyle} /></div>
          <div className="mb-3"><input value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresă completă" style={inputStyle} /></div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold"><span style={{ color: C.textMuted }}>Anulează</span></button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">Adaugă</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă adresă</span>
        </button>
      )}
    </div>
  );
}
