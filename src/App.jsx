import { lazy, Suspense, useRef, useState } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { Briefcase, Calendar as CalendarIcon, Home, LayoutGrid, Loader2, MessageCircle, Plus, Search, User } from 'lucide-react';
import { INITIAL_ADDRESSES, INITIAL_APPOINTMENTS, INITIAL_CHATS, INITIAL_DAILY_EARNINGS, INITIAL_EMPLOYEES, INITIAL_JOBS, INITIAL_NOTIFICATIONS, INITIAL_PAYMENT_METHODS, INITIAL_QUICK_TASKS, INITIAL_REQUESTS, WORKERS } from './data/mockData';
import { C, GRADIENT } from './styles/theme';
import { ROUTES, buildPath, parseId } from './routes';
import { usePersistentState } from './utils/usePersistentState';
import { getSession, clearSession } from './utils/auth';
// AuthScreen is the very first thing shown, so it stays in the main bundle;
// every other screen is fetched on demand (see the Suspense boundary below).
import AuthScreen from './pages/AuthScreen';
import BottomNav from './components/BottomNav';
import EmptyState from './components/EmptyState';
import ShareSheet from './components/ShareSheet';

const AccountScreen = lazy(() => import('./pages/AccountScreen'));
const AddressesScreen = lazy(() => import('./pages/AddressesScreen'));
const ChatScreen = lazy(() => import('./pages/ChatScreen'));
const ClientMaterialsListsScreen = lazy(() => import('./pages/ClientMaterialsListsScreen'));
const ContactProfileScreen = lazy(() => import('./pages/ContactProfileScreen'));
const EarningsScreen = lazy(() => import('./pages/EarningsScreen'));
const EditJobScreen = lazy(() => import('./pages/EditJobScreen'));
const EditProfileScreen = lazy(() => import('./pages/EditProfileScreen'));
const EmployeeProfileScreen = lazy(() => import('./pages/EmployeeProfileScreen'));
const EstimateResultScreen = lazy(() => import('./pages/EstimateResultScreen'));
const EstimatorScreen = lazy(() => import('./pages/EstimatorScreen'));
const FavoritesScreen = lazy(() => import('./pages/FavoritesScreen'));
const HelpScreen = lazy(() => import('./pages/HelpScreen'));
const HomeScreen = lazy(() => import('./pages/HomeScreen'));
const JobDetailsScreen = lazy(() => import('./pages/JobDetailsScreen'));
const JobsScreen = lazy(() => import('./pages/JobsScreen'));
const LocationPickerScreen = lazy(() => import('./pages/LocationPickerScreen'));
const MaterialsDetailScreen = lazy(() => import('./pages/MaterialsDetailScreen'));
const MaterialsHubScreen = lazy(() => import('./pages/MaterialsHubScreen'));
const MaterialsInvestedScreen = lazy(() => import('./pages/MaterialsInvestedScreen'));
const MaterialsListScreen = lazy(() => import('./pages/MaterialsListScreen'));
const MessagesScreen = lazy(() => import('./pages/MessagesScreen'));
const MyNotesDetailScreen = lazy(() => import('./pages/MyNotesDetailScreen'));
const MyNotesListScreen = lazy(() => import('./pages/MyNotesListScreen'));
const MyReviewsScreen = lazy(() => import('./pages/MyReviewsScreen'));
const NewAppointmentScreen = lazy(() => import('./pages/NewAppointmentScreen'));
const NotificationsScreen = lazy(() => import('./pages/NotificationsScreen'));
const PaymentMethodsScreen = lazy(() => import('./pages/PaymentMethodsScreen'));
const PostJobScreen = lazy(() => import('./pages/PostJobScreen'));
const ProCalendarScreen = lazy(() => import('./pages/ProCalendarScreen'));
const ProDashboardScreen = lazy(() => import('./pages/ProDashboardScreen'));
const ProEmployeesScreen = lazy(() => import('./pages/ProEmployeesScreen'));
const ProJobsScreen = lazy(() => import('./pages/ProJobsScreen'));
const ProProfileScreen = lazy(() => import('./pages/ProProfileScreen'));
const ProRequestsScreen = lazy(() => import('./pages/ProRequestsScreen'));
const ProStatsScreen = lazy(() => import('./pages/ProStatsScreen'));
const ProSubscriptionsScreen = lazy(() => import('./pages/ProSubscriptionsScreen'));
const QuickTaskScreen = lazy(() => import('./pages/QuickTaskScreen'));
const QuickTasksScreen = lazy(() => import('./pages/QuickTasksScreen'));
const SearchScreen = lazy(() => import('./pages/SearchScreen'));
const SettingsScreen = lazy(() => import('./pages/SettingsScreen'));
const WorkerProfileScreen = lazy(() => import('./pages/WorkerProfileScreen'));

export default function App() {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [session, setSession] = useState(() => getSession());
  // Everything below survives a page refresh (persisted to localStorage) —
  // only the handful of purely transient UI bits further down stay as plain useState.
  const [mode, setMode] = usePersistentState('mode', 'client');
  const [jobs, setJobs] = usePersistentState('jobs', INITIAL_JOBS);
  const [chats, setChats] = usePersistentState('chats', INITIAL_CHATS);
  const [requests, setRequests] = usePersistentState('requests', INITIAL_REQUESTS);
  const [employees, setEmployees] = usePersistentState('employees', INITIAL_EMPLOYEES);
  const [plan, setPlan] = usePersistentState('plan', 'Premium');
  const [favorites, setFavorites] = usePersistentState('favorites', []);
  const [materialsLists, setMaterialsLists] = usePersistentState('materialsLists', {});
  const [profilePhoto, setProfilePhoto] = usePersistentState('profilePhoto', null);
  const [myPortfolio, setMyPortfolio] = usePersistentState('myPortfolio', []);
  const [profileInfo, setProfileInfo] = usePersistentState('profileInfo', { name: 'Andrei Popescu', email: 'andrei.popescu@email.com', phone: '', bio: '', services: ['Instalații electrice', 'Tablouri electrice'] });
  const [addresses, setAddresses] = usePersistentState('addresses', INITIAL_ADDRESSES);
  const [paymentMethods, setPaymentMethods] = usePersistentState('paymentMethods', INITIAL_PAYMENT_METHODS);
  const [notifications, setNotifications] = usePersistentState('notifications', INITIAL_NOTIFICATIONS);
  const [settings, setSettings] = usePersistentState('settings', { pushNotifications: true, emailUpdates: true, darkMode: true });
  const [clientReviews, setClientReviews] = usePersistentState('clientReviews', {});
  const [workerReviews, setWorkerReviews] = usePersistentState('workerReviews', {});
  const [quickTasks, setQuickTasks] = usePersistentState('quickTasks', INITIAL_QUICK_TASKS);
  const [location, setLocation] = usePersistentState('location', 'București');
  const [myMaterialLists, setMyMaterialLists] = usePersistentState('myMaterialLists', []);
  const [dailyEarnings, setDailyEarnings] = usePersistentState('dailyEarnings', INITIAL_DAILY_EARNINGS);
  const [appointments, setAppointments] = usePersistentState('appointments', INITIAL_APPOINTMENTS);

  // Transient UI state — deliberately NOT persisted (would be confusing to restore after a refresh).
  const [lastEstimate, setLastEstimate] = useState(null);
  const [viewingMaterialsMessage, setViewingMaterialsMessage] = useState(null);
  const [shareSheetWorker, setShareSheetWorker] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0, active: false });

  // Resolve the current screen + its params from the real URL (see src/routes.js),
  // instead of an in-memory navigation stack — this is what makes browser
  // back/forward and shareable/refreshable links work.
  const routeQuery = new URLSearchParams(routerLocation.search);
  let matchedScreen = 'home';
  let routeParams = {};
  for (const route of ROUTES) {
    const match = matchPath({ path: route.path, end: true }, routerLocation.pathname);
    if (match) { matchedScreen = route.screen; routeParams = match.params; break; }
  }

  let currentScreen = matchedScreen;
  let currentParams = {};
  switch (matchedScreen) {
    case 'search':
      currentParams = { category: routeQuery.get('category') || undefined };
      break;
    case 'worker':
      currentParams = { worker: WORKERS.find(w => w.id === parseId(routeParams.workerId)) };
      if (!currentParams.worker) currentScreen = 'home';
      break;
    case 'postJob': {
      const workerId = routeQuery.get('workerId');
      currentParams = { worker: workerId ? WORKERS.find(w => w.id === parseId(workerId)) : undefined };
      break;
    }
    case 'jobDetails':
      currentParams = { job: { id: parseId(routeParams.jobId) } };
      break;
    case 'editJob':
      currentParams = { job: jobs.find(j => j.id === parseId(routeParams.jobId)) };
      if (!currentParams.job) currentScreen = 'home';
      break;
    case 'chat':
      currentParams = { workerId: parseId(routeParams.workerId), workerName: routeQuery.get('name') || undefined };
      break;
    case 'materialsList':
      currentParams = { workerId: parseId(routeParams.workerId), workerName: routeQuery.get('name') || undefined };
      break;
    case 'materialsDetail':
      currentParams = { message: viewingMaterialsMessage };
      break;
    case 'estimateResult':
      currentParams = { result: lastEstimate };
      break;
    case 'newAppointment':
      currentParams = {
        dateKey: routeQuery.get('date') || undefined,
        dayLabel: routeQuery.get('dayLabel') || undefined,
        clientId: routeQuery.get('clientId') || undefined,
        clientName: routeQuery.get('clientName') || undefined,
      };
      break;
    case 'proJobs':
      currentParams = { tab: routeQuery.get('tab') || undefined };
      break;
    case 'employeeProfile':
      currentParams = { employeeId: parseId(routeParams.employeeId) };
      break;
    case 'contactProfile':
      currentParams = { name: routeQuery.get('name') || undefined, clientId: parseId(routeParams.clientId) };
      break;
    case 'myNotesDetail':
      currentParams = { listId: parseId(routeParams.listId) };
      break;
    default:
      currentParams = {};
  }
  const current = { screen: currentScreen, params: currentParams };
  const hasUnreadNotifications = notifications.some(n => !n.read);

  function push(screen, params = {}) {
    if (screen === 'estimateResult') setLastEstimate(params.result);
    if (screen === 'materialsDetail') setViewingMaterialsMessage(params.message);
    navigate(buildPath(screen, params));
  }
  function goBack() { navigate(-1); }
  function navTab(screen) { navigate(buildPath(screen, {})); }

  function handleTouchStart(e) {
    if (routerLocation.pathname === '/') return;
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
    navigate(buildPath(newMode === 'pro' ? 'proDashboard' : 'home', {}));
  }
  function handleAuthenticated({ name, email }) {
    setProfileInfo(p => ({ ...p, name, email }));
    setSession(email);
    navigate('/');
  }
  function handleLogout() {
    clearSession();
    setSession(null);
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
      body = <AccountScreen push={push} onSwitchMode={() => switchMode('pro')} profilePhoto={profilePhoto} onPhotoChange={setProfilePhoto} profileInfo={profileInfo} onLogout={handleLogout} />; break;
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
          onLogout={handleLogout}
        />
      );
      break;
    default:
      body = <HomeScreen push={push} firstName={profileInfo.name.split(' ')[0]} hasUnreadNotifications={hasUnreadNotifications} location={location} />;
  }

  const loggedIn = !!session;
  if (!loggedIn) body = <AuthScreen onAuthenticated={handleAuthenticated} />;

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
          <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20"><Loader2 size={22} className="animate-spin" color={C.textFaint} /></div>}>
            {body}
          </Suspense>
        </div>
        {loggedIn && current.screen === 'jobs' && (
          <button onClick={() => push('postJob', {})} aria-label="Postează o lucrare nouă" style={{
            background: GRADIENT, position: 'absolute', bottom: 78, right: 18, width: 52, height: 52,
            borderRadius: 9999, boxShadow: '0 8px 24px rgba(249,115,22,0.4)', zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Plus size={22} color="#fff" />
          </button>
        )}
        {loggedIn && showBottomNav && <BottomNav tabs={tabs} active={current.screen} onTab={navTab} />}
        {shareSheetWorker && <ShareSheet worker={shareSheetWorker} onClose={() => setShareSheetWorker(null)} />}
      </div>
    </div>
  );
}
