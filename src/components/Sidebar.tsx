import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  Gavel,
  FileBarChart,
  ChevronDown,
  Hexagon,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'command', label: 'Command Center', path: '/', icon: LayoutDashboard },
  { id: 'liquidity', label: 'Dynamic Liquidity Rules', path: '/liquidity', icon: Wallet },
  { id: 'escrow', label: 'JIT Escrow Hub', path: '/escrow', icon: ShieldCheck },
  { id: 'dispute', label: 'Dispute Engine', path: '/dispute', icon: Gavel },
  { id: 'gst', label: 'GST Account Aggregator', path: '/gst', icon: FileBarChart },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileExpanded, setProfileExpanded] = useState(false);

  return (
    <aside className="w-[260px] min-w-[260px] h-screen bg-[#0a0a0a] border-r border-[#27272A] flex flex-col fixed left-0 top-0 z-40">
      {/* Logo Area */}
      <div className="h-[72px] flex items-center px-5 border-b border-[#27272A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC2626] flex items-center justify-center shadow-lg">
            <Hexagon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white tracking-tight">IDFC Fleet</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Command Center Plus</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-[#8B0000]/15 text-white border border-[#8B0000]/30'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#DC2626]' : 'text-gray-600 group-hover:text-gray-400'
                }`}
              />
              <span className="font-medium truncate">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-1 rounded-full bg-[#DC2626]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User Profile */}
      <div className="px-3 pb-4">
        <div className="border-t border-[#27272A] pt-3">
          <button
            onClick={() => setProfileExpanded(!profileExpanded)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-[#27272A]">
              <span className="text-xs font-semibold text-gray-300">FA</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-300">Fleet Admin</p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wide">Administrator</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                profileExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
          {profileExpanded && (
            <div className="mt-1 px-3 py-2 space-y-1 animate-fadeIn">
              <button className="w-full text-left px-3 py-2 text-xs text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] rounded transition-colors">
                Account Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-xs text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] rounded transition-colors">
                Support
              </button>
              <button className="w-full text-left px-3 py-2 text-xs text-[#DC2626] hover:text-[#EF4444] hover:bg-[#DC2626]/10 rounded transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
