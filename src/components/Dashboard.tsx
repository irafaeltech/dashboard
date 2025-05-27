import React from 'react';
import { useMessageCount } from '../hooks/useMessageCount';
import PlatformCard from './PlatformCard';
import { RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { platforms, loading, error, refresh, totalUnread } = useMessageCount(10000);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Central de Mensagens</h2>
          <p className="text-gray-600 dark:text-gray-300">Seu painel de comunicação unificado</p>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Não lidas:</span>
            <span className={`font-semibold ${totalUnread > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
              {totalUnread}
            </span>
          </div>
          <button 
            onClick={refresh} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md flex items-center transition-colors duration-200"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-6 rounded">
          <p>Erro ao carregar mensagens. Tente novamente mais tarde.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <PlatformCard 
            key={platform.id} 
            platform={platform} 
            onRefresh={refresh} 
          />
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Última atualização: {new Date().toLocaleTimeString()}
        </p>
        <p className="mt-1">
          Atualizando automaticamente a cada 10 segundos
        </p>
      </div>
    </div>
  );
};

export default Dashboard;