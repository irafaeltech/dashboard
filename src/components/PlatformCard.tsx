import React from 'react';
import { Platform } from '../types';
import { MessageSquare, MessageCircle, MessagesSquare, Link, RefreshCw, XCircle } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

interface PlatformCardProps {
  platform: Platform;
  onRefresh: () => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onRefresh }) => {
  const { connectPlatform, disconnectPlatform } = usePlatform();
  
  const getIcon = () => {
    switch (platform.id) {
      case 'teams':
        return <MessageSquare className="w-6 h-6" />;
      case 'zoom':
        return <MessageCircle className="w-6 h-6" />;
      case 'google':
        return <MessagesSquare className="w-6 h-6" />;
      default:
        return <MessageSquare className="w-6 h-6" />;
    }
  };

  const handleConnect = async () => {
    await connectPlatform(platform.id as 'teams' | 'zoom' | 'google');
  };

  const handleDisconnect = async () => {
    await disconnectPlatform(platform.id as 'teams' | 'zoom' | 'google');
  };

  const handleOpenPlatform = () => {
    window.open(platform.url, '_blank');
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg"
      style={{ borderTop: `4px solid ${platform.color}` }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-white rounded-full p-2" style={{ backgroundColor: platform.color }}>
            {getIcon()}
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">{platform.name}</h3>
        </div>
        <button 
          onClick={onRefresh} 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Atualizar"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {platform.isConnected ? (
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">Mensagens não lidas</span>
            <span 
              className={`font-semibold text-lg ${
                platform.unreadCount > 0 
                  ? 'text-red-500 dark:text-red-400 animate-pulse' 
                  : 'text-green-500 dark:text-green-400'
              }`}
            >
              {platform.unreadCount}
            </span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleOpenPlatform}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center transition-colors duration-200"
            >
              <Link className="w-4 h-4 mr-1" />
              Abrir
            </button>
            <button
              onClick={handleDisconnect}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md text-sm flex items-center justify-center transition-colors duration-200"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Desconectar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Conecte para ver mensagens não lidas
          </p>
          <button
            onClick={handleConnect}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200"
          >
            Conectar
          </button>
        </div>
      )}

      <div className="mt-2">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${platform.isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {platform.isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;