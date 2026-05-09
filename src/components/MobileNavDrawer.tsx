import { useEffect } from 'react';
import { useLocation } from 'react-router';
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
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'one-click-recharge', icon: RefreshCw, label: 'One Click Recharge' },
  { id: 'auto-recharge-rules', icon: Settings2, label: 'Auto Recharge Rules' },
  { id: 'fleet-roster', icon: Truck, label: 'Fleet Roster' },
  { id: 'trip-toll-budget', icon: FileText, label: 'Trip Toll Budget' },
  { id: 'disputes', icon: AlertCircle, label: 'Disputes' },
  { id: 'gst-reports', icon: FileText, label: 'GST Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' },
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
          {portalMode === 'enterprise' && enterpriseNavItems.map(({ id, icon: Icon, label }) => {
            return (
              <button
                key={id}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827] font-medium`}
              >
                <Icon className={`w-5 h-5 text-[#9CA3AF]`} strokeWidth={2} />
                <span className="text-sm">{label}</span>
              </button>
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
