export const CATEGORIES = [
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

export const WORKERS = [
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

export const INITIAL_JOBS = [
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

export const INITIAL_CHATS = [
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

export const INITIAL_REQUESTS = [
  { id: 1, title: 'Instalație electrică apartament', category: 'Electrician', budget: '500 - 800 RON', address: 'Sector 3, București', clientName: 'Andrei Popescu', clientId: 'client-1', status: 'Nou', description: 'Am nevoie de înlocuirea prizelor și a tabloului electric într-un apartament de 2 camere.' },
  { id: 2, title: 'Montaj aer condiționat', category: 'Aer condiționat', budget: '400 - 600 RON', address: 'Sector 2, București', clientName: 'Maria Ionescu', clientId: 'client-2', status: 'Nou', description: 'Am cumpărat un aparat de aer condiționat nou și am nevoie de montaj în dormitor.' },
  { id: 3, title: 'Tablou electric nou', category: 'Electrician', budget: '300 - 500 RON', address: 'Sector 1, București', clientName: 'Robert Stan', clientId: 'client-3', status: 'Acceptată', description: 'Tabloul electric actual este vechi și are nevoie de înlocuire completă.' },
  { id: 4, title: 'Reparație priză living', category: 'Electrician', budget: '150 - 250 RON', address: 'Sector 4, București', clientName: 'Elena Radu', clientId: 'client-4', status: 'Finalizată', description: 'O priză din living nu mai funcționează și are nevoie de reparație.' },
];

export const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Vasile Dumitrescu', role: 'Electrician', status: 'Disponibil' },
  { id: 2, name: 'Marius Popa', role: 'Ucenic electrician', status: 'În lucru' },
  { id: 3, name: 'Cătălin Ene', role: 'Electrician', status: 'Disponibil' },
];

export const INITIAL_ADDRESSES = [
  { id: 1, label: 'Acasă', address: 'Sector 3, București' },
  { id: 2, label: 'Birou', address: 'Sector 1, București' },
];

export const INITIAL_PAYMENT_METHODS = [
  { id: 1, brand: 'Card', last4: '4242', expiry: '09/28' },
];

export const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Programare confirmată', text: 'Alexandru Popescu a confirmat programarea de miercuri.', time: 'Acum 10 min', read: false, target: { screen: 'chat', params: { workerId: 1, workerName: 'Alexandru Popescu' } } },
  { id: 2, title: 'Mesaj nou', text: 'Ai primit un mesaj nou de la Maria Ionescu.', time: 'Acum 2 ore', read: false, target: { screen: 'chat', params: { workerId: 3, workerName: 'Maria Ionescu' } } },
  { id: 3, title: 'Estimare gata', text: 'Estimarea ta AI pentru instalație electrică este gata.', time: 'Ieri', read: true },
];

export const INITIAL_QUICK_TASKS = [
  { id: 1, description: 'Am nevoie de ajutor să urc o canapea nouă la etajul 3, fără lift.', reward: '50 RON', address: 'Sector 2, București', clientName: 'Ioana Radu', clientId: 'quicktask-1', status: 'Deschis', date: 'Acum 30 min' },
];

export const ROMANIAN_CITIES = [
  'București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova',
  'Brașov', 'Galați', 'Ploiești', 'Oradea', 'Brăila', 'Arad', 'Pitești',
  'Sibiu', 'Bacău', 'Târgu Mureș', 'Baia Mare', 'Buzău', 'Botoșani', 'Satu Mare',
];

export const STATUS_STYLES = {
  'Nou': { bg: 'rgba(56,189,248,0.15)', color: '#38BDF8' },
  'În așteptare': { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24' },
  'Așteaptă alegere': { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24' },
  'Confirmată': { bg: 'rgba(52,211,153,0.15)', color: '#34D399' },
  'Finalizată': { bg: 'rgba(167,139,250,0.15)', color: '#A78BFA' },
  'Acceptată': { bg: 'rgba(52,211,153,0.15)', color: '#34D399' },
  'Refuzată': { bg: 'rgba(248,113,113,0.15)', color: '#F87171' },
};

export const WEEKDAYS_RO = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export const MONTHS_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

export const INITIAL_APPOINTMENTS = {
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

export const PLANS = [
  { id: 'Premium', price: 49, features: ['Cereri nelimitate', 'Profil Premium', 'Apariție în top', 'Statistici avansate', 'Răspuns prioritar'] },
  { id: 'Business', price: 99, features: ['Tot din Premium', 'Mai mulți angajați', 'Calendar avansat', 'Facturi și încasări', 'Suport dedicat'] },
];

export const MY_REVIEWS = [
  { id: 1, name: 'Cristina M.', rating: 5, text: 'Foarte profesionist, a rezolvat rapid problema. Recomand!', date: 'Acum 3 zile' },
  { id: 2, name: 'Bogdan T.', rating: 5, text: 'Punctual și corect. Lucrare de calitate.', date: 'Acum o săptămână' },
  { id: 3, name: 'Elena Radu', rating: 4, text: 'Bun, dar a întârziat puțin față de ora stabilită.', date: 'Acum 2 săptămâni' },
  { id: 4, name: 'Robert Stan', rating: 5, text: 'Foarte mulțumit, revin cu siguranță pentru alte lucrări.', date: 'Acum o lună' },
];

export const FAQ_ITEMS = [
  { q: 'Cum programez un meseriaș?', a: 'Caută serviciul dorit, alege un meseriaș din listă și apasă „Programează" pentru a trimite o cerere.' },
  { q: 'Cum funcționează AI Estimator?', a: 'Descrii lucrarea de care ai nevoie, iar sistemul îți oferă o estimare de preț bazată pe piața din România.' },
  { q: 'Pot anula o programare?', a: 'Da, poți edita sau șterge o lucrare din secțiunea „Lucrările mele".' },
  { q: 'Cum contactez un meseriaș?', a: 'Din profilul meseriașului poți suna sau trimite mesaje direct prin chat.' },
];

export const MONTHLY_REVENUE = [
  { month: 'Mar', value: 5200 }, { month: 'Apr', value: 6100 }, { month: 'Mai', value: 7850 },
  { month: 'Iun', value: 6900 }, { month: 'Iul', value: 8400 }, { month: 'Aug', value: 7850 },
];

export const INITIAL_DAILY_EARNINGS = {
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

export const AVATAR_COLORS = ['#F97316', '#FBBF24', '#FB923C', '#FCD34D', '#EA580C', '#D97706', '#F59E0B'];
