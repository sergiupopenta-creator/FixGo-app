import { MessageCircle } from 'lucide-react';
import { C, GRADIENT, MONO } from '../styles/theme';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function QuickTasksScreen({ quickTasks, onClaim, push, goBack }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Task-uri rapide</h1>
      </div>
      {quickTasks.length === 0 && <EmptyState text="Nu există task-uri rapide momentan." />}
      <div className="flex flex-col gap-3">
        {quickTasks.map(t => (
          <div key={t.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <button onClick={() => push('contactProfile', { name: t.clientName, clientId: t.clientId })} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-2 min-w-0 flex-1 text-left">
                <Avatar name={t.clientName} size={36} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{t.clientName}</div>
                  <div className="text-xs truncate" style={{ color: C.textMuted }}>{t.address}</div>
                </div>
              </button>
              <button onClick={() => push('chat', { workerId: t.clientId, workerName: t.clientName })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={13} color={C.text} />
              </button>
            </div>
            <p className="text-sm mb-3" style={{ color: C.text }}>{t.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: C.amber, fontFamily: MONO }}>Bonus: {t.reward}</span>
              {t.status === 'Deschis' ? (
                <button onClick={() => onClaim(t.id)} style={{ background: GRADIENT }} className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white">
                  Preiau eu
                </button>
              ) : (
                <span className="text-xs font-semibold" style={{ color: C.green }}>Preluat de tine</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
