import { useState } from 'react';
import { C, GRADIENT, MONO } from '../styles/theme';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

export default function ProJobsScreen({ jobs, onApply, initialTab, myName, goBack }) {
  const [tab, setTab] = useState(initialTab || 'available');

  const available = jobs.filter(j => j.type === 'open' && (j.status === 'Nou' || j.status === 'Așteaptă alegere'));
  const finalizate = jobs.filter(j => j.status === 'Finalizată');
  const list = tab === 'available' ? available : finalizate;

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Lucrări</h1>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('available')}
          style={{ background: tab === 'available' ? GRADIENT : C.surface, border: `1px solid ${tab === 'available' ? 'transparent' : C.border}` }}
          className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
        >
          <span style={{ color: tab === 'available' ? '#fff' : C.textMuted }}>Toate lucrările</span>
        </button>
        <button
          onClick={() => setTab('finalizate')}
          style={{ background: tab === 'finalizate' ? GRADIENT : C.surface, border: `1px solid ${tab === 'finalizate' ? 'transparent' : C.border}` }}
          className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
        >
          <span style={{ color: tab === 'finalizate' ? '#fff' : C.textMuted }}>Lucrări finalizate</span>
        </button>
      </div>

      {list.length === 0 && <EmptyState text={tab === 'available' ? 'Nu există lucrări disponibile momentan.' : 'Nu există lucrări finalizate încă.'} />}
      <div className="flex flex-col gap-3">
        {list.map(job => {
          const alreadyApplied = tab === 'available' && job.applicants && job.applicants.some(a => a.name === myName);
          return (
            <div key={job.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold" style={{ color: C.text }}>{job.title}</span>
                <StatusBadge status={job.status} />
              </div>
              <div className="text-xs mb-2" style={{ color: C.textMuted }}>{job.category} · {job.address}</div>
              {job.description && <p className="text-xs mb-2" style={{ color: C.textMuted }}>{job.description}</p>}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{job.budget}</span>
                {tab === 'available' && (
                  alreadyApplied ? (
                    <span className="text-xs font-semibold" style={{ color: C.green }}>Te-ai oferit</span>
                  ) : (
                    <button onClick={() => onApply(job.id)} style={{ background: GRADIENT }} className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white">
                      Aplică
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
