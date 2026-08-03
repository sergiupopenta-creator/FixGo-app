import { useState } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import EmployeeStatusBadge from '../components/EmployeeStatusBadge';
import EmptyState from '../components/EmptyState';

export default function ProEmployeesScreen({ employees, goBack, onAdd, push }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  function submit() {
    if (!name.trim() || !role.trim()) return;
    onAdd({ name: name.trim(), role: role.trim(), status: 'Disponibil' });
    setName(''); setRole(''); setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Angajații mei</h1>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {employees.length === 0 && <EmptyState text="Nu ai adăugat încă niciun angajat." />}
        {employees.map(emp => (
          <div key={emp.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center gap-3">
            <button onClick={() => push('employeeProfile', { employeeId: emp.id })} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-3 flex-1 min-w-0 text-left">
              <Avatar name={emp.name} size={44} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{emp.name}</div>
                <div className="text-xs truncate" style={{ color: C.textMuted }}>{emp.role}</div>
              </div>
            </button>
            <button onClick={() => push('chat', { workerId: `employee-${emp.id}`, workerName: emp.name })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle size={14} color={C.text} />
            </button>
            <EmployeeStatusBadge status={emp.status} />
          </div>
        ))}
      </div>

      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-2">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume angajat" style={inputStyle} />
          </div>
          <div className="mb-3">
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Rol (ex. Electrician)" style={inputStyle} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold">
              <span style={{ color: C.textMuted }}>Anulează</span>
            </button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">
              Adaugă
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă angajat</span>
        </button>
      )}
    </div>
  );
}
