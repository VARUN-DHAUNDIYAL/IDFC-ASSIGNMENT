import { useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Zap,
  RefreshCw,
  Truck,
  MapPin,
  MessageSquare,
  FileText,
  Settings,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard',   label: 'Dashboard',           path: '/enterprise',               icon: LayoutDashboard },
  { id: 'recharge',    label: 'One Click Recharge',     path: '/enterprise/recharge',      icon: Zap },
  { id: 'auto-rules',  label: 'Auto Recharge Rules',  path: '/enterprise/auto-rules',    icon: RefreshCw },
  { id: 'fleet',       label: 'Fleet Roster',         path: '/enterprise/fleet',         icon: Truck },
  { id: 'trips',       label: 'Trip Toll Budget',     path: '/enterprise/trips',         icon: MapPin },
  { id: 'disputes',    label: 'Disputes',             path: '/enterprise/disputes',      icon: MessageSquare },
  { id: 'gst',         label: 'GST Reports',          path: '/enterprise/gst',           icon: FileText },
  { id: 'settings',    label: 'Settings',             path: '/enterprise/settings',      icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-white border-r border-[#E5E7EB] flex flex-col fixed left-0 top-0 z-40">
      {/* Logo area — matches TopNav height */}
      <div className="h-16 flex items-center px-5 border-b border-[#E5E7EB] bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C1121F] flex items-center justify-center shadow-sm">
            <Truck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-[#111827]">IDFC FIRST</div>
            <div className="text-[10px] text-[#6B7280]">Fleet Portal</div>
          </div>
        </div>
      </div>

      {/* Enterprise Mode label */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest">Enterprise</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                isActive
                  ? 'bg-[#FEF2F2] text-[#C1121F] font-medium'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
              }`}
            >
              {isActive && <span className="sidebar-active-bar" />}
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#C1121F]' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom — User info */}
      <div className="px-3 pb-4 pt-3 border-t border-[#F3F4F6]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-[#C1121F] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            FA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">Fleet Admin</p>
            <p className="text-[10px] text-[#9CA3AF]">Fleet Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
