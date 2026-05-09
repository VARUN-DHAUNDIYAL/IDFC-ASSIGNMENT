import { useState } from 'react';
import { User, Bell, AlertTriangle, HelpCircle, ChevronDown, CheckCircle, Shield, CreditCard, LogOut } from 'lucide-react';

export default function MobileSettings() {
  const [activeSection, setActiveSection] = useState<string | null>('profile');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const sections = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Details',
      content: (
        <div className="space-y-4 pt-3 border-t border-[#F3F4F6] mt-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Fleet Owner Name</label>
            <input type="text" className="bank-input text-sm" defaultValue="Rahul Transport Co." />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Registered Mobile</label>
            <input type="text" className="bank-input text-sm" defaultValue="+91 98765 43210" disabled />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Email Address</label>
            <input type="email" className="bank-input text-sm" defaultValue="admin@rahultransport.com" />
          </div>
          <button className="btn-secondary w-full justify-center" onClick={() => showToast('Profile updated')}>
            Save Changes
          </button>
        </div>
      )
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notification Preferences',
      content: (
        <div className="space-y-4 pt-3 border-t border-[#F3F4F6] mt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">SMS Alerts</p>
              <p className="text-xs text-[#6B7280]">For low balance & recharge</p>
            </div>
            <button className="toggle-track bg-[#C1121F]"><div className="toggle-thumb translate-x-[22px]" /></button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">Email Reports</p>
              <p className="text-xs text-[#6B7280]">Monthly GST reports</p>
            </div>
            <button className="toggle-track bg-[#C1121F]"><div className="toggle-thumb translate-x-[22px]" /></button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">WhatsApp Updates</p>
              <p className="text-xs text-[#6B7280]">Critical alerts only</p>
            </div>
            <button className="toggle-track bg-[#D1D5DB]"><div className="toggle-thumb translate-x-[3px]" /></button>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security & Access',
      content: (
        <div className="space-y-4 pt-3 border-t border-[#F3F4F6] mt-3">
          <button className="w-full text-left py-2 flex items-center justify-between" onClick={() => showToast('Redirecting to password reset')}>
            <span className="text-sm font-semibold text-[#111827]">Change Password</span>
            <ChevronDown className="w-4 h-4 text-[#9CA3AF] -rotate-90" />
          </button>
          <div className="w-full h-px bg-[#F3F4F6]" />
          <button className="w-full text-left py-2 flex items-center justify-between" onClick={() => showToast('Device management')}>
            <span className="text-sm font-semibold text-[#111827]">Manage Devices</span>
            <ChevronDown className="w-4 h-4 text-[#9CA3AF] -rotate-90" />
          </button>
        </div>
      )
    },
    {
      id: 'billing',
      icon: CreditCard,
      title: 'Billing & Payments',
      content: (
        <div className="space-y-4 pt-3 border-t border-[#F3F4F6] mt-3">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
            <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wide">Primary Account</p>
            <p className="text-sm font-bold text-[#111827] mt-1">IDFC Current A/C ending 8892</p>
          </div>
          <button className="btn-secondary w-full justify-center">Manage Payment Methods</button>
        </div>
      )
    },
    {
      id: 'support',
      icon: HelpCircle,
      title: 'Help & Support',
      content: (
        <div className="space-y-4 pt-3 border-t border-[#F3F4F6] mt-3">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1E3A8A]">24/7 Dedicated Support</p>
              <p className="text-[10px] text-[#1E40AF] mt-0.5">Call 1800-419-4332 for immediate assistance.</p>
            </div>
          </div>
          <button className="w-full text-left py-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#111827]">FAQs & Knowledge Base</span>
            <ChevronDown className="w-4 h-4 text-[#9CA3AF] -rotate-90" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
          <p className="text-sm text-[#6B7280] mt-1">Manage your account and preferences.</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {sections.map(section => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;

            return (
              <div key={section.id} className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
                <button 
                  className="w-full px-4 py-4 flex items-center justify-between text-left"
                  onClick={() => setActiveSection(isActive ? null : section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#4B5563]" />
                    </div>
                    <span className="font-bold text-[#111827]">{section.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform ${isActive ? 'rotate-180' : ''}`} />
                </button>
                {isActive && (
                  <div className="px-4 pb-4 animate-fadeIn">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <button 
          className="w-full bg-white border border-[#FCA5A5] text-[#DC2626] rounded-xl py-4 font-semibold text-sm flex justify-center items-center gap-2 shadow-sm"
          onClick={() => showToast('Logging out...')}
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>

      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-slideUp flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
          {toast}
        </div>
      )}
    </div>
  );
}
