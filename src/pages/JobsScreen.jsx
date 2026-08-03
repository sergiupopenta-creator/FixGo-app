import { C, MONO } from '../styles/theme';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

export default function JobsScreen({ jobs, push }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Lucrările mele</h1>
      {jobs.length === 0 && <EmptyState text="Nu ai nicio lucrare postată încă." />}
      <div className="flex flex-col gap-3">
        {jobs.map(job => (
          <button key={job.id} onClick={() => push('jobDetails', { job })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full text-left rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold" style={{ color: C.text }}>{job.title}</span>
              <StatusBadge status={job.status} />
            </div>
            <div className="text-xs mb-2" style={{ color: C.textMuted }}>
              {job.category} · {job.address}
              {job.type === 'open' && <span> · Deschis către mai mulți{job.applicants && job.applicants.length > 0 ? ` (${job.applicants.length} interesați)` : ''}</span>}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: C.textMuted }}>{job.date}</span>
              <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{job.budget}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
