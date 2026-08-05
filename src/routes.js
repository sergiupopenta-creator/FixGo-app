// Maps every internal "screen" name (used throughout the app via push('screen', params))
// to a real URL. Kept as a single table so the rest of the app never has to know
// about URLs directly — every page still just calls push('screen', { ... }) exactly
// as before; only App.jsx (via buildPath/matchScreen) talks to react-router.
export const ROUTES = [
  { screen: 'home', path: '/' },
  { screen: 'locationPicker', path: '/location' },
  { screen: 'search', path: '/search' },
  { screen: 'worker', path: '/worker/:workerId' },
  { screen: 'postJob', path: '/post-job' },
  { screen: 'jobs', path: '/jobs' },
  { screen: 'jobDetails', path: '/jobs/:jobId' },
  { screen: 'editJob', path: '/jobs/:jobId/edit' },
  { screen: 'messages', path: '/messages' },
  { screen: 'chat', path: '/chat/:workerId' },
  { screen: 'materialsList', path: '/chat/:workerId/materials' },
  { screen: 'materialsDetail', path: '/materials/detail' },
  { screen: 'materialsHub', path: '/materials-hub' },
  { screen: 'clientMaterialsLists', path: '/materials-hub/clients' },
  { screen: 'newClientMaterialsList', path: '/materials-hub/clients/new' },
  { screen: 'materialsInvested', path: '/materials-hub/invested' },
  { screen: 'estimator', path: '/estimator' },
  { screen: 'estimateResult', path: '/estimator/result' },
  { screen: 'postQuickTask', path: '/quick-tasks/new' },
  { screen: 'quickTasks', path: '/quick-tasks' },
  { screen: 'account', path: '/account' },
  { screen: 'editProfile', path: '/account/edit' },
  { screen: 'addresses', path: '/account/addresses' },
  { screen: 'paymentMethods', path: '/account/payment-methods' },
  { screen: 'favorites', path: '/favorites' },
  { screen: 'notifications', path: '/notifications' },
  { screen: 'settings', path: '/settings' },
  { screen: 'help', path: '/help' },
  { screen: 'terms', path: '/legal/terms' },
  { screen: 'privacy', path: '/legal/privacy' },
  { screen: 'proDashboard', path: '/pro' },
  { screen: 'proRequests', path: '/pro/requests' },
  { screen: 'proCalendar', path: '/pro/calendar' },
  { screen: 'newAppointment', path: '/pro/appointments/new' },
  { screen: 'proSubscriptions', path: '/pro/subscriptions' },
  { screen: 'proEmployees', path: '/pro/employees' },
  { screen: 'employeeProfile', path: '/pro/employees/:employeeId' },
  { screen: 'proJobs', path: '/pro/jobs' },
  { screen: 'contactProfile', path: '/contacts/:clientId' },
  { screen: 'proStats', path: '/pro/stats' },
  { screen: 'earnings', path: '/pro/earnings' },
  { screen: 'myReviews', path: '/pro/reviews' },
  { screen: 'myNotes', path: '/notes' },
  { screen: 'myNotesDetail', path: '/notes/:listId' },
  { screen: 'proProfile', path: '/pro/profile' },
];

// Pure-digit strings become numbers (so lookups like WORKERS.find(w => w.id === id)
// keep working with ===); synthetic ids like "employee-3" or "client-1" stay strings.
export function parseId(value) {
  if (value === undefined || value === null || value === '') return undefined;
  return /^\d+$/.test(value) ? Number(value) : value;
}

function idPart(value) {
  return value === undefined || value === null ? '' : String(value);
}

// The inverse of matchScreen: given a screen name + the same params shape every
// page already passes to push(), returns the URL to navigate to.
export function buildPath(screen, params = {}) {
  switch (screen) {
    case 'search':
      return params.category ? `/search?category=${encodeURIComponent(params.category)}` : '/search';
    case 'worker':
      return `/worker/${idPart(params.worker?.id ?? params.workerId)}`;
    case 'postJob':
      return params.worker ? `/post-job?workerId=${idPart(params.worker.id)}` : '/post-job';
    case 'jobDetails':
      return `/jobs/${idPart(params.job?.id ?? params.jobId)}`;
    case 'editJob':
      return `/jobs/${idPart(params.job?.id ?? params.jobId)}/edit`;
    case 'chat': {
      const q = params.workerName ? `?name=${encodeURIComponent(params.workerName)}` : '';
      return `/chat/${idPart(params.workerId)}${q}`;
    }
    case 'materialsList': {
      if (params.workerId == null) return '/materials-hub/clients/new';
      const q = params.workerName ? `?name=${encodeURIComponent(params.workerName)}` : '';
      return `/chat/${idPart(params.workerId)}/materials${q}`;
    }
    case 'newAppointment': {
      const q = new URLSearchParams();
      if (params.dateKey) q.set('date', params.dateKey);
      if (params.dayLabel) q.set('dayLabel', params.dayLabel);
      if (params.clientId != null) q.set('clientId', idPart(params.clientId));
      if (params.clientName) q.set('clientName', params.clientName);
      const qs = q.toString();
      return `/pro/appointments/new${qs ? `?${qs}` : ''}`;
    }
    case 'proJobs':
      return params.tab ? `/pro/jobs?tab=${encodeURIComponent(params.tab)}` : '/pro/jobs';
    case 'employeeProfile':
      return `/pro/employees/${idPart(params.employeeId)}`;
    case 'contactProfile':
      return `/contacts/${idPart(params.clientId)}${params.name ? `?name=${encodeURIComponent(params.name)}` : ''}`;
    case 'myNotesDetail':
      return `/notes/${idPart(params.listId)}`;
    default: {
      const found = ROUTES.find(r => r.screen === screen);
      return found ? found.path : '/';
    }
  }
}
