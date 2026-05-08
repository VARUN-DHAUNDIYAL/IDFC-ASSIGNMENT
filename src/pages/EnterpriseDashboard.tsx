import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Wallet, TrendingUp, AlertCircle, MessageSquare,
  CheckCircle, RefreshCw, MapPin,
} from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import { fleetSummary } from '@/data/mockData';

function KpiCard({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="bank-card p-5 bank-card-lift">
      <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 flex items-center">
        {label}
        {label === 'Total Fleet Balance' && (
          <InfoTooltip content="Total usable FASTag balance available across the enterprise fleet." />
        )}
        {label === 'Pending Recharge Actions' && (
          <InfoTooltip content="Vehicles that need recharge approval, retry, or balance top up." />
        )}
      </p>
      <p className={`text-3xl font-bold ${color ?? 'text-[#111827]'}`}>{value}</p>
      {sub && <p className="text-xs text-[#9CA3AF] mt-1">{sub}</p>}
    </div>
  );
}

function ActionCard({ type, title, desc, btn, btnVariant, onAction }: {
  type: 'warning' | 'info' | 'error' | 'critical';
  title: string;
  desc: string;
  btn: string;
  btnVariant?: 'primary' | 'secondary';
  onAction: () => void;
}) {
  const configs = {
    warning: { bg: 'bg-[#FFFBEB]', border: 'border-[#D97706]', iconBg: 'bg-[#FFFBEB]', icon: AlertCircle, iconColor: 'text-[#D97706]' },
    info:    { bg: 'bg-[#EFF6FF]', border: 'border-[#2563EB]', iconBg: 'bg-[#EFF6FF]', icon: MapPin,      iconColor: 'text-[#2563EB]' },
    error:   { bg: 'bg-[#FEF2F2]', border: 'border-[#DC2626]', iconBg: 'bg-[#FEF2F2]', icon: AlertCircle, iconColor: 'text-[#DC2626]' },
    critical:{ bg: 'bg-[#FFF7ED]', border: 'border-[#EA580C]', iconBg: 'bg-[#FFF7ED]', icon: AlertCircle, iconColor: 'text-[#EA580C]' },
  };
  const c = configs[type];
  const Icon = c.icon;
  return (
    <div className={`bank-card p-5 border-l-4 ${c.border} flex items-start gap-4`}>
      <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${c.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#111827]">{title}</p>
        <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{desc}</p>
      </div>
      <button
        onClick={onAction}
        className={btnVariant === 'primary' ? 'btn-primary text-xs flex-shrink-0' : 'btn-secondary text-xs flex-shrink-0'}
      >
        {btn}
      </button>
    </div>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none">×</button>
    </div>
  );
}

export default function EnterpriseDashboard() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const spendData = [
    { label: 'Mon', value: 38000 },
    { label: 'Tue', value: 42300 },
    { label: 'Wed', value: 35900 },
    { label: 'Thu', value: 44100 },
    { label: 'Fri', value: 39800 },
    { label: 'Sat', value: 28500 },
    { label: 'Sun', value: 21000 },
  ];
  const maxVal = Math.max(...spendData.map(d => d.value));

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Fleet overview for today</p>
        </div>
        <button
          className="btn-primary text-sm"
          onClick={() => navigate('/enterprise/recharge')}
        >
          <RefreshCw className="w-4 h-4" />
          One Click Recharge
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Fleet Balance"
          value="₹18,50,000"
          sub="Across 142 trucks"
        />
        <KpiCard
          label="Today's Toll Spend"
          value={`₹${fleetSummary.todayTollSpend.toLocaleString('en-IN')}`}
          sub="Updated 5 min ago"
        />
        <KpiCard
          label="Pending Recharge Actions"
          value={`${fleetSummary.pendingRechargeActions}`}
          sub="Trucks need recharge"
          color="text-[#D97706]"
        />
        <KpiCard
          label="Open Disputes"
          value={`${fleetSummary.openDisputes}`}
          sub="Across all trucks"
          color="text-[#DC2626]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Required */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#111827] flex items-center">
              Action Required
              <InfoTooltip content="Only trucks needing attention are shown here, so large fleets do not become overwhelming." />
            </h2>
            <span className="badge badge-error text-xs">4 items</span>
          </div>
          <div className="space-y-3">
            <ActionCard
              type="warning"
              title="Low Balance — DL 1C 9999"
              desc="This truck has ₹120 balance and may get blocked at the next toll plaza. Suggested recharge: ₹2,000."
              btn="Recharge Now"
              btnVariant="primary"
              onAction={() => showToast('Recharge request submitted for DL 1C 9999')}
            />
            <ActionCard
              type="info"
              title="Location Mismatch — MH 04 1234"
              desc="This truck was charged at Plaza B but the location data does not match the vehicle's position."
              btn="Review Dispute"
              onAction={() => navigate('/enterprise/disputes')}
            />
            <ActionCard
              type="critical"
              title="KYC Issue — HR 26 8888"
              desc="This truck has a previous tag conflict. Upload the updated RC document to unblock the FASTag."
              btn="Upload RC"
              onAction={() => showToast('Please upload the RC document for HR 26 8888')}
            />
            <ActionCard
              type="error"
              title="Failed Recharge — 2 Trucks"
              desc="Bulk recharge failed for DL 1C 9999 and TN 07 EF 3456 due to a bank timeout. Retry is available."
              btn="Retry"
              onAction={() => showToast('Retry recharge submitted successfully')}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recharge Funding */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#111827] flex items-center">
              Recharge Funding
              <InfoTooltip content="Shows available wallet balance and approved IDFC funding options for enterprise recharges." />
            </h2>
            <div className="bank-card p-5">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide mb-1">Available IDFC Fleet Credit</p>
                  <p className="text-2xl font-bold text-[#111827]">₹12,00,000</p>
                </div>
                <div className="flex justify-between border-t border-[#F3F4F6] pt-3 mt-3">
                  <span className="text-sm text-[#6B7280]">Used This Month</span>
                  <span className="text-sm font-semibold text-[#111827]">₹3,80,000</span>
                </div>
                <div className="flex justify-between border-t border-[#F3F4F6] pt-3">
                  <span className="text-sm text-[#6B7280]">Wallet Balance</span>
                  <span className="text-sm font-semibold text-[#111827]">₹18,50,000</span>
                </div>
              </div>
              <p className="text-[11px] text-[#6B7280] mt-4 leading-relaxed bg-[#F9FAFB] p-2 rounded-lg border border-[#F3F4F6]">
                Use wallet balance or approved IDFC credit for fleet recharges.
              </p>
            </div>
          </div>

          {/* Spend Summary */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">Spend Summary</h2>
          <div className="bank-card p-5">
            {/* Tabs */}
            <div className="flex bg-[#F3F4F6] rounded-lg p-1 mb-5">
              {['Today', 'This Week', 'This Month'].map((tab, i) => (
                <button
                  key={tab}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                    i === 1 ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-28 mb-3">
              {spendData.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-[#FEE2E2] rounded-t-sm transition-all"
                    style={{ height: `${(d.value / maxVal) * 96}px` }}
                  >
                    <div
                      className="w-full bg-[#C1121F] rounded-t-sm h-full opacity-80"
                      style={{ opacity: d.label === 'Tue' ? 1 : 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-1.5">
              {spendData.map((d) => (
                <div key={d.label} className="flex-1 text-center text-[10px] text-[#9CA3AF]">{d.label}</div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#F3F4F6] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">This week</span>
                <span className="font-semibold text-[#111827]">₹2,49,600</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">This month</span>
                <span className="font-semibold text-[#111827]">₹9,82,400</span>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div className="bank-card p-4 space-y-2">
            <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">Quick Links</p>
            {[
              { label: 'View Fleet Roster', path: '/enterprise/fleet', icon: Wallet },
              { label: 'GST Reports', path: '/enterprise/gst', icon: TrendingUp },
              { label: 'All Disputes', path: '/enterprise/disputes', icon: MessageSquare },
            ].map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F9FAFB] transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-sm text-[#374151]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
