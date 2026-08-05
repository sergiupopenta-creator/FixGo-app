// Lightweight local-only authentication: accounts are stored in this
// browser's localStorage, not on a server. This makes "login" real in the
// sense that a wrong password is rejected and each account keeps its own
// name/email — but it is single-device only. Opening the site on another
// browser or device starts with no accounts, since nothing is sent anywhere.
const USERS_KEY = 'fixgo:users';
const SESSION_KEY = 'fixgo:session';

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY) || null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function register(name, email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();
  if (users.some(u => u.email === normalizedEmail)) {
    return { ok: false, error: 'Există deja un cont cu acest email.' };
  }
  const passwordHash = await hashPassword(password);
  users.push({ name: name.trim(), email: normalizedEmail, passwordHash });
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, normalizedEmail);
  return { ok: true, name: name.trim(), email: normalizedEmail };
}

export async function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();
  const user = users.find(u => u.email === normalizedEmail);
  if (!user) return { ok: false, error: 'Nu există niciun cont cu acest email.' };
  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) return { ok: false, error: 'Parolă incorectă.' };
  localStorage.setItem(SESSION_KEY, normalizedEmail);
  return { ok: true, name: user.name, email: user.email };
}

export function getUserByEmail(email) {
  return getUsers().find(u => u.email === email) || null;
}
