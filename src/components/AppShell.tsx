import { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MobileHeader from './MobileHeader';

interface AppShellProps {
  children: ReactNode;
  portalMode: 'small-fleet' | 'enterprise';
  onModeChange: (mode: 'small-fleet' | 'enterprise') => void;
}

export default function AppShell({ children, portalMode, onModeChange }: AppShellProps) {
  if (portalMode === 'small-fleet') {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
        <div className="hidden md:block">
          <TopNav portalMode={portalMode} onModeChange={onModeChange} />
        </div>
        <div className="block md:hidden">
          <MobileHeader portalMode={portalMode} onModeChange={onModeChange} />
        </div>
        
        <main className="flex-1 md:py-8 md:px-4">
          <div className="max-w-[1100px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Enterprise Mode — sidebar + header
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <div className="block md:hidden">
        <MobileHeader portalMode={portalMode} onModeChange={onModeChange} />
      </div>

      <div className="flex-1 md:ml-[240px] lg:ml-[240px] flex flex-col min-h-screen">
        <div className="hidden md:block">
          <TopNav portalMode={portalMode} onModeChange={onModeChange} />
        </div>
        <main className="flex-1 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
