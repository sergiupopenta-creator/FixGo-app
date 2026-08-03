import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Home, MessageCircle, User, Star, MapPin, ShieldCheck,
  CreditCard, Phone, Send, Plus, ChevronRight, ChevronLeft, ChevronDown, Bell, Bot,
  ArrowLeft, Heart, Share2, Settings, LogOut, Pencil, Trash2, Briefcase,
  HelpCircle, Loader2, LayoutGrid, Camera,
  Calendar as CalendarIcon, TrendingUp, CheckCircle2, Users, ClipboardList, X, FileText,
  MoreVertical, BellOff, Ban, UserMinus, Package, Copy, Mail, MessageSquare
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const C = {
  bg: '#0A0A0A',
  glow1: '#3D2410',
  glow2: '#18181B',
  surface: '#18181B',
  surface2: '#242427',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.16)',
  text: '#FAFAF9',
  textMuted: '#A1A1AA',
  textFaint: '#71717A',
  purple: '#F97316',
  cyan: '#FDE047',
  green: '#34D399',
  amber: '#FBBF24',
  red: '#F87171',
};
const GRADIENT = 'linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)';
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const inputStyle = {
  width: '100%', boxSizing: 'border-box', background: C.surface,
  border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 12px',
  fontSize: 13, color: C.text, outline: 'none', fontFamily: 'inherit',
};

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: 'instalator', name: 'Instalator', emoji: '🔧', color: '#38BDF8' },
  { id: 'electrician', name: 'Electrician', emoji: '⚡', color: '#FBBF24' },
  { id: 'zugrav', name: 'Zugrav', emoji: '🎨', color: '#F472B6' },
  { id: 'constructor', name: 'Constructor', emoji: '🧱', color: '#60A5FA' },
  { id: 'tamplar', name: 'Tâmplar', emoji: '🪚', color: '#F59E0B' },
  { id: 'aer', name: 'Aer condiționat', emoji: '❄️', color: '#22D3EE' },
  { id: 'curatenie', name: 'Curățenie', emoji: '🧹', color: '#34D399' },
  { id: 'mecanic', name: 'Mecanic auto', emoji: '🚗', color: '#EF4444' },
  { id: 'avocat', name: 'Avocat', emoji: '⚖️', color: '#818CF8' },
  { id: 'notar', name: 'Notar', emoji: '📜', color: '#2DD4BF' },
  { id: 'altele', name: 'Mai multe', emoji: '🔨', color: '#A78BFA' },
];

const WORKERS = [
  { id: 1, name: 'Alexandru Popescu', category: 'Electrician', categoryId: 'electrician',
    area: 'Sector 3, București', rating: 4.9, reviews: 86, experience: '12 ani',
    responseTime: '<15 min', completedJobs: 312, verified: true, available: true,
    bio: 'Sunt electrician autorizat ANRE cu peste 12 ani de experiență. Ofer servicii de calitate, seriozitate și garanție pentru toate lucrările, de la reparații simple până la instalații electrice complete.',
    services: ['Instalații electrice', 'Tablouri electrice', 'Reparații', 'Iluminat', 'Smart Home'],
    portfolio: [
      { caption: 'Instalație electrică completă' },
      { caption: 'Montaj tablou electric' },
      { caption: 'Iluminat living modern' },
    ],
    reviewsSample: [
      { name: 'Cristina M.', rating: 5, text: 'Foarte profesionist, a rezolvat rapid problema. Recomand!' },
      { name: 'Bogdan T.', rating: 5, text: 'Punctual și corect. Lucrare de calitate.' },
    ] },
  { id: 2, name: 'Ion Marinescu', category: 'Instalator', categoryId: 'instalator',
    area: 'Sector 1, București', rating: 4.9, reviews: 128, experience: '15 ani',
    responseTime: '<10 min', completedJobs: 401, verified: true, available: true,
    bio: 'Instalator cu experiență vastă în instalații sanitare și termice. Intervin rapid pentru urgențe și ofer consultanță gratuită înainte de orice lucrare.',
    services: ['Instalații sanitare', 'Centrale termice', 'Reparații urgențe', 'Boilere'],
    portfolio: [
      { caption: 'Montaj centrală termică' },
      { caption: 'Instalație sanitară baie' },
      { caption: 'Înlocuire boiler' },
    ],
    reviewsSample: [{ name: 'Ana P.', rating: 5, text: 'A venit în aceeași zi și a reparat scurgerea rapid.' }] },
  { id: 3, name: 'Maria Ionescu', category: 'Zugrav', categoryId: 'zugrav',
    area: 'Sector 2, București', rating: 4.8, reviews: 64, experience: '9 ani',
    responseTime: '<30 min', completedJobs: 198, verified: true, available: false,
    bio: 'Ofer servicii complete de zugrăveli interioare și exterioare, cu atenție la detalii și materiale de calitate superioară.',
    services: ['Zugrăveli interioare', 'Vopsitorii exterioare', 'Tapet', 'Finisaje decorative'],
    portfolio: [
      { caption: 'Zugrăvit living' },
      { caption: 'Finisaje decorative' },
      { caption: 'Vopsitorie exterioară' },
    ],
    reviewsSample: [{ name: 'Radu S.', rating: 5, text: 'Lucrare curată, respectă termenele.' }] },
  { id: 4, name: 'Robert Stan', category: 'Constructor', categoryId: 'constructor',
    area: 'Sector 1, București', rating: 4.7, reviews: 51, experience: '18 ani',
    responseTime: '<1 oră', completedJobs: 87, verified: true, available: true,
    bio: 'Echipă de construcții cu experiență în renovări complete, extinderi și lucrări de amenajare interioară.',
    services: ['Renovări complete', 'Zidărie', 'Amenajări interioare', 'Izolații'],
    portfolio: [
      { caption: 'Renovare apartament' },
      { caption: 'Zidărie exterioară' },
      { caption: 'Amenajare interioară' },
    ],
    reviewsSample: [{ name: 'Mihai D.', rating: 4, text: 'Echipă serioasă, au respectat bugetul estimat.' }] },
  { id: 5, name: 'Dan Georgescu', category: 'Tâmplar', categoryId: 'tamplar',
    area: 'Sector 4, București', rating: 4.9, reviews: 39, experience: '20 ani',
    responseTime: '<20 min', completedJobs: 145, verified: true, available: true,
    bio: 'Tâmplar specializat în mobilier la comandă, uși și ferestre din lemn masiv.',
    services: ['Mobilier la comandă', 'Uși din lemn', 'Reparații mobilier', 'Parchet'],
    portfolio: [
      { caption: 'Mobilier la comandă' },
      { caption: 'Uși din lemn masiv' },
      { caption: 'Parchet clasic' },
    ],
    reviewsSample: [{ name: 'Elena V.', rating: 5, text: 'Mobilă superbă, exact cum am cerut.' }] },
  { id: 6, name: 'Elena Radu', category: 'Curățenie', categoryId: 'curatenie',
    area: 'Sector 6, București', rating: 5.0, reviews: 112, experience: '6 ani',
    responseTime: '<15 min', completedJobs: 530, verified: true, available: true,
    bio: 'Servicii profesionale de curățenie pentru case, apartamente și birouri. Produse eco-friendly la cerere.',
    services: ['Curățenie generală', 'Curățenie birouri', 'Curățenie după renovare', 'Spălat geamuri'],
    portfolio: [
      { caption: 'Curățenie apartament' },
      { caption: 'Curățenie birou' },
      { caption: 'Spălat geamuri' },
    ],
    reviewsSample: [{ name: 'Andreea L.', rating: 5, text: 'Impecabil, revin cu siguranță!' }] },
  { id: 7, name: 'Cristian Vasile', category: 'Aer condiționat', categoryId: 'aer',
    area: 'Sector 3, București', rating: 4.8, reviews: 45, experience: '10 ani',
    responseTime: '<30 min', completedJobs: 210, verified: true, available: false,
    bio: 'Montez și fac service pentru aparate de aer condiționat, toate mărcile. Ofer garanție la montaj.',
    services: ['Montaj AC', 'Revizie AC', 'Reparații AC', 'Curățare unități'],
    portfolio: [
      { caption: 'Montaj aparat AC' },
      { caption: 'Revizie unitate exterioară' },
      { caption: 'Curățare filtre' },
    ],
    reviewsSample: [{ name: 'Vlad R.', rating: 5, text: 'Montaj rapid și curat, prețuri corecte.' }] },
  { id: 8, name: 'Bogdan Ilie', category: 'Mecanic auto', categoryId: 'mecanic',
    area: 'Sector 5, București', rating: 4.8, reviews: 58, experience: '11 ani',
    responseTime: '<20 min', completedJobs: 240, verified: true, available: true,
    bio: 'Mecanic auto cu experiență pe mărci europene și asiatice. Diagnoză computerizată, reparații și întreținere la domiciliu sau la service.',
    services: ['Reparații auto', 'Schimb ulei', 'Diagnoză computerizată', 'Anvelope'],
    portfolio: [
      { caption: 'Reparație motor' },
      { caption: 'Schimb plăcuțe frână' },
      { caption: 'Diagnoză auto' },
    ],
    reviewsSample: [{ name: 'Cosmin T.', rating: 5, text: 'A găsit rapid problema și mi-a explicat clar totul.' }] },
  { id: 9, name: 'Mihaela Constantin', category: 'Avocat', categoryId: 'avocat',
    area: 'Sector 1, București', rating: 4.9, reviews: 34, experience: '14 ani',
    responseTime: '<1 oră', completedJobs: 95, verified: true, available: true,
    bio: 'Avocat specializat în drept civil și imobiliar. Ofer consultanță pentru contracte, litigii și tranzacții imobiliare.',
    services: ['Consultanță juridică', 'Contracte', 'Litigii civile', 'Drept imobiliar'],
    reviewsSample: [{ name: 'Alexandra D.', rating: 5, text: 'Profesionistă, mi-a explicat clar toate opțiunile.' }] },
  { id: 10, name: 'Vasile Popa', category: 'Notar', categoryId: 'notar',
    area: 'Sector 2, București', rating: 5.0, reviews: 21, experience: '20 ani',
    responseTime: '<2 ore', completedJobs: 410, verified: true, available: true,
    bio: 'Notar public cu experiență în autentificarea actelor, procuri și tranzacții imobiliare.',
    services: ['Autentificare acte', 'Procuri', 'Contracte vânzare-cumpărare', 'Declarații notariale'],
    reviewsSample: [{ name: 'Florin M.', rating: 5, text: 'Rapid și fără bătăi de cap, totul explicat clar.' }] },
];

const INITIAL_JOBS = [
  { id: 1, title: 'Instalație electrică apartament 2 camere', category: 'Electrician', status: 'Confirmată',
    budget: '1.500 - 2.500 RON', address: 'Sector 3, București', date: '20 Mai 2026', priority: 'Medie',
    worker: 'Alexandru Popescu', type: 'direct',
    description: 'Am nevoie de refacerea instalației electrice într-un apartament de 2 camere, inclusiv înlocuire tablou și prize.' },
  { id: 2, title: 'Montaj aer condiționat', category: 'Aer condiționat', status: 'Așteaptă alegere',
    budget: '400 - 600 RON', address: 'Sector 2, București', date: '25 Mai 2026', priority: 'Ridicată',
    type: 'open', applicants: [
      { id: 1, name: 'Cristian Vasile', workerId: 7 },
      { id: 2, name: 'Mihai Georgescu', workerId: null },
    ],
    description: 'Montaj aparat de aer condiționat nou achiziționat, în dormitor, etaj 3.' },
  { id: 3, title: 'Zugrăvit living și dormitor', category: 'Zugrav', status: 'Nou',
    budget: '800 - 1.200 RON', address: 'Sector 1, București', date: '2 Iunie 2026', priority: 'Scăzută',
    type: 'open', applicants: [],
    description: 'Zugrăvit complet living (22mp) și dormitor (14mp), culoare albă mată.' },
];

const INITIAL_CHATS = [
  { workerId: 1, workerName: 'Alexandru Popescu', online: true, unread: false, muted: false, blocked: false, messages: [
    { from: 'them', type: 'text', text: 'Salut! Am văzut cererea ta pentru instalația electrică.', time: '10:30' },
    { from: 'me', type: 'text', text: 'Bună! Da, încă mai am nevoie.', time: '10:31' },
    { from: 'them', type: 'text', text: 'Perfect, pot veni miercuri la ora 10:00 să văd lucrarea.', time: '10:32' },
    { from: 'me', type: 'text', text: 'Super! Miercuri la 10:00 e perfect.', time: '10:33' },
    { from: 'them', type: 'text', text: 'Confirmat 👍', time: '10:33' },
  ] },
  { workerId: 3, workerName: 'Maria Ionescu', online: false, unread: true, muted: false, blocked: false, messages: [
    { from: 'them', type: 'text', text: 'Bună ziua! Pot trece săptămâna viitoare pentru zugrăvit.', time: 'Ieri' },
  ] },
];

const INITIAL_REQUESTS = [
  { id: 1, title: 'Instalație electrică apartament', category: 'Electrician', budget: '500 - 800 RON', address: 'Sector 3, București', clientName: 'Andrei Popescu', clientId: 'client-1', status: 'Nou', description: 'Am nevoie de înlocuirea prizelor și a tabloului electric într-un apartament de 2 camere.' },
  { id: 2, title: 'Montaj aer condiționat', category: 'Aer condiționat', budget: '400 - 600 RON', address: 'Sector 2, București', clientName: 'Maria Ionescu', clientId: 'client-2', status: 'Nou', description: 'Am cumpărat un aparat de aer condiționat nou și am nevoie de montaj în dormitor.' },
  { id: 3, title: 'Tablou electric nou', category: 'Electrician', budget: '300 - 500 RON', address: 'Sector 1, București', clientName: 'Robert Stan', clientId: 'client-3', status: 'Acceptată', description: 'Tabloul electric actual este vechi și are nevoie de înlocuire completă.' },
  { id: 4, title: 'Reparație priză living', category: 'Electrician', budget: '150 - 250 RON', address: 'Sector 4, București', clientName: 'Elena Radu', clientId: 'client-4', status: 'Finalizată', description: 'O priză din living nu mai funcționează și are nevoie de reparație.' },
];

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Vasile Dumitrescu', role: 'Electrician', status: 'Disponibil' },
  { id: 2, name: 'Marius Popa', role: 'Ucenic electrician', status: 'În lucru' },
  { id: 3, name: 'Cătălin Ene', role: 'Electrician', status: 'Disponibil' },
];

const INITIAL_ADDRESSES = [
  { id: 1, label: 'Acasă', address: 'Sector 3, București' },
  { id: 2, label: 'Birou', address: 'Sector 1, București' },
];

const INITIAL_PAYMENT_METHODS = [
  { id: 1, brand: 'Card', last4: '4242', expiry: '09/28' },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Programare confirmată', text: 'Alexandru Popescu a confirmat programarea de miercuri.', time: 'Acum 10 min', read: false, target: { screen: 'chat', params: { workerId: 1, workerName: 'Alexandru Popescu' } } },
  { id: 2, title: 'Mesaj nou', text: 'Ai primit un mesaj nou de la Maria Ionescu.', time: 'Acum 2 ore', read: false, target: { screen: 'chat', params: { workerId: 3, workerName: 'Maria Ionescu' } } },
  { id: 3, title: 'Estimare gata', text: 'Estimarea ta AI pentru instalație electrică este gata.', time: 'Ieri', read: true },
];

const INITIAL_QUICK_TASKS = [
  { id: 1, description: 'Am nevoie de ajutor să urc o canapea nouă la etajul 3, fără lift.', reward: '50 RON', address: 'Sector 2, București', clientName: 'Ioana Radu', clientId: 'quicktask-1', status: 'Deschis', date: 'Acum 30 min' },
];

const ROMANIAN_CITIES = [
  'București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova',
  'Brașov', 'Galați', 'Ploiești', 'Oradea', 'Brăila', 'Arad', 'Pitești',
  'Sibiu', 'Bacău', 'Târgu Mureș', 'Baia Mare', 'Buzău', 'Botoșani', 'Satu Mare',
];

const STATUS_STYLES = {
  'Nou': { bg: 'rgba(56,189,248,0.15)', color: '#38BDF8' },
  'În așteptare': { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24' },
  'Așteaptă alegere': { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24' },
  'Confirmată': { bg: 'rgba(52,211,153,0.15)', color: '#34D399' },
  'Finalizată': { bg: 'rgba(167,139,250,0.15)', color: '#A78BFA' },
  'Acceptată': { bg: 'rgba(52,211,153,0.15)', color: '#34D399' },
  'Refuzată': { bg: 'rgba(248,113,113,0.15)', color: '#F87171' },
};

const WEEKDAYS_RO = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

const INITIAL_APPOINTMENTS = {
  '2026-08-05': [
    { time: '10:00', title: 'Instalație electrică', client: 'Andrei Popescu', status: 'Confirmată' },
    { time: '13:00', title: 'Montaj aer condiționat', client: 'Maria Ionescu', status: 'Confirmată' },
    { time: '16:00', title: 'Verificare tablou', client: 'Robert Stan', status: 'În așteptare' },
  ],
  '2026-08-12': [
    { time: '09:00', title: 'Zugrăvit apartament', client: 'Elena Radu', status: 'Confirmată' },
  ],
  '2026-08-19': [
    { time: '11:00', title: 'Reparație boiler', client: 'Vlad Ionescu', status: 'Confirmată' },
  ],
};

const PLANS = [
  { id: 'Premium', price: 49, features: ['Cereri nelimitate', 'Profil Premium', 'Apariție în top', 'Statistici avansate', 'Răspuns prioritar'] },
  { id: 'Business', price: 99, features: ['Tot din Premium', 'Mai mulți angajați', 'Calendar avansat', 'Facturi și încasări', 'Suport dedicat'] },
];

const MY_REVIEWS = [
  { id: 1, name: 'Cristina M.', rating: 5, text: 'Foarte profesionist, a rezolvat rapid problema. Recomand!', date: 'Acum 3 zile' },
  { id: 2, name: 'Bogdan T.', rating: 5, text: 'Punctual și corect. Lucrare de calitate.', date: 'Acum o săptămână' },
  { id: 3, name: 'Elena Radu', rating: 4, text: 'Bun, dar a întârziat puțin față de ora stabilită.', date: 'Acum 2 săptămâni' },
  { id: 4, name: 'Robert Stan', rating: 5, text: 'Foarte mulțumit, revin cu siguranță pentru alte lucrări.', date: 'Acum o lună' },
];

const FAQ_ITEMS = [
  { q: 'Cum programez un meseriaș?', a: 'Caută serviciul dorit, alege un meseriaș din listă și apasă „Programează" pentru a trimite o cerere.' },
  { q: 'Cum funcționează AI Estimator?', a: 'Descrii lucrarea de care ai nevoie, iar sistemul îți oferă o estimare de preț bazată pe piața din România.' },
  { q: 'Pot anula o programare?', a: 'Da, poți edita sau șterge o lucrare din secțiunea „Lucrările mele".' },
  { q: 'Cum contactez un meseriaș?', a: 'Din profilul meseriașului poți suna sau trimite mesaje direct prin chat.' },
];

const MONTHLY_REVENUE = [
  { month: 'Mar', value: 5200 }, { month: 'Apr', value: 6100 }, { month: 'Mai', value: 7850 },
  { month: 'Iun', value: 6900 }, { month: 'Iul', value: 8400 }, { month: 'Aug', value: 7850 },
];

const INITIAL_DAILY_EARNINGS = {
  '2026-08-03': [{ id: 1, amount: 850, note: 'Alexandru Popescu' }],
  '2026-08-05': [{ id: 2, amount: 1200, note: 'Instalație electrică' }],
  '2026-08-08': [{ id: 3, amount: 400, note: 'Montaj AC' }],
  '2026-08-12': [{ id: 4, amount: 950, note: 'Zugrăvit' }],
  '2026-08-15': [{ id: 5, amount: 600, note: '' }],
  '2026-08-19': [{ id: 6, amount: 1500, note: 'Renovare baie' }],
  '2026-08-22': [{ id: 7, amount: 300, note: '' }],
  '2026-08-27': [{ id: 8, amount: 1050, note: '' }],
  '2026-07-06': [{ id: 9, amount: 700, note: '' }],
  '2026-07-11': [{ id: 10, amount: 1100, note: '' }],
  '2026-07-18': [{ id: 11, amount: 900, note: '' }],
  '2026-07-24': [{ id: 12, amount: 1400, note: '' }],
};

const AVATAR_COLORS = ['#F97316', '#FBBF24', '#FB923C', '#FCD34D', '#EA580C', '#D97706', '#F59E0B'];
function colorForName(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}
function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}
function fmt(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }
function pct(part, total) { return total ? Math.min(100, Math.round((part / total) * 100)) : 0; }
function guessCategoryId(name) {
  if (!name) return null;
  const n = name.toLowerCase();
  const found = CATEGORIES.find(c => n.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(n));
  return found ? found.id : null;
}
function dateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}
function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  let nextDay = 1;
  while (cells.length % 7 !== 0) { cells.push({ day: nextDay, current: false }); nextDay++; }
  return cells;
}

// ---------------------------------------------------------------------------
// Shared small components
// ---------------------------------------------------------------------------
function Avatar({ name, size = 44, online, photoUrl }) {
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

function EditableAvatar({ name, size, photoUrl, onChange }) {
  const fileInputRef = useRef(null);
  function handlePick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <Avatar name={name} size={size} photoUrl={photoUrl} />
      <button onClick={() => fileInputRef.current?.click()} style={{
        position: 'absolute', bottom: -2, right: -2, width: Math.round(size * 0.34), height: Math.round(size * 0.34),
        borderRadius: 9999, background: C.purple, border: `2px solid ${C.bg}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
      }}>
        <Camera size={Math.round(size * 0.18)} color="#fff" />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePick} />
    </div>
  );
}

function Rating({ value, count, size = 13 }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={size} fill={C.amber} color={C.amber} />
      <span style={{ fontFamily: MONO, color: C.text }} className="text-xs font-semibold">{value.toFixed(1)}</span>
      {count != null && <span className="text-xs" style={{ color: C.textMuted }}>({count})</span>}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Nou'];
  return <span style={{ background: s.bg, color: s.color }} className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{status}</span>;
}

function EmployeeStatusBadge({ status }) {
  const isAvailable = status === 'Disponibil';
  const color = isAvailable ? C.green : C.amber;
  const bg = isAvailable ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)';
  return <span style={{ background: bg, color }} className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">{status}</span>;
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} style={{
      width: 44, height: 26, borderRadius: 9999, background: checked ? C.purple : C.surface2,
      border: `1px solid ${checked ? 'transparent' : C.border}`, position: 'relative', flexShrink: 0, padding: 0,
    }}>
      <div style={{
        position: 'absolute', top: 2, left: checked ? 20 : 2, width: 20, height: 20, borderRadius: 9999,
        background: '#fff', transition: 'left 0.15s',
      }} />
    </button>
  );
}

function CategoryChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ background: active ? GRADIENT : C.surface, border: `1px solid ${active ? 'transparent' : C.border}`, flexShrink: 0 }} className="px-3.5 py-2 rounded-full text-xs font-medium">
      <span style={{ color: active ? '#fff' : C.textMuted }}>{label}</span>
    </button>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-2.5 text-center">
      <div className="text-sm font-bold" style={{ color: C.text, fontFamily: MONO }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-medium mb-1.5" style={{ color: C.textMuted }}>{label}</div>
      {children}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div style={{ background: C.surface2 }} className="w-14 h-14 rounded-full flex items-center justify-center mb-3">
        <Search size={22} color={C.textFaint} />
      </div>
      <p className="text-xs" style={{ color: C.textMuted }}>{text}</p>
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
      <ArrowLeft size={16} color={C.text} />
    </button>
  );
}

function WorkerRow({ worker, onClick }) {
  return (
    <button onClick={onClick} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-2xl p-3 text-left">
      <Avatar name={worker.name} size={48} online={worker.available} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold truncate" style={{ color: C.text }}>{worker.name}</span>
          {worker.verified && <ShieldCheck size={13} color={C.cyan} />}
        </div>
        <div className="text-xs truncate" style={{ color: C.textMuted }}>{worker.category} · {worker.area}</div>
        <div className="mt-1"><Rating value={worker.rating} count={worker.reviews} /></div>
      </div>
      {worker.available && (
        <span style={{ background: 'rgba(52,211,153,0.15)', color: C.green }} className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">Disponibil</span>
      )}
    </button>
  );
}

function PortfolioGallery({ items, color }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item, i) => (
        <div key={i} style={{
          width: 120, height: 90, borderRadius: 14, flexShrink: 0, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${color}55, ${color}15)`, border: `1px solid ${C.border}`,
        }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={22} color={`${color}AA`} />
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
          }}>
            <span className="text-xs font-medium" style={{ color: '#fff' }}>{item.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MyPortfolioGrid({ photos, onAdd, onRemove }) {
  const fileInputRef = useRef(null);
  function handlePick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onAdd(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((url, i) => (
        <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}>
          <img src={url} alt="lucrare" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <button onClick={() => onRemove(i)} style={{
            position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 9999,
            background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}>
            <X size={11} color="#fff" />
          </button>
        </div>
      ))}
      <button onClick={() => fileInputRef.current?.click()} style={{
        aspectRatio: '1', borderRadius: 12, border: `1px dashed ${C.border}`, background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Camera size={18} color={C.textFaint} />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePick} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Client screens
// ---------------------------------------------------------------------------
function HomeScreen({ push, firstName, hasUnreadNotifications, location }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => push('locationPicker', {})} style={{ background: 'none', border: 'none', padding: 0, color: C.textMuted }} className="flex items-center gap-1.5">
          <MapPin size={14} />
          <span className="text-xs font-medium">{location}, România</span>
          <ChevronDown size={14} />
        </button>
        <button onClick={() => push('notifications', {})} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center relative">
          <Bell size={16} color={C.text} />
          {hasUnreadNotifications && <span style={{ background: C.red, position: 'absolute', top: 7, right: 8 }} className="w-1.5 h-1.5 rounded-full" />}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-1" style={{ color: C.text, letterSpacing: '-0.02em' }}>Bună, {firstName}! 👋</h1>
      <p className="text-sm mb-5" style={{ color: C.textMuted }}>Cu ce te putem ajuta astăzi?</p>

      <button onClick={() => push('search', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-6 text-left">
        <Search size={18} color={C.textMuted} />
        <span className="text-sm" style={{ color: C.textFaint }}>Caută un serviciu...</span>
      </button>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold" style={{ color: C.text }}>Categorii populare</h2>
        <button onClick={() => push('search', {})} className="text-xs font-medium" style={{ color: C.purple }}>Vezi toate</button>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => push('search', { category: cat.id })} className="flex flex-col items-center gap-2">
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `${cat.color}1A`, fontSize: 24 }} className="flex items-center justify-center">
              {cat.emoji}
            </div>
            <span className="text-xs text-center leading-tight" style={{ color: C.textMuted, fontSize: 11 }}>{cat.name}</span>
          </button>
        ))}
      </div>

      <button onClick={() => push('estimator', {})} style={{ background: GRADIENT }} className="w-full rounded-2xl p-4 mb-4 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div style={{ background: 'rgba(255,255,255,0.16)' }} className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">AI Estimator</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Află prețul estimativ pentru lucrare</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.18)' }} className="inline-flex items-center gap-1 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          Cere estimare <ChevronRight size={13} />
        </div>
      </button>

      <button onClick={() => push('postQuickTask', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-6 flex items-center justify-between text-left">
        <div className="flex items-center gap-3 min-w-0">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package size={20} color={C.purple} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold" style={{ color: C.text }}>Task rapid</div>
            <div className="text-xs" style={{ color: C.textMuted }}>Ajutor pentru o treabă mică, cu un mic bonus</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>

      <h2 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Meseriași de top lângă tine</h2>
      <div className="flex flex-col gap-3">
        {WORKERS.slice(0, 4).map(w => (
          <WorkerRow key={w.id} worker={w} onClick={() => push('worker', { worker: w })} />
        ))}
      </div>
    </div>
  );
}

function LocationPickerScreen({ currentLocation, onSelect, goBack }) {
  const [query, setQuery] = useState('');
  const filtered = ROMANIAN_CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Alege locația</h1>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-4">
        <Search size={16} color={C.textMuted} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută un oraș..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
      </div>

      <div className="flex flex-col">
        {filtered.map(city => {
          const isActive = city === currentLocation;
          return (
            <button
              key={city}
              onClick={() => { onSelect(city); goBack(); }}
              style={{ borderBottom: `1px solid ${C.border}` }}
              className="w-full flex items-center gap-3 py-3.5 text-left"
            >
              <MapPin size={16} color={isActive ? C.purple : C.textMuted} />
              <span className="text-sm flex-1" style={{ color: isActive ? C.purple : C.text, fontWeight: isActive ? 600 : 400 }}>{city}</span>
              {isActive && <CheckCircle2 size={16} color={C.purple} />}
            </button>
          );
        })}
        {filtered.length === 0 && <EmptyState text="Niciun oraș găsit." />}
      </div>
    </div>
  );
}

function SearchScreen({ push, initialCategory }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || null);

  const filtered = WORKERS.filter(w => {
    const matchCat = activeCategory ? w.categoryId === activeCategory : true;
    const q = query.toLowerCase();
    const matchQuery = query ? (w.name.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)) : true;
    return matchCat && matchQuery;
  });

  return (
    <div className="pb-6">
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2.5 min-w-0">
            <Search size={16} color={C.textMuted} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută meseriaș sau serviciu..." className="bg-transparent outline-none text-sm flex-1 min-w-0" style={{ color: C.text }} />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryChip label="Toate" active={!activeCategory} onClick={() => setActiveCategory(null)} />
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={activeCategory === c.id} onClick={() => setActiveCategory(c.id)} />
          ))}
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <div className="text-xs mb-1" style={{ color: C.textMuted }}>{filtered.length} meseriași găsiți</div>
        {filtered.map(w => <WorkerRow key={w.id} worker={w} onClick={() => push('worker', { worker: w })} />)}
        {filtered.length === 0 && <EmptyState text="Niciun meseriaș găsit pentru filtrele alese." />}
      </div>
    </div>
  );
}

function ShareAppIcon({ icon: Icon, bg, label, onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0 }} className="flex flex-col items-center gap-1.5">
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg }} className="flex items-center justify-center">
        <Icon size={22} color="#fff" />
      </div>
      <span className="text-xs" style={{ color: C.textMuted }}>{label}</span>
    </button>
  );
}

function ShareAppLink({ icon: Icon, bg, label, href, newTab }) {
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

function ShareSheet({ worker, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://fixgo.ro/meseriasi/${worker.id}`;
  const shareText = `${worker.name} - ${worker.category} · ${worker.rating.toFixed(1)}★ (${worker.reviews} recenzii) · ${worker.area}`;
  const fullMessage = `${shareText}\n${shareUrl}`;

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
  const smsHref = `sms:?body=${encodeURIComponent(fullMessage)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(worker.name + ' - FixGo')}&body=${encodeURIComponent(fullMessage)}`;

  function copyToClipboard() {
    let ok = false;
    try {
      const textarea = document.createElement('textarea');
      textarea.value = fullMessage;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      ok = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (err) { ok = false; }
    if (ok) {
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 900);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullMessage).then(() => {
        setCopied(true);
        setTimeout(() => { setCopied(false); onClose(); }, 900);
      }).catch(() => {});
    }
  }

  async function handleMore() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${worker.name} - FixGo`, text: shareText, url: shareUrl });
        return;
      } catch (err) { /* utilizatorul a anulat sau share nu e permis aici */ }
    }
    copyToClipboard();
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 40 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, padding: '0 10px 10px' }}>
        <div style={{ background: C.surface2, borderRadius: 20, overflow: 'hidden', marginBottom: 8 }}>
          <div className="flex items-center gap-3 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <Avatar name={worker.name} size={40} />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{worker.name}</div>
              <div className="text-xs truncate" style={{ color: C.textMuted }}>fixgo.ro</div>
            </div>
          </div>
          <div className="flex items-center justify-around px-3 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <ShareAppLink icon={MessageCircle} bg="#25D366" label="WhatsApp" href={whatsappHref} newTab />
            <ShareAppLink icon={MessageSquare} bg="#34C759" label="Mesaje" href={smsHref} />
            <ShareAppLink icon={Mail} bg="#3B82F6" label="Mail" href={mailHref} />
            <ShareAppIcon icon={Share2} bg="#8B8FA3" label="Mai multe" onClick={handleMore} />
          </div>
          <div className="flex items-center px-3 py-4">
            <ShareAppIcon icon={copied ? CheckCircle2 : Copy} bg={copied ? C.green : C.surface} label={copied ? 'Copiat!' : 'Copiază'} onClick={copyToClipboard} />
          </div>
        </div>
        <button onClick={onClose} style={{ background: C.surface2, borderRadius: 20 }} className="w-full py-3.5 text-center text-sm font-semibold">
          <span style={{ color: C.purple }}>Anulează</span>
        </button>
      </div>
    </>
  );
}

function WorkerProfileScreen({ worker, push, goBack, favorites, setFavorites, userReviews, onAddReview, onOpenShare }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const isFav = favorites.includes(worker.id);
  const categoryColor = CATEGORIES.find(c => c.id === worker.categoryId)?.color || C.purple;
  const allReviews = [...worker.reviewsSample, ...(userReviews || [])];

  function submitReview() {
    if (!reviewText.trim()) return;
    onAddReview({ rating, text: reviewText.trim() });
    setReviewText('');
    setRating(5);
  }

  return (
    <div className="pb-6">
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <BackButton onClick={goBack} />
        <div className="flex gap-2">
          <button onClick={() => setFavorites(f => isFav ? f.filter(id => id !== worker.id) : [...f, worker.id])} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center">
            <Heart size={16} color={isFav ? C.red : C.text} fill={isFav ? C.red : 'none'} />
          </button>
          <button onClick={() => onOpenShare(worker)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center">
            <Share2 size={16} color={C.text} />
          </button>
        </div>
      </div>

      <div className="px-5 pb-4 flex items-center gap-4">
        <Avatar name={worker.name} size={72} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h1 className="text-lg font-bold" style={{ color: C.text }}>{worker.name}</h1>
            {worker.verified && (
              <span style={{ background: 'rgba(253,224,71,0.15)', color: C.cyan }} className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                <ShieldCheck size={10} /> Verificat
              </span>
            )}
          </div>
          <div className="text-sm mb-1" style={{ color: C.textMuted }}>{worker.category}</div>
          <Rating value={worker.rating} count={worker.reviews} />
        </div>
      </div>

      <div className="px-5 flex items-center gap-1.5 mb-4 text-xs" style={{ color: C.textMuted }}>
        <MapPin size={13} /> {worker.area}
      </div>

      <div className="px-5 grid grid-cols-3 gap-2 mb-5">
        <StatBox label="Experiență" value={worker.experience} />
        <StatBox label="Răspuns" value={worker.responseTime} />
        <StatBox label="Lucrări" value={worker.completedJobs} />
      </div>

      <div className="px-5 mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Despre mine</h2>
        <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{worker.bio}</p>
      </div>

      {worker.portfolio && worker.portfolio.length > 0 && (
        <div className="px-5 mb-5">
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Lucrări recente</h2>
          <PortfolioGallery items={worker.portfolio} color={categoryColor} />
        </div>
      )}

      <div className="px-5 mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Servicii</h2>
        <div className="flex flex-wrap gap-2">
          {worker.services.map(s => (
            <span key={s} style={{ background: C.surface2, border: `1px solid ${C.border}`, color: C.text }} className="text-xs px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      <div className="px-5 mb-6">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Recenzii recente</h2>
        <div className="flex flex-col gap-2 mb-3">
          {allReviews.map((r, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold" style={{ color: C.text }}>{r.name || 'Tu'}</span>
                <Rating value={r.rating} />
              </div>
              <p className="text-xs" style={{ color: C.textMuted }}>{r.text}</p>
            </div>
          ))}
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă o recenzie</div>
          <div className="flex items-center gap-1.5 mb-3">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setRating(n)} style={{ background: 'none', border: 'none', padding: 0 }}>
                <Star size={22} fill={n <= rating ? C.amber : 'none'} color={C.amber} />
              </button>
            ))}
          </div>
          <div className="mb-3">
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} placeholder="Cum a fost experiența cu acest meseriaș?" style={{ ...inputStyle, resize: 'none' }} />
          </div>
          <button
            onClick={submitReview}
            disabled={!reviewText.trim()}
            style={{ background: reviewText.trim() ? GRADIENT : C.surface2, opacity: reviewText.trim() ? 1 : 0.6 }}
            className="w-full rounded-xl py-2.5 text-sm font-semibold text-white"
          >
            Trimite recenzia
          </button>
        </div>
      </div>

      <div className="px-5 flex gap-2">
        <button style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold">
          <Phone size={15} color={C.text} /> <span style={{ color: C.text }}>Sună</span>
        </button>
        <button onClick={() => push('chat', { workerId: worker.id, workerName: worker.name })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold">
          <MessageCircle size={15} color={C.text} /> <span style={{ color: C.text }}>Chat</span>
        </button>
        <button onClick={() => push('postJob', { worker })} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-3 text-sm font-semibold text-white text-center">
          Programează
        </button>
      </div>
    </div>
  );
}

function PostJobScreen({ worker, goBack, onSubmit }) {
  const [requestType, setRequestType] = useState(worker ? 'direct' : 'open');
  const [selectedWorker, setSelectedWorker] = useState(worker || null);
  const [title, setTitle] = useState(worker ? `Lucrare pentru ${worker.category.toLowerCase()}` : '');
  const [category, setCategory] = useState(worker ? worker.categoryId : CATEGORIES[0].id);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medie');

  const workersInCategory = WORKERS.filter(w => w.categoryId === category);
  const needsWorkerPick = !worker && requestType === 'direct';
  const canSubmit = title.trim() && description.trim() && address.trim() && (!needsWorkerPick || selectedWorker);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Postează o lucrare</h1>
      </div>

      {worker && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-3 rounded-xl p-3 mb-5">
          <Avatar name={worker.name} size={36} />
          <div className="text-xs" style={{ color: C.textMuted }}>Programezi cu <span className="font-semibold" style={{ color: C.text }}>{worker.name}</span></div>
        </div>
      )}

      {!worker && (
        <Field label="Cum trimiți cererea?">
          <div className="flex gap-2">
            <button
              onClick={() => setRequestType('open')}
              style={{ background: requestType === 'open' ? GRADIENT : C.surface, border: `1px solid ${requestType === 'open' ? 'transparent' : C.border}` }}
              className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
            >
              <span style={{ color: requestType === 'open' ? '#fff' : C.textMuted }}>Către mai mulți meseriași</span>
            </button>
            <button
              onClick={() => setRequestType('direct')}
              style={{ background: requestType === 'direct' ? GRADIENT : C.surface, border: `1px solid ${requestType === 'direct' ? 'transparent' : C.border}` }}
              className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
            >
              <span style={{ color: requestType === 'direct' ? '#fff' : C.textMuted }}>Către un meseriaș anume</span>
            </button>
          </div>
          <p className="text-xs mt-2" style={{ color: C.textMuted }}>
            {requestType === 'open'
              ? 'Mai mulți meseriași pot accepta, iar tu alegi pe cine preferi.'
              : 'Trimiți cererea unui singur meseriaș, ales de tine.'}
          </p>
        </Field>
      )}

      <Field label="Titlu lucrare">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ex. Instalație electrică apartament" style={inputStyle} />
      </Field>

      <Field label="Categorie">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={category === c.id} onClick={() => setCategory(c.id)} />
          ))}
        </div>
      </Field>

      {needsWorkerPick && (
        <Field label="Alege meseriașul">
          {workersInCategory.length === 0 ? (
            <p className="text-xs" style={{ color: C.textMuted }}>Niciun meseriaș disponibil în această categorie.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {workersInCategory.map(w => {
                const isActive = selectedWorker?.id === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorker(w)}
                    style={{ background: isActive ? 'rgba(249,115,22,0.1)' : C.surface, border: `1px solid ${isActive ? C.purple : C.border}` }}
                    className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left"
                  >
                    <Avatar name={w.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{w.name}</div>
                      <Rating value={w.rating} count={w.reviews} />
                    </div>
                    {isActive && <CheckCircle2 size={16} color={C.purple} />}
                  </button>
                );
              })}
            </div>
          )}
        </Field>
      )}

      <Field label="Descriere">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Descrie ce ai nevoie să se facă..." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Buget estimativ (RON)">
        <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="ex. 500 - 800 RON" style={inputStyle} />
      </Field>

      <Field label="Adresă">
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="ex. Sector 3, București" style={inputStyle} />
      </Field>

      <Field label="Data dorită">
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="ex. 15 Iunie 2026" style={inputStyle} />
      </Field>

      <Field label="Prioritate">
        <div className="flex gap-2">
          {['Scăzută', 'Medie', 'Ridicată'].map(p => (
            <button key={p} onClick={() => setPriority(p)} style={{ background: priority === p ? GRADIENT : C.surface, border: `1px solid ${priority === p ? 'transparent' : C.border}` }} className="flex-1 rounded-xl py-2 text-xs font-semibold">
              <span style={{ color: priority === p ? '#fff' : C.textMuted }}>{p}</span>
            </button>
          ))}
        </div>
      </Field>

      <button
        disabled={!canSubmit}
        onClick={() => onSubmit({
          title, category: CATEGORIES.find(c => c.id === category)?.name || category,
          status: 'Nou', budget: budget || 'La discuție', address, date: date || 'Flexibil',
          priority, description,
          type: worker || requestType === 'direct' ? 'direct' : 'open',
          worker: worker?.name || selectedWorker?.name,
          applicants: (worker || requestType === 'direct') ? undefined : [],
        })}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2">
        {(!worker && requestType === 'open') ? 'Postează pentru meseriași' : 'Trimite cererea'}
      </button>
    </div>
  );
}

function JobsScreen({ jobs, push }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Lucrările mele</h1>
      {jobs.length === 0 && <EmptyState text="Nu ai nicio lucrare postată încă." />}
      <div className="flex flex-col gap-3">
        {jobs.map(job => (
          <button key={job.id} onClick={() => push('jobDetails', { job })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full text-left rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold" style={{ color: C.text }}>{job.title}</span>
              <StatusBadge status={job.status} />
            </div>
            <div className="text-xs mb-2" style={{ color: C.textMuted }}>
              {job.category} · {job.address}
              {job.type === 'open' && <span> · Deschis către mai mulți{job.applicants && job.applicants.length > 0 ? ` (${job.applicants.length} interesați)` : ''}</span>}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: C.textMuted }}>{job.date}</span>
              <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{job.budget}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
      <div className="text-xs mb-1" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-xs font-semibold" style={{ color: C.text }}>{value}</div>
    </div>
  );
}

function JobDetailsScreen({ job, goBack, onDelete, push, onChooseApplicant }) {
  const showApplicants = job.type === 'open' && job.applicants && job.applicants.length > 0 && job.status !== 'Confirmată' && job.status !== 'Finalizată';
  const matchedWorker = job.worker ? WORKERS.find(w => w.name === job.worker) : null;
  const chatWorkerId = matchedWorker ? matchedWorker.id : (job.worker ? `worker-${job.worker.replace(/\s+/g, '-').toLowerCase()}` : null);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <BackButton onClick={goBack} />
        <StatusBadge status={job.status} />
      </div>

      <h1 className="text-lg font-bold mb-2" style={{ color: C.text }}>{job.title}</h1>
      <p className="text-sm leading-relaxed mb-5" style={{ color: C.textMuted }}>{job.description || 'Fără descriere suplimentară.'}</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <DetailRow label="Buget estimativ" value={job.budget} />
        <DetailRow label="Categorie" value={job.category} />
        <DetailRow label="Adresă" value={job.address} />
        <DetailRow label="Data dorită" value={job.date} />
        <DetailRow label="Prioritate" value={job.priority || 'Medie'} />
        {job.worker && <DetailRow label="Meseriaș" value={job.worker} />}
      </div>

      {job.worker && (
        <button
          onClick={() => push('chat', { workerId: chatWorkerId, workerName: job.worker })}
          style={{ background: GRADIENT }}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-1.5 mb-5"
        >
          <MessageCircle size={15} color="#fff" /> Trimite mesaj către {job.worker}
        </button>
      )}

      {showApplicants && (
        <div className="mb-5">
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Meseriași interesați</h2>
          <div className="flex flex-col gap-2">
            {job.applicants.map(a => (
              <div key={a.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center gap-3">
                <Avatar name={a.name} size={40} />
                <span className="text-sm font-semibold flex-1 truncate" style={{ color: C.text }}>{a.name}</span>
                <button onClick={() => onChooseApplicant(job.id, a, job.title)} style={{ background: GRADIENT }} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white flex-shrink-0">
                  Alege
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => push('editJob', { job })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1.5">
          <Pencil size={14} color={C.text} /><span style={{ color: C.text }}>Editează</span>
        </button>
        <button onClick={() => onDelete(job.id)} style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)' }} className="flex-1 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-1.5">
          <Trash2 size={14} color={C.red} /><span style={{ color: C.red }}>Șterge</span>
        </button>
      </div>
    </div>
  );
}

function EditJobScreen({ job, goBack, onSubmit }) {
  const [title, setTitle] = useState(job.title || '');
  const [category, setCategory] = useState(CATEGORIES.find(c => c.name === job.category)?.id || CATEGORIES[0].id);
  const [description, setDescription] = useState(job.description || '');
  const [budget, setBudget] = useState(job.budget || '');
  const [address, setAddress] = useState(job.address || '');
  const [date, setDate] = useState(job.date || '');
  const [priority, setPriority] = useState(job.priority || 'Medie');

  const canSubmit = title.trim() && description.trim() && address.trim();

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Editează lucrarea</h1>
      </div>

      <Field label="Titlu lucrare">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ex. Instalație electrică apartament" style={inputStyle} />
      </Field>

      <Field label="Categorie">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={category === c.id} onClick={() => setCategory(c.id)} />
          ))}
        </div>
      </Field>

      <Field label="Descriere">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Descrie ce ai nevoie să se facă..." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Buget estimativ (RON)">
        <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="ex. 500 - 800 RON" style={inputStyle} />
      </Field>

      <Field label="Adresă">
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="ex. Sector 3, București" style={inputStyle} />
      </Field>

      <Field label="Data dorită">
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="ex. 15 Iunie 2026" style={inputStyle} />
      </Field>

      <Field label="Prioritate">
        <div className="flex gap-2">
          {['Scăzută', 'Medie', 'Ridicată'].map(p => (
            <button key={p} onClick={() => setPriority(p)} style={{ background: priority === p ? GRADIENT : C.surface, border: `1px solid ${priority === p ? 'transparent' : C.border}` }} className="flex-1 rounded-xl py-2 text-xs font-semibold">
              <span style={{ color: priority === p ? '#fff' : C.textMuted }}>{p}</span>
            </button>
          ))}
        </div>
      </Field>

      <button
        disabled={!canSubmit}
        onClick={() => onSubmit({
          title, category: CATEGORIES.find(c => c.id === category)?.name || category,
          budget: budget || 'La discuție', address, date: date || 'Flexibil',
          priority, description,
        })}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2">
        Salvează modificările
      </button>
    </div>
  );
}

function MessagesScreen({ chats, push }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Mesaje</h1>
      {chats.length === 0 && <EmptyState text="Nu ai nicio conversație încă." />}
      <div className="flex flex-col gap-2">
        {chats.map(c => {
          const last = c.messages[c.messages.length - 1];
          const lastPreview = last ? (last.type === 'image' ? '📷 Fotografie' : last.type === 'materials' ? '📋 Listă materiale' : last.type === 'appointment' ? '📅 Programare propusă' : last.text) : '';
          return (
            <button key={c.workerId} onClick={() => push('chat', { workerId: c.workerId, workerName: c.workerName })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-2xl p-3 text-left">
              <Avatar name={c.workerName} size={48} online={c.online} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold truncate flex items-center gap-1" style={{ color: C.text }}>
                    {c.workerName}
                    {c.muted && <BellOff size={11} color={C.textFaint} />}
                    {c.blocked && <Ban size={11} color={C.red} />}
                  </span>
                  <span className="text-xs flex-shrink-0" style={{ color: C.textFaint }}>{last?.time}</span>
                </div>
                <div className="text-xs truncate" style={{ color: C.textMuted }}>{lastPreview}</div>
              </div>
              {c.unread && !c.muted && <span style={{ background: C.purple }} className="w-2 h-2 rounded-full flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatScreen({ chat, goBack, onSend, onOpenMaterials, onOpenMaterialsDetail, onOpenAssignmentClient, onToggleMute, onToggleBlock, onOpenProfile, onCreateAppointment }) {
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const endRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat.messages.length]);

  function sendText() {
    if (!text.trim()) return;
    onSend({ type: 'text', text: text.trim() });
    setText('');
  }

  function handlePickImage(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { onSend({ type: 'image', url: reader.result }); };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-2 pb-3 flex items-center gap-2 flex-shrink-0" style={{ borderBottom: `1px solid ${C.border}`, position: 'relative' }}>
        <BackButton onClick={goBack} />
        <button onClick={onOpenProfile} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-2 flex-1 min-w-0 ml-1 text-left">
          <Avatar name={chat.workerName} size={38} online={chat.online} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate flex items-center gap-1" style={{ color: C.text }}>
              <span className="truncate">{chat.workerName}</span>
              {chat.muted && <BellOff size={12} color={C.textFaint} />}
            </div>
            <div className="text-xs" style={{ color: chat.blocked ? C.red : (chat.online ? C.green : C.textFaint) }}>
              {chat.blocked ? 'Blocat' : (chat.online ? 'Online' : 'Offline')}
            </div>
          </div>
        </button>
        {onCreateAppointment && (
          <button onClick={onCreateAppointment} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <CalendarIcon size={14} color={C.text} />
          </button>
        )}
        <button onClick={onOpenMaterials} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <ClipboardList size={14} color={C.text} />
        </button>
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <MoreVertical size={16} color={C.text} />
        </button>
        {menuOpen && (
          <div style={{
            position: 'absolute', top: 54, right: 20, background: C.surface2, border: `1px solid ${C.border}`,
            borderRadius: 12, overflow: 'hidden', zIndex: 30, minWidth: 190, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <button onClick={() => { onToggleMute(); setMenuOpen(false); }} style={{ borderBottom: `1px solid ${C.border}` }} className="w-full flex items-center gap-2 px-3.5 py-3 text-left">
              {chat.muted ? <Bell size={14} color={C.text} /> : <BellOff size={14} color={C.text} />}
              <span className="text-xs" style={{ color: C.text }}>{chat.muted ? 'Anulează silențios' : 'Silențios (mute)'}</span>
            </button>
            <button onClick={() => { onToggleBlock(); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3.5 py-3 text-left">
              <Ban size={14} color={C.red} />
              <span className="text-xs" style={{ color: C.red }}>{chat.blocked ? 'Deblochează' : 'Blochează'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
        {chat.messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: (m.type === 'materials' || m.type === 'appointment' || m.type === 'assignment') ? '85%' : '78%' }}>
            {m.type === 'image' ? (
              <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                <img src={m.url} alt="atașament" style={{ display: 'block', width: 200, height: 'auto' }} />
              </div>
            ) : m.type === 'appointment' ? (
              <div style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon size={14} color={C.purple} />
                  <span className="text-xs font-semibold" style={{ color: C.text }}>Programare propusă</span>
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{m.title}</div>
                <div className="text-xs capitalize" style={{ color: C.textMuted }}>{m.dayLabel} · ora {m.time}</div>
              </div>
            ) : m.type === 'assignment' ? (
              <button
                onClick={() => m.clientId && onOpenAssignmentClient(m)}
                style={{ background: C.surface2, border: `1px solid ${C.border}`, textAlign: 'left', display: 'block', width: '100%' }}
                className="rounded-2xl p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={14} color={C.purple} />
                  <span className="text-xs font-semibold flex-1" style={{ color: C.text }}>Lucrare atribuită</span>
                  {m.clientId && <ChevronRight size={13} color={C.textFaint} />}
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: C.text }}>{m.title}</div>
                <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: C.textMuted }}>
                  <User size={11} /> <span>Contactează pe: <span style={{ color: C.text, fontWeight: 600 }}>{m.clientName}</span></span>
                </div>
                {m.address && (
                  <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: C.textMuted }}>
                    <MapPin size={11} /> {m.address}
                  </div>
                )}
                {m.budget && (
                  <div className="flex items-center justify-between text-xs pt-2 mt-1" style={{ borderTop: `1px solid ${C.border}` }}>
                    <span style={{ color: C.textMuted }}>Buget</span>
                    <span style={{ color: C.purple, fontFamily: MONO, fontWeight: 600 }}>{m.budget}</span>
                  </div>
                )}
                {m.clientId && (
                  <div className="text-xs pt-2 mt-1" style={{ color: C.purple, borderTop: m.budget ? 'none' : `1px solid ${C.border}` }}>
                    Apasă ca să scrii clientului →
                  </div>
                )}
              </button>
            ) : m.type === 'materials' ? (
              <button onClick={() => onOpenMaterialsDetail(m)} style={{ background: C.surface2, border: `1px solid ${C.border}`, textAlign: 'left', display: 'block', width: '100%' }} className="rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList size={14} color={C.purple} />
                  <span className="text-xs font-semibold flex-1" style={{ color: C.text }}>Listă materiale</span>
                  <ChevronRight size={13} color={C.textFaint} />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  {m.laborCost > 0 && (
                    <div className="flex items-center justify-between text-xs" style={{ color: C.textMuted }}>
                      <span>Manoperă</span>
                      <span style={{ fontFamily: MONO, color: C.text }}>{fmt(m.laborCost)} RON</span>
                    </div>
                  )}
                  {m.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs" style={{ color: C.textMuted }}>
                      <span>{it.qty} × {it.name}</span>
                      <span style={{ fontFamily: MONO, color: C.text }}>{fmt(it.qty * it.price)} RON</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
                  <span className="text-xs font-semibold" style={{ color: C.text }}>Total</span>
                  <span className="text-sm font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(m.total)} RON</span>
                </div>
                {m.attachments && m.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
                    {m.attachments.map(att => (
                      att.type === 'image' ? (
                        <img key={att.id} src={att.url} alt={att.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                      ) : (
                        <div key={att.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-1 rounded-lg px-2 py-1.5">
                          <FileText size={12} color={C.red} />
                          <span className="text-xs truncate" style={{ color: C.text, maxWidth: 80 }}>{att.name}</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </button>
            ) : (
              <div style={{ background: m.from === 'me' ? GRADIENT : C.surface2, border: m.from === 'me' ? 'none' : `1px solid ${C.border}` }} className="rounded-2xl px-3.5 py-2.5">
                <span className="text-sm" style={{ color: m.from === 'me' ? '#fff' : C.text }}>{m.text}</span>
              </div>
            )}
            <div style={{ textAlign: m.from === 'me' ? 'right' : 'left', color: C.textFaint }} className="text-xs mt-1">{m.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {chat.blocked ? (
        <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${C.border}` }}>
          <p className="text-xs text-center mb-2" style={{ color: C.textMuted }}>Ai blocat această conversație. Nu mai puteți face schimb de mesaje.</p>
          <button onClick={onToggleBlock} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-full rounded-xl py-2.5 text-xs font-semibold">
            <span style={{ color: C.text }}>Deblochează</span>
          </button>
        </div>
      ) : (
        <>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePickImage} />
          <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ borderTop: `1px solid ${C.border}` }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ background: C.surface2 }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
              <Camera size={16} color={C.text} />
            </button>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendText(); }}
              placeholder="Scrie un mesaj..."
              style={{ ...inputStyle, borderRadius: 9999 }}
            />
            <button onClick={sendText} style={{ background: GRADIENT }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
              <Send size={15} color="#fff" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function MyNotesListScreen({ lists, onAdd, onOpen, goBack }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');

  function submit() {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
    setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Notițele mele</h1>
      </div>
      <p className="text-xs mb-4" style={{ color: C.textMuted }}>Listele tale personale de materiale — doar pentru tine, nu se trimit nimănui.</p>

      <div className="flex flex-col gap-3 mb-5">
        {lists.length === 0 && <EmptyState text="Nu ai nicio listă încă." />}
        {lists.map(l => {
          const total = l.items.reduce((sum, i) => sum + i.qty * i.price, 0);
          return (
            <button key={l.id} onClick={() => onOpen(l.id)} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full text-left rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold" style={{ color: C.text }}>{l.title}</span>
                <ChevronRight size={16} color={C.textFaint} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: C.textMuted }}>{l.items.length} materiale</span>
                <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(total)} RON</span>
              </div>
            </button>
          );
        })}
      </div>

      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-3">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nume listă (ex. Instalație baie)" style={inputStyle} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold">
              <span style={{ color: C.textMuted }}>Anulează</span>
            </button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">Creează</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Listă nouă</span>
        </button>
      )}
    </div>
  );
}

function MyNotesDetailScreen({ list, onUpdateItems, onDelete, goBack }) {
  const [items, setItems] = useState(list.items);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('1');
  const [price, setPrice] = useState('');

  function addItem() {
    if (!name.trim() || !price) return;
    const newItems = [...items, { id: Date.now(), name: name.trim(), qty: Number(qty) || 1, price: Number(price) || 0 }];
    setItems(newItems);
    onUpdateItems(newItems);
    setName(''); setQty('1'); setPrice('');
  }
  function removeItem(id) {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    onUpdateItems(newItems);
  }

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <BackButton onClick={goBack} />
          <h1 className="text-base font-semibold truncate" style={{ color: C.text }}>{list.title}</h1>
        </div>
        <button onClick={() => { onDelete(list.id); goBack(); }} style={{ background: C.surface2 }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
          <Trash2 size={15} color={C.red} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {items.length === 0 && <EmptyState text="Nu ai adăugat încă niciun material." />}
        {items.map(item => (
          <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{item.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{item.qty} buc × {fmt(item.price)} RON</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(item.qty * item.price)} RON</span>
              <button onClick={() => removeItem(item.id)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <X size={13} color={C.textMuted} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă material</div>
        <div className="mb-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Denumire material" style={inputStyle} />
        </div>
        <div className="flex gap-2 mb-2">
          <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" placeholder="Cantitate" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" placeholder="Preț unitar (RON)" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
        </div>
        <button onClick={addItem} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-full rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
          <Plus size={14} color={C.text} /> <span style={{ color: C.text }}>Adaugă în listă</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-semibold" style={{ color: C.text }}>Total</span>
        <span className="text-base font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(total)} RON</span>
      </div>
    </div>
  );
}

function MaterialsDetailScreen({ message, goBack }) {
  if (!message) return <EmptyState text="Listă negăsită." />;
  const materialsTotal = message.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const laborCost = message.laborCost || 0;

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Listă materiale</h1>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {message.items.map((it, i) => (
          <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{it.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{it.qty} buc × {fmt(it.price)} RON</div>
            </div>
            <span className="text-sm font-semibold flex-shrink-0" style={{ color: C.purple, fontFamily: MONO }}>{fmt(it.qty * it.price)} RON</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 mb-6 px-1">
        {laborCost > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: C.textMuted }}>Manoperă</span>
            <span style={{ color: C.text, fontFamily: MONO }}>{fmt(laborCost)} RON</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: C.textMuted }}>Materiale</span>
          <span style={{ color: C.text, fontFamily: MONO }}>{fmt(materialsTotal)} RON</span>
        </div>
        <div className="flex items-center justify-between pt-1.5 mt-1" style={{ borderTop: `1px solid ${C.border}` }}>
          <span className="text-base font-semibold" style={{ color: C.text }}>Total</span>
          <span className="text-lg font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(materialsTotal + laborCost)} RON</span>
        </div>
      </div>

      {message.attachments && message.attachments.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Atașamente</h2>
          <div className="flex flex-col gap-2">
            {message.attachments.map(att => (
              att.type === 'image' ? (
                <img key={att.id} src={att.url} alt={att.name} style={{ width: '100%', borderRadius: 14, display: 'block' }} />
              ) : (
                <a
                  key={att.id}
                  href={att.url}
                  download={att.name}
                  style={{ background: C.surface, border: `1px solid ${C.border}`, textDecoration: 'none' }}
                  className="flex items-center gap-3 rounded-xl p-3"
                >
                  <div style={{ background: C.surface2 }} className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} color={C.red} />
                  </div>
                  <span className="text-sm flex-1 truncate" style={{ color: C.text }}>{att.name}</span>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MaterialsListScreen({ workerId, workerName, clients, initialItems, initialAttachments, initialLaborCost, onSave, goBack }) {
  const [items, setItems] = useState(initialItems || []);
  const [attachments, setAttachments] = useState(initialAttachments || []);
  const [laborCost, setLaborCost] = useState(initialLaborCost ? String(initialLaborCost) : '');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('1');
  const [price, setPrice] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(workerId ? { clientId: workerId, clientName: workerName } : null);
  const [clientQuery, setClientQuery] = useState('');
  const photoInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const needsClientPick = !workerId;

  function addItem() {
    if (!name.trim() || !price) return;
    setItems(list => [...list, { id: Date.now(), name: name.trim(), qty: Number(qty) || 1, price: Number(price) || 0 }]);
    setName(''); setQty('1'); setPrice('');
  }
  function removeItem(id) {
    setItems(list => list.filter(i => i.id !== id));
  }

  function handlePickPhoto(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAttachments(list => [...list, { id: Date.now(), type: 'image', url: reader.result, name: file.name }]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handlePickPdf(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      setAttachments(list => [...list, { id: Date.now(), type: 'pdf', url: dataUrl, name: file.name }]);
      setExtracting(true);
      setExtractError(null);
      try {
        const base64Data = dataUrl.split(',')[1];
        const promptText = 'Ești un asistent care extrage articole (materiale/piese) și costurile lor dintr-o factură pentru un meseriaș din România. Analizează documentul PDF atașat și răspunde DOAR cu un obiect JSON valid, fără text suplimentar, fără markdown, fără backticks, fără explicații înainte sau după. Format exact: {"items":[{"name":"string","qty":number,"price":number}]}. "price" este prețul unitar în RON (calculează total împărțit la cantitate dacă factura arată doar valoarea totală pe linie). Dacă nu poți identifica articole individuale, returnează un singur articol cu denumirea "Materiale conform factură", cantitatea 1 și prețul egal cu totalul general al facturii. Extrage lista de materiale și costul lor din această factură.';
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1500,
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64Data } },
                  { type: 'text', text: promptText },
                ],
              },
            ],
          }),
        });
        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          throw new Error(`Cerere eșuată (${response.status}) ${errText.slice(0, 150)}`);
        }
        const data = await response.json();
        const raw = (data.content || []).map(b => b.text || '').join('');
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        const clean = (jsonMatch ? jsonMatch[0] : raw).replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);
        if (parsed.items && parsed.items.length > 0) {
          setItems(list => [...list, ...parsed.items.map(it => ({
            id: Date.now() + Math.random(), name: it.name, qty: Number(it.qty) || 1, price: Number(it.price) || 0,
          }))]);
        }
      } catch (err) {
        setExtractError('Nu am putut calcula costul automat din factură (' + (err.message || 'eroare necunoscută') + '). Poți adăuga materialele manual.');
      } finally {
        setExtracting(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function removeAttachment(id) {
    setAttachments(list => list.filter(a => a.id !== id));
  }

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const filteredClients = (clients || []).filter(c => c.clientName.toLowerCase().includes(clientQuery.toLowerCase()));

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <div>
          <h1 className="text-base font-semibold" style={{ color: C.text }}>Listă materiale</h1>
          {!needsClientPick && <div className="text-xs" style={{ color: C.textMuted }}>{workerName}</div>}
        </div>
      </div>

      {needsClientPick && (
        <Field label="Pentru cine e lista?">
          {selectedClient ? (
            <div style={{ background: C.surface, border: `1px solid ${C.purple}` }} className="flex items-center justify-between rounded-xl p-2.5">
              <div className="flex items-center gap-2.5">
                <Avatar name={selectedClient.clientName} size={32} />
                <span className="text-sm" style={{ color: C.text }}>{selectedClient.clientName}</span>
              </div>
              <button onClick={() => setSelectedClient(null)} style={{ background: 'none', border: 'none', padding: 0 }}>
                <X size={16} color={C.textMuted} />
              </button>
            </div>
          ) : (!clients || clients.length === 0) ? (
            <p className="text-xs" style={{ color: C.textMuted }}>Nu ai încă niciun client cu care să vorbești.</p>
          ) : (
            <>
              <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2">
                <Search size={15} color={C.textMuted} />
                <input value={clientQuery} onChange={e => setClientQuery(e.target.value)} placeholder="Caută o persoană..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
              </div>
              <div className="flex flex-col gap-2">
                {filteredClients.length === 0 && <p className="text-xs" style={{ color: C.textMuted }}>Nicio persoană găsită.</p>}
                {filteredClients.map(c => (
                  <button key={c.clientId} onClick={() => setSelectedClient(c)} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left">
                    <Avatar name={c.clientName} size={32} />
                    <span className="text-sm flex-1" style={{ color: C.text }}>{c.clientName}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </Field>
      )}

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Manoperă</div>
        <input value={laborCost} onChange={e => setLaborCost(e.target.value)} type="number" min="0" placeholder="Cost manoperă (RON)" style={inputStyle} />
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {items.length === 0 && <EmptyState text="Nu ai adăugat încă niciun material." />}
        {items.map(item => (
          <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{item.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{item.qty} buc × {fmt(item.price)} RON</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(item.qty * item.price)} RON</span>
              <button onClick={() => removeItem(item.id)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <X size={13} color={C.textMuted} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă material</div>
        <div className="mb-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Denumire material" style={inputStyle} />
        </div>
        <div className="flex gap-2 mb-2">
          <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" placeholder="Cantitate" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" placeholder="Preț unitar (RON)" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
        </div>
        <button onClick={addItem} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-full rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
          <Plus size={14} color={C.text} /> <span style={{ color: C.text }}>Adaugă în listă</span>
        </button>
      </div>

      <div className="mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Atașamente (opțional)</div>
        {attachments.length > 0 && (
          <div className="flex flex-col gap-2 mb-2">
            {attachments.map(att => (
              <div key={att.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-2 flex items-center gap-2">
                {att.type === 'image' ? (
                  <img src={att.url} alt={att.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: C.surface2, flexShrink: 0 }} className="flex items-center justify-center">
                    <FileText size={18} color={C.red} />
                  </div>
                )}
                <span className="text-xs flex-1 truncate" style={{ color: C.text }}>{att.name}</span>
                <button onClick={() => removeAttachment(att.id)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                  <X size={13} color={C.textMuted} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => photoInputRef.current?.click()} style={{ background: C.surface, border: `1px dashed ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
            <Camera size={14} color={C.textMuted} /> <span style={{ color: C.textMuted }}>Adaugă poză</span>
          </button>
          <button onClick={() => pdfInputRef.current?.click()} style={{ background: C.surface, border: `1px dashed ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
            <FileText size={14} color={C.textMuted} /> <span style={{ color: C.textMuted }}>Adaugă PDF</span>
          </button>
        </div>
        <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePickPhoto} />
        <input ref={pdfInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handlePickPdf} />
        {extracting && (
          <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: C.textMuted }}>
            <Loader2 size={13} className="animate-spin" /> Se calculează costul din factură...
          </div>
        )}
        {extractError && <p className="text-xs mt-2" style={{ color: C.red }}>{extractError}</p>}
      </div>

      <div className="flex flex-col gap-1.5 mb-5 px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: C.textMuted }}>Manoperă</span>
          <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{fmt(Number(laborCost) || 0)} RON</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: C.textMuted }}>Materiale</span>
          <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{fmt(total)} RON</span>
        </div>
        <div className="flex items-center justify-between pt-1.5 mt-0.5" style={{ borderTop: `1px solid ${C.border}` }}>
          <span className="text-sm font-semibold" style={{ color: C.text }}>Total</span>
          <span className="text-base font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(total + (Number(laborCost) || 0))} RON</span>
        </div>
      </div>

      <button
        disabled={(items.length === 0 && !(Number(laborCost) > 0)) || (needsClientPick && !selectedClient)}
        onClick={() => onSave(items, attachments, Number(laborCost) || 0, selectedClient)}
        style={{
          background: ((items.length === 0 && !(Number(laborCost) > 0)) || (needsClientPick && !selectedClient)) ? C.surface2 : GRADIENT,
          opacity: ((items.length === 0 && !(Number(laborCost) > 0)) || (needsClientPick && !selectedClient)) ? 0.6 : 1,
        }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white"
      >
        Trimite lista în conversație
      </button>
    </div>
  );
}

function EstimatorScreen({ goBack, push }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const catName = category ? CATEGORIES.find(c => c.id === category)?.name : 'General';
      const prompt = 'Ești un motor de estimare a prețurilor pentru FixGo, o platformă din România care conectează clienți cu meseriași (electricieni, instalatori, zugravi etc). Primești o descriere a unei lucrări și trebuie să răspunzi DOAR cu un obiect JSON valid, fără text suplimentar, fără markdown, fără backticks, fără explicații înainte sau după. Folosește prețuri realiste de piață din România, în RON. Format exact: {"category":"string","summary":"o propoziție scurtă în română","laborMin":number,"laborMax":number,"materialsMin":number,"materialsMax":number,"otherMin":number,"otherMax":number,"totalMin":number,"totalMax":number}\n\nCategorie sugerată: ' + catName + '. Descrierea lucrării: ' + description;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: prompt },
          ],
        }),
      });
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`Cerere eșuată (${response.status}) ${errText.slice(0, 150)}`);
      }
      const data = await response.json();
      const raw = (data.content || []).map(b => b.text || '').join('');
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const clean = (jsonMatch ? jsonMatch[0] : raw).replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      push('estimateResult', { result: parsed });
    } catch (e) {
      setError('Nu am putut genera estimarea. ' + (e.message || 'Încearcă din nou.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>AI Estimator</h1>
      </div>

      <div className="flex flex-col items-center mb-6 mt-2">
        <div style={{
          width: 88, height: 88, borderRadius: 9999, background: GRADIENT,
          boxShadow: loading ? '0 0 0 8px rgba(249,115,22,0.15)' : 'none', transition: 'box-shadow 0.3s',
        }} className="flex items-center justify-center mb-3">
          <Bot size={40} color="#fff" />
        </div>
        <p className="text-xs text-center" style={{ color: C.textMuted, maxWidth: 260 }}>
          Descrie lucrarea de care ai nevoie și AI-ul nostru îți oferă o estimare de preț în câteva secunde.
        </p>
      </div>

      <Field label="Descrie lucrarea ta">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="ex. Vreau să schimb instalația electrică într-un apartament de 2 camere, aproximativ 50mp." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Adaugă poze (opțional)">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <button key={i} onClick={() => setPhotos(p => Math.max(p, i + 1))} style={{ width: 60, height: 60, borderRadius: 12, background: photos > i ? C.surface2 : 'transparent', border: `1px dashed ${C.border}` }} className="flex items-center justify-center">
              <Camera size={18} color={C.textFaint} />
            </button>
          ))}
        </div>
      </Field>

      <Field label="Categorie (opțional)">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={category === c.id} onClick={() => setCategory(category === c.id ? null : c.id)} />
          ))}
        </div>
      </Field>

      {error && <p className="text-xs mb-3" style={{ color: C.red }}>{error}</p>}

      <button
        disabled={!description.trim() || loading}
        onClick={generate}
        style={{ background: (!description.trim() || loading) ? C.surface2 : GRADIENT, opacity: (!description.trim() || loading) ? 0.6 : 1 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 mt-2">
        {loading ? (<><Loader2 size={16} className="animate-spin" /> Se generează...</>) : 'Generează estimare'}
      </button>
    </div>
  );
}

function EstimateRow({ label, min, max, percent, color }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: C.text }}>{label}</span>
        <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{fmt(min)} - {fmt(max)} RON</span>
      </div>
      <div style={{ background: C.surface2, height: 6, borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 9999 }} />
      </div>
    </div>
  );
}

function EstimateResultScreen({ result, goBack, push }) {
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

function QuickTaskScreen({ goBack, onSubmit }) {
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [address, setAddress] = useState('');

  const canSubmit = description.trim() && address.trim();

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Task rapid</h1>
      </div>

      <div className="flex flex-col items-center mb-6 mt-2">
        <div style={{ width: 72, height: 72, borderRadius: 9999, background: GRADIENT }} className="flex items-center justify-center mb-3">
          <Package size={30} color="#fff" />
        </div>
        <p className="text-xs text-center" style={{ color: C.textMuted, maxWidth: 260 }}>
          Ai o treabă mică — mutat mobilă, cărat cutii, o reparație rapidă? Postează aici și oferă un mic bonus meseriașilor din zonă.
        </p>
      </div>

      <Field label="Ce ai nevoie să se facă?">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="ex. Am nevoie de cineva să mă ajute să urc o canapea la etajul 3." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Bonus oferit (opțional)">
        <input value={reward} onChange={e => setReward(e.target.value)} placeholder="ex. 50 RON" style={inputStyle} />
      </Field>

      <Field label="Adresă">
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="ex. Sector 2, București" style={inputStyle} />
      </Field>

      <button
        disabled={!canSubmit}
        onClick={() => onSubmit({ description: description.trim(), reward: reward.trim() || 'La discuție', address: address.trim() })}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2"
      >
        Trimite task-ul
      </button>
    </div>
  );
}

function QuickTasksScreen({ quickTasks, onClaim, push, goBack }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Task-uri rapide</h1>
      </div>
      {quickTasks.length === 0 && <EmptyState text="Nu există task-uri rapide momentan." />}
      <div className="flex flex-col gap-3">
        {quickTasks.map(t => (
          <div key={t.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <button onClick={() => push('contactProfile', { name: t.clientName, clientId: t.clientId })} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-2 min-w-0 flex-1 text-left">
                <Avatar name={t.clientName} size={36} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{t.clientName}</div>
                  <div className="text-xs truncate" style={{ color: C.textMuted }}>{t.address}</div>
                </div>
              </button>
              <button onClick={() => push('chat', { workerId: t.clientId, workerName: t.clientName })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={13} color={C.text} />
              </button>
            </div>
            <p className="text-sm mb-3" style={{ color: C.text }}>{t.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: C.amber, fontFamily: MONO }}>Bonus: {t.reward}</span>
              {t.status === 'Deschis' ? (
                <button onClick={() => onClaim(t.id)} style={{ background: GRADIENT }} className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white">
                  Preiau eu
                </button>
              ) : (
                <span className="text-xs font-semibold" style={{ color: C.green }}>Preluat de tine</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditProfileScreen({ profile, onSave, goBack }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || '');

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Informațiile mele</h1>
      </div>
      <Field label="Nume complet">
        <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      </Field>
      <Field label="Email">
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={inputStyle} />
      </Field>
      <Field label="Telefon">
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="ex. 07xx xxx xxx" style={inputStyle} />
      </Field>
      <button
        onClick={() => { onSave({ name, email, phone }); goBack(); }}
        style={{ background: GRADIENT }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2"
      >
        Salvează modificările
      </button>
    </div>
  );
}

function AddressesScreen({ addresses, onAdd, onRemove, goBack }) {
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');

  function submit() {
    if (!label.trim() || !address.trim()) return;
    onAdd({ label: label.trim(), address: address.trim() });
    setLabel(''); setAddress(''); setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Adresele mele</h1>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {addresses.length === 0 && <EmptyState text="Nu ai nicio adresă salvată." />}
        {addresses.map(a => (
          <div key={a.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center gap-3">
            <div style={{ background: C.surface2 }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={17} color={C.purple} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{a.label}</div>
              <div className="text-xs truncate" style={{ color: C.textMuted }}>{a.address}</div>
            </div>
            <button onClick={() => onRemove(a.id)} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <Trash2 size={14} color={C.red} />
            </button>
          </div>
        ))}
      </div>
      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-2"><input value={label} onChange={e => setLabel(e.target.value)} placeholder="Etichetă (ex. Acasă)" style={inputStyle} /></div>
          <div className="mb-3"><input value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresă completă" style={inputStyle} /></div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold"><span style={{ color: C.textMuted }}>Anulează</span></button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">Adaugă</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă adresă</span>
        </button>
      )}
    </div>
  );
}

function PaymentMethodsScreen({ methods, onAdd, onRemove, goBack }) {
  const [showForm, setShowForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  function submit() {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 4) return;
    onAdd({ brand: 'Card', last4: digits.slice(-4), expiry: expiry || '--/--' });
    setCardNumber(''); setExpiry(''); setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Metode de plată</h1>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {methods.length === 0 && <EmptyState text="Nu ai nicio metodă de plată salvată." />}
        {methods.map(m => (
          <div key={m.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center gap-3">
            <div style={{ background: C.surface2 }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard size={17} color={C.cyan} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{m.brand} •••• {m.last4}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>Expiră {m.expiry}</div>
            </div>
            <button onClick={() => onRemove(m.id)} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <Trash2 size={14} color={C.red} />
            </button>
          </div>
        ))}
      </div>
      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-2"><input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Număr card" style={inputStyle} /></div>
          <div className="mb-3"><input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="Expirare (LL/AA)" style={inputStyle} /></div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold"><span style={{ color: C.textMuted }}>Anulează</span></button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">Adaugă</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă card</span>
        </button>
      )}
    </div>
  );
}

function FavoritesScreen({ favorites, push, goBack }) {
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

function NotificationsScreen({ notifications, onMarkRead, push, goBack }) {
  useEffect(() => { onMarkRead(); }, []);
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Notificări</h1>
      </div>
      {notifications.length === 0 && <EmptyState text="Nu ai nicio notificare." />}
      <div className="flex flex-col gap-2">
        {notifications.map(n => {
          const clickable = !!n.target;
          const Wrapper = clickable ? 'button' : 'div';
          return (
            <Wrapper
              key={n.id}
              onClick={clickable ? () => push(n.target.screen, n.target.params) : undefined}
              style={{
                background: n.read ? C.surface : 'rgba(249,115,22,0.08)', border: `1px solid ${n.read ? C.border : C.purple}`,
                textAlign: 'left', width: '100%', display: 'block',
              }}
              className="rounded-2xl p-3.5"
            >
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="text-sm font-semibold" style={{ color: C.text }}>{n.title}</span>
                {!n.read && <span style={{ background: C.purple }} className="w-2 h-2 rounded-full flex-shrink-0" />}
              </div>
              <p className="text-xs mb-1" style={{ color: C.textMuted }}>{n.text}</p>
              <span className="text-xs" style={{ color: C.textFaint }}>{n.time}</span>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}

function SettingsScreen({ settings, onChange, goBack }) {
  const rows = [
    { key: 'pushNotifications', label: 'Notificări push', desc: 'Primește alerte pentru mesaje și programări' },
    { key: 'emailUpdates', label: 'Actualizări pe email', desc: 'Rezumate și oferte pe email' },
    { key: 'darkMode', label: 'Mod întunecat', desc: 'Interfață cu fundal închis' },
  ];
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Setări</h1>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map(r => (
          <div key={r.key} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{r.label}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{r.desc}</div>
            </div>
            <ToggleSwitch checked={settings[r.key]} onChange={(v) => onChange(r.key, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HelpScreen({ goBack }) {
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

function AccountScreen({ push, onSwitchMode, profilePhoto, onPhotoChange, profileInfo }) {
  const menu = [
    { label: 'Informațiile mele', icon: User, action: () => push('editProfile', {}) },
    { label: 'Adresele mele', icon: MapPin, action: () => push('addresses', {}) },
    { label: 'Metode de plată', icon: CreditCard, action: () => push('paymentMethods', {}) },
    { label: 'Favorite', icon: Heart, action: () => push('favorites', {}) },
    { label: 'Lucrările mele', icon: Briefcase, action: () => push('jobs') },
    { label: 'Notificări', icon: Bell, action: () => push('notifications', {}) },
    { label: 'Setări', icon: Settings, action: () => push('settings', {}) },
    { label: 'Ajutor și suport', icon: HelpCircle, action: () => push('help', {}) },
  ];
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-4 mb-5">
        <EditableAvatar name={profileInfo.name} size={64} photoUrl={profilePhoto} onChange={onPhotoChange} />
        <div>
          <h1 className="text-base font-bold" style={{ color: C.text }}>{profileInfo.name}</h1>
          <p className="text-xs mb-1" style={{ color: C.textMuted }}>{profileInfo.email}</p>
          <Rating value={4.9} count={12} />
        </div>
      </div>

      <button onClick={onSwitchMode} style={{ background: GRADIENT }} className="w-full rounded-2xl p-4 mb-5 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div style={{ background: 'rgba(255,255,255,0.16)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Briefcase size={18} color="#fff" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Mod Meseriaș</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Gestionează solicitări și programări</div>
          </div>
        </div>
        <ChevronRight size={18} color="#fff" />
      </button>

      <div className="flex flex-col">
        {menu.map(item => (
          <button key={item.label} onClick={item.action} style={{ borderBottom: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 py-3.5 text-left">
            <item.icon size={17} color={C.textMuted} />
            <span className="text-sm flex-1" style={{ color: C.text }}>{item.label}</span>
            <ChevronRight size={15} color={C.textFaint} />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 py-3.5 text-left mt-2">
          <LogOut size={17} color={C.red} />
          <span className="text-sm" style={{ color: C.red }}>Deconectare</span>
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pro (Meseriaș) screens
// ---------------------------------------------------------------------------
function ProStatCard({ label, value, delta, isRating, onClick }) {
  return (
    <button onClick={onClick} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 text-left w-full">
      <div className="text-xs mb-2" style={{ color: C.textMuted }}>{label}</div>
      <div className="flex items-end justify-between">
        <span className="text-lg font-bold" style={{ color: C.text, fontFamily: MONO }}>{value}</span>
        {isRating ? (
          <Star size={14} fill={C.amber} color={C.amber} />
        ) : (
          <span className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: C.green }}>
            <TrendingUp size={11} />{delta}
          </span>
        )}
      </div>
    </button>
  );
}

function RequestCard({ request, onAccept, onDecline, onMessage, onOpenProfile, onAssign, employees, plan, compact }) {
  const [assignMenuOpen, setAssignMenuOpen] = useState(false);
  const canAssign = !compact && plan === 'Business' && employees && employees.length > 0 && request.status === 'Acceptată';

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, position: 'relative' }} className="rounded-2xl p-3.5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <button onClick={() => onOpenProfile && onOpenProfile(request)} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-2 min-w-0 flex-1 text-left">
          <Avatar name={request.clientName} size={36} />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{request.title}</div>
            <div className="text-xs truncate" style={{ color: C.textMuted }}>{request.clientName} · {request.address}</div>
          </div>
        </button>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onMessage && (
            <button onClick={() => onMessage(request)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-7 h-7 rounded-full flex items-center justify-center">
              <MessageCircle size={13} color={C.text} />
            </button>
          )}
          <StatusBadge status={request.status} />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span style={{ color: C.textMuted }}>{request.category}</span>
        <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{request.budget}</span>
      </div>
      {!compact && request.status === 'Nou' && (
        <div className="flex gap-2 mt-2">
          <button onClick={() => onDecline(request.id)} style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)' }} className="flex-1 rounded-lg py-2 text-xs font-semibold">
            <span style={{ color: C.red }}>Refuză</span>
          </button>
          <button onClick={() => onAccept(request.id)} style={{ background: GRADIENT }} className="flex-1 rounded-lg py-2 text-xs font-semibold text-white">
            Acceptă
          </button>
        </div>
      )}
      {canAssign && (
        <div className="mt-2" style={{ position: 'relative' }}>
          <button
            onClick={() => setAssignMenuOpen(o => !o)}
            style={{
              background: request.assignedTo ? 'rgba(52,211,153,0.12)' : C.surface2,
              border: `1px solid ${request.assignedTo ? C.green : C.border}`,
            }}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold"
          >
            <Users size={13} color={request.assignedTo ? C.green : C.textMuted} />
            <span style={{ color: request.assignedTo ? C.green : C.textMuted }}>
              {request.assignedTo ? `Atribuit: ${request.assignedTo.employeeName}` : 'Atribuie unui angajat'}
            </span>
          </button>
          {assignMenuOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: C.surface2,
              border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', zIndex: 30, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              {employees.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => { onAssign(request.id, emp); setAssignMenuOpen(false); }}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-3 text-left"
                >
                  <Avatar name={emp.name} size={24} />
                  <span className="text-xs" style={{ color: C.text }}>{emp.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProDashboardScreen({ requests, push, plan, employees, profileInfo, hasUnreadNotifications, quickTasks }) {
  const recent = requests.slice(0, 3);
  const openQuickTasks = quickTasks.filter(t => t.status === 'Deschis').length;
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs" style={{ color: C.textMuted }}>Bun venit înapoi</div>
          <h1 className="text-xl font-bold" style={{ color: C.text, letterSpacing: '-0.02em' }}>{profileInfo.name}</h1>
        </div>
        <button onClick={() => push('notifications', {})} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-9 h-9 rounded-full flex items-center justify-center relative">
          <Bell size={16} color={C.text} />
          {hasUnreadNotifications && <span style={{ background: C.red, position: 'absolute', top: 7, right: 8 }} className="w-1.5 h-1.5 rounded-full" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <ProStatCard label="Solicitări primite" value="48" delta="+12%" onClick={() => push('proRequests', {})} />
        <ProStatCard label="Lucrări finalizate" value="32" delta="+8%" onClick={() => push('proJobs', { tab: 'finalizate' })} />
        <ProStatCard label="Încasări" value="7.850 RON" delta="+15%" onClick={() => push('earnings', {})} />
        <ProStatCard label="Rating mediu" value="4.9" isRating onClick={() => push('myReviews', {})} />
      </div>

      <button onClick={() => push('proSubscriptions', {})} style={{ background: GRADIENT }} className="w-full rounded-2xl p-4 mb-4 text-left flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-sm mb-0.5">Plan {plan}</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>Vezi detalii abonament</div>
        </div>
        <ChevronRight size={18} color="#fff" />
      </button>

      {openQuickTasks > 0 && (
        <button onClick={() => push('quickTasks', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3 min-w-0">
            <div style={{ background: 'rgba(52,211,153,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package size={18} color={C.green} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>Task-uri rapide</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{openQuickTasks} disponibile lângă tine, cu bonus</div>
            </div>
          </div>
          <ChevronRight size={18} color={C.textMuted} />
        </button>
      )}

      {plan === 'Business' && (
        <button onClick={() => push('proEmployees', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-6 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={18} color={C.purple} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.text }}>Echipa ta</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{employees.length} angajați activi</div>
            </div>
          </div>
          <ChevronRight size={18} color={C.textMuted} />
        </button>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => push('proJobs', { tab: 'available' })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 text-left">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-9 h-9 rounded-lg flex items-center justify-center mb-2">
            <Briefcase size={16} color={C.purple} />
          </div>
          <div className="text-xs font-semibold" style={{ color: C.text }}>Toate lucrările</div>
          <div className="text-xs" style={{ color: C.textMuted }}>De ales</div>
        </button>
        <button onClick={() => push('proJobs', { tab: 'finalizate' })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 text-left">
          <div style={{ background: 'rgba(52,211,153,0.15)' }} className="w-9 h-9 rounded-lg flex items-center justify-center mb-2">
            <CheckCircle2 size={16} color={C.green} />
          </div>
          <div className="text-xs font-semibold" style={{ color: C.text }}>Lucrări finalizate</div>
          <div className="text-xs" style={{ color: C.textMuted }}>Istoric</div>
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold" style={{ color: C.text }}>Solicitări recente</h2>
        <button onClick={() => push('proRequests', {})} className="text-xs font-medium" style={{ color: C.purple }}>Vezi toate</button>
      </div>
      <div className="flex flex-col gap-3">
        {recent.map(r => (
          <RequestCard
            key={r.id}
            request={r}
            compact
            onMessage={(req) => push('chat', { workerId: req.clientId, workerName: req.clientName })}
            onOpenProfile={(req) => push('contactProfile', { name: req.clientName, clientId: req.clientId })}
          />
        ))}
      </div>
    </div>
  );
}

function ProRequestsScreen({ requests, onAccept, onDecline, onAssign, employees, plan, push }) {
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

function ProCalendarScreen({ appointments, push }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [selected, setSelected] = useState('2026-08-05');
  const [query, setQuery] = useState('');

  function changeMonth(delta) {
    let m = month + delta, y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m); setYear(y);
  }

  const cells = getMonthGrid(year, month);
  const selectedAppointments = appointments[selected] || [];
  const selectedDate = new Date(selected + 'T00:00:00');
  const dayLabel = selectedDate.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });

  const allAppointments = Object.entries(appointments).flatMap(([d, list]) => list.map(a => ({ ...a, dateKeyStr: d })));
  const searchResults = query.trim()
    ? allAppointments.filter(a => a.client.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  return (
    <div className="px-5 pt-2 pb-6">
      <h1 className="text-lg font-bold mb-4" style={{ color: C.text }}>Programări</h1>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-4">
        <Search size={16} color={C.textMuted} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută o persoană..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
      </div>

      {query.trim() ? (
        <div className="flex flex-col gap-2">
          {searchResults.length === 0 && <EmptyState text="Nicio programare găsită pentru această persoană." />}
          {searchResults.map((a, i) => {
            const d = new Date(a.dateKeyStr + 'T00:00:00');
            const label = d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' });
            return (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3 flex items-center gap-3">
                <div className="text-center flex-shrink-0" style={{ width: 64 }}>
                  <div className="text-xs font-bold capitalize" style={{ color: C.text }}>{label}</div>
                  <div className="text-xs" style={{ color: C.textMuted, fontFamily: MONO }}>{a.time}</div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: C.border }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{a.title}</div>
                  <div className="text-xs truncate" style={{ color: C.textMuted }}>{a.client}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => changeMonth(-1)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <ChevronLeft size={14} color={C.text} />
              </button>
              <span className="text-sm font-semibold" style={{ color: C.text }}>{MONTHS_RO[month]} {year}</span>
              <button onClick={() => changeMonth(1)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <ChevronRight size={14} color={C.text} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS_RO.map((w, i) => (
                <div key={i} className="text-center text-xs" style={{ color: C.textFaint }}>{w}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((cell, i) => {
                const key = dateKey(year, month, cell.day);
                const hasAppt = cell.current && appointments[key];
                const isSelected = cell.current && key === selected;
                return (
                  <button
                    key={i}
                    disabled={!cell.current}
                    onClick={() => setSelected(key)}
                    style={{
                      aspectRatio: '1', borderRadius: 10,
                      background: isSelected ? GRADIENT : 'transparent',
                      opacity: cell.current ? 1 : 0.3,
                    }}
                    className="flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="text-xs" style={{ color: isSelected ? '#fff' : C.text }}>{cell.day}</span>
                    {hasAppt && !isSelected && <span style={{ background: C.purple, width: 4, height: 4, borderRadius: 9999 }} />}
                  </button>
                );
              })}
            </div>
          </div>

          <h2 className="text-sm font-semibold mb-3 capitalize" style={{ color: C.text }}>{dayLabel}</h2>
          {selectedAppointments.length === 0 && <EmptyState text="Nicio programare în această zi." />}
          <div className="flex flex-col gap-2 mb-3">
            {selectedAppointments.map((a, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3 flex items-center gap-3">
                <div className="text-center flex-shrink-0" style={{ width: 44 }}>
                  <div className="text-sm font-bold" style={{ color: C.text, fontFamily: MONO }}>{a.time}</div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: C.border }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{a.title}</div>
                  <div className="text-xs truncate" style={{ color: C.textMuted }}>{a.client}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>

          <button
            onClick={() => push('newAppointment', { dateKey: selected, dayLabel })}
            style={{ background: C.surface2, border: `1px dashed ${C.border}` }}
            className="w-full rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă programare</span>
          </button>
        </>
      )}
    </div>
  );
}

function NewAppointmentScreen({ dateKey: presetDateKey, dayLabel: presetDayLabel, presetClient, clients, goBack, onSubmit }) {
  const [selectedClient, setSelectedClient] = useState(presetClient || (clients && clients[0]) || null);
  const [dateValue, setDateValue] = useState(presetDateKey || '');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [clientQuery, setClientQuery] = useState('');

  const canSubmit = selectedClient && dateValue && time.trim() && title.trim();
  const filteredClients = (clients || []).filter(c => c.clientName.toLowerCase().includes(clientQuery.toLowerCase()));

  function handleSubmit() {
    const d = new Date(dateValue + 'T00:00:00');
    const finalDayLabel = presetDateKey ? presetDayLabel : d.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });
    onSubmit({ dateKey: dateValue, dayLabel: finalDayLabel, time: time.trim(), title: title.trim(), client: selectedClient });
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <div>
          <h1 className="text-base font-semibold" style={{ color: C.text }}>Programare nouă</h1>
          {presetDateKey && <div className="text-xs capitalize" style={{ color: C.textMuted }}>{presetDayLabel}</div>}
        </div>
      </div>

      {presetClient ? (
        <Field label="Client">
          <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-3 rounded-xl p-2.5">
            <Avatar name={presetClient.clientName} size={32} />
            <span className="text-sm" style={{ color: C.text }}>{presetClient.clientName}</span>
          </div>
        </Field>
      ) : (
        <Field label="Client">
          {(!clients || clients.length === 0) ? (
            <p className="text-xs" style={{ color: C.textMuted }}>Nu ai încă niciun client cu care să vorbești.</p>
          ) : (
            <>
              <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2">
                <Search size={15} color={C.textMuted} />
                <input value={clientQuery} onChange={e => setClientQuery(e.target.value)} placeholder="Caută o persoană..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
              </div>
              <div className="flex flex-col gap-2">
                {filteredClients.length === 0 && <p className="text-xs" style={{ color: C.textMuted }}>Nicio persoană găsită.</p>}
                {filteredClients.map(c => {
                  const isActive = selectedClient?.clientId === c.clientId;
                  return (
                    <button
                      key={c.clientId}
                      onClick={() => setSelectedClient(c)}
                      style={{
                        background: isActive ? 'rgba(249,115,22,0.1)' : C.surface,
                        border: `1px solid ${isActive ? C.purple : C.border}`,
                      }}
                      className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left"
                    >
                      <Avatar name={c.clientName} size={32} />
                      <span className="text-sm flex-1" style={{ color: C.text }}>{c.clientName}</span>
                      {isActive && <CheckCircle2 size={16} color={C.purple} />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </Field>
      )}

      {!presetDateKey && (
        <Field label="Data">
          <input type="date" value={dateValue} onChange={e => setDateValue(e.target.value)} style={inputStyle} />
        </Field>
      )}

      <Field label="Ora">
        <input value={time} onChange={e => setTime(e.target.value)} placeholder="ex. 14:00" style={inputStyle} />
      </Field>

      <Field label="Titlu lucrare">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ex. Instalație electrică" style={inputStyle} />
      </Field>

      <button
        disabled={!canSubmit}
        onClick={handleSubmit}
        style={{ background: canSubmit ? GRADIENT : C.surface2, opacity: canSubmit ? 1 : 0.6 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white mt-2"
      >
        Trimite programarea la client
      </button>
    </div>
  );
}

function ProSubscriptionsScreen({ plan, setPlan, goBack }) {
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Abonamente</h1>
      </div>
      <div className="flex flex-col gap-4">
        {PLANS.map(p => {
          const isActive = plan === p.id;
          return (
            <div key={p.id} style={{
              background: isActive ? 'rgba(249,115,22,0.1)' : C.surface,
              border: `1px solid ${isActive ? C.purple : C.border}`,
            }} className="rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold" style={{ color: C.text }}>{p.id}</span>
                <span className="text-sm" style={{ color: C.textMuted }}>
                  <span style={{ fontFamily: MONO, color: C.text, fontWeight: 700 }}>{p.price}</span> RON / lună
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: C.textMuted }}>
                    <CheckCircle2 size={14} color={C.green} /> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPlan(p.id)}
                style={{ background: isActive ? C.surface2 : GRADIENT, border: isActive ? `1px solid ${C.border}` : 'none' }}
                className="w-full rounded-xl py-2.5 text-sm font-semibold"
              >
                <span style={{ color: isActive ? C.textMuted : '#fff' }}>{isActive ? 'Plan activ' : `Alege ${p.id}`}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProEmployeesScreen({ employees, goBack, onAdd, push }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  function submit() {
    if (!name.trim() || !role.trim()) return;
    onAdd({ name: name.trim(), role: role.trim(), status: 'Disponibil' });
    setName(''); setRole(''); setShowForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Angajații mei</h1>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {employees.length === 0 && <EmptyState text="Nu ai adăugat încă niciun angajat." />}
        {employees.map(emp => (
          <div key={emp.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center gap-3">
            <button onClick={() => push('employeeProfile', { employeeId: emp.id })} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-3 flex-1 min-w-0 text-left">
              <Avatar name={emp.name} size={44} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{emp.name}</div>
                <div className="text-xs truncate" style={{ color: C.textMuted }}>{emp.role}</div>
              </div>
            </button>
            <button onClick={() => push('chat', { workerId: `employee-${emp.id}`, workerName: emp.name })} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle size={14} color={C.text} />
            </button>
            <EmployeeStatusBadge status={emp.status} />
          </div>
        ))}
      </div>

      {showForm ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
          <div className="mb-2">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume angajat" style={inputStyle} />
          </div>
          <div className="mb-3">
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Rol (ex. Electrician)" style={inputStyle} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold">
              <span style={{ color: C.textMuted }}>Anulează</span>
            </button>
            <button onClick={submit} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white">
              Adaugă
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Adaugă angajat</span>
        </button>
      )}
    </div>
  );
}

function EmployeeProfileScreen({ employee, assignedJobs, goBack, onRemove }) {
  if (!employee) {
    return (
      <div className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <BackButton onClick={goBack} />
          <h1 className="text-base font-semibold" style={{ color: C.text }}>Profil angajat</h1>
        </div>
        <EmptyState text="Acest angajat nu mai există." />
      </div>
    );
  }
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Profil angajat</h1>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar name={employee.name} size={72} />
        <div>
          <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>{employee.name}</h2>
          <div className="text-sm mb-2" style={{ color: C.textMuted }}>{employee.role}</div>
          <EmployeeStatusBadge status={employee.status} />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Lucrări atribuite</h2>
        {(!assignedJobs || assignedJobs.length === 0) ? (
          <p className="text-xs" style={{ color: C.textMuted }}>Nu are nicio lucrare atribuită momentan.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {assignedJobs.map(r => (
              <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-sm font-semibold truncate" style={{ color: C.text }}>{r.title}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="text-xs" style={{ color: C.textMuted }}>{r.clientName} · {r.address}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => { onRemove(employee.id); goBack(); }}
        style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)' }}
        className="w-full rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
      >
        <UserMinus size={16} color={C.red} /> <span style={{ color: C.red }}>Dă afară angajatul</span>
      </button>
    </div>
  );
}

function ContactProfileScreen({ name, location, clientRequests, reviews, onAddReview, goBack }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  function submit() {
    if (!text.trim()) return;
    onAddReview({ rating, text: text.trim() });
    setText('');
    setRating(5);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Profil client</h1>
      </div>

      <div className="flex flex-col items-center text-center py-6">
        <Avatar name={name} size={88} />
        <h2 className="text-lg font-bold mt-4" style={{ color: C.text }}>{name}</h2>
        <p className="text-xs mt-1" style={{ color: C.textMuted }}>Client FixGo</p>
      </div>

      {location && (
        <div className="flex items-center gap-1.5 justify-center mb-6 text-xs" style={{ color: C.textMuted }}>
          <MapPin size={13} /> {location}
        </div>
      )}

      {clientRequests && clientRequests.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Ce dorește</h2>
          <div className="flex flex-col gap-2">
            {clientRequests.map(r => (
              <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: C.text }}>{r.title}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="text-xs mb-1.5" style={{ color: C.textMuted }}>{r.category} · {r.address}</div>
                {r.description && <p className="text-xs mb-1.5" style={{ color: C.textMuted }}>{r.description}</p>}
                <span className="text-xs font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{r.budget}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Recenziile tale despre acest client</h2>
        {(!reviews || reviews.length === 0) && (
          <p className="text-xs mb-2" style={{ color: C.textMuted }}>Nu ai adăugat încă nicio recenzie.</p>
        )}
        <div className="flex flex-col gap-2">
          {reviews && reviews.map(r => (
            <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <Rating value={r.rating} />
                <span className="text-xs" style={{ color: C.textFaint }}>{r.date}</span>
              </div>
              <p className="text-xs" style={{ color: C.textMuted }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă o recenzie</div>
        <div className="flex items-center gap-1.5 mb-3">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setRating(n)} style={{ background: 'none', border: 'none', padding: 0 }}>
              <Star size={22} fill={n <= rating ? C.amber : 'none'} color={C.amber} />
            </button>
          ))}
        </div>
        <div className="mb-3">
          <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="Cum a fost experiența cu acest client?" style={{ ...inputStyle, resize: 'none' }} />
        </div>
        <button
          onClick={submit}
          disabled={!text.trim()}
          style={{ background: text.trim() ? GRADIENT : C.surface2, opacity: text.trim() ? 1 : 0.6 }}
          className="w-full rounded-xl py-2.5 text-sm font-semibold text-white"
        >
          Trimite recenzia
        </button>
      </div>
    </div>
  );
}

function EarningsScreen({ dailyEarnings, onAddEarning, push, goBack }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  function changeMonth(delta) {
    let m = month + delta, y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m); setYear(y);
    setSelected(null);
    setShowAddForm(false);
  }

  function dayTotal(entries) { return (entries || []).reduce((sum, e) => sum + e.amount, 0); }

  const cells = getMonthGrid(year, month);
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthTotal = Object.entries(dailyEarnings)
    .filter(([date]) => date.startsWith(monthPrefix))
    .reduce((sum, [, entries]) => sum + dayTotal(entries), 0);

  const selectedEntries = selected ? (dailyEarnings[selected] || []) : [];
  const selectedTotal = dayTotal(selectedEntries);
  const selectedLabel = selected
    ? new Date(selected + 'T00:00:00').toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  function submitEarning() {
    if (!selected || !amount) return;
    onAddEarning(selected, Number(amount) || 0, note.trim());
    setAmount('');
    setNote('');
    setShowAddForm(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Încasări</h1>
      </div>

      <div style={{ background: GRADIENT }} className="rounded-2xl p-4 mb-4 text-center">
        <div className="text-xs mb-1 capitalize" style={{ color: 'rgba(255,255,255,0.85)' }}>Total {MONTHS_RO[month]} {year}</div>
        <div className="text-2xl font-bold text-white" style={{ fontFamily: MONO }}>{fmt(monthTotal)} RON</div>
      </div>

      <button onClick={() => push('materialsInvested', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-3.5 mb-5 flex items-center justify-between text-left">
        <div className="flex items-center gap-3 min-w-0">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
            <ClipboardList size={16} color={C.purple} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold" style={{ color: C.text }}>Materiale investite</div>
            <div className="text-xs" style={{ color: C.textMuted }}>Cât ai cheltuit pe fiecare client</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => changeMonth(-1)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
            <ChevronLeft size={14} color={C.text} />
          </button>
          <span className="text-sm font-semibold" style={{ color: C.text }}>{MONTHS_RO[month]} {year}</span>
          <button onClick={() => changeMonth(1)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
            <ChevronRight size={14} color={C.text} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS_RO.map((w, i) => (
            <div key={i} className="text-center text-xs" style={{ color: C.textFaint }}>{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            const key = dateKey(year, month, cell.day);
            const amount = cell.current ? dayTotal(dailyEarnings[key]) : 0;
            const isSelected = cell.current && key === selected;
            return (
              <button
                key={i}
                disabled={!cell.current}
                onClick={() => { setSelected(key); setShowAddForm(false); }}
                style={{
                  aspectRatio: '1', borderRadius: 10,
                  background: isSelected ? GRADIENT : (amount ? 'rgba(249,115,22,0.14)' : 'transparent'),
                  opacity: cell.current ? 1 : 0.3,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
                }}
              >
                <span className="text-xs" style={{ color: isSelected ? '#fff' : C.text }}>{cell.day}</span>
                {amount > 0 ? (
                  <span style={{ fontSize: 8, color: isSelected ? 'rgba(255,255,255,0.9)' : C.purple, fontFamily: MONO }}>
                    {amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {selected ? (
        <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs capitalize" style={{ color: C.textMuted }}>{selectedLabel}</div>
            <button onClick={() => setShowAddForm(s => !s)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
              <Plus size={14} color={C.text} />
            </button>
          </div>

          {selectedEntries.length > 0 ? (
            <div className="flex flex-col gap-1.5 mb-2">
              {selectedEntries.map(e => (
                <div key={e.id} className="flex items-center justify-between text-xs">
                  <span style={{ color: C.textMuted }}>{e.note || 'Încasare'}</span>
                  <span style={{ color: C.text, fontFamily: MONO }}>{fmt(e.amount)} RON</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1.5 mt-0.5" style={{ borderTop: `1px solid ${C.border}` }}>
                <span className="text-sm font-semibold" style={{ color: C.text }}>Total zi</span>
                <span className="text-lg font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(selectedTotal)} RON</span>
              </div>
            </div>
          ) : (
            <div className="text-sm mb-1" style={{ color: C.textFaint }}>Nicio încasare în această zi.</div>
          )}

          {showAddForm && (
            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
              <div className="mb-2">
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" placeholder="Sumă încasată (RON)" style={inputStyle} />
              </div>
              <div className="mb-3">
                <input value={note} onChange={e => setNote(e.target.value)} placeholder="Client / notă (opțional)" style={inputStyle} />
              </div>
              <button
                onClick={submitEarning}
                disabled={!amount}
                style={{ background: amount ? GRADIENT : C.surface2, opacity: amount ? 1 : 0.6 }}
                className="w-full rounded-xl py-2.5 text-xs font-semibold text-white"
              >
                Adaugă încasare
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-center" style={{ color: C.textFaint }}>Apasă pe o zi din calendar ca să adaugi sau să vezi o încasare.</p>
      )}
    </div>
  );
}

function MaterialsInvestedScreen({ materialsLists, chats, goBack }) {
  const entries = Object.entries(materialsLists)
    .map(([key, data]) => {
      const items = data.items || [];
      const laborCost = data.laborCost || 0;
      if (items.length === 0 && !(laborCost > 0)) return null;
      const chat = chats.find(c => String(c.workerId) === String(key));
      const name = chat ? chat.workerName : 'Client';
      const materialsTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
      return { key, name, materialsTotal, laborCost, total: materialsTotal + laborCost, itemCount: items.length };
    })
    .filter(Boolean);

  const grandTotal = entries.reduce((sum, e) => sum + e.total, 0);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Materiale investite</h1>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs mb-1" style={{ color: C.textMuted }}>Total investit</div>
          <div className="text-xl font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(grandTotal)} RON</div>
        </div>
        <div className="text-xs" style={{ color: C.textMuted }}>{entries.length} clienți</div>
      </div>

      {entries.length === 0 && <EmptyState text="Nu ai nicio listă de materiale trimisă încă unui client." />}
      <div className="flex flex-col gap-3">
        {entries.map(e => (
          <div key={e.key} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
            <div className="flex items-center gap-3 mb-2">
              <Avatar name={e.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{e.name}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>{e.itemCount} materiale</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <span style={{ color: C.textMuted }}>Materiale</span>
                <span style={{ fontFamily: MONO, color: C.text }}>{fmt(e.materialsTotal)} RON</span>
              </div>
              {e.laborCost > 0 && (
                <div className="flex items-center justify-between">
                  <span style={{ color: C.textMuted }}>Manoperă</span>
                  <span style={{ fontFamily: MONO, color: C.text }}>{fmt(e.laborCost)} RON</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1.5 mt-0.5" style={{ borderTop: `1px solid ${C.border}` }}>
                <span className="font-semibold" style={{ color: C.text }}>Total</span>
                <span className="font-bold" style={{ fontFamily: MONO, color: C.purple }}>{fmt(e.total)} RON</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function MaterialsHubScreen({ materialsLists, myLists, push, goBack }) {
  const clientListsCount = Object.values(materialsLists).filter(d => (d.items || []).length > 0 || (d.laborCost || 0) > 0).length;
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Liste de materiale</h1>
      </div>

      <button onClick={() => push('clientMaterialsLists', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-3 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClipboardList size={18} color={C.purple} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>Pentru clienți</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{clientListsCount} liste trimise</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>

      <button onClick={() => push('myNotes', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div style={{ background: 'rgba(52,211,153,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText size={18} color={C.green} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>Listele mele</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{myLists.length} notițe personale</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>
    </div>
  );
}

function ClientMaterialsListsScreen({ materialsLists, chats, push, goBack }) {
  const entries = Object.entries(materialsLists)
    .map(([key, data]) => {
      const items = data.items || [];
      const laborCost = data.laborCost || 0;
      if (items.length === 0 && !(laborCost > 0)) return null;
      const chat = chats.find(c => String(c.workerId) === String(key));
      const name = chat ? chat.workerName : 'Client';
      const total = items.reduce((sum, i) => sum + i.qty * i.price, 0) + laborCost;
      return { key, name, total, itemCount: items.length };
    })
    .filter(Boolean);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Liste pentru clienți</h1>
      </div>

      {entries.length === 0 && <EmptyState text="Nu ai nicio listă trimisă unui client încă." />}
      <div className="flex flex-col gap-3 mb-5">
        {entries.map(e => (
          <button key={e.key} onClick={() => push('chat', { workerId: e.key, workerName: e.name })} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full text-left rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold" style={{ color: C.text }}>{e.name}</span>
              <ChevronRight size={16} color={C.textFaint} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: C.textMuted }}>{e.itemCount} materiale</span>
              <span className="font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(e.total)} RON</span>
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => push('newClientMaterialsList', {})} style={{ background: C.surface2, border: `1px dashed ${C.border}` }} className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
        <Plus size={16} color={C.text} /> <span style={{ color: C.text }}>Listă nouă pentru client</span>
      </button>
    </div>
  );
}


function ProStatsScreen({ goBack }) {
  const max = Math.max(...MONTHLY_REVENUE.map(m => m.value));
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Statistici</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <ProStatCard label="Solicitări primite" value="48" delta="+12%" />
        <ProStatCard label="Lucrări finalizate" value="32" delta="+8%" />
        <ProStatCard label="Rata de acceptare" value="87%" delta="+4%" />
        <ProStatCard label="Rating mediu" value="4.9" isRating />
      </div>
      <h2 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Încasări lunare (RON)</h2>
      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4">
        <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
          {MONTHLY_REVENUE.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div style={{ width: '100%', height: `${(m.value / max) * 90}px`, background: i === MONTHLY_REVENUE.length - 1 ? GRADIENT : C.surface2, borderRadius: 6 }} />
              <span className="text-xs" style={{ color: C.textFaint }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyReviewsScreen({ goBack }) {
  const avg = (MY_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MY_REVIEWS.length).toFixed(1);
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Recenziile mele</h1>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs mb-1" style={{ color: C.textMuted }}>Rating mediu</div>
          <div className="flex items-center gap-1.5">
            <Star size={18} fill={C.amber} color={C.amber} />
            <span className="text-xl font-bold" style={{ color: C.text, fontFamily: MONO }}>{avg}</span>
          </div>
        </div>
        <div className="text-xs" style={{ color: C.textMuted }}>{MY_REVIEWS.length} recenzii</div>
      </div>

      <div className="flex flex-col gap-3">
        {MY_REVIEWS.map(r => (
          <div key={r.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
            <div className="flex items-center gap-3 mb-2">
              <Avatar name={r.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{r.name}</div>
                <div className="text-xs" style={{ color: C.textFaint }}>{r.date}</div>
              </div>
              <Rating value={r.rating} />
            </div>
            <p className="text-sm" style={{ color: C.textMuted }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProJobsScreen({ jobs, onApply, initialTab, myName, goBack }) {
  const [tab, setTab] = useState(initialTab || 'available');

  const available = jobs.filter(j => j.type === 'open' && (j.status === 'Nou' || j.status === 'Așteaptă alegere'));
  const finalizate = jobs.filter(j => j.status === 'Finalizată');
  const list = tab === 'available' ? available : finalizate;

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Lucrări</h1>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('available')}
          style={{ background: tab === 'available' ? GRADIENT : C.surface, border: `1px solid ${tab === 'available' ? 'transparent' : C.border}` }}
          className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
        >
          <span style={{ color: tab === 'available' ? '#fff' : C.textMuted }}>Toate lucrările</span>
        </button>
        <button
          onClick={() => setTab('finalizate')}
          style={{ background: tab === 'finalizate' ? GRADIENT : C.surface, border: `1px solid ${tab === 'finalizate' ? 'transparent' : C.border}` }}
          className="flex-1 rounded-xl py-2.5 text-xs font-semibold"
        >
          <span style={{ color: tab === 'finalizate' ? '#fff' : C.textMuted }}>Lucrări finalizate</span>
        </button>
      </div>

      {list.length === 0 && <EmptyState text={tab === 'available' ? 'Nu există lucrări disponibile momentan.' : 'Nu există lucrări finalizate încă.'} />}
      <div className="flex flex-col gap-3">
        {list.map(job => {
          const alreadyApplied = tab === 'available' && job.applicants && job.applicants.some(a => a.name === myName);
          return (
            <div key={job.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold" style={{ color: C.text }}>{job.title}</span>
                <StatusBadge status={job.status} />
              </div>
              <div className="text-xs mb-2" style={{ color: C.textMuted }}>{job.category} · {job.address}</div>
              {job.description && <p className="text-xs mb-2" style={{ color: C.textMuted }}>{job.description}</p>}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{job.budget}</span>
                {tab === 'available' && (
                  alreadyApplied ? (
                    <span className="text-xs font-semibold" style={{ color: C.green }}>Te-ai oferit</span>
                  ) : (
                    <button onClick={() => onApply(job.id)} style={{ background: GRADIENT }} className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white">
                      Aplică
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProProfileScreen({ push, plan, profilePhoto, onPhotoChange, portfolio, onAddPortfolioPhoto, onRemovePortfolioPhoto, onSwitchMode, profileInfo, onUpdateBio, onUpdateCoverPhoto, onUpdateCompanyName, onAddService, onRemoveService }) {
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(profileInfo.bio || '');
  const [newService, setNewService] = useState('');
  const [editingCompanyName, setEditingCompanyName] = useState(false);
  const [companyNameInput, setCompanyNameInput] = useState(profileInfo.companyName || '');
  const coverInputRef = useRef(null);
  const menu = [
    { label: 'Informațiile mele', icon: User, action: () => push('editProfile', {}) },
    { label: 'Abonamentul meu', icon: CreditCard, action: () => push('proSubscriptions', {}) },
    ...(plan === 'Business' ? [{ label: 'Angajații mei', icon: Users, action: () => push('proEmployees', {}) }] : []),
    { label: 'Statistici', icon: TrendingUp, action: () => push('proStats', {}) },
    { label: 'Liste de materiale', icon: ClipboardList, action: () => push('materialsHub', {}) },
    { label: 'Setări', icon: Settings, action: () => push('settings', {}) },
    { label: 'Ajutor și suport', icon: HelpCircle, action: () => push('help', {}) },
  ];

  function saveBio() {
    onUpdateBio(bioText.trim());
    setEditingBio(false);
  }

  function submitService() {
    if (!newService.trim()) return;
    onAddService(newService.trim());
    setNewService('');
  }

  function handleCoverPick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdateCoverPhoto(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function saveCompanyName() {
    onUpdateCompanyName(companyNameInput.trim());
    setEditingCompanyName(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div style={{ position: 'relative', height: 140, borderRadius: 20, overflow: 'hidden', marginBottom: 12, background: profileInfo.coverPhoto ? 'transparent' : GRADIENT }}>
        {profileInfo.coverPhoto ? (
          <img src={profileInfo.coverPhoto} alt="Copertă" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-6 text-center">
            <span className="text-sm font-semibold text-white">
              {profileInfo.companyName || 'Adaugă o poză de copertă sau numele firmei'}
            </span>
          </div>
        )}
        <button onClick={() => coverInputRef.current?.click()} style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.55)' }} className="w-8 h-8 rounded-full flex items-center justify-center">
          <Camera size={15} color="#fff" />
        </button>
        <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverPick} />
      </div>

      <div className="mb-4">
        {editingCompanyName ? (
          <div className="flex gap-2">
            <input value={companyNameInput} onChange={e => setCompanyNameInput(e.target.value)} placeholder="Numele firmei (opțional)" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
            <button onClick={saveCompanyName} style={{ background: GRADIENT }} className="rounded-xl px-4 text-xs font-semibold text-white flex-shrink-0">Salvează</button>
          </div>
        ) : (
          <button onClick={() => { setCompanyNameInput(profileInfo.companyName || ''); setEditingCompanyName(true); }} style={{ background: 'none', border: 'none', padding: 0 }} className="text-xs font-medium" >
            <span style={{ color: C.purple }}>{profileInfo.companyName ? 'Editează numele firmei' : '+ Adaugă numele firmei'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <EditableAvatar name={profileInfo.name} size={64} photoUrl={profilePhoto} onChange={onPhotoChange} />
        <div>
          <h1 className="text-base font-bold" style={{ color: C.text }}>{profileInfo.name}</h1>
          <p className="text-xs mb-1" style={{ color: C.textMuted }}>Electrician · Verificat</p>
          <Rating value={4.9} count={12} />
        </div>
      </div>
      <div style={{ background: 'rgba(249,115,22,0.1)', border: `1px solid ${C.purple}` }} className="rounded-xl px-3.5 py-2.5 mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: C.text }}>Plan {plan}</span>
        <button onClick={() => push('proSubscriptions', {})} className="text-xs font-medium" style={{ color: C.purple }}>Gestionează</button>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold" style={{ color: C.text }}>Biografie</h2>
          {!editingBio && (
            <button onClick={() => { setBioText(profileInfo.bio || ''); setEditingBio(true); }} style={{ background: 'none', border: 'none', padding: 0 }}>
              <Pencil size={14} color={C.purple} />
            </button>
          )}
        </div>
        {editingBio ? (
          <div>
            <textarea value={bioText} onChange={e => setBioText(e.target.value)} rows={4} placeholder="Scrie câteva rânduri despre tine, experiența și serviciile tale..." style={{ ...inputStyle, resize: 'none' }} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditingBio(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2 text-xs font-semibold">
                <span style={{ color: C.textMuted }}>Anulează</span>
              </button>
              <button onClick={saveBio} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2 text-xs font-semibold text-white">
                Salvează
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: profileInfo.bio ? C.textMuted : C.textFaint }}>
            {profileInfo.bio || 'Adaugă o scurtă descriere despre tine și serviciile tale, vizibilă clienților.'}
          </p>
        )}
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Servicii</h2>
        {(profileInfo.services && profileInfo.services.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-2">
            {profileInfo.services.map((s, i) => (
              <span key={i} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex items-center gap-1.5 text-xs pl-3 pr-2 py-1.5 rounded-full">
                <span style={{ color: C.text }}>{s}</span>
                <button onClick={() => onRemoveService(i)} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center justify-center">
                  <X size={11} color={C.textMuted} />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={newService}
            onChange={e => setNewService(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submitService(); }}
            placeholder="ex. Instalații electrice"
            style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }}
          />
          <button onClick={submitService} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Plus size={16} color={C.text} />
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-1" style={{ color: C.text }}>Portofoliul meu</h2>
        <p className="text-xs mb-2" style={{ color: C.textMuted }}>Adaugă poze cu lucrările tale finalizate, vizibile clienților.</p>
        <MyPortfolioGrid photos={portfolio} onAdd={onAddPortfolioPhoto} onRemove={onRemovePortfolioPhoto} />
      </div>

      <div className="flex flex-col mb-4">
        {menu.map(item => (
          <button key={item.label} onClick={item.action} style={{ borderBottom: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 py-3.5 text-left">
            <item.icon size={17} color={C.textMuted} />
            <span className="text-sm flex-1" style={{ color: C.text }}>{item.label}</span>
            <ChevronRight size={15} color={C.textFaint} />
          </button>
        ))}
      </div>
      <button onClick={onSwitchMode} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold mb-2">
        <Home size={15} color={C.text} /> <span style={{ color: C.text }}>Comută la Mod Client</span>
      </button>
      <button className="w-full flex items-center gap-3 py-3.5 text-left">
        <LogOut size={17} color={C.red} />
        <span className="text-sm" style={{ color: C.red }}>Deconectare</span>
      </button>
    </div>
  );
}

function BottomNav({ tabs, active, onTab }) {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, background: C.bg, flexShrink: 0 }} className="flex items-center justify-around py-2.5 px-2">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} className="flex flex-col items-center gap-1 px-2 py-1">
            <t.icon size={19} color={isActive ? C.purple : C.textFaint} />
            <span style={{ fontSize: 10, color: isActive ? C.purple : C.textFaint }} className="font-medium">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  const [mode, setMode] = useState('client');
  const [stack, setStack] = useState([{ screen: 'home', params: {} }]);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [plan, setPlan] = useState('Premium');
  const [favorites, setFavorites] = useState([]);
  const [materialsLists, setMaterialsLists] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [myPortfolio, setMyPortfolio] = useState([]);
  const [profileInfo, setProfileInfo] = useState({ name: 'Andrei Popescu', email: 'andrei.popescu@email.com', phone: '', bio: '', services: ['Instalații electrice', 'Tablouri electrice'] });
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [paymentMethods, setPaymentMethods] = useState(INITIAL_PAYMENT_METHODS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [settings, setSettings] = useState({ pushNotifications: true, emailUpdates: true, darkMode: true });
  const [clientReviews, setClientReviews] = useState({});
  const [workerReviews, setWorkerReviews] = useState({});
  const [quickTasks, setQuickTasks] = useState(INITIAL_QUICK_TASKS);
  const [location, setLocation] = useState('București');
  const [shareSheetWorker, setShareSheetWorker] = useState(null);
  const [myMaterialLists, setMyMaterialLists] = useState([]);
  const [dailyEarnings, setDailyEarnings] = useState(INITIAL_DAILY_EARNINGS);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0, active: false });
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  const current = stack[stack.length - 1];
  const hasUnreadNotifications = notifications.some(n => !n.read);

  function push(screen, params = {}) { setStack(s => [...s, { screen, params }]); }
  function goBack() { setStack(s => (s.length > 1 ? s.slice(0, -1) : s)); }
  function navTab(screen) { setStack([{ screen, params: {} }]); }

  function handleTouchStart(e) {
    if (stack.length <= 1) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = touch.clientX - rect.left;
    if (relativeX <= 30) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, active: true };
      setSwiping(true);
    }
  }
  function handleTouchMove(e) {
    if (!touchStartRef.current.active) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    if (Math.abs(deltaY) > 60) {
      touchStartRef.current.active = false;
      setSwiping(false);
      setSwipeOffset(0);
      return;
    }
    if (deltaX > 0) setSwipeOffset(Math.min(deltaX, 380));
  }
  function handleTouchEnd() {
    const wasActive = touchStartRef.current.active;
    touchStartRef.current.active = false;
    setSwiping(false);
    if (wasActive && swipeOffset > 100) goBack();
    setSwipeOffset(0);
  }
  function switchMode(newMode) {
    setMode(newMode);
    setStack([{ screen: newMode === 'pro' ? 'proDashboard' : 'home', params: {} }]);
  }
  function acceptRequest(id) { setRequests(r => r.map(x => x.id === id ? { ...x, status: 'Acceptată' } : x)); }
  function declineRequest(id) { setRequests(r => r.map(x => x.id === id ? { ...x, status: 'Refuzată' } : x)); }
  function assignRequestToEmployee(requestId, employee) {
    setRequests(r => r.map(x => x.id === requestId ? { ...x, assignedTo: { employeeId: employee.id, employeeName: employee.name } } : x));
    const target = requests.find(x => x.id === requestId);
    if (target) {
      handleSend(`employee-${employee.id}`, employee.name, {
        type: 'assignment',
        title: target.title,
        clientName: target.clientName,
        clientId: target.clientId,
        address: target.address,
        budget: target.budget,
      });
    }
  }
  function addEmployee(emp) { setEmployees(list => [...list, { ...emp, id: Date.now() }]); }
  function applyToJob(jobId) {
    setJobs(j => j.map(x => {
      if (x.id !== jobId) return x;
      const already = (x.applicants || []).some(a => a.name === profileInfo.name);
      if (already) return x;
      const newApplicant = { id: Date.now(), name: profileInfo.name, workerId: null };
      return { ...x, applicants: [...(x.applicants || []), newApplicant], status: 'Așteaptă alegere' };
    }));
  }
  function chooseApplicant(jobId, applicant, jobTitle) {
    setJobs(j => j.map(x => x.id === jobId ? { ...x, worker: applicant.name, status: 'Confirmată' } : x));
    const chatKey = applicant.workerId != null ? applicant.workerId : `applicant-${applicant.id}`;
    handleSend(chatKey, applicant.name, { type: 'text', text: `Te-am ales pentru lucrarea „${jobTitle}"! Hai să stabilim detaliile.` });
  }
  function removeEmployee(id) { setEmployees(list => list.filter(e => e.id !== id)); }
  function addMaterialList(title) { setMyMaterialLists(list => [...list, { id: Date.now(), title, items: [] }]); }
  function removeMaterialList(id) { setMyMaterialLists(list => list.filter(l => l.id !== id)); }
  function updateMaterialListItems(listId, items) { setMyMaterialLists(list => list.map(l => l.id === listId ? { ...l, items } : l)); }
  function addService(name) { setProfileInfo(p => ({ ...p, services: [...(p.services || []), name] })); }
  function removeService(index) { setProfileInfo(p => ({ ...p, services: (p.services || []).filter((_, i) => i !== index) })); }
  function addEarning(dateStr, amount, note) {
    setDailyEarnings(prev => {
      const dayEntries = prev[dateStr] || [];
      return { ...prev, [dateStr]: [...dayEntries, { id: Date.now(), amount, note }] };
    });
  }
  function addPortfolioPhoto(url) { setMyPortfolio(list => [...list, url]); }
  function removePortfolioPhoto(index) { setMyPortfolio(list => list.filter((_, i) => i !== index)); }
  function addAddress(a) { setAddresses(list => [...list, { ...a, id: Date.now() }]); }
  function removeAddress(id) { setAddresses(list => list.filter(x => x.id !== id)); }
  function addPaymentMethod(m) { setPaymentMethods(list => [...list, { ...m, id: Date.now() }]); }
  function removePaymentMethod(id) { setPaymentMethods(list => list.filter(x => x.id !== id)); }
  function markNotificationsRead() { setNotifications(list => list.map(n => ({ ...n, read: true }))); }
  function updateSetting(key, value) { setSettings(s => ({ ...s, [key]: value })); }
  function addClientReview(clientId, review) {
    setClientReviews(prev => ({
      ...prev,
      [clientId]: [...(prev[clientId] || []), { ...review, id: Date.now(), date: 'Acum' }],
    }));
  }
  function addWorkerReview(workerId, review) {
    setWorkerReviews(prev => ({
      ...prev,
      [workerId]: [...(prev[workerId] || []), { ...review, id: Date.now(), name: profileInfo.name }],
    }));
  }
  function addQuickTask(task) {
    const id = Date.now();
    const newTask = { ...task, id, clientName: profileInfo.name, clientId: `quicktask-${id}`, status: 'Deschis', date: 'Acum' };
    setQuickTasks(list => [newTask, ...list]);
    setNotifications(list => [
      { id: id + 1, title: 'Task rapid nou lângă tine', text: task.description, time: 'Acum', read: false, target: { screen: 'quickTasks', params: {} } },
      ...list,
    ]);
  }
  function claimQuickTask(id) {
    setQuickTasks(list => list.map(t => t.id === id ? { ...t, status: 'Preluat' } : t));
  }
  function addAppointment(appt) {
    const { dateKey: dk, dayLabel, time, title, client } = appt;
    setAppointments(prev => {
      const dayList = prev[dk] || [];
      return { ...prev, [dk]: [...dayList, { time, title, client: client.clientName, status: 'În așteptare' }] };
    });
    handleSend(client.clientId, client.clientName, { type: 'appointment', title, dayLabel, time });
  }
  function toggleMute(workerId, workerName) {
    setChats(prev => {
      const exists = prev.find(c => c.workerId === workerId);
      if (exists) return prev.map(c => c.workerId === workerId ? { ...c, muted: !c.muted } : c);
      return [...prev, { workerId, workerName, online: true, unread: false, muted: true, blocked: false, messages: [] }];
    });
  }
  function toggleBlock(workerId, workerName) {
    setChats(prev => {
      const exists = prev.find(c => c.workerId === workerId);
      if (exists) return prev.map(c => c.workerId === workerId ? { ...c, blocked: !c.blocked } : c);
      return [...prev, { workerId, workerName, online: true, unread: false, muted: false, blocked: true, messages: [] }];
    });
  }

  function handleSend(workerId, workerName, message) {
    setChats(prev => {
      const exists = prev.find(c => c.workerId === workerId);
      const newMsg = { from: 'me', time: 'Acum', ...message };
      if (exists) {
        return prev.map(c => c.workerId === workerId ? { ...c, messages: [...c.messages, newMsg] } : c);
      }
      return [...prev, { workerId, workerName, online: true, unread: false, muted: false, blocked: false, messages: [newMsg] }];
    });
    setTimeout(() => {
      setChats(prev => prev.map(c => c.workerId === workerId
        ? { ...c, messages: [...c.messages, { from: 'them', type: 'text', text: 'Am primit mesajul tău, revin imediat cu un răspuns!', time: 'Acum' }] }
        : c));
    }, 1200);
  }

  function handleSendMaterials(workerId, workerName, items, attachments, laborCost) {
    const materialsTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    const total = materialsTotal + (laborCost || 0);
    setMaterialsLists(prev => ({ ...prev, [workerId]: { items, attachments, laborCost } }));
    setChats(prev => {
      const exists = prev.find(c => c.workerId === workerId);
      const newMsg = { from: 'me', type: 'materials', items, total, attachments, laborCost, time: 'Acum' };
      if (exists) {
        return prev.map(c => c.workerId === workerId ? { ...c, messages: [...c.messages, newMsg] } : c);
      }
      return [...prev, { workerId, workerName, online: true, unread: false, muted: false, blocked: false, messages: [newMsg] }];
    });
    setTimeout(() => {
      setChats(prev => prev.map(c => c.workerId === workerId
        ? { ...c, messages: [...c.messages, { from: 'them', type: 'text', text: 'Am primit lista de materiale, mulțumesc!', time: 'Acum' }] }
        : c));
    }, 1200);
  }

  const clientTabs = [
    { id: 'home', label: 'Acasă', icon: Home },
    { id: 'search', label: 'Căutare', icon: Search },
    { id: 'jobs', label: 'Lucrări', icon: Briefcase },
    { id: 'messages', label: 'Mesaje', icon: MessageCircle },
    { id: 'account', label: 'Profil', icon: User },
  ];
  const proTabs = [
    { id: 'proDashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'proRequests', label: 'Solicitări', icon: Briefcase },
    { id: 'proCalendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'messages', label: 'Mesaje', icon: MessageCircle },
    { id: 'proProfile', label: 'Profil', icon: User },
  ];
  const tabs = mode === 'pro' ? proTabs : clientTabs;
  const showBottomNav = ['home', 'search', 'jobs', 'messages', 'account', 'proDashboard', 'proRequests', 'proCalendar', 'proProfile'].includes(current.screen);
  const isChat = current.screen === 'chat';

  let body;
  switch (current.screen) {
    case 'home':
      body = <HomeScreen push={push} firstName={profileInfo.name.split(' ')[0]} hasUnreadNotifications={hasUnreadNotifications} location={location} />; break;
    case 'locationPicker':
      body = <LocationPickerScreen currentLocation={location} onSelect={setLocation} goBack={goBack} />; break;
    case 'search':
      body = <SearchScreen push={push} initialCategory={current.params.category} />; break;
    case 'worker':
      body = (
        <WorkerProfileScreen
          worker={current.params.worker}
          push={push}
          goBack={goBack}
          favorites={favorites}
          setFavorites={setFavorites}
          userReviews={workerReviews[current.params.worker.id] || []}
          onAddReview={(review) => addWorkerReview(current.params.worker.id, review)}
          onOpenShare={setShareSheetWorker}
        />
      );
      break;
    case 'postJob':
      body = <PostJobScreen worker={current.params.worker} goBack={goBack} onSubmit={(job) => { setJobs(j => [{ ...job, id: Date.now() }, ...j]); navTab('jobs'); }} />; break;
    case 'jobs':
      body = <JobsScreen jobs={jobs} push={push} />; break;
    case 'jobDetails': {
      const jobData = jobs.find(x => x.id === current.params.job.id) || current.params.job;
      body = <JobDetailsScreen job={jobData} goBack={goBack} push={push} onDelete={(id) => { setJobs(j => j.filter(x => x.id !== id)); goBack(); }} onChooseApplicant={chooseApplicant} />;
      break;
    }
    case 'editJob':
      body = (
        <EditJobScreen
          job={current.params.job}
          goBack={goBack}
          onSubmit={(updated) => {
            setJobs(j => j.map(x => x.id === current.params.job.id ? { ...x, ...updated } : x));
            goBack();
          }}
        />
      );
      break;
    case 'messages':
      body = <MessagesScreen chats={chats} push={push} />; break;
    case 'chat': {
      const wid = current.params.workerId;
      const found = chats.find(c => c.workerId === wid);
      const chat = found || { workerId: wid, workerName: current.params.workerName || 'Meseriaș', online: true, unread: false, muted: false, blocked: false, messages: [] };
      const workerMatch = WORKERS.find(w => w.id === wid);
      body = (
        <ChatScreen
          chat={chat}
          goBack={goBack}
          onSend={(message) => handleSend(wid, chat.workerName, message)}
          onOpenMaterials={() => push('materialsList', { workerId: wid, workerName: chat.workerName })}
          onOpenMaterialsDetail={(message) => push('materialsDetail', { message })}
          onOpenAssignmentClient={(message) => push('chat', { workerId: message.clientId, workerName: message.clientName })}
          onToggleMute={() => toggleMute(wid, chat.workerName)}
          onToggleBlock={() => toggleBlock(wid, chat.workerName)}
          onOpenProfile={() => {
            if (typeof wid === 'string' && wid.startsWith('employee-')) {
              push('employeeProfile', { employeeId: Number(wid.replace('employee-', '')) });
            } else if (workerMatch) {
              push('worker', { worker: workerMatch });
            } else {
              push('contactProfile', { name: chat.workerName, clientId: wid });
            }
          }}
          onCreateAppointment={mode === 'pro' ? () => push('newAppointment', { clientId: wid, clientName: chat.workerName }) : undefined}
        />
      );
      break;
    }
    case 'materialsList':
      body = (
        <MaterialsListScreen
          workerId={current.params.workerId}
          workerName={current.params.workerName}
          initialItems={materialsLists[current.params.workerId]?.items || []}
          initialAttachments={materialsLists[current.params.workerId]?.attachments || []}
          initialLaborCost={materialsLists[current.params.workerId]?.laborCost || 0}
          goBack={goBack}
          onSave={(items, attachments, laborCost) => { handleSendMaterials(current.params.workerId, current.params.workerName, items, attachments, laborCost); goBack(); }}
        />
      );
      break;
    case 'materialsDetail':
      body = <MaterialsDetailScreen message={current.params.message} goBack={goBack} />; break;
    case 'materialsHub':
      body = <MaterialsHubScreen materialsLists={materialsLists} myLists={myMaterialLists} push={push} goBack={goBack} />; break;
    case 'clientMaterialsLists':
      body = <ClientMaterialsListsScreen materialsLists={materialsLists} chats={chats} push={push} goBack={goBack} />; break;
    case 'newClientMaterialsList': {
      const uniqueClientsForList = Array.from(new Map(requests.map(r => [r.clientId, { clientId: r.clientId, clientName: r.clientName }])).values());
      body = (
        <MaterialsListScreen
          clients={uniqueClientsForList}
          goBack={goBack}
          onSave={(items, attachments, laborCost, client) => {
            if (!client) return;
            handleSendMaterials(client.clientId, client.clientName, items, attachments, laborCost);
            goBack();
          }}
        />
      );
      break;
    }
    case 'estimator':
      body = <EstimatorScreen goBack={goBack} push={push} />; break;
    case 'estimateResult':
      body = <EstimateResultScreen result={current.params.result} goBack={goBack} push={push} />; break;
    case 'postQuickTask':
      body = <QuickTaskScreen goBack={goBack} onSubmit={(task) => { addQuickTask(task); goBack(); }} />; break;
    case 'quickTasks':
      body = <QuickTasksScreen quickTasks={quickTasks} onClaim={claimQuickTask} push={push} goBack={goBack} />; break;
    case 'account':
      body = <AccountScreen push={push} onSwitchMode={() => switchMode('pro')} profilePhoto={profilePhoto} onPhotoChange={setProfilePhoto} profileInfo={profileInfo} />; break;
    case 'editProfile':
      body = <EditProfileScreen profile={profileInfo} onSave={setProfileInfo} goBack={goBack} />; break;
    case 'addresses':
      body = <AddressesScreen addresses={addresses} onAdd={addAddress} onRemove={removeAddress} goBack={goBack} />; break;
    case 'paymentMethods':
      body = <PaymentMethodsScreen methods={paymentMethods} onAdd={addPaymentMethod} onRemove={removePaymentMethod} goBack={goBack} />; break;
    case 'favorites':
      body = <FavoritesScreen favorites={favorites} push={push} goBack={goBack} />; break;
    case 'notifications':
      body = <NotificationsScreen notifications={notifications} onMarkRead={markNotificationsRead} push={push} goBack={goBack} />; break;
    case 'settings':
      body = <SettingsScreen settings={settings} onChange={updateSetting} goBack={goBack} />; break;
    case 'help':
      body = <HelpScreen goBack={goBack} />; break;
    case 'proDashboard':
      body = <ProDashboardScreen requests={requests} push={push} plan={plan} employees={employees} profileInfo={profileInfo} hasUnreadNotifications={hasUnreadNotifications} quickTasks={quickTasks} />; break;
    case 'proRequests':
      body = <ProRequestsScreen requests={requests} onAccept={acceptRequest} onDecline={declineRequest} onAssign={assignRequestToEmployee} employees={employees} plan={plan} push={push} />; break;
    case 'proCalendar':
      body = <ProCalendarScreen appointments={appointments} push={push} />; break;
    case 'newAppointment': {
      const uniqueClients = Array.from(new Map(requests.map(r => [r.clientId, { clientId: r.clientId, clientName: r.clientName }])).values());
      const presetClient = current.params.clientId ? { clientId: current.params.clientId, clientName: current.params.clientName } : null;
      body = (
        <NewAppointmentScreen
          dateKey={current.params.dateKey}
          dayLabel={current.params.dayLabel}
          presetClient={presetClient}
          clients={uniqueClients}
          goBack={goBack}
          onSubmit={(appt) => { addAppointment(appt); goBack(); }}
        />
      );
      break;
    }
    case 'proSubscriptions':
      body = <ProSubscriptionsScreen plan={plan} setPlan={setPlan} goBack={goBack} />; break;
    case 'proEmployees':
      body = <ProEmployeesScreen employees={employees} goBack={goBack} onAdd={addEmployee} push={push} />; break;
    case 'proJobs':
      body = <ProJobsScreen jobs={jobs} onApply={applyToJob} initialTab={current.params.tab} myName={profileInfo.name} goBack={goBack} />; break;
    case 'employeeProfile': {
      const emp = employees.find(e => e.id === current.params.employeeId);
      const assignedJobs = requests.filter(r => r.assignedTo && r.assignedTo.employeeId === current.params.employeeId);
      body = <EmployeeProfileScreen employee={emp} assignedJobs={assignedJobs} goBack={goBack} onRemove={removeEmployee} />;
      break;
    }
    case 'contactProfile': {
      const relatedRequests = requests.filter(r => r.clientId === current.params.clientId);
      body = (
        <ContactProfileScreen
          name={current.params.name}
          location={relatedRequests[0]?.address}
          clientRequests={relatedRequests}
          reviews={clientReviews[current.params.clientId] || []}
          onAddReview={(review) => addClientReview(current.params.clientId, review)}
          goBack={goBack}
        />
      );
      break;
    }
    case 'proStats':
      body = <ProStatsScreen goBack={goBack} />; break;
    case 'earnings':
      body = <EarningsScreen dailyEarnings={dailyEarnings} onAddEarning={addEarning} push={push} goBack={goBack} />; break;
    case 'materialsInvested':
      body = <MaterialsInvestedScreen materialsLists={materialsLists} chats={chats} goBack={goBack} />; break;
    case 'myReviews':
      body = <MyReviewsScreen goBack={goBack} />; break;
    case 'myNotes':
      body = <MyNotesListScreen lists={myMaterialLists} onAdd={addMaterialList} onOpen={(id) => push('myNotesDetail', { listId: id })} goBack={goBack} />; break;
    case 'myNotesDetail': {
      const noteList = myMaterialLists.find(l => l.id === current.params.listId);
      body = noteList
        ? <MyNotesDetailScreen list={noteList} onUpdateItems={(items) => updateMaterialListItems(noteList.id, items)} onDelete={removeMaterialList} goBack={goBack} />
        : <EmptyState text="Listă negăsită." />;
      break;
    }
    case 'proProfile':
      body = (
        <ProProfileScreen
          push={push}
          plan={plan}
          profilePhoto={profilePhoto}
          onPhotoChange={setProfilePhoto}
          portfolio={myPortfolio}
          onAddPortfolioPhoto={addPortfolioPhoto}
          onRemovePortfolioPhoto={removePortfolioPhoto}
          onSwitchMode={() => switchMode('client')}
          profileInfo={profileInfo}
          onUpdateBio={(bio) => setProfileInfo(p => ({ ...p, bio }))}
          onAddService={addService}
          onRemoveService={removeService}
        />
      );
      break;
    default:
      body = <HomeScreen push={push} firstName={profileInfo.name.split(' ')[0]} hasUnreadNotifications={hasUnreadNotifications} location={location} />;
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(circle at 15% 0%, ${C.glow1}55, transparent 55%), radial-gradient(circle at 90% 100%, ${C.glow2}77, transparent 55%), ${C.bg}`,
      padding: 16, fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');`}</style>
      <div style={{
        width: '100%', maxWidth: 400, height: 820, maxHeight: '94vh', background: C.bg,
        borderRadius: 44, border: `1px solid ${C.borderStrong}`,
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 8px rgba(255,255,255,0.02)',
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        <div className="flex items-center justify-between px-7 pt-4 pb-1 flex-shrink-0">
          <span className="text-xs font-semibold" style={{ color: C.text }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <div style={{ width: 16, height: 10, border: `1.5px solid ${C.text}`, borderRadius: 2 }} />
            <div style={{ width: 14, height: 10, borderRadius: 2, background: C.text }} />
          </div>
        </div>
        <div
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', overflowY: isChat ? 'hidden' : 'auto', minHeight: 0,
            transform: swipeOffset ? `translateX(${swipeOffset}px)` : 'none',
            transition: swiping ? 'none' : 'transform 0.2s ease',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {body}
        </div>
        {current.screen === 'jobs' && (
          <button onClick={() => push('postJob', {})} style={{
            background: GRADIENT, position: 'absolute', bottom: 78, right: 18, width: 52, height: 52,
            borderRadius: 9999, boxShadow: '0 8px 24px rgba(249,115,22,0.4)', zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Plus size={22} color="#fff" />
          </button>
        )}
        {showBottomNav && <BottomNav tabs={tabs} active={current.screen} onTab={navTab} />}
        {shareSheetWorker && <ShareSheet worker={shareSheetWorker} onClose={() => setShareSheetWorker(null)} />}
      </div>
    </div>
  );
}
