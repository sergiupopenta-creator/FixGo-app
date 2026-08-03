import { C, MONO } from '../styles/theme';
import { fmt } from '../utils/helpers';

export default function EstimateRow({ label, min, max, percent, color }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: C.text }}>{label}</span>
        <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{fmt(min)} - {fmt(max)} RON</span>
      </div>
      <div style={{ background: C.surface2, height: 6, borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 9999 }} />
      </div>
    </div>
  );
}
