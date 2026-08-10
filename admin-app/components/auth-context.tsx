"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getAuthClient } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  checking: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  checking: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuthClient(), async (u) => {
      setUser(u);
      if (u) {
        try {
          const idTokenResult = await u.getIdTokenResult();
          setIsAdmin(idTokenResult.claims.admin === true);
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setChecking(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(getAuthClient(), email, password);
    const idTokenResult = await cred.user.getIdTokenResult();
    if (idTokenResult.claims.admin !== true) {
      await signOut(getAuthClient());
      throw new Error("This account is not an administrator.");
    }
  };

  const logout = async () => {
    await signOut(getAuthClient());
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}