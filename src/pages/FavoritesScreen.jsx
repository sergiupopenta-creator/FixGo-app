import { WORKERS } from '../data/mockData';
import { C } from '../styles/theme';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';
import WorkerRow from '../components/WorkerRow';

export default function FavoritesScreen({ favorites, push, goBack }) {
  const favWorkers = WORKERS.filter(w => favorites.includes(w.id));
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Favorite</h1>
      </div>
      {favWorkers.length === 0 && <EmptyState text="Nu ai niciun meseriaș favorit încă." />}
      <div className="flex flex-col gap-3">
        {favWorkers.map(w => (
          <WorkerRow key={w.id} worker={w} onClick={() => push('worker', { worker: w })} />
        ))}
      </div>
    </div>
  );
}
