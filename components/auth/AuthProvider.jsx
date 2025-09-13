'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext({ user: null, setUser: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(d=>setUser(d.user || null)).catch(()=>{});
  }, []);
  return <AuthCtx.Provider value={{ user, setUser }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
