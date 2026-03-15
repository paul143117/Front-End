const TOKEN_KEY = 'tomol_token';
const MOCK_USERS_KEY = 'tomol_mock_users';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setToken(token) {
  if (!token) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
}

function getMockUsers() {
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setMockUsers(users) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

export function registerMockUser({ name, email, password }) {
  const users = getMockUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  users.push({ name: name || email.split('@')[0], email, password });
  setMockUsers(users);
}

function buildHeaders(extra = {}) {
  const token = getToken();
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response.json();
}

export async function loginWithTokenTest({ email, password, device_name = 'react' }) {
  // This endpoint returns plain text token (not JSON)
  const res = await fetch('/api/token-test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    },
    body: JSON.stringify({ email, password, device_name }),
  });

  if (!res.ok) {
    let message = `Login failed (${res.status})`;
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const token = (await res.text()).trim();
  setToken(token);
  return token;
}

export async function fetchCurrentUser() {
  const token = getToken();
  if (token.startsWith('mock:')) {
    const email = token.slice(5);
    const mockUsers = getMockUsers();
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      return { id: user.email, email: user.email, name: user.name || user.email.split('@')[0] };
    }
    setToken('');
    throw new Error('Session expired');
  }
  return fetchJson('/api/user');
}

export async function login({ email, password, device_name = 'tomol-react-app' }) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      },
      body: JSON.stringify({ email, password, device_name }),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      let token;
      if (contentType.includes('application/json')) {
        const data = await res.json();
        token = (data?.token ?? data?.access_token ?? data?.accessToken ?? '').trim();
      } else {
        token = (await res.text()).trim();
      }
      if (!token) throw new Error('Login succeeded but no token was returned.');
      setToken(token);
      return token;
    }

    if (res.status === 404) {
      const mockUsers = getMockUsers();
      const normalized = email.trim().toLowerCase();
      const user = mockUsers.find((u) => u.email.toLowerCase() === normalized);
      if (user && user.password === password) {
        const token = `mock:${user.email}`;
        setToken(token);
        return token;
      }
      // Backend not available: create mock user so login works offline
      try {
        registerMockUser({ name: email.split('@')[0], email, password });
        setToken(`mock:${email.trim()}`);
        return getToken();
      } catch {
        // Email already exists (wrong password)
        throw new Error('Wrong password for this email.');
      }
    }

    let message = `Login failed (${res.status})`;
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Login failed')) throw err;
    const mockUsers = getMockUsers();
    const normalized = email.trim().toLowerCase();
    const user = mockUsers.find((u) => u.email.toLowerCase() === normalized);
    if (user && user.password === password) {
      const token = `mock:${user.email}`;
      setToken(token);
      return token;
    }
    throw new Error('Login failed. Check your email and password, or create an account.');
  }
}

export async function register({ name, email, password }) {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      const token = data?.token ?? (await res.text().then((t) => t.trim()));
      if (token) setToken(token);
      return data;
    }
    if (res.status === 404 || res.status === 502) {
      registerMockUser({ name, email, password });
      setToken(`mock:${email.trim()}`);
      return { user: { email, name: name || email.split('@')[0] } };
    }
    let message = `Registration failed (${res.status})`;
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch {}
    throw new Error(message);
  } catch (err) {
    if (err instanceof Error && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
      registerMockUser({ name, email, password });
      setToken(`mock:${email.trim()}`);
      return { user: { email, name: name || email.split('@')[0] } };
    }
    throw err;
  }
}

export async function logout() {
  try {
    if (!getToken().startsWith('mock:')) {
      await fetchJson('/api/logout', { method: 'POST' });
    }
  } finally {
    setToken('');
  }
}

export async function fetchDashboard() {
  try {
    return await fetchJson('/api/dashboard');
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err || 'Unknown error');

    // If the error looks like a network / offline / backend unavailable issue,
    // return safe mock data so the dashboard still works without internet.
    if (
      message.includes('Failed to fetch') ||
      message.includes('NetworkError') ||
      message.includes('ERR_CONNECTION') ||
      message.includes('status 404') ||
      message.includes('status 502')
    ) {
      return {
        stats: {
          students: 1200,
          courses: 48,
          school_days: 95,
        },
        enrollmentByMonth: [
          { month: 'Jan', students: 120 },
          { month: 'Feb', students: 150 },
          { month: 'Mar', students: 180 },
          { month: 'Apr', students: 160 },
          { month: 'May', students: 200 },
          { month: 'Jun', students: 190 },
          { month: 'Jul', students: 210 },
          { month: 'Aug', students: 230 },
          { month: 'Sep', students: 260 },
          { month: 'Oct', students: 240 },
          { month: 'Nov', students: 220 },
          { month: 'Dec', students: 180 },
        ],
        courseDistribution: [
          { name: 'BSIT', value: 420 },
          { name: 'BSCpE', value: 280 },
          { name: 'BSCS', value: 320 },
        ],
        attendancePattern: [
          { day: 'Mon', attendance: 92 },
          { day: 'Tue', attendance: 88 },
          { day: 'Wed', attendance: 95 },
          { day: 'Thu', attendance: 90 },
          { day: 'Fri', attendance: 85 },
        ],
      };
    }

    throw err;
  }
}


