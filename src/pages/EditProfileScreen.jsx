import { useState } from 'react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import BackButton from '../components/BackButton';
import Field from '../components/Field';

export default function EditProfileScreen({ profile, onSave, goBack }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || '');

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Informațiile mele</h1>
      </div>
      <Field label="Nume complet">
        <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      </Field>
      <Field label="Email">
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={inputStyle} />
      </Field>
      <Field label="Telefon">
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="ex. 07xx xxx xxx" style={inputStyle} />
      </Field>
      <button
        onClick={() => { onSave({ name, email, phone }); goBack(); }}
        style={{ background: GRADIENT }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2"
      >
        Salvează modificările
      </button>
    </div>
  );
}
