import { C } from '../styles/theme';

export default function BottomNav({ tabs, active, onTab }) {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, background: C.bg, flexShrink: 0 }} className="flex items-center justify-around py-2.5 px-2">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} className="flex flex-col items-center gap-1 px-2 py-1">
            <t.icon size={19} color={isActive ? C.purple : C.textFaint} />
            <span style={{ fontSize: 10, color: isActive ? C.purple : C.textFaint }} className="font-medium">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
