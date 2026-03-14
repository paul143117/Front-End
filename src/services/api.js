const TOKEN_KEY = 'tomol_token';

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
  return fetchJson('/api/user');
}

export async function login({ email, password, device_name = 'tomol-react-app' }) {
  // /api/login returns plain text token by default
  const res = await fetch('/api/login', {
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

export async function logout() {
  try {
    await fetchJson('/api/logout', { method: 'POST' });
  } finally {
    setToken('');
  }
}

export async function fetchDashboard() {
  return fetchJson('/api/dashboard');
}

