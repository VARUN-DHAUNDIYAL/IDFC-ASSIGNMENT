import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface AppShellProps {
  children: ReactNode;
  fleetMode: 'owned' | 'market';
  onFleetModeChange: (mode: 'owned' | 'market') => void;
}

export default function AppShell({ children, fleetMode, onFleetModeChange }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] flex">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <TopNav fleetMode={fleetMode} onFleetModeChange={onFleetModeChange} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
