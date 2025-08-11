
import React, { useState } from 'react';
import SoilAnalyzer from './components/SoilAnalyzer';
import PestIdentifier from './components/PestIdentifier';
import { LeafIcon } from './components/icons/LeafIcon';
import { BugIcon } from './components/icons/BugIcon';

type View = 'soil' | 'pest';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('soil');

  const navButtonClasses = (view: View) => 
    `flex items-center justify-center gap-3 px-6 py-3 text-lg font-semibold rounded-t-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-sand focus:ring-brand-green ${
      activeView === view
        ? 'bg-white text-brand-dark-green shadow-md'
        : 'bg-brand-green text-white hover:bg-emerald-600'
    }`;

  return (
    <div className="min-h-screen bg-brand-sand font-sans text-brand-brown">
      <header className="bg-brand-dark-green text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wider">AgriAI Namibia</h1>
          <p className="text-emerald-300 mt-1 sm:mt-0">Your AI Farming Assistant</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center border-b-2 border-brand-dark-green mb-8">
          <nav className="flex space-x-2">
            <button onClick={() => setActiveView('soil')} className={navButtonClasses('soil')}>
              <LeafIcon className="w-6 h-6" />
              <span>Soil Analysis</span>
            </button>
            <button onClick={() => setActiveView('pest')} className={navButtonClasses('pest')}>
              <BugIcon className="w-6 h-6" />
              <span>Pest Identifier</span>
            </button>
          </nav>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-b-lg rounded-tr-lg shadow-2xl min-h-[600px]">
          {activeView === 'soil' && <SoilAnalyzer />}
          {activeView === 'pest' && <PestIdentifier />}
        </div>
      </main>

      <footer className="bg-brand-dark-green text-white mt-12 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgriAI Namibia. Empowering local farmers with technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
