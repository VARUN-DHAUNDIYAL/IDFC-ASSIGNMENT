import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Bell, ChevronDown, LogOut, Settings, User, Truck } from 'lucide-react';

interface TopNavProps {
  portalMode: 'small-fleet' | 'enterprise';
  onModeChange: (mode: 'small-fleet' | 'enterprise') => void;
}

export default function TopNav({ portalMode, onModeChange }: TopNavProps) {
  const [profileOpen, setProfileOpen] = useState(false);
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
    <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center px-5 sticky top-0 z-40 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-[200px]">
        {portalMode === 'small-fleet' && (
          <>
            <img src="/idfc-logo.png" alt="IDFC FIRST" className="w-10 h-10 object-contain rounded-full border border-[#E5E7EB] shadow-sm" />
            <div className="leading-tight">
              <div className="text-sm font-bold text-[#111827] tracking-tight">IDFC FIRST</div>
              <div className="text-[10px] text-[#6B7280] font-medium">Fleet Portal</div>
            </div>
          </>
        )}
      </div>

      {/* Mode Switch — Center */}
      <div className="flex-1 flex justify-center">
        <div className="flex bg-[#F3F4F6] rounded-xl p-1 gap-1">
          <button
            onClick={() => handleModeChange('small-fleet')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              portalMode === 'small-fleet'
                ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Small Fleet Mode
          </button>
          <button
            onClick={() => handleModeChange('enterprise')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              portalMode === 'enterprise'
                ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Enterprise Mode
          </button>
        </div>
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex items-center gap-2 min-w-[200px] justify-end">
        {/* Search */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors">
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#C1121F] rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-10 w-80 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F3F4F6]">
                <p className="text-sm font-semibold text-[#111827]">Notifications</p>
              </div>
              <div className="divide-y divide-[#F3F4F6]">
                <div className="px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer">
                  <p className="text-sm text-[#111827] font-medium">4 trucks have low balance</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Recharge before tomorrow's trips</p>
                </div>
                <div className="px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer">
                  <p className="text-sm text-[#111827] font-medium">Bulk recharge failed — 2 trucks</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Bank timeout. Retry required.</p>
                </div>
                <div className="px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer">
                  <p className="text-sm text-[#111827] font-medium">Dispute DISP-003 resolved</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">₹850 credited back to wallet</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-[#F3F4F6] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#C1121F] flex items-center justify-center text-xs font-semibold text-white">
              FA
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#6B7280] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-10 w-56 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F3F4F6]">
                <p className="text-sm font-semibold text-[#111827]">Fleet Admin</p>
                <p className="text-xs text-[#6B7280]">admin@idfcfleet.com</p>
              </div>
              <div className="p-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors">
                  <User className="w-4 h-4 text-[#6B7280]" />
                  My Account
                </button>
                <button
                  onClick={() => { handleModeChange('enterprise'); setProfileOpen(false); navigate('/enterprise/settings'); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-[#6B7280]" />
                  Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
