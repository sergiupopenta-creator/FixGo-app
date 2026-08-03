import { Search } from 'lucide-react';
import { C } from '../styles/theme';

export default function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div style={{ background: C.surface2 }} className="w-14 h-14 rounded-full flex items-center justify-center mb-3">
        <Search size={22} color={C.textFaint} />
      </div>
      <p className="text-xs" style={{ color: C.textMuted }}>{text}</p>
    </div>
  );
}
