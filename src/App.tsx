import React from 'react';
import { PlatformProvider } from './context/PlatformContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <PlatformProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <main className="flex-grow py-8">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </PlatformProvider>
  );
}

export default App;