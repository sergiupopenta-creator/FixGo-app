import { ArrowLeft } from 'lucide-react';
import { C } from '../styles/theme';

export default function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
      <ArrowLeft size={16} color={C.text} />
    </button>
  );
}
