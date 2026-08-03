import { C } from '../styles/theme';
import { colorForName, initials } from '../utils/helpers';

export default function Avatar({ name, size = 44, online, photoUrl }) {
  const bg = colorForName(name);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {photoUrl ? (
        <img src={photoUrl} alt={name} style={{ width: size, height: size, borderRadius: 9999, objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{
          width: size, height: size, borderRadius: 9999, background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0A0B12', fontWeight: 700, fontSize: size * 0.36,
        }}>
          {initials(name)}
        </div>
      )}
      {online && (
        <div style={{
          position: 'absolute', bottom: -1, right: -1, width: size * 0.3, height: size * 0.3,
          borderRadius: 9999, background: C.green, border: `2px solid ${C.bg}`,
        }} />
      )}
    </div>
  );
}
