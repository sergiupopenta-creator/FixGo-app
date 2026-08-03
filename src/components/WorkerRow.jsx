import { ShieldCheck } from 'lucide-react';
import { C } from '../styles/theme';
import Avatar from './Avatar';
import Rating from './Rating';

export default function WorkerRow({ worker, onClick }) {
  return (
    <button onClick={onClick} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-2xl p-3 text-left">
      <Avatar name={worker.name} size={48} online={worker.available} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold truncate" style={{ color: C.text }}>{worker.name}</span>
          {worker.verified && <ShieldCheck size={13} color={C.cyan} />}
        </div>
        <div className="text-xs truncate" style={{ color: C.textMuted }}>{worker.category} · {worker.area}</div>
        <div className="mt-1"><Rating value={worker.rating} count={worker.reviews} /></div>
      </div>
      {worker.available && (
        <span style={{ background: 'rgba(52,211,153,0.15)', color: C.green }} className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">Disponibil</span>
      )}
    </button>
  );
}
