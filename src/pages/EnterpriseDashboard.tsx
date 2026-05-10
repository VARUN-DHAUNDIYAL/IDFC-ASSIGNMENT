import { useState } from 'react';

import {
  AlertCircle,
  CheckCircle, RefreshCw, MapPin,
} from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import MobileEnterpriseDashboard from '@/components/MobileEnterpriseDashboard';
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

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none">×</button>
    </div>
  );
}

function DashboardSection() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };



  return (
    <>
      <div className="block md:hidden">
        <MobileEnterpriseDashboard />
      </div>
      <div className="hidden md:block space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Dashboard</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Fleet overview for today</p>
          </div>
          <button
            className="btn-primary text-sm"
            onClick={() => {
              const element = document.getElementById('one-click-recharge');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <RefreshCw className="w-4 h-4" />
            One Click Recharge
          </button>
        </div>

        {/* SECTION 1: Today’s Action Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">Today’s Action Queue</h2>
              <p className="text-xs text-[#6B7280]">Items that need operator attention before trucks move.</p>
            </div>
            <span className="badge badge-error text-xs">5 items</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* 1. Failed Recharge */}
            <div className="bank-card p-4 border-l-4 border-[#DC2626] flex flex-col justify-between h-full gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Failed Recharge</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Bulk recharge failed for 2 trucks.</p>
                </div>
              </div>
              <button className="btn-secondary text-xs w-full justify-center" onClick={() => showToast('Retry initiated for failed recharge.')}>Retry</button>
            </div>

            {/* 2. Low Balance */}
            <div className="bank-card p-4 border-l-4 border-[#D97706] flex flex-col justify-between h-full gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-[#D97706]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#111827]">Low Balance</p>
                    <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">Truck DL 1C 9999 has ₹120 balance. Suggested recharge ₹2,000.</p>
                </div>
              </div>
              <button className="btn-primary text-xs w-full justify-center" onClick={() => {
                const element = document.getElementById('one-click-recharge');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>Recharge Now</button>
            </div>

            {/* 3. KYC Issue */}
            <div className="bank-card p-4 border-l-4 border-[#DC2626] flex flex-col justify-between h-full gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#111827]">KYC Issue</p>
                    <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">Truck HR 26 8888 has a previous tag conflict.</p>
                </div>
              </div>
              <button className="btn-secondary text-xs w-full justify-center" onClick={() => showToast('Please upload the RC document for HR 26 8888')}>Upload RC</button>
            </div>

            {/* 4. Toll Issue Pending */}
            <div className="bank-card p-4 border-l-4 border-[#D97706] flex flex-col justify-between h-full gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-[#D97706]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Toll Issue Pending</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Evidence required for double deduction or wrong toll charge.</p>
                </div>
              </div>
              <button className="btn-secondary text-xs w-full justify-center" onClick={() => {
                const element = document.getElementById('disputes');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>Review</button>
            </div>

            {/* 5. Hired Trip Near Budget */}
            <div className="bank-card p-4 border-l-4 border-[#2563EB] flex flex-col justify-between h-full gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#111827]">Hired Trip Near Budget</p>
                    <span className="badge badge-gray text-[10px] px-1.5 py-0">Hired Truck</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">2 hired truck trips are close to toll budget limit.</p>
                </div>
              </div>
              <button className="btn-secondary text-xs w-full justify-center" onClick={() => {
                const element = document.getElementById('trip-toll-budget');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>View Budget</button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Fleet Coverage & SECTION 3: Recharge Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          {/* Snapshot */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">Fleet Coverage</h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="bank-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Own Trucks</p>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">186 active · 24 need recharge, 8 need attention</p>
                </div>
                <button className="btn-secondary text-[11px] px-3 py-1.5" onClick={() => {
                  const element = document.getElementById('fleet-roster');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>View Own Trucks</button>
              </div>
              <div className="bank-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Hired Trucks</p>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">42 active trips · 6 trips need budget review</p>
                </div>
                <button className="btn-secondary text-[11px] px-3 py-1.5" onClick={() => {
                  const element = document.getElementById('fleet-roster');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>View Hired Trucks</button>
              </div>
              <div className="bank-card p-4 flex items-center justify-between bg-[#F9FAFB]">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Total Fleet Tracked</p>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">228 active · 30 need attention today</p>
                </div>
                <button className="btn-secondary text-[11px] px-3 py-1.5 bg-white" onClick={() => {
                  const element = document.getElementById('fleet-roster');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>View Fleet Roster</button>
              </div>
            </div>
          </div>

          {/* Readiness */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">Recharge Readiness</h2>
              <button className="btn-secondary text-xs" onClick={() => {
                const element = document.getElementById('one-click-recharge');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>Review Recharge Plan</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bank-card p-5 border-t-4 border-t-[#111827]">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Own Truck Recharge Need</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">₹54,000 <span className="text-sm font-normal text-[#6B7280]">needed today</span></p>
                <p className="text-xs text-[#9CA3AF] mt-1">For own trucks with low FASTag balance.</p>
              </div>
              <div className="bank-card p-5 border-t-4 border-t-[#6B7280]">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Hired Truck Toll Budget Need</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">₹18,400 <span className="text-sm font-normal text-[#6B7280]">needed today</span></p>
                <p className="text-xs text-[#9CA3AF] mt-1">For active hired truck trips with low remaining toll budget.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Spend Summary */}
        <div className="pt-4 space-y-4">
          <h2 className="text-base font-semibold text-[#111827]">Spend Summary</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="Total Fleet Balance" value="₹18,50,000" sub="Across 228 trucks" />
            <KpiCard label="Today's Toll Spend" value={`₹${fleetSummary.todayTollSpend.toLocaleString('en-IN')}`} sub="Updated 5 min ago" />
            <KpiCard label="Pending Recharge Actions" value="30" sub="Trucks need recharge" color="text-[#D97706]" />
            <KpiCard label="Open Toll Issues" value={`${fleetSummary.openDisputes}`} sub="Across all trucks" color="text-[#DC2626]" />
          </div>
        </div>

        {/* SECTION 5: Recent Activity */}
        <div className="bank-card p-5">
          <h2 className="text-sm font-semibold text-[#111827] mb-3">Recent Activity</h2>
          <div className="space-y-0 divide-y divide-[#F9FAFB]">
            {[
              { action: 'Bulk recharge approved — 14 trucks, ₹28,000', by: 'Fleet Owner', time: 'Today · 09:14 AM' },
              { action: 'Auto recharge rule triggered for 4 trucks', by: 'System', time: 'Today · 07:30 AM' },
              { action: 'Toll issue evidence uploaded — DISP-001', by: 'Operations Manager', time: 'Yesterday · 04:45 PM' },
              { action: 'GST report downloaded — April 2026', by: 'Finance Manager', time: 'Yesterday · 11:20 AM' },
            ].map((entry, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB] mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#111827]">{entry.action}</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">{entry.by} · {entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}

export default function EnterpriseDashboard() {
  return (
    <div className="flex flex-col space-y-24 pb-32">
      <section id="dashboard" className="scroll-mt-8 relative">
        <DashboardSection />
      </section>
    </div>
  );
}
