import { useState, useEffect, useCallback } from 'react';
import { Platform } from '../types';
import { usePlatform } from '../context/PlatformContext';
import {
  fetchTeamsMessages,
  fetchZoomMessages,
  fetchGoogleMessages,
  getPlatformData,
} from '../services/platformService';

export const useMessageCount = (refreshInterval = 10000) => {
  const { connections } = usePlatform();
  const [platforms, setPlatforms] = useState<Platform[]>(getPlatformData());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorTimeout, setErrorTimeout] = useState<number>(0);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simula um erro após 10 segundos
      setErrorTimeout(prev => prev + 1);
      if (errorTimeout >= 1) {
        throw new Error('Erro ao atualizar mensagens');
      }

      const updatedPlatforms = platforms.map(platform => ({
        ...platform,
        isConnected: connections[platform.id as keyof typeof connections] || false,
      }));

      const platformPromises = updatedPlatforms.map(async platform => {
        if (!platform.isConnected) return platform;

        try {
          let count = 0;
          switch (platform.id) {
            case 'teams':
              count = await fetchTeamsMessages();
              break;
            case 'zoom':
              count = await fetchZoomMessages();
              break;
            case 'google':
              count = await fetchGoogleMessages();
              break;
          }
          return { ...platform, unreadCount: count };
        } catch (err) {
          console.error(`Erro ao buscar contagem para ${platform.name}:`, err);
          return platform;
        }
      });

      const results = await Promise.all(platformPromises);
      setPlatforms(results);
    } catch (err) {
      console.error('Erro ao buscar contagem de mensagens:', err);
      setError('Falha ao atualizar mensagens. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [connections, platforms, errorTimeout]);

  useEffect(() => {
    fetchCounts();
  }, [connections, fetchCounts]);

  useEffect(() => {
    const interval = setInterval(fetchCounts, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchCounts, refreshInterval]);

  const refresh = () => {
    setErrorTimeout(0);
    fetchCounts();
  };

  return {
    platforms,
    loading,
    error,
    refresh,
    totalUnread: platforms.reduce((total, platform) => total + platform.unreadCount, 0),
  };
};