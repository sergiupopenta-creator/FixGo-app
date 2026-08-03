import { UserMinus } from 'lucide-react';
import { C } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import EmployeeStatusBadge from '../components/EmployeeStatusBadge';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

export default function EmployeeProfileScreen({ employee, assignedJobs, goBack, onRemove }) {
  if (!employee) {
    return (
      <div className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <BackButton onClick={goBack} />
          <h1 className="text-base font-semibold" style={{ color: C.text }}>Profil angajat</h1>
        </div>
        <EmptyState text="Acest angajat nu mai există." />
      </div>
    );
  }
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Profil angajat</h1>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar name={employee.name} size={72} />
        <div>
          <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>{employee.name}</h2>
          <div className="text-sm mb-2" style={{ color: C.textMuted }}>{employee.role}</div>
          <EmployeeStatusBadge status={employee.status} />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Lucrări atribuite</h2>
        {(!assignedJobs || assignedJobs.length === 0) ? (
          <p className="text-xs" style={{ color: C.textMuted }}>Nu are nicio lucrare atribuită momentan.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {assignedJobs.map(r => (
              <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-sm font-semibold truncate" style={{ color: C.text }}>{r.title}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="text-xs" style={{ color: C.textMuted }}>{r.clientName} · {r.address}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => { onRemove(employee.id); goBack(); }}
        style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)' }}
        className="w-full rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
      >
        <UserMinus size={16} color={C.red} /> <span style={{ color: C.red }}>Dă afară angajatul</span>
      </button>
    </div>
  );
}
