import { Bell, Briefcase, CheckCircle2, ChevronRight, Package, Users } from 'lucide-react';
import { C, GRADIENT } from '../styles/theme';
import ProStatCard from '../components/ProStatCard';
import RequestCard from '../components/RequestCard';

export default function ProDashboardScreen({ requests, push, plan, employees, profileInfo, hasUnreadNotifications, quickTasks }) {
  const recent = requests.slice(0, 3);
  const openQuickTasks = quickTasks.filter(t => t.status === 'Deschis').length;
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs" style={{ color: C.textMuted }}>Bun venit înapoi</div>
          <h1 className="text-xl font-bold" style={{ color: C.text, letterSpacing: '-0.02em' }}>{profileInfo.name}</h1>
        </div>
        <button onClick={() => push('notifications', {})} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center relative">
          <Bell size={16} color={C.text} />
          {hasUnreadNotifications && <span style={{ background: C.red, position: 'absolute', top: 7, right: 8 }} className="w-1.5 h-1.5 rounded-full" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <ProStatCard label="Solicitări primite" value="48" delta="+12%" onClick={() => push('proRequests', {})} />
        <ProStatCard label="Lucrări finalizate" value="32" delta="+8%" onClick={() => push('proJobs', { tab: 'finalizate' })} />
        <ProStatCard label="Încasări" value="7.850 RON" delta="+15%" onClick={() => push('earnings', {})} />
        <ProStatCard label="Rating mediu" value="4.9" isRating onClick={() => push('myReviews', {})} />
      </div>

      <button onClick={() => push('proSubscriptions', {})} style={{ background: GRADIENT }} className="w-full rounded-2xl p-4 mb-4 text-left flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-sm mb-0.5">Plan {plan}</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>Vezi detalii abonament</div>
        </div>
        <ChevronRight size={18} color="#fff" />
      </button>

      {openQuickTasks > 0 && (
        <button onClick={() => push('quickTasks', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3 min-w-0">
            <div style={{ background: 'rgba(52,211,153,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package size={18} color={C.green} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>Task-uri rapide</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{openQuickTasks} disponibile lângă tine, cu bonus</div>
            </div>
          </div>
          <ChevronRight size={18} color={C.textMuted} />
        </button>
      )}

      {plan === 'Business' && (
        <button onClick={() => push('proEmployees', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-6 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={18} color={C.purple} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.text }}>Echipa ta</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{employees.length} angajați activi</div>
            </div>
          </div>
          <ChevronRight size={18} color={C.textMuted} />
        </button>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => push('proJobs', { tab: 'available' })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 text-left">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-9 h-9 rounded-lg flex items-center justify-center mb-2">
            <Briefcase size={16} color={C.purple} />
          </div>
          <div className="text-xs font-semibold" style={{ color: C.text }}>Toate lucrările</div>
          <div className="text-xs" style={{ color: C.textMuted }}>De ales</div>
        </button>
        <button onClick={() => push('proJobs', { tab: 'finalizate' })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 text-left">
          <div style={{ background: 'rgba(52,211,153,0.15)' }} className="w-9 h-9 rounded-lg flex items-center justify-center mb-2">
            <CheckCircle2 size={16} color={C.green} />
          </div>
          <div className="text-xs font-semibold" style={{ color: C.text }}>Lucrări finalizate</div>
          <div className="text-xs" style={{ color: C.textMuted }}>Istoric</div>
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold" style={{ color: C.text }}>Solicitări recente</h2>
        <button onClick={() => push('proRequests', {})} className="text-xs font-medium" style={{ color: C.purple }}>Vezi toate</button>
      </div>
      <div className="flex flex-col gap-3">
        {recent.map(r => (
          <RequestCard
            key={r.id}
            request={r}
            compact
            onMessage={(req) => push('chat', { workerId: req.clientId, workerName: req.clientName })}
            onOpenProfile={(req) => push('contactProfile', { name: req.clientName, clientId: req.clientId })}
          />
        ))}
      </div>
    </div>
  );
}
