import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'daniyal-pharmacy-auth';

const demoAccounts = {
  'admin@pharmacy.com': {
    password: 'Password123!',
    name: 'Ayaan Malik',
    role: 'Admin',
    title: 'Operations Admin',
    avatar: 'AM',
  },
  'superadmin@pharmacy.com': {
    password: 'Password123!',
    name: 'Daniyal Ahmed',
    role: 'Super Admin',
    title: 'Pharmacy Owner',
    avatar: 'DA',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const api = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: async ({ email, password }) => {
        const account = demoAccounts[email.toLowerCase()];
        if (!account || account.password !== password) {
          throw new Error('Invalid email or password.');
        }

        const nextUser = {
          email: email.toLowerCase(),
          name: account.name,
          role: account.role,
          title: account.title,
          avatar: account.avatar,
          online: true,
        };

        setUser(nextUser);
        return nextUser;
      },
      logout: () => setUser(null),
      requestPasswordReset: async (email) => {
        if (!email) {
          throw new Error('Please enter a valid email address.');
        }

        return { success: true };
      },
      updateProfile: (updates) => setUser((current) => ({ ...current, ...updates })),
    }),
    [user],
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}