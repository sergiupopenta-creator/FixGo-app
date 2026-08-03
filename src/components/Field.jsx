import { C } from '../styles/theme';

export default function Field({ label, children }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-medium mb-1.5" style={{ color: C.textMuted }}>{label}</div>
      {children}
    </div>
  );
}
