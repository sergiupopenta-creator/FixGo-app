import { useState } from 'react';
import { MessageCircle, Users } from 'lucide-react';
import { C, GRADIENT, MONO } from '../styles/theme';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

export default function RequestCard({ request, onAccept, onDecline, onMessage, onOpenProfile, onAssign, employees, plan, compact }) {
  const [assignMenuOpen, setAssignMenuOpen] = useState(false);
  const canAssign = !compact && plan === 'Business' && employees && employees.length > 0 && request.status === 'Acceptată';

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, position: 'relative' }} className="rounded-2xl p-3.5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <button onClick={() => onOpenProfile && onOpenProfile(request)} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-2 min-w-0 flex-1 text-left">
          <Avatar name={request.clientName} size={36} />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{request.title}</div>
            <div className="text-xs truncate" style={{ color: C.textMuted }}>{request.clientName} · {request.address}</div>
          </div>
        </button>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onMessage && (
            <button onClick={() => onMessage(request)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-7 h-7 rounded-full flex items-center justify-center">
              <MessageCircle size={13} color={C.text} />
            </button>
          )}
          <StatusBadge status={request.status} />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span style={{ color: C.textMuted }}>{request.category}</span>
        <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{request.budget}</span>
      </div>
      {!compact && request.status === 'Nou' && (
        <div className="flex gap-2 mt-2">
          <button onClick={() => onDecline(request.id)} style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)' }} className="flex-1 rounded-lg py-2 text-xs font-semibold">
            <span style={{ color: C.red }}>Refuză</span>
          </button>
          <button onClick={() => onAccept(request.id)} style={{ background: GRADIENT }} className="flex-1 rounded-lg py-2 text-xs font-semibold text-white">
            Acceptă
          </button>
        </div>
      )}
      {canAssign && (
        <div className="mt-2" style={{ position: 'relative' }}>
          <button
            onClick={() => setAssignMenuOpen(o => !o)}
            style={{
              background: request.assignedTo ? 'rgba(52,211,153,0.12)' : C.surface2,
              border: `1px solid ${request.assignedTo ? C.green : C.border}`,
            }}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold"
          >
            <Users size={13} color={request.assignedTo ? C.green : C.textMuted} />
            <span style={{ color: request.assignedTo ? C.green : C.textMuted }}>
              {request.assignedTo ? `Atribuit: ${request.assignedTo.employeeName}` : 'Atribuie unui angajat'}
            </span>
          </button>
          {assignMenuOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: C.surface2,
              border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', zIndex: 30, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              {employees.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => { onAssign(request.id, emp); setAssignMenuOpen(false); }}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-3 text-left"
                >
                  <Avatar name={emp.name} size={24} />
                  <span className="text-xs" style={{ color: C.text }}>{emp.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
