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

        {/* Top KPI Cards Stack */}
        <div className="space-y-3">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <Wallet className="w-4 h-4 text-[#C1121F]" />
              Total Fleet Balance
            </p>
            <p className="text-3xl font-bold text-[#111827]">₹{fleetSummary.totalBalance.toLocaleString('en-IN')}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">Usable FASTag balance across fleet</p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-[#C1121F]" />
              Today's Toll Spend
            </p>
            <p className="text-3xl font-bold text-[#111827]">₹{fleetSummary.todayTollSpend.toLocaleString('en-IN')}</p>
          </div>

          <div className="flex gap-3">
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-4 shadow-sm flex-1">
              <p className="text-[10px] font-semibold text-[#991B1B] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                Pending Recharge
              </p>
              <p className="text-2xl font-bold text-[#7F1D1D]">{fleetSummary.pendingRechargeActions}</p>
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

        {/* Recharge Funding */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Recharge Funding</h2>
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-[#1E40AF] uppercase tracking-wide mb-2">
              Available Fleet Credit
            </p>
            <p className="text-2xl font-bold text-[#1E3A8A]">₹12,00,000</p>
            <div className="mt-3 pt-3 border-t border-[#BFDBFE]/50 flex justify-between text-sm">
              <span className="text-[#1D4ED8]">Wallet Balance</span>
              <span className="font-semibold text-[#1D4ED8]">₹18,50,000</span>
            </div>
          </div>
        </div>

        {/* Action Required Alert Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Action Required</h2>
            <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] font-bold px-2 py-0.5 rounded-full">4 items</span>
          </div>
          
          <div className="space-y-3">
            {/* Low Balance */}
            <div className="bg-white border border-[#FCA5A5] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">Low Balance</h3>
                  <p className="text-sm font-semibold text-[#991B1B] mt-0.5">DL 1C 9999</p>
                  <p className="text-xs text-[#6B7280] mt-1">Balance ₹120. Needs immediate top up.</p>
                  <button className="mt-3 w-full bg-[#FEF2F2] text-[#DC2626] py-2 rounded-lg text-xs font-bold" onClick={() => showToast('Recharge initiated')}>
                    Recharge Truck
                  </button>
                </div>
              </div>
            </div>

            {/* Location Mismatch */}
            <div className="bg-white border border-[#FCD34D] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#D97706]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">Location Mismatch</h3>
                  <p className="text-sm font-semibold text-[#D97706] mt-0.5">MH 12 AB 4567</p>
                  <p className="text-xs text-[#6B7280] mt-1">Toll deducted in Mumbai, GPS shows Pune.</p>
                  <button className="mt-3 w-full bg-[#FFFBEB] text-[#D97706] py-2 rounded-lg text-xs font-bold" onClick={() => showToast('Dispute raised')}>
                    Raise Dispute
                  </button>
                </div>
              </div>
            </div>

            {/* KYC Issue */}
            <div className="bg-white border border-[#FCA5A5] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">KYC Issue</h3>
                  <p className="text-sm font-semibold text-[#991B1B] mt-0.5">KA 03 CD 7890</p>
                  <p className="text-xs text-[#6B7280] mt-1">RC document verification failed.</p>
                  <button className="mt-3 w-full bg-[#FEF2F2] text-[#DC2626] py-2 rounded-lg text-xs font-bold" onClick={() => showToast('Redirecting to upload')}>
                    Upload Document
                  </button>
                </div>
              </div>
            </div>

            {/* Failed Recharge */}
            <div className="bg-white border border-[#FCA5A5] rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#111827]">Failed Recharge</h3>
                  <p className="text-sm font-semibold text-[#991B1B] mt-0.5">TN 07 EF 3456</p>
                  <p className="text-xs text-[#6B7280] mt-1">Auto recharge of ₹2,000 failed.</p>
                  <button className="mt-3 w-full bg-[#FEF2F2] text-[#DC2626] py-2 rounded-lg text-xs font-bold" onClick={() => showToast('Retrying recharge')}>
                    Retry Recharge
                  </button>
                </div>
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
