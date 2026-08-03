import { useState } from 'react';
import { CheckCircle2, Search } from 'lucide-react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import Field from '../components/Field';

export default function NewAppointmentScreen({ dateKey: presetDateKey, dayLabel: presetDayLabel, presetClient, clients, goBack, onSubmit }) {
  const [selectedClient, setSelectedClient] = useState(presetClient || (clients && clients[0]) || null);
  const [dateValue, setDateValue] = useState(presetDateKey || '');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [clientQuery, setClientQuery] = useState('');

  const canSubmit = selectedClient && dateValue && time.trim() && title.trim();
  const filteredClients = (clients || []).filter(c => c.clientName.toLowerCase().includes(clientQuery.toLowerCase()));

  function handleSubmit() {
    const d = new Date(dateValue + 'T00:00:00');
    const finalDayLabel = presetDateKey ? presetDayLabel : d.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });
    onSubmit({ dateKey: dateValue, dayLabel: finalDayLabel, time: time.trim(), title: title.trim(), client: selectedClient });
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <div>
          <h1 className="text-base font-semibold" style={{ color: C.text }}>Programare nouă</h1>
          {presetDateKey && <div className="text-xs capitalize" style={{ color: C.textMuted }}>{presetDayLabel}</div>}
        </div>
      </div>

      {presetClient ? (
        <Field label="Client">
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-3 rounded-xl p-2.5">
            <Avatar name={presetClient.clientName} size={32} />
            <span className="text-sm" style={{ color: C.text }}>{presetClient.clientName}</span>
          </div>
        </Field>
      ) : (
        <Field label="Client">
          {(!clients || clients.length === 0) ? (
            <p className="text-xs" style={{ color: C.textMuted }}>Nu ai încă niciun client cu care să vorbești.</p>
          ) : (
            <>
              <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2">
                <Search size={15} color={C.textMuted} />
                <input value={clientQuery} onChange={e => setClientQuery(e.target.value)} placeholder="Caută o persoană..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
              </div>
              <div className="flex flex-col gap-2">
                {filteredClients.length === 0 && <p className="text-xs" style={{ color: C.textMuted }}>Nicio persoană găsită.</p>}
                {filteredClients.map(c => {
                  const isActive = selectedClient?.clientId === c.clientId;
                  return (
                    <button
                      key={c.clientId}
                      onClick={() => setSelectedClient(c)}
                      style={{
                        background: isActive ? 'rgba(249,115,22,0.1)' : C.surface,
                        border: `1px solid ${isActive ? C.purple : C.border}`,
                      }}
                      className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left"
                    >
                      <Avatar name={c.clientName} size={32} />
                      <span className="text-sm flex-1" style={{ color: C.text }}>{c.clientName}</span>
                      {isActive && <CheckCircle2 size={16} color={C.purple} />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </Field>
      )}

      {!presetDateKey && (
        <Field label="Data">
          <input type="date" value={dateValue} onChange={e => setDateValue(e.target.value)} style={inputStyle} />
        </Field>
      )}

      <Field label="Ora">
        <input value={time} onChange={e => setTime(e.target.value)} placeholder="ex. 14:00" style={inputStyle} />
      </Field>

      <Field label="Titlu lucrare">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ex. Instalație electrică" style={inputStyle} />
      </Field>

      <button
        disabled={!canSubmit}
        onClick={handleSubmit}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2"
      >
        Trimite programarea la client
      </button>
    </div>
  );
}
