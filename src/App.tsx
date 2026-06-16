import React from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-start items-center overflow-hidden">
      {/* Dynamic graphic background */}
      <Background />
      
      {/* Centered Main Column Container */}
      <main className="relative z-10 w-full max-w-[1000px] h-full flex flex-col justify-between py-6 px-4 sm:px-6 md:px-8 gap-4 overflow-hidden">
        {/* Top Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>
        
        {/* Centered Chat Interface */}
        <ChatInterface />
        
        {/* Footer / Info */}
        <footer className="text-center text-xs text-slate-500 py-1 flex-shrink-0">
          ZapBill &copy; {new Date().getFullYear()} - Olympus AI Group 4
        </footer>
      </main>
    </div>
  );
};

export default App;
