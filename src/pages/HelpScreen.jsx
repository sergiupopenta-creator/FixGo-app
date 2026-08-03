import { useEffect, useRef, useState } from 'react';
import { Bot, ChevronDown, Loader2, Send } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { C, GRADIENT } from '../styles/theme';
import BackButton from '../components/BackButton';

export default function HelpScreen({ goBack }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length, loading]);

  async function sendQuestion() {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setMessages(m => [...m, { from: 'me', text: question }]);
    setInput('');
    setLoading(true);
    try {
      const prompt = 'Ești asistentul virtual al aplicației FixGo, o platformă românească ce conectează clienți cu meseriași (electricieni, instalatori, zugravi, mecanici auto, avocați, notari etc). Rolul tău este să ajuți orice utilizator - client sau meseriaș - să înțeleagă cum să folosească aplicația și să rezolve problemele pe care le întâmpină.\n\nStructura aplicației:\n- Mod Client: Acasă (căutare rapidă, categorii, AI Estimator, Task rapid), Căutare (listă/hartă meseriași), Lucrările mele (postezi cereri - direct la un meseriaș ales de tine, sau deschise către mai mulți meseriași care pot accepta, iar tu alegi unul), Mesaje (chat cu meseriași, cu opțiuni de mute/block), Profil (informații, adrese, metode de plată, favorite, notificări, setări, ajutor).\n- Mod Meseriaș (accesibil din Profil client → butonul „Mod Meseriaș"): Dashboard (statistici, task-uri rapide cu bonus, echipă dacă ai plan Business), Solicitări (cereri de la clienți, accepți sau refuzi, poți mesaja clientul), Calendar (programări, bară de căutare persoană, adaugi programări noi trimise direct clientului), Mesaje, Profil (biografie editabilă, portofoliu foto, abonament Premium/Business, angajați dacă ai plan Business).\n- Funcții speciale: AI Estimator (estimare cost lucrare pe baza descrierii), Listă materiale cu manoperă separată și atașamente (poze sau facturi PDF, cu calcul automat al costului din factură), Task rapid (cereri mici cu bonus pentru meseriași), programări create direct din conversație.\n\nRăspunde clar, concis și prietenos, în limba română, la orice întrebare despre cum se folosește aplicația sau cum rezolvă o problemă. Dacă întrebarea nu are legătură cu aplicația, redirecționează politicos discuția către subiectul aplicației.\n\nÎntrebarea utilizatorului: ' + question;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 600,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`Cerere eșuată (${response.status}) ${errText.slice(0, 150)}`);
      }
      const data = await response.json();
      const raw = (data.content || []).map(b => b.text || '').join('').trim();
      setMessages(m => [...m, { from: 'bot', text: raw || 'Nu am găsit un răspuns clar, poți încerca să reformulezi întrebarea?' }]);
    } catch (e) {
      setMessages(m => [...m, { from: 'bot', text: 'A apărut o problemă la conectare (' + (e.message || 'eroare necunoscută') + '). Încearcă din nou în câteva momente.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Ajutor și suport</h1>
      </div>

      <div className="flex flex-col items-center mb-5 mt-1">
        <div style={{ width: 64, height: 64, borderRadius: 9999, background: GRADIENT }} className="flex items-center justify-center mb-3">
          <Bot size={28} color="#fff" />
        </div>
        <p className="text-xs text-center" style={{ color: C.textMuted, maxWidth: 260 }}>
          Ai o întrebare sau o problemă cu aplicația? Întreabă-mă orice, oricând.
        </p>
      </div>

      {messages.length > 0 && (
        <div className="flex flex-col gap-2.5 mb-4">
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ background: m.from === 'me' ? GRADIENT : C.surface2, border: m.from === 'me' ? 'none' : `1px solid ${C.border}` }} className="rounded-2xl px-3.5 py-2.5">
                <span className="text-sm" style={{ color: m.from === 'me' ? '#fff' : C.text, whiteSpace: 'pre-wrap' }}>{m.text}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', color: C.textMuted }} className="flex items-center gap-2 text-xs">
              <Loader2 size={13} className="animate-spin" /> Asistentul scrie...
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-6">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendQuestion(); }}
          placeholder="Scrie întrebarea ta..."
          className="bg-transparent outline-none text-sm flex-1"
          style={{ color: C.text }}
        />
        <button
          onClick={sendQuestion}
          disabled={!input.trim() || loading}
          style={{ background: (!input.trim() || loading) ? C.surface2 : GRADIENT, opacity: (!input.trim() || loading) ? 0.6 : 1 }}
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <Send size={14} color="#fff" />
        </button>
      </div>

      <h2 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Întrebări frecvente</h2>
      <div className="flex flex-col gap-2 mb-6">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-3.5 text-left">
              <span className="text-sm font-medium" style={{ color: C.text }}>{item.q}</span>
              <ChevronDown size={16} color={C.textFaint} style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>
            {openIndex === i && <p className="text-xs px-3.5 pb-3.5" style={{ color: C.textMuted }}>{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
