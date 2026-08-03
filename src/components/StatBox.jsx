import { C, MONO } from '../styles/theme';

export default function StatBox({ label, value }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-2.5 text-center">
      <div className="text-sm font-bold" style={{ color: C.text, fontFamily: MONO }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}
