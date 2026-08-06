import { useEffect } from 'react';
import { C } from '../styles/theme';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';

export default function NotificationsScreen({ notifications, onMarkRead, push, goBack }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- mark-as-read should run once, on mount
  useEffect(() => { onMarkRead(); }, []);
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Notificări</h1>
      </div>
      {notifications.length === 0 && <EmptyState text="Nu ai nicio notificare." />}
      <div className="flex flex-col gap-2">
        {notifications.map(n => {
          const clickable = !!n.target;
          const Wrapper = clickable ? 'button' : 'div';
          return (
            <Wrapper
              key={n.id}
              onClick={clickable ? () => push(n.target.screen, n.target.params) : undefined}
              style={{
                background: n.read ? C.surface : 'rgba(249,115,22,0.08)', border: `1px solid ${n.read ? C.border : C.purple}`,
                textAlign: 'left', width: '100%', display: 'block',
              }}
              className="rounded-2xl p-3.5"
            >
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="text-sm font-semibold" style={{ color: C.text }}>{n.title}</span>
                {!n.read && <span style={{ background: C.purple }} className="w-2 h-2 rounded-full flex-shrink-0" />}
              </div>
              <p className="text-xs mb-1" style={{ color: C.textMuted }}>{n.text}</p>
              <span className="text-xs" style={{ color: C.textFaint }}>{n.time}</span>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
