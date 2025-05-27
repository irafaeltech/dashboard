import { Platform } from '../types';

export const fetchTeamsMessages = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 15));
    }, 800);
  });
};

export const fetchZoomMessages = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10));
    }, 600);
  });
};

export const fetchGoogleMessages = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 20));
    }, 700);
  });
};

export const getPlatformData = (): Platform[] => [
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: 'MessageSquare',
    color: '#6264A7',
    url: 'https://teams.microsoft.com',
    isConnected: false,
    unreadCount: 0,
  },
  {
    id: 'zoom',
    name: 'Zoom Chat',
    icon: 'MessageCircle',
    color: '#2D8CFF',
    url: 'https://zoom.us/chat',
    isConnected: false,
    unreadCount: 0,
  },
  {
    id: 'google',
    name: 'Google Chat',
    icon: 'MessagesSquare',
    color: '#1A73E8',
    url: 'https://mail.google.com',
    isConnected: false,
    unreadCount: 0,
  },
];