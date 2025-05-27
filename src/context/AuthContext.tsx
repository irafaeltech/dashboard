import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType {
  authState: AuthState;
  connectPlatform: (platform: 'teams' | 'zoom' | 'google') => Promise<void>;
  disconnectPlatform: (platform: 'teams' | 'zoom' | 'google') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  platformConnections: {
    teams: false,
    zoom: false,
    google: false,
  },
};

const AuthContext = createContext<AuthContextType>({
  authState: defaultAuthState,
  connectPlatform: async () => {},
  disconnectPlatform: async () => {},
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  // Check for existing auth on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState(parsedAuth);
      } catch (error) {
        console.error('Failed to parse stored auth:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // Update localStorage when auth changes
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem('auth', JSON.stringify(authState));
    } else {
      localStorage.removeItem('auth');
    }
  }, [authState]);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email,
      avatar: 'https://i.pravatar.cc/150?u=demo',
    };

    setAuthState({
      isAuthenticated: true,
      user: mockUser,
      platformConnections: {
        teams: false,
        zoom: false,
        google: false,
      },
    });
  };

  const logout = () => {
    setAuthState(defaultAuthState);
  };

  const connectPlatform = async (platform: 'teams' | 'zoom' | 'google') => {
    // In a real app, this would initiate OAuth flow with the platform
    // For demo purposes, we'll simulate a successful connection
    setAuthState(prevState => ({
      ...prevState,
      platformConnections: {
        ...prevState.platformConnections,
        [platform]: true,
      },
    }));
  };

  const disconnectPlatform = async (platform: 'teams' | 'zoom' | 'google') => {
    // In a real app, this would revoke access tokens
    setAuthState(prevState => ({
      ...prevState,
      platformConnections: {
        ...prevState.platformConnections,
        [platform]: false,
      },
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        connectPlatform,
        disconnectPlatform,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};