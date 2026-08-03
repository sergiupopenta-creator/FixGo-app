import { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function PaymentMethodsScreen({ methods, onAdd, onRemove, goBack }) {
  const [showForm, setShowForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  function submit() {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 4) return;
    onAdd({ brand: 'Card', last4: digits.slice(-4), expiry: expiry || '--/--' });
    setCardNumber(''); setExpiry(''); setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Metode de plată</h1>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {methods.length === 0 && <EmptyState text="Nu ai nicio metodă de plată salvată." />}
        {methods.map(m => (
          <div key={m.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center gap-3">
            <div style={{ background: C.surface2 }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard size={17} color={C.cyan} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{m.brand} •••• {m.last4}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>Expiră {m.expiry}</div>
            </div>
            <button onClick={() => onRemove(m.id)} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <Trash2 size={14} color={C.red} />
            </button>
          </div>
        ))}
      </div>
      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-2"><input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Număr card" style={inputStyle} /></div>
          <div className="mb-3"><input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="Expirare (LL/AA)" style={inputStyle} /></div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold"><span style={{ color: C.textMuted }}>Anulează</span></button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">Adaugă</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă card</span>
        </button>
      )}
    </div>
  );
}
