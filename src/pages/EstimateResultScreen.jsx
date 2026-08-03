import { C, GRADIENT, MONO } from '../styles/theme';
import { fmt, guessCategoryId, pct } from '../utils/helpers';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';
import EstimateRow from '../components/EstimateRow';

export default function EstimateResultScreen({ result, goBack, push }) {
  if (!result) return <EmptyState text="Nu există o estimare de afișat." />;
  const laborPct = pct(result.laborMax, result.totalMax);
  const materialsPct = pct(result.materialsMax, result.totalMax);
  const otherPct = pct(result.otherMax, result.totalMax);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Estimare AI</h1>
      </div>

      <div style={{ background: GRADIENT }} className="rounded-2xl p-5 mb-5 text-center">
        <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>Preț estimativ</div>
        <div className="text-2xl font-bold text-white" style={{ fontFamily: MONO }}>
          {fmt(result.totalMin)} - {fmt(result.totalMax)} RON
        </div>
        {result.summary && <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>{result.summary}</div>}
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Detaliere estimare</h2>
        <div className="flex flex-col gap-3">
          <EstimateRow label="Manoperă" min={result.laborMin} max={result.laborMax} percent={laborPct} color={C.purple} />
          <EstimateRow label="Materiale" min={result.materialsMin} max={result.materialsMax} percent={materialsPct} color={C.cyan} />
          <EstimateRow label="Alte costuri" min={result.otherMin} max={result.otherMax} percent={otherPct} color={C.amber} />
        </div>
      </div>

      <p className="text-xs mb-5" style={{ color: C.textFaint }}>Prețurile pot varia în funcție de complexitatea lucrării și de meseriașul ales.</p>

      <button onClick={() => push('search', { category: guessCategoryId(result.category) })} style={{ background: GRADIENT }} className="w-full rounded-xl py-3.5 text-sm font-semibold text-white">
        Caută meseriași
      </button>
    </div>
  );
}
