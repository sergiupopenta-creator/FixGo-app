import { useState } from 'react';
import { Package } from 'lucide-react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import BackButton from '../components/BackButton';
import Field from '../components/Field';

export default function QuickTaskScreen({ goBack, onSubmit }) {
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [address, setAddress] = useState('');

  const canSubmit = description.trim() && address.trim();

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Task rapid</h1>
      </div>

      <div className="flex flex-col items-center mb-6 mt-2">
        <div style={{ width: 72, height: 72, borderRadius: 9999, background: GRADIENT }} className="flex items-center justify-center mb-3">
          <Package size={30} color="#fff" />
        </div>
        <p className="text-xs text-center" style={{ color: C.textMuted, maxWidth: 260 }}>
          Ai o treabă mică — mutat mobilă, cărat cutii, o reparație rapidă? Postează aici și oferă un mic bonus meseriașilor din zonă.
        </p>
      </div>

      <Field label="Ce ai nevoie să se facă?">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="ex. Am nevoie de cineva să mă ajute să urc o canapea la etajul 3." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Bonus oferit (opțional)">
        <input value={reward} onChange={e => setReward(e.target.value)} placeholder="ex. 50 RON" style={inputStyle} />
      </Field>

      <Field label="Adresă">
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="ex. Sector 2, București" style={inputStyle} />
      </Field>

      <button
        disabled={!canSubmit}
        onClick={() => onSubmit({ description: description.trim(), reward: reward.trim() || 'La discuție', address: address.trim() })}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2"
      >
        Trimite task-ul
      </button>
    </div>
  );
}
