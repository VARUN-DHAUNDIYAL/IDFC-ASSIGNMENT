import { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface AppShellProps {
  children: ReactNode;
  portalMode: 'small-fleet' | 'enterprise';
  onModeChange: (mode: 'small-fleet' | 'enterprise') => void;
}

export default function AppShell({ children, portalMode, onModeChange }: AppShellProps) {
  if (portalMode === 'small-fleet') {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
        <TopNav portalMode={portalMode} onModeChange={onModeChange} />
        <main className="flex-1 py-8 px-4">
          <div className="max-w-[1100px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Enterprise Mode — sidebar + header
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <TopNav portalMode={portalMode} onModeChange={onModeChange} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
