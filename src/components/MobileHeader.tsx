import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Truck, Bell, Menu } from 'lucide-react';
import MobileNavDrawer from './MobileNavDrawer';

interface MobileHeaderProps {
  portalMode: 'small-fleet' | 'enterprise';
  onModeChange: (mode: 'small-fleet' | 'enterprise') => void;
}

export default function MobileHeader({ portalMode, onModeChange }: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const handleModeChange = (mode: 'small-fleet' | 'enterprise') => {
    onModeChange(mode);
    if (mode === 'enterprise') {
      navigate('/enterprise');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-sm flex flex-col">
        {/* Top Row: Logo & Icons */}
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <div className="text-base font-black text-[#991B1B] tracking-tight leading-none">IDFC FIRST</div>
              <div className="text-[10px] text-[#111827] font-semibold tracking-wide uppercase mt-0.5">Fleet Portal</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C1121F] rounded-full" />
            </button>
            <button 
              onClick={() => setDrawerOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications Dropdown (Simple implementation) */}
        {notifOpen && (
          <div className="absolute top-14 right-4 w-72 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F3F4F6]">
              <p className="text-sm font-semibold text-[#111827]">Notifications</p>
            </div>
            <div className="divide-y divide-[#F3F4F6]">
              <div className="px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer">
                <p className="text-sm text-[#111827] font-medium">4 trucks have low balance</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Recharge before tomorrow's trips</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Row: Mode Switch */}
        <div className="px-4 pb-3 pt-1">
          <div className="flex bg-[#F3F4F6] rounded-xl p-1 gap-1 w-full">
            <button
              onClick={() => handleModeChange('small-fleet')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                portalMode === 'small-fleet'
                  ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Small Fleet
            </button>
            <button
              onClick={() => handleModeChange('enterprise')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                portalMode === 'enterprise'
                  ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Enterprise
            </button>
          </div>
        </div>
      </header>

      <MobileNavDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        portalMode={portalMode}
      />
    </>
  );
}
