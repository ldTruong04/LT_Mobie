import React, { createContext, useContext, useMemo, useState } from 'react';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
};

type AuthContextValue = AuthState & {
  signInMock: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const demoUser: AuthUser = {
  id: 'demo-user',
  name: 'Bạn đọc BookStore',
  email: 'reader@bookstore.vn',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoggedIn: false,
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signInMock: () =>
        setState({
          user: demoUser,
          token: 'demo-token',
          isLoggedIn: true,
        }),
      signOut: () =>
        setState({
          user: null,
          token: null,
          isLoggedIn: false,
        }),
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}