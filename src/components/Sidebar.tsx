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

const navGroups = [
  {
    label: 'Daily Work',
    items: [
      { id: 'dashboard',   label: 'Dashboard',           icon: LayoutDashboard, path: '/enterprise' },
      { id: 'one-click-recharge',    label: 'One Click Recharge',     icon: Zap, path: '/enterprise/recharge' },
      { id: 'fleet-roster',       label: 'Fleet Roster',         icon: Truck, path: '/enterprise/fleet' },
    ]
  },
  {
    label: 'Controls',
    items: [
      { id: 'auto-recharge-rules',  label: 'Auto Recharge Rules',  icon: RefreshCw, path: '/enterprise/auto-rules' },
      { id: 'trip-toll-budget',       label: 'Trip Toll Budget',     icon: MapPin, path: '/enterprise/trips' },
    ]
  },
  {
    label: 'Resolve and Report',
    items: [
      { id: 'disputes',    label: 'Toll Issues',             icon: MessageSquare, path: '/enterprise/issues' },
      { id: 'gst-reports',         label: 'GST Reports',          icon: FileText, path: '/enterprise/gst' },
    ]
  },
  {
    label: 'Admin',
    items: [
      { id: 'settings',    label: 'Settings',             icon: Settings, path: '/enterprise/settings' },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-white border-r border-[#E5E7EB] flex flex-col fixed left-0 top-0 z-40">
      {/* Logo area — matches TopNav height */}
      <div className="h-16 flex items-center px-5 border-b border-[#E5E7EB] bg-white">
        <div className="flex items-center gap-2.5">
          <img src="/idfc-logo.png" alt="IDFC FIRST" className="w-8 h-8 object-contain rounded-full border border-[#E5E7EB] shadow-sm" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-[#111827]">IDFC FIRST</div>
            <div className="text-[10px] text-[#6B7280]">Fleet Portal</div>
          </div>
        </div>
      </div>

      {/* Enterprise Mode label */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest">Enterprise</span>
        <p className="text-[10px] text-[#6B7280] mt-1 pr-2 leading-tight">
          Advanced controls for recharge, vehicle, toll issue and reporting workflows.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-4 overflow-y-auto pb-4">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">{group.label}</p>
            {group.items.map((item) => {
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
          </div>
        ))}
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
