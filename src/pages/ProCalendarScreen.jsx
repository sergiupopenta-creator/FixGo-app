import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { MONTHS_RO, WEEKDAYS_RO } from '../data/mockData';
import { C, GRADIENT, MONO } from '../styles/theme';
import { dateKey, getMonthGrid } from '../utils/helpers';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

export default function ProCalendarScreen({ appointments, push }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [selected, setSelected] = useState('2026-08-05');
  const [query, setQuery] = useState('');

  function changeMonth(delta) {
    let m = month + delta, y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m); setYear(y);
  }

  const cells = getMonthGrid(year, month);
  const selectedAppointments = appointments[selected] || [];
  const selectedDate = new Date(selected + 'T00:00:00');
  const dayLabel = selectedDate.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });

  const allAppointments = Object.entries(appointments).flatMap(([d, list]) => list.map(a => ({ ...a, dateKeyStr: d })));
  const searchResults = query.trim()
    ? allAppointments.filter(a => a.client.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Programări</h1>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-4">
        <Search size={16} color={C.textMuted} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută o persoană..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
      </div>

      {query.trim() ? (
        <div className="flex flex-col gap-2">
          {searchResults.length === 0 && <EmptyState text="Nicio programare găsită pentru această persoană." />}
          {searchResults.map((a, i) => {
            const d = new Date(a.dateKeyStr + 'T00:00:00');
            const label = d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' });
            return (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3 flex items-center gap-3">
                <div className="text-center flex-shrink-0" style={{ width: 64 }}>
                  <div className="text-xs font-bold capitalize" style={{ color: C.text }}>{label}</div>
                  <div className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{a.time}</div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: C.border }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{a.title}</div>
                  <div className="text-xs truncate" style={{ color: C.textMuted }}>{a.client}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => changeMonth(-1)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <ChevronLeft size={14} color={C.text} />
              </button>
              <span className="text-sm font-semibold" style={{ color: C.text }}>{MONTHS_RO[month]} {year}</span>
              <button onClick={() => changeMonth(1)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <ChevronRight size={14} color={C.text} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS_RO.map((w, i) => (
                <div key={i} className="text-center text-xs" style={{ color: C.textFaint }}>{w}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((cell, i) => {
                const key = dateKey(year, month, cell.day);
                const hasAppt = cell.current && appointments[key];
                const isSelected = cell.current && key === selected;
                return (
                  <button
                    key={i}
                    disabled={!cell.current}
                    onClick={() => setSelected(key)}
                    style={{
                      aspectRatio: '1', borderRadius: 10,
                      background: isSelected ? GRADIENT : 'transparent',
                      opacity: cell.current ? 1 : 0.3,
                    }}
                    className="flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="text-xs" style={{ color: isSelected ? '#fff' : C.text }}>{cell.day}</span>
                    {hasAppt && !isSelected && <span style={{ background: C.purple, width: 4, height: 4, borderRadius: 9999 }} />}
                  </button>
                );
              })}
            </div>
          </div>

          <h2 className="text-sm font-semibold mb-3 capitalize" style={{ color: C.text }}>{dayLabel}</h2>
          {selectedAppointments.length === 0 && <EmptyState text="Nicio programare în această zi." />}
          <div className="flex flex-col gap-2 mb-3">
            {selectedAppointments.map((a, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3 flex items-center gap-3">
                <div className="text-center flex-shrink-0" style={{ width: 44 }}>
                  <div className="text-sm font-bold" style={{ color: C.text, fontFamily: MONO }}>{a.time}</div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: C.border }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{a.title}</div>
                  <div className="text-xs truncate" style={{ color: C.textMuted }}>{a.client}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>

          <button
            onClick={() => push('newAppointment', { dateKey: selected, dayLabel })}
            style={{ background: C.surface2, border: `1px dashed ${C.border}` }}
            className="w-full rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă programare</span>
          </button>
        </>
      )}
    </div>
  );
}
