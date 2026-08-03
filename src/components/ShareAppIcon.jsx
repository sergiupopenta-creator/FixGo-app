import { C } from '../styles/theme';

export default function ShareAppIcon({ icon: Icon, bg, label, onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0 }} className="flex flex-col items-center gap-1.5">
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg }} className="flex items-center justify-center">
        <Icon size={22} color="#fff" />
      </div>
      <span className="text-xs" style={{ color: C.textMuted }}>{label}</span>
    </button>
  );
}
