import { C, GRADIENT } from '../styles/theme';

export default function CategoryChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ background: active ? GRADIENT : C.surface, border: `1px solid ${active ? 'transparent' : C.border}`, flexShrink: 0 }} className="px-3.5 py-2 rounded-full text-xs font-medium">
      <span style={{ color: active ? '#fff' : C.textMuted }}>{label}</span>
    </button>
  );
}
