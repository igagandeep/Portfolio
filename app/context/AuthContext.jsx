'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user,  setUser]  = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) return;

    try {
      const { exp, user: payloadUser } = JSON.parse(atob(stored.split('.')[1]));
      if (exp * 1000 > Date.now()) {
        setToken(stored);
        setUser(payloadUser);    
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Invalid token in storage', err);
      localStorage.removeItem('token');
    }
  }, []);

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
