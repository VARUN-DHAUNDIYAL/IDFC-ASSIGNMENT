import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { 
  X, LayoutDashboard, RefreshCw, AlertCircle, FileText, 
  Settings, Truck, Settings2
} from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portalMode: 'small-fleet' | 'enterprise';
}

const enterpriseNavItems = [
  { path: '/enterprise', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/recharge', icon: RefreshCw, label: 'One Click Recharge' },
  { path: '/rules', icon: Settings2, label: 'Auto Recharge Rules' },
  { path: '/roster', icon: Truck, label: 'Fleet Roster' },
  { path: '/budget', icon: FileText, label: 'Trip Toll Budget' },
  { path: '/disputes', icon: AlertCircle, label: 'Disputes' },
  { path: '/reports', icon: FileText, label: 'GST Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNavDrawer({ isOpen, onClose, portalMode }: MobileNavDrawerProps) {
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#111827]/40 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E5E7EB]">
          <span className="text-sm font-bold tracking-tight text-[#111827]">Menu</span>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] text-[#6B7280]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {portalMode === 'enterprise' && enterpriseNavItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path || (path !== '/enterprise' && location.pathname.startsWith(path));
            return (
              <NavLink
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[#FEF2F2] text-[#C1121F] font-semibold' 
                    : 'text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827] font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#C1121F]' : 'text-[#9CA3AF]'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm">{label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] font-bold text-sm">
              VK
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">Vikas Kumar</p>
              <p className="text-xs text-[#6B7280]">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
