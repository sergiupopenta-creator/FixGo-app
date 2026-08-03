import { C } from '../styles/theme';

export default function EmployeeStatusBadge({ status }) {
  const isAvailable = status === 'Disponibil';
  const color = isAvailable ? C.green : C.amber;
  const bg = isAvailable ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)';
  return <span style={{ background: bg, color }} className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">{status}</span>;
}
