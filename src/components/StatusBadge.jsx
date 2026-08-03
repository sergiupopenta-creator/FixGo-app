import { STATUS_STYLES } from '../data/mockData';

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Nou'];
  return <span style={{ background: s.bg, color: s.color }} className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{status}</span>;
}
