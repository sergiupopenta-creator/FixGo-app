import { Ban, BellOff } from 'lucide-react';
import { C } from '../styles/theme';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';

export default function MessagesScreen({ chats, push }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Mesaje</h1>
      {chats.length === 0 && <EmptyState text="Nu ai nicio conversație încă." />}
      <div className="flex flex-col gap-2">
        {chats.map(c => {
          const last = c.messages[c.messages.length - 1];
          const lastPreview = last ? (last.type === 'image' ? '📷 Fotografie' : last.type === 'materials' ? '📋 Listă materiale' : last.type === 'appointment' ? '📅 Programare propusă' : last.text) : '';
          return (
            <button key={c.workerId} onClick={() => push('chat', { workerId: c.workerId, workerName: c.workerName })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-2xl p-3 text-left">
              <Avatar name={c.workerName} size={48} online={c.online} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold truncate flex items-center gap-1" style={{ color: C.text }}>
                    {c.workerName}
                    {c.muted && <BellOff size={11} color={C.textFaint} />}
                    {c.blocked && <Ban size={11} color={C.red} />}
                  </span>
                  <span className="text-xs flex-shrink-0" style={{ color: C.textFaint }}>{last?.time}</span>
                </div>
                <div className="text-xs truncate" style={{ color: C.textMuted }}>{lastPreview}</div>
              </div>
              {c.unread && !c.muted && <span style={{ background: C.purple }} className="w-2 h-2 rounded-full flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
