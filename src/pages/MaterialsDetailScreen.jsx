import { FileText } from 'lucide-react';
import { C, MONO } from '../styles/theme';
import { fmt } from '../utils/helpers';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function MaterialsDetailScreen({ message, goBack }) {
  if (!message) return <EmptyState text="Listă negăsită." />;
  const materialsTotal = message.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const laborCost = message.laborCost || 0;

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Listă materiale</h1>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {message.items.map((it, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{it.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{it.qty} buc × {fmt(it.price)} RON</div>
            </div>
            <span className="text-sm font-semibold flex-shrink-0" style={{ color: C.purple, fontFamily: MONO }}>{fmt(it.qty * it.price)} RON</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 mb-6 px-1">
        {laborCost > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: C.textMuted }}>Manoperă</span>
            <span style={{ color: C.text, fontFamily: MONO }}>{fmt(laborCost)} RON</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: C.textMuted }}>Materiale</span>
          <span style={{ color: C.text, fontFamily: MONO }}>{fmt(materialsTotal)} RON</span>
        </div>
        <div className="flex items-center justify-between pt-1.5 mt-1" style={{ borderTop: `1px solid ${C.border}` }}>
          <span className="text-base font-semibold" style={{ color: C.text }}>Total</span>
          <span className="text-lg font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(materialsTotal + laborCost)} RON</span>
        </div>
      </div>

      {message.attachments && message.attachments.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Atașamente</h2>
          <div className="flex flex-col gap-2">
            {message.attachments.map(att => (
              att.type === 'image' ? (
                <img key={att.id} src={att.url} alt={att.name} style={{ width: '100%', borderRadius: 14, display: 'block' }} />
              ) : (
                <a
                  key={att.id}
                  href={att.url}
                  download={att.name}
                  style={{ background: C.surface, border: `1px solid ${C.border}`, textDecoration: 'none' }}
                  className="flex items-center gap-3 rounded-xl p-3"
                >
                  <div style={{ background: C.surface2 }} className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} color={C.red} />
                  </div>
                  <span className="text-sm flex-1 truncate" style={{ color: C.text }}>{att.name}</span>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
