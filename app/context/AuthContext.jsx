// context/AuthContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user,  setUser]  = useState(null);

  // On mount: grab any existing token, validate expiry, set user
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) return;

    try {
      const { exp, user: payloadUser } = JSON.parse(atob(stored.split('.')[1]));
      if (exp * 1000 > Date.now()) {
        setToken(stored);
        setUser(payloadUser);          // ← use the decoded user, not stale `token`
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Invalid token in storage', err);
      localStorage.removeItem('token');
    }
  }, []);

  // Call this after you get a token from the server
  function login(newToken) {
    localStorage.setItem('token', newToken);
    setToken(newToken);

    try {
      const { user: payloadUser } = JSON.parse(atob(newToken.split('.')[1]));
      setUser(payloadUser);
    } catch {
      setUser(null);
    }
  }

  // Call this to log out
  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
