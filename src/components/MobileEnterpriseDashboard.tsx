import { useState } from 'react';
import { 
  Wallet, TrendingUp, AlertCircle, MessageSquare, 
  MapPin, RefreshCw, AlertTriangle
} from 'lucide-react';
import { fleetSummary } from '@/data/mockData';

export default function MobileEnterpriseDashboard() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-sm text-[#6B7280] mt-1">Enterprise Fleet Overview</p>
        </div>

        {/* SECTION 1: Today's Work Queue */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Today's Work Queue</h2>
            <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] font-bold px-2 py-0.5 rounded-full">6 items</span>
          </div>
          
          <div className="space-y-3">
            {/* 1. Failed Recharge */}
            <div className="bg-white border border-[#FCA5A5] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">Failed Recharge</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Bulk recharge failed for 2 trucks.</p>
                  <button className="mt-3 w-full bg-[#FEF2F2] text-[#DC2626] py-2 rounded-lg text-xs font-bold" onClick={() => showToast('Retry initiated for failed recharge.')}>
                    Retry
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Low Balance */}
            <div className="bg-white border border-[#FCD34D] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-[#D97706]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#111827]">Low Balance</h3>
                    <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">Truck DL 1C 9999 has ₹120 balance. Suggested recharge ₹2,000.</p>
                  <button className="mt-3 w-full bg-[#C1121F] text-white py-2 rounded-lg text-xs font-bold" onClick={() => {
                    const element = document.getElementById('one-click-recharge');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Recharge Now
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Pending Approval */}
            <div className="bg-white border border-[#FCD34D] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#D97706]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">Pending Approval</h3>
                  <p className="text-xs text-[#6B7280] mt-1">₹18,400 recharge request needs finance approval.</p>
                  <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => {
                    const element = document.getElementById('settings');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Review Approval
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Hired Truck Budget Review */}
            <div className="bg-white border border-[#BFDBFE] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#111827]">Hired Truck Budget Review</h3>
                    <span className="badge badge-gray text-[10px] px-1.5 py-0">Hired Truck</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">6 hired truck trips may need additional toll budget today.</p>
                  <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => {
                    const element = document.getElementById('trip-toll-budget');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Review Budgets
                  </button>
                </div>
              </div>
            </div>

            {/* 5. KYC Issue */}
            <div className="bg-white border border-[#FCA5A5] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#111827]">KYC Issue</h3>
                    <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">Truck HR 26 8888 has a previous tag conflict.</p>
                  <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => showToast('Please upload the RC document for HR 26 8888')}>
                    Upload RC
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Location Mismatch */}
            <div className="bg-white border border-[#BFDBFE] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">Location Mismatch</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Truck MH 04 1234 was charged at Plaza B but location data does not match.</p>
                  <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => {
                    const element = document.getElementById('disputes');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Review Dispute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Fleet Coverage Snapshot */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Fleet Coverage Snapshot</h2>
          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar -mx-4 px-4 snap-x">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm min-w-[240px] snap-start">
              <h3 className="font-bold text-[#111827]">Own Trucks</h3>
              <p className="text-sm text-[#6B7280] mt-1">186 active</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">24 need recharge, 8 need attention</p>
              <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => {
                const element = document.getElementById('fleet-roster');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>View Own Trucks</button>
            </div>
            
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm min-w-[240px] snap-start">
              <h3 className="font-bold text-[#111827]">Hired Trucks</h3>
              <p className="text-sm text-[#6B7280] mt-1">42 active trips</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">6 trips need budget review</p>
              <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => {
                const element = document.getElementById('fleet-roster');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>View Hired Trucks</button>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm min-w-[240px] snap-start">
              <h3 className="font-bold text-[#111827]">Total Vehicles Under Control</h3>
              <p className="text-sm text-[#6B7280] mt-1">228 active</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">30 need attention today</p>
              <button className="mt-3 w-full bg-[#F3F4F6] text-[#374151] py-2 rounded-lg text-xs font-bold" onClick={() => {
                const element = document.getElementById('fleet-roster');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>View Fleet Roster</button>
            </div>
          </div>
        </div>

        {/* SECTION 3: Recharge Readiness */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Recharge Readiness</h2>
          <div className="space-y-3">
            <div className="bg-white border border-[#E5E7EB] border-t-4 border-t-[#111827] rounded-xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Own Truck Recharge Need</p>
              <p className="text-xl font-bold text-[#111827] mt-1">₹54,000 <span className="text-xs font-normal text-[#6B7280]">needed today</span></p>
              <p className="text-xs text-[#9CA3AF] mt-1">For own trucks with low FASTag balance.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] border-t-4 border-t-[#6B7280] rounded-xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Hired Truck Toll Budget Need</p>
              <p className="text-xl font-bold text-[#111827] mt-1">₹18,400 <span className="text-xs font-normal text-[#6B7280]">needed today</span></p>
              <p className="text-xs text-[#9CA3AF] mt-1">For active hired truck trips with low remaining toll budget.</p>
            </div>
            <button className="w-full bg-[#C1121F] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2" onClick={() => {
              const element = document.getElementById('one-click-recharge');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
              Review Recharge Plan
            </button>
          </div>
        </div>

        {/* SECTION 4: KPI Cards Stack */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Key Metrics</h2>
          <div className="space-y-3">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <Wallet className="w-4 h-4 text-[#C1121F]" />
                Total Fleet Balance
              </p>
              <p className="text-3xl font-bold text-[#111827]">₹{fleetSummary.totalBalance.toLocaleString('en-IN')}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Across 228 trucks</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-4 h-4 text-[#C1121F]" />
                Today's Toll Spend
              </p>
              <p className="text-3xl font-bold text-[#111827]">₹{fleetSummary.todayTollSpend.toLocaleString('en-IN')}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Updated 5 min ago</p>
            </div>

            <div className="flex gap-3">
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-4 shadow-sm flex-1">
                <p className="text-[10px] font-semibold text-[#991B1B] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                  Pending Recharge
                </p>
                <p className="text-2xl font-bold text-[#7F1D1D]">30</p>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex-1">
                <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#6B7280]" />
                  Open Disputes
                </p>
                <p className="text-2xl font-bold text-[#111827]">{fleetSummary.openDisputes}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-slideUp">
          {toast}
        </div>
      )}
    </div>
  );
}
