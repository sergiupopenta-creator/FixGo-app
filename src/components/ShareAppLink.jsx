import { C } from '../styles/theme';

export default function ShareAppLink({ icon: Icon, bg, label, href, newTab }) {
  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      style={{ textDecoration: 'none' }}
      className="flex flex-col items-center gap-1.5"
    >
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg }} className="flex items-center justify-center">
        <Icon size={22} color="#fff" />
      </div>
      <span className="text-xs" style={{ color: C.textMuted }}>{label}</span>
    </a>
  );
}
