import { useState } from 'react';
import { CATEGORIES } from '../data/mockData';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import BackButton from '../components/BackButton';
import CategoryChip from '../components/CategoryChip';
import Field from '../components/Field';

export default function EditJobScreen({ job, goBack, onSubmit }) {
  const [title, setTitle] = useState(job.title || '');
  const [category, setCategory] = useState(CATEGORIES.find(c => c.name === job.category)?.id || CATEGORIES[0].id);
  const [description, setDescription] = useState(job.description || '');
  const [budget, setBudget] = useState(job.budget || '');
  const [address, setAddress] = useState(job.address || '');
  const [date, setDate] = useState(job.date || '');
  const [priority, setPriority] = useState(job.priority || 'Medie');

  const canSubmit = title.trim() && description.trim() && address.trim();

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Editează lucrarea</h1>
      </div>

      <Field label="Titlu lucrare">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ex. Instalație electrică apartament" style={inputStyle} />
      </Field>

      <Field label="Categorie">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={category === c.id} onClick={() => setCategory(c.id)} />
          ))}
        </div>
      </Field>

      <Field label="Descriere">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Descrie ce ai nevoie să se facă..." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Buget estimativ (RON)">
        <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="ex. 500 - 800 RON" style={inputStyle} />
      </Field>

      <Field label="Adresă">
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="ex. Sector 3, București" style={inputStyle} />
      </Field>

      <Field label="Data dorită">
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="ex. 15 Iunie 2026" style={inputStyle} />
      </Field>

      <Field label="Prioritate">
        <div className="flex gap-2">
          {['Scăzută', 'Medie', 'Ridicată'].map(p => (
            <button key={p} onClick={() => setPriority(p)} style={{ background: priority === p ? GRADIENT : C.surface, border: `1px solid ${priority === p ? 'transparent' : C.border}` }} className="flex-1 rounded-xl py-2 text-xs font-semibold">
              <span style={{ color: priority === p ? '#fff' : C.textMuted }}>{p}</span>
            </button>
          ))}
        </div>
      </Field>

      <button
        disabled={!canSubmit}
        onClick={() => onSubmit({
          title, category: CATEGORIES.find(c => c.id === category)?.name || category,
          budget: budget || 'La discuție', address, date: date || 'Flexibil',
          priority, description,
        })}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2">
        Salvează modificările
      </button>
    </div>
  );
}
