import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'animalmandihub_users';
const SESSION_KEY = 'animalmandihub_session';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_animalmandihub_salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch { return null; }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

async function seedAdmin() {
  const users = getUsers();
  if (!users.find((u) => u.email.toLowerCase() === 'admin@animalmandihub.com')) {
    const hashedPw = await hashPassword('admin123');
    users.unshift({
      id: 0,
      name: 'Admin',
      email: 'admin@animalmandihub.com',
      phone: '',
      password: hashedPw,
      role: 'admin',
      createdAt: new Date().toISOString(),
      avatar: null,
    });
    saveUsers(users);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    seedAdmin().then(() => setSeeded(true));
  }, []);

  useEffect(() => {
    saveSession(user);
  }, [user]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const users = getUsers();
      const hashedPw = await hashPassword(password);
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === hashedPw
      );
      if (!found) return { success: false, error: 'Invalid email or password' };
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      return { success: true, user: safeUser };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, phone, password) => {
    setLoading(true);
    try {
      const users = getUsers();
      if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'An account with this email already exists' };
      }
      const hashedPassword = await hashPassword(password);
      const isFirstUser = users.length === 0;
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone: phone || '',
        password: hashedPassword,
        role: isFirstUser ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
        avatar: null,
      };
      users.push(newUser);
      saveUsers(users);
      const { password: _, ...safeUser } = newUser;
      setUser(safeUser);
      return { success: true, user: safeUser };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      saveSession(updated);
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        saveUsers(users);
      }
      return updated;
    });
  }, []);

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading, isAdmin, isAuthenticated, seeded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
