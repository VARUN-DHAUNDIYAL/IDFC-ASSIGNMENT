import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { 
  X, LayoutDashboard, RefreshCw, AlertCircle, FileText, 
  Settings, Truck, Settings2, Home, IndianRupee
} from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portalMode: 'small-fleet' | 'enterprise';
}

const enterpriseNavGroups = [
  {
    label: 'Daily Work',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/enterprise' },
      { id: 'one-click-recharge', icon: RefreshCw, label: 'One Click Recharge', path: '/enterprise' },
      { id: 'fleet-roster', icon: Truck, label: 'Fleet Roster', path: '/enterprise' },
    ]
  },
  {
    label: 'Controls',
    items: [
      { id: 'auto-recharge-rules', icon: Settings2, label: 'Auto Recharge Rules', path: '/enterprise' },
      { id: 'trip-toll-budget', icon: FileText, label: 'Trip Toll Budget', path: '/enterprise' },
    ]
  },
  {
    label: 'Resolve and Report',
    items: [
      { id: 'disputes', icon: AlertCircle, label: 'Disputes', path: '/enterprise' },
      { id: 'gst-reports', icon: FileText, label: 'GST Reports', path: '/enterprise' },
    ]
  },
  {
    label: 'Admin',
    items: [
      { id: 'settings', icon: Settings, label: 'Settings', path: '/enterprise' },
    ]
  }
];

const smallFleetNav = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'trucks', icon: Truck, label: 'Trucks', path: '/' },
  { id: 'issues', icon: AlertCircle, label: 'Toll Issues', path: '/' },
  { id: 'reports', icon: FileText, label: 'Monthly Toll Report', path: '/' },
  { id: 'budget', icon: IndianRupee, label: 'Hired Truck Budget', path: '/' },
];

export default function MobileNavDrawer({ isOpen, onClose, portalMode }: MobileNavDrawerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { onClose(); }, [location.pathname, onClose]);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSmallFleetNav = (id: string, path: string) => {
    onClose();
    navigate(path);
    if (id !== 'home') {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#111827]/40 z-50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E5E7EB]">
          <span className="text-sm font-bold tracking-tight text-[#111827]">
            {portalMode === 'enterprise' ? 'Enterprise Menu' : 'Small Fleet Menu'}
          </span>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] text-[#6B7280]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {portalMode === 'enterprise' ? (
            enterpriseNavGroups.map((group, idx) => (
              <div key={idx} className="space-y-1 mb-4">
                <p className="px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">{group.label}</p>
                {group.items.map(({ id, icon: Icon, label, path }) => (
                  <button
                    key={id}
                    onClick={() => {
                      onClose();
                      navigate(path);
                      setTimeout(() => {
                        const element = document.getElementById(id);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827] font-medium min-h-[44px]"
                  >
                    <Icon className="w-5 h-5 text-[#9CA3AF]" strokeWidth={2} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            ))
          ) : (
            <div className="space-y-1">
              {smallFleetNav.map(({ id, icon: Icon, label, path }) => (
                <button
                  key={id}
                  onClick={() => handleSmallFleetNav(id, path)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827] font-medium min-h-[44px]"
                >
                  <Icon className="w-5 h-5 text-[#9CA3AF]" strokeWidth={2} />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] font-bold text-sm">
              VK
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">Vikas Kumar</p>
              <p className="text-xs text-[#6B7280]">{portalMode === 'enterprise' ? 'Fleet Owner' : 'Admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
