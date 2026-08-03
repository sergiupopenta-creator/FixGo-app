import { CheckCircle2 } from 'lucide-react';
import { PLANS } from '../data/mockData';
import { C, GRADIENT, MONO } from '../styles/theme';
import BackButton from '../components/BackButton';

export default function ProSubscriptionsScreen({ plan, setPlan, goBack }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Abonamente</h1>
      </div>
      <div className="flex flex-col gap-4">
        {PLANS.map(p => {
          const isActive = plan === p.id;
          return (
            <div key={p.id} style={{
              background: isActive ? 'rgba(249,115,22,0.1)' : C.surface,
              border: `1px solid ${isActive ? C.purple : C.border}`,
            }} className="rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold" style={{ color: C.text }}>{p.id}</span>
                <span className="text-sm" style={{ color: C.textMuted }}>
                  <span style={{ fontFamily: MONO, color: C.text, fontWeight: 700 }}>{p.price}</span> RON / lună
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: C.textMuted }}>
                    <CheckCircle2 size={14} color={C.green} /> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPlan(p.id)}
                style={{ background: isActive ? C.surface2 : GRADIENT, border: isActive ? `1px solid ${C.border}` : 'none' }}
                className="w-full rounded-xl py-2.5 text-sm font-semibold"
              >
                <span style={{ color: isActive ? C.textMuted : '#fff' }}>{isActive ? 'Plan activ' : `Alege ${p.id}`}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
