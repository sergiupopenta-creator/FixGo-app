import { C } from '../styles/theme';
import BackButton from '../components/BackButton';

const SECTIONS = [
  {
    title: '1. Despre acest document',
    body: 'Acesta este un șablon generic de termeni și condiții, gândit ca punct de plecare pentru o aplicație de tip FixGo. Nu constituie consultanță juridică — înainte de lansarea în producție cu utilizatori reali, acest text ar trebui revizuit de un avocat, adaptat legislației aplicabile (ex. Legea 190/2018, Codul consumatorului) și activității reale a platformei.',
  },
  {
    title: '2. Ce este FixGo',
    body: 'FixGo este o platformă care facilitează contactul dintre clienți și meseriași. FixGo nu este parte în contractele de prestări servicii încheiate între client și meseriaș și nu răspunde pentru calitatea, prețul sau termenele lucrărilor executate.',
  },
  {
    title: '3. Contul tău',
    body: 'Ești responsabil pentru acuratețea informațiilor furnizate la crearea contului și pentru păstrarea confidențialității parolei. Poți solicita oricând ștergerea contului și a datelor asociate.',
  },
  {
    title: '4. Conduită și conținut',
    body: 'Nu ai voie să postezi conținut fals, ofensator sau ilegal, să hărțuiești alți utilizatori sau să folosești platforma în scopuri frauduloase. FixGo își rezervă dreptul de a suspenda conturile care încalcă aceste reguli.',
  },
  {
    title: '5. Plăți și abonamente',
    body: 'Planurile Premium/Business și metodele de plată afișate în aplicație sunt simulate în această versiune demonstrativă — nu se procesează plăți reale. Într-o versiune de producție, această secțiune ar trebui să descrie clar prețurile, facturarea recurentă și politica de rambursare.',
  },
  {
    title: '6. Limitarea răspunderii',
    body: 'Platforma este oferită "ca atare", fără garanții exprese sau implicite. FixGo nu răspunde pentru daune indirecte rezultate din utilizarea platformei sau din interacțiunile dintre utilizatori.',
  },
  {
    title: '7. Modificări',
    body: 'Acești termeni pot fi actualizați periodic. Continuarea folosirii aplicației după o actualizare reprezintă acceptarea noilor termeni.',
  },
];

export default function TermsScreen({ goBack }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Termeni și condiții</h1>
      </div>

      <div style={{ background: 'rgba(251,191,36,0.1)', border: `1px solid ${C.amber}` }} className="rounded-xl p-3.5 mb-5">
        <p className="text-xs" style={{ color: C.text }}>
          Acesta e un șablon informativ, nu consultanță juridică — vezi secțiunea 1 mai jos.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {SECTIONS.map(s => (
          <div key={s.title}>
            <h2 className="text-sm font-semibold mb-1.5" style={{ color: C.text }}>{s.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
