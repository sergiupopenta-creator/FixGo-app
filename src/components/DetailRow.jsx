import { C } from '../styles/theme';

export default function DetailRow({ label, value }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
      <div className="text-xs mb-1" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-xs font-semibold" style={{ color: C.text }}>{value}</div>
    </div>
  );
}
