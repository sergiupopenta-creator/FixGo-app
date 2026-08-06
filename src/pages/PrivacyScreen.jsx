import { C } from '../styles/theme';
import BackButton from '../components/BackButton';

const SECTIONS = [
  {
    title: '1. Despre acest document',
    body: 'Șablon generic de politică de confidențialitate, adaptat modului real în care funcționează această aplicație. Nu constituie consultanță juridică — pentru o lansare reală, revizuiește-l cu un specialist GDPR/protecția datelor.',
  },
  {
    title: '2. Ce date colectăm și unde sunt stocate',
    body: 'Numele, emailul și parola (stocată ca hash, niciodată în clar) contului tău, împreună cu joburile, mesajele, recenziile și preferințele din aplicație, sunt salvate exclusiv în browser-ul tău (localStorage). Nu există niciun server sau bază de date externă — datele nu părăsesc dispozitivul tău și nu sunt sincronizate între dispozitive diferite.',
  },
  {
    title: '3. Funcțiile AI',
    body: 'Când folosești AI Estimator, Ajutor/chatbot sau extragerea automată din facturi, textul/documentul trimis de tine este transmis către un serviciu server-side (proxy propriu) care îl retransmite către Anthropic pentru a genera un răspuns. Aceste date nu sunt stocate de FixGo — sunt folosite doar cât durează cererea respectivă.',
  },
  {
    title: '4. Ce NU facem',
    body: 'Nu vindem și nu partajăm datele tale cu terți în scopuri de marketing. Nu există urmărire (tracking) publicitară sau analytics în această versiune a aplicației.',
  },
  {
    title: '5. Drepturile tale',
    body: 'Poți vedea, modifica sau șterge oricând datele tale direct din aplicație (Profil → Informațiile mele) sau ștergând datele site-ului din setările browser-ului — asta elimină complet contul și tot ce ai salvat, instant, fără să fie nevoie să ceri asta cuiva.',
  },
  {
    title: '6. Cookie-uri și stocare locală',
    body: 'Aplicația folosește localStorage (nu cookie-uri de tracking) strict funcțional: pentru a te ține autentificat și pentru a păstra datele aplicației între vizite.',
  },
  {
    title: '7. Contact',
    body: 'Pentru întrebări legate de confidențialitate, completează datele de contact reale ale operatorului înainte de a publica această aplicație pentru utilizatori reali.',
  },
];

export default function PrivacyScreen({ goBack }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Politica de confidențialitate</h1>
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
