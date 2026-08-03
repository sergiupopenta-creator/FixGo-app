import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORIES, WORKERS } from '../data/mockData';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import CategoryChip from '../components/CategoryChip';
import Field from '../components/Field';
import Rating from '../components/Rating';

export default function PostJobScreen({ worker, goBack, onSubmit }) {
  const [requestType, setRequestType] = useState(worker ? 'direct' : 'open');
  const [selectedWorker, setSelectedWorker] = useState(worker || null);
  const [title, setTitle] = useState(worker ? `Lucrare pentru ${worker.category.toLowerCase()}` : '');
  const [category, setCategory] = useState(worker ? worker.categoryId : CATEGORIES[0].id);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medie');

  const workersInCategory = WORKERS.filter(w => w.categoryId === category);
  const needsWorkerPick = !worker && requestType === 'direct';
  const canSubmit = title.trim() && description.trim() && address.trim() && (!needsWorkerPick || selectedWorker);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Postează o lucrare</h1>
      </div>

      {worker && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-3 rounded-xl p-3 mb-5">
          <Avatar name={worker.name} size={36} />
          <div className="text-xs" style={{ color: C.textMuted }}>Programezi cu <span className="font-semibold" style={{ color: C.text }}>{worker.name}</span></div>
        </div>
      )}

      {!worker && (
        <Field label="Cum trimiți cererea?">
          <div className="flex gap-2">
            <button
              onClick={() => setRequestType('open')}
              style={{ background: requestType === 'open' ? GRADIENT : C.surface, border: `1px solid ${requestType === 'open' ? 'transparent' : C.border}` }}
              className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
            >
              <span style={{ color: requestType === 'open' ? '#fff' : C.textMuted }}>Către mai mulți meseriași</span>
            </button>
            <button
              onClick={() => setRequestType('direct')}
              style={{ background: requestType === 'direct' ? GRADIENT : C.surface, border: `1px solid ${requestType === 'direct' ? 'transparent' : C.border}` }}
              className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
            >
              <span style={{ color: requestType === 'direct' ? '#fff' : C.textMuted }}>Către un meseriaș anume</span>
            </button>
          </div>
          <p className="text-xs mt-2" style={{ color: C.textMuted }}>
            {requestType === 'open'
              ? 'Mai mulți meseriași pot accepta, iar tu alegi pe cine preferi.'
              : 'Trimiți cererea unui singur meseriaș, ales de tine.'}
          </p>
        </Field>
      )}

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

      {needsWorkerPick && (
        <Field label="Alege meseriașul">
          {workersInCategory.length === 0 ? (
            <p className="text-xs" style={{ color: C.textMuted }}>Niciun meseriaș disponibil în această categorie.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {workersInCategory.map(w => {
                const isActive = selectedWorker?.id === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorker(w)}
                    style={{ background: isActive ? 'rgba(249,115,22,0.1)' : C.surface, border: `1px solid ${isActive ? C.purple : C.border}` }}
                    className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left"
                  >
                    <Avatar name={w.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{w.name}</div>
                      <Rating value={w.rating} count={w.reviews} />
                    </div>
                    {isActive && <CheckCircle2 size={16} color={C.purple} />}
                  </button>
                );
              })}
            </div>
          )}
        </Field>
      )}

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
          status: 'Nou', budget: budget || 'La discuție', address, date: date || 'Flexibil',
          priority, description,
          type: worker || requestType === 'direct' ? 'direct' : 'open',
          worker: worker?.name || selectedWorker?.name,
          applicants: (worker || requestType === 'direct') ? undefined : [],
        })}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2">
        {(!worker && requestType === 'open') ? 'Postează pentru meseriași' : 'Trimite cererea'}
      </button>
    </div>
  );
}
