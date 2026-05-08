import { useState } from 'react';
import { CheckCircle, User, Users, Briefcase, Headphones, Bell, Shield, CreditCard, ClipboardList } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import { auditLog } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

function SectionCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bank-card p-6 space-y-4">
      <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
      {children}
    </div>
  );
}

const roles = [
  {
    icon: User,
    title: 'Fleet Owner',
    desc: 'Can recharge trucks, approve budgets, edit all rules, and approve credit funded recharges.',
    color: 'text-[#C1121F]',
    bg: 'bg-[#FEF2F2]',
  },
  {
    icon: Briefcase,
    title: 'Finance Manager',
    desc: 'Can view credit funded recharge history, download GST reports, and export data.',
    color: 'text-[#2563EB]',
    bg: 'bg-[#EFF6FF]',
  },
  {
    icon: Users,
    title: 'Operations Manager',
    desc: 'Can manage trucks, request recharge, handle disputes, but cannot change credit limits.',
    color: 'text-[#D97706]',
    bg: 'bg-[#FFFBEB]',
  },
  {
    icon: Headphones,
    title: 'Viewer',
    desc: 'Can only view dashboard and reports.',
    color: 'text-[#16A34A]',
    bg: 'bg-[#F0FDF4]',
  },
];

const approvalRules = [
  { label: 'Require approval for recharge above', value: '₹5,000', enabled: true },
  { label: 'Require approval for credit funded recharge above', value: '₹5,000', enabled: true },
  { label: 'Require approval for hired truck budget above', value: '₹10,000', enabled: true },
  { label: 'Send alerts for failed recharge', value: '', enabled: true },
  { label: 'Send alerts for low balance', value: '', enabled: true },
];

export default function Settings() {
  const [toggles, setToggles] = useState([true, true, true, true]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const toggle = (i: number) => {
    const next = [...toggles];
    next[i] = !next[i];
    setToggles(next);
    showToast('Setting updated');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Settings</h1>
        <p className="text-sm text-[#6B7280] mt-0.5">Manage roles, approval rules, accounts, and notifications.</p>
      </div>

      {/* User Roles */}
      <SectionCard title={
        <span className="flex items-center">
          User Roles
          <InfoTooltip content="Control what each team member can view, recharge, approve, or download." />
        </span>
      }>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="flex items-start gap-3 p-4 border border-[#F3F4F6] rounded-xl">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">{title}</p>
                <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn-secondary text-sm"
          onClick={() => showToast('Role management opened')}
        >
          <Users className="w-4 h-4" />
          Manage Roles
        </button>
      </SectionCard>

      {/* Approval Rules */}
      <SectionCard title={
        <span className="flex items-center">
          Approval Rules
          <InfoTooltip content="Set when a recharge, hired truck budget, or credit funded action needs approval." />
        </span>
      }>
        <div className="space-y-3">
          {approvalRules.map((rule, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-[#F9FAFB] last:border-0">
              <button
                onClick={() => toggle(i)}
                className={`toggle-track flex-shrink-0 ${toggles[i] ? 'bg-[#C1121F]' : 'bg-[#D1D5DB]'}`}
              >
                <div className={`toggle-thumb ${toggles[i] ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
              </button>
              <div className="flex-1">
                <p className="text-sm text-[#111827]">{rule.label}</p>
              </div>
              {rule.value && (
                <span className="text-sm font-bold text-[#111827] flex-shrink-0">{rule.value}</span>
              )}
            </div>
          ))}
        </div>
        <button
          className="btn-primary text-sm"
          onClick={() => showToast('Approval rules saved')}
        >
          <CheckCircle className="w-4 h-4" />
          Save Rules
        </button>
      </SectionCard>

      {/* Linked Bank Accounts */}
      <SectionCard title={
        <span className="flex items-center">
          Linked Bank Accounts
          <InfoTooltip content="Manage the IDFC accounts used for wallet funding and recharge payments." />
        </span>
      }>
        <div className="border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[#C1121F]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#111827]">IDFC FIRST Current Account</p>
            <p className="text-xs text-[#6B7280]">Account ending ···8892 · Primary recharge source</p>
          </div>
          <span className="badge badge-success">Active</span>
        </div>
        <button className="btn-secondary text-sm" onClick={() => showToast('Add bank account form opened')}>
          <CreditCard className="w-4 h-4" />
          Add Account
        </button>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Notification Preferences">
        <div className="space-y-3">
          {[
            { label: 'Low balance alerts', sub: 'Get notified when a truck balance falls below threshold' },
            { label: 'Recharge confirmations', sub: 'Receive SMS and email for every recharge' },
            { label: 'Dispute updates', sub: 'Get notified when your dispute status changes' },
            { label: 'GST report ready', sub: 'Get notified when monthly reports are generated' },
          ].map((n, i) => (
            <div key={i} className="flex items-start gap-4 py-2 border-b border-[#F9FAFB] last:border-0">
              <Bell className="w-4 h-4 text-[#9CA3AF] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#111827]">{n.label}</p>
                <p className="text-xs text-[#6B7280]">{n.sub}</p>
              </div>
              <button
                onClick={() => showToast(`${n.label} preference updated`)}
                className="toggle-track bg-[#C1121F] flex-shrink-0"
              >
                <div className="toggle-thumb translate-x-[22px]" />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Audit Log */}
      <SectionCard title={
        <span className="flex items-center">
          Audit Log
          <InfoTooltip content="Shows recent important actions such as recharge approvals, rule changes, and report downloads." />
        </span>
      }>
        <div className="space-y-0">
          {auditLog.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 py-3 border-b border-[#F9FAFB] last:border-0">
              <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                <ClipboardList className="w-3.5 h-3.5 text-[#6B7280]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#111827]">{entry.action}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{entry.performedBy} · {entry.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-secondary text-sm" onClick={() => showToast('Full audit log exported')}>
          <Shield className="w-4 h-4" />
          Export Full Audit Log
        </button>
      </SectionCard>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
