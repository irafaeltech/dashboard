import { useState, useEffect, useCallback } from 'react';
import { Platform } from '../types';
import { usePlatform } from '../context/PlatformContext';
import {
  fetchTeamsMessages,
  fetchZoomMessages,
  fetchGoogleMessages,
  getPlatformData,
} from '../services/platformService';

export const useMessageCount = (refreshInterval = 30000) => {
  const { connections } = usePlatform();
  const [platforms, setPlatforms] = useState<Platform[]>(getPlatformData());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
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
          console.error(`Error fetching counts for ${platform.name}:`, err);
          return platform;
        }
      });

      const results = await Promise.all(platformPromises);
      setPlatforms(results);
    } catch (err) {
      console.error('Error fetching message counts:', err);
      setError('Failed to fetch message counts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [connections, platforms]);

  useEffect(() => {
    fetchCounts();
  }, [connections, fetchCounts]);

  useEffect(() => {
    const interval = setInterval(fetchCounts, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchCounts, refreshInterval]);

  return {
    platforms,
    loading,
    error,
    refresh: fetchCounts,
    totalUnread: platforms.reduce((total, platform) => total + platform.unreadCount, 0),
  };
};