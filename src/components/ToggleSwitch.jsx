import { C } from '../styles/theme';

export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} style={{
      width: 44, height: 26, borderRadius: 9999, background: checked ? C.purple : C.surface2,
      border: `1px solid ${checked ? 'transparent' : C.border}`, position: 'relative', flexShrink: 0, padding: 0,
    }}>
      <div style={{
        position: 'absolute', top: 2, left: checked ? 20 : 2, width: 20, height: 20, borderRadius: 9999,
        background: '#fff', transition: 'left 0.15s',
      }} />
    </button>
  );
}
