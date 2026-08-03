import { MONTHLY_REVENUE } from '../data/mockData';
import { C, GRADIENT } from '../styles/theme';
import BackButton from '../components/BackButton';
import ProStatCard from '../components/ProStatCard';

export default function ProStatsScreen({ goBack }) {
  const max = Math.max(...MONTHLY_REVENUE.map(m => m.value));
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Statistici</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <ProStatCard label="Solicitări primite" value="48" delta="+12%" />
        <ProStatCard label="Lucrări finalizate" value="32" delta="+8%" />
        <ProStatCard label="Rata de acceptare" value="87%" delta="+4%" />
        <ProStatCard label="Rating mediu" value="4.9" isRating />
      </div>
      <h2 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Încasări lunare (RON)</h2>
      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4">
        <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
          {MONTHLY_REVENUE.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div style={{ width: '100%', height: `${(m.value / max) * 90}px`, background: i === MONTHLY_REVENUE.length - 1 ? GRADIENT : C.surface2, borderRadius: 6 }} />
              <span className="text-xs" style={{ color: C.textFaint }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
