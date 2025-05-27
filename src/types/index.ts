export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  url: string;
  isConnected: boolean;
  unreadCount: number;
}

export interface PlatformConnections {
  teams: boolean;
  zoom: boolean;
  google: boolean;
}