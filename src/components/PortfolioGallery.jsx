import { Camera } from 'lucide-react';
import { C } from '../styles/theme';

export default function PortfolioGallery({ items, color }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item, i) => (
        <div key={i} style={{
          width: 120, height: 90, borderRadius: 14, flexShrink: 0, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${color}55, ${color}15)`, border: `1px solid ${C.border}`,
        }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={22} color={`${color}AA`} />
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
          }}>
            <span className="text-xs font-medium" style={{ color: '#fff' }}>{item.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
