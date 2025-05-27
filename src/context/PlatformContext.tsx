import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PlatformConnections } from '../types';

interface PlatformContextType {
  connections: PlatformConnections;
  connectPlatform: (platform: keyof PlatformConnections) => Promise<void>;
  disconnectPlatform: (platform: keyof PlatformConnections) => Promise<void>;
}

const defaultConnections: PlatformConnections = {
  teams: false,
  zoom: false,
  google: false,
};

const PlatformContext = createContext<PlatformContextType>({
  connections: defaultConnections,
  connectPlatform: async () => {},
  disconnectPlatform: async () => {},
});

export const usePlatform = () => useContext(PlatformContext);

interface PlatformProviderProps {
  children: ReactNode;
}

export const PlatformProvider: React.FC<PlatformProviderProps> = ({ children }) => {
  const [connections, setConnections] = useState<PlatformConnections>(defaultConnections);

  useEffect(() => {
    const stored = localStorage.getItem('platform_connections');
    if (stored) {
      try {
        setConnections(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored connections:', error);
        localStorage.removeItem('platform_connections');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('platform_connections', JSON.stringify(connections));
  }, [connections]);

  const connectPlatform = async (platform: keyof PlatformConnections) => {
    setConnections(prev => ({
      ...prev,
      [platform]: true,
    }));
  };

  const disconnectPlatform = async (platform: keyof PlatformConnections) => {
    setConnections(prev => ({
      ...prev,
      [platform]: false,
    }));
  };

  return (
    <PlatformContext.Provider
      value={{
        connections,
        connectPlatform,
        disconnectPlatform,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};