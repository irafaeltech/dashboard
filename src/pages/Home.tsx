import React from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Dashboard';
import LoginForm from '../components/LoginForm';

const Home: React.FC = () => {
  const { authState } = useAuth();
  
  return (
    <main className="flex-grow py-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        {authState.isAuthenticated ? (
          <Dashboard />
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <div className="max-w-lg text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                All Your Messages in One Place
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Connect your Microsoft Teams, Zoom Chat, and Google Chat accounts to see all your unread messages in a single dashboard.
              </p>
            </div>
            
            <LoginForm />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sign In</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create an account or sign in to get started with NotifyHub
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Connect Platforms</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Link your communication platforms with a single click
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-600 dark:text-teal-400 text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Stay Updated</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  See all your unread messages in one centralized dashboard
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;