import { MessageCircle, Pencil, Trash2 } from 'lucide-react';
import { WORKERS } from '../data/mockData';
import { C, GRADIENT } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import DetailRow from '../components/DetailRow';
import StatusBadge from '../components/StatusBadge';

export default function JobDetailsScreen({ job, goBack, onDelete, push, onChooseApplicant }) {
  const showApplicants = job.type === 'open' && job.applicants && job.applicants.length > 0 && job.status !== 'Confirmată' && job.status !== 'Finalizată';
  const matchedWorker = job.worker ? WORKERS.find(w => w.name === job.worker) : null;
  const chatWorkerId = matchedWorker ? matchedWorker.id : (job.worker ? `worker-${job.worker.replace(/\s+/g, '-').toLowerCase()}` : null);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <BackButton onClick={goBack} />
        <StatusBadge status={job.status} />
      </div>

      <h1 className="text-lg font-bold mb-2" style={{ color: C.text }}>{job.title}</h1>
      <p className="text-sm leading-relaxed mb-5" style={{ color: C.textMuted }}>{job.description || 'Fără descriere suplimentară.'}</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <DetailRow label="Buget estimativ" value={job.budget} />
        <DetailRow label="Categorie" value={job.category} />
        <DetailRow label="Adresă" value={job.address} />
        <DetailRow label="Data dorită" value={job.date} />
        <DetailRow label="Prioritate" value={job.priority || 'Medie'} />
        {job.worker && <DetailRow label="Meseriaș" value={job.worker} />}
      </div>

      {job.worker && (
        <button
          onClick={() => push('chat', { workerId: chatWorkerId, workerName: job.worker })}
          style={{ background: GRADIENT }}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-1.5 mb-5"
        >
          <MessageCircle size={15} color="#fff" /> Trimite mesaj către {job.worker}
        </button>
      )}

      {showApplicants && (
        <div className="mb-5">
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Meseriași interesați</h2>
          <div className="flex flex-col gap-2">
            {job.applicants.map(a => (
              <div key={a.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center gap-3">
                <Avatar name={a.name} size={40} />
                <span className="text-sm font-semibold flex-1 truncate" style={{ color: C.text }}>{a.name}</span>
                <button onClick={() => onChooseApplicant(job.id, a, job.title)} style={{ background: GRADIENT }} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white flex-shrink-0">
                  Alege
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => push('editJob', { job })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1.5">
          <Pencil size={14} color={C.text} /><span style={{ color: C.text }}>Editează</span>
        </button>
        <button onClick={() => onDelete(job.id)} style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)' }} className="flex-1 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1.5">
          <Trash2 size={14} color={C.red} /><span style={{ color: C.red }}>Șterge</span>
        </button>
      </div>
    </div>
  );
}
