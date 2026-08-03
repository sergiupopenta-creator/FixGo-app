import { useState } from 'react';
import { C } from '../styles/theme';
import CategoryChip from '../components/CategoryChip';
import EmptyState from '../components/EmptyState';
import RequestCard from '../components/RequestCard';

export default function ProRequestsScreen({ requests, onAccept, onDecline, onAssign, employees, plan, push }) {
  const [filter, setFilter] = useState('Toate');
  const filters = ['Toate', 'Nou', 'Acceptată', 'Finalizată'];
  const filtered = filter === 'Toate' ? requests : requests.filter(r => r.status === filter);
  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Solicitări</h1>
      <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
        {filters.map(f => (
          <CategoryChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>
      {filtered.length === 0 && <EmptyState text="Nicio solicitare în această categorie." />}
      <div className="flex flex-col gap-3">
        {filtered.map(r => (
          <RequestCard
            key={r.id}
            request={r}
            onAccept={onAccept}
            onDecline={onDecline}
            onAssign={onAssign}
            employees={employees}
            plan={plan}
            onMessage={(req) => push('chat', { workerId: req.clientId, workerName: req.clientName })}
            onOpenProfile={(req) => push('contactProfile', { name: req.clientName, clientId: req.clientId })}
          />
        ))}
      </div>
    </div>
  );
}
