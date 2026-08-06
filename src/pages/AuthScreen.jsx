import { useState } from 'react';
import { Wrench } from 'lucide-react';
import { C, GRADIENT, MONO, inputStyle } from '../styles/theme';
import { register, login } from '../utils/auth';

export default function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim() && password && (mode === 'login' || name.trim());

  async function submit() {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);
    const result = mode === 'login' ? await login(email, password) : await register(name, email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAuthenticated({ name: result.name, email: result.email });
  }

  return (
    <div className="px-6 pt-16 pb-6 flex flex-col h-full">
      <div className="flex flex-col items-center mb-8">
        <div style={{ width: 64, height: 64, borderRadius: 20, background: GRADIENT }} className="flex items-center justify-center mb-4">
          <Wrench size={28} color="#fff" />
        </div>
        <h1 className="text-xl font-bold" style={{ color: C.text, fontFamily: MONO }}>FixGo</h1>
        <p className="text-xs mt-1" style={{ color: C.textMuted }}>
          {mode === 'login' ? 'Autentifică-te ca să continui' : 'Creează-ți un cont'}
        </p>
      </div>

      {mode === 'register' && (
        <div className="mb-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume complet" style={inputStyle} />
        </div>
      )}
      <div className="mb-3">
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" style={inputStyle} />
      </div>
      <div className="mb-4">
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit(); }}
          type="password"
          placeholder="Parolă"
          style={inputStyle}
        />
      </div>

      {error && <p className="text-xs mb-3" style={{ color: C.red }}>{error}</p>}

      <button
        onClick={submit}
        disabled={!canSubmit || loading}
        style={{ background: (!canSubmit || loading) ? C.surface2 : GRADIENT, opacity: (!canSubmit || loading) ? 0.6 : 1 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mb-4"
      >
        {loading ? 'Se procesează...' : mode === 'login' ? 'Autentificare' : 'Creează cont'}
      </button>

      <button
        onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(null); }}
        style={{ background: 'none', border: 'none' }}
        className="text-xs font-medium text-center"
      >
        <span style={{ color: C.textMuted }}>
          {mode === 'login' ? 'Nu ai cont încă? ' : 'Ai deja cont? '}
        </span>
        <span style={{ color: C.purple }}>{mode === 'login' ? 'Creează unul' : 'Autentifică-te'}</span>
      </button>

      <p className="text-xs text-center mt-auto pt-6" style={{ color: C.textFaint }}>
        Contul e salvat doar pe acest dispozitiv/browser.
      </p>
    </div>
  );
}
