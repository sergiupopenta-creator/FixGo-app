import { useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, Plus } from 'lucide-react';
import { MONTHS_RO, WEEKDAYS_RO } from '../data/mockData';
import { C, GRADIENT, MONO, inputStyle } from '../styles/theme';
import { dateKey, fmt, getMonthGrid } from '../utils/helpers';
import BackButton from '../components/BackButton';

export default function EarningsScreen({ dailyEarnings, onAddEarning, push, goBack }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  function changeMonth(delta) {
    let m = month + delta, y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m); setYear(y);
    setSelected(null);
    setShowAddForm(false);
  }

  function dayTotal(entries) { return (entries || []).reduce((sum, e) => sum + e.amount, 0); }

  const cells = getMonthGrid(year, month);
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthTotal = Object.entries(dailyEarnings)
    .filter(([date]) => date.startsWith(monthPrefix))
    .reduce((sum, [, entries]) => sum + dayTotal(entries), 0);

  const selectedEntries = selected ? (dailyEarnings[selected] || []) : [];
  const selectedTotal = dayTotal(selectedEntries);
  const selectedLabel = selected
    ? new Date(selected + 'T00:00:00').toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  function submitEarning() {
    if (!selected || !amount) return;
    onAddEarning(selected, Number(amount) || 0, note.trim());
    setAmount('');
    setNote('');
    setShowAddForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Încasări</h1>
      </div>

      <div style={{ background: GRADIENT }} className="rounded-2xl p-4 mb-4 text-center">
        <div className="text-xs mb-1 capitalize" style={{ color: 'rgba(255,255,255,0.85)' }}>Total {MONTHS_RO[month]} {year}</div>
        <div className="text-2xl font-bold text-white" style={{ fontFamily: MONO }}>{fmt(monthTotal)} RON</div>
      </div>

      <button onClick={() => push('materialsInvested', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-3.5 mb-5 flex items-center justify-between text-left">
        <div className="flex items-center gap-3 min-w-0">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
            <ClipboardList size={16} color={C.purple} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold" style={{ color: C.text }}>Materiale investite</div>
            <div className="text-xs" style={{ color: C.textMuted }}>Cât ai cheltuit pe fiecare client</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => changeMonth(-1)} aria-label="Luna anterioară" style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
            <ChevronLeft size={14} color={C.text} />
          </button>
          <span className="text-sm font-semibold" style={{ color: C.text }}>{MONTHS_RO[month]} {year}</span>
          <button onClick={() => changeMonth(1)} aria-label="Luna următoare" style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
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
            const amount = cell.current ? dayTotal(dailyEarnings[key]) : 0;
            const isSelected = cell.current && key === selected;
            return (
              <button
                key={i}
                disabled={!cell.current}
                onClick={() => { setSelected(key); setShowAddForm(false); }}
                style={{
                  aspectRatio: '1', borderRadius: 10,
                  background: isSelected ? GRADIENT : (amount ? 'rgba(249,115,22,0.14)' : 'transparent'),
                  opacity: cell.current ? 1 : 0.3,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
                }}
              >
                <span className="text-xs" style={{ color: isSelected ? '#fff' : C.text }}>{cell.day}</span>
                {amount > 0 ? (
                  <span style={{ fontSize: 8, color: isSelected ? 'rgba(255,255,255,0.9)' : C.purple, fontFamily: MONO }}>
                    {amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {selected ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs capitalize" style={{ color: C.textMuted }}>{selectedLabel}</div>
            <button onClick={() => setShowAddForm(s => !s)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
              <Plus size={14} color={C.text} />
            </button>
          </div>

          {selectedEntries.length > 0 ? (
            <div className="flex flex-col gap-1.5 mb-2">
              {selectedEntries.map(e => (
                <div key={e.id} className="flex items-center justify-between text-xs">
                  <span style={{ color: C.textMuted }}>{e.note || 'Încasare'}</span>
                  <span style={{ color: C.text, fontFamily: MONO }}>{fmt(e.amount)} RON</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1.5 mt-0.5" style={{ borderTop: `1px solid ${C.border}` }}>
                <span className="text-sm font-semibold" style={{ color: C.text }}>Total zi</span>
                <span className="text-lg font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(selectedTotal)} RON</span>
              </div>
            </div>
          ) : (
            <div className="text-sm mb-1" style={{ color: C.textFaint }}>Nicio încasare în această zi.</div>
          )}

          {showAddForm && (
            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
              <div className="mb-2">
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" placeholder="Sumă încasată (RON)" style={inputStyle} />
              </div>
              <div className="mb-3">
                <input value={note} onChange={e => setNote(e.target.value)} placeholder="Client / notă (opțional)" style={inputStyle} />
              </div>
              <button
                onClick={submitEarning}
                disabled={!amount}
                style={{ background: amount ? GRADIENT : C.surface2, opacity: amount ? 1 : 0.6 }}
                className="w-full rounded-xl py-2.5 text-xs font-semibold text-white"
              >
                Adaugă încasare
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-center" style={{ color: C.textFaint }}>Apasă pe o zi din calendar ca să adaugi sau să vezi o încasare.</p>
      )}
    </div>
  );
}
