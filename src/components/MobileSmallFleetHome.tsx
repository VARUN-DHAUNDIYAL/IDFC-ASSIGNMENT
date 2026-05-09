import { useState } from 'react';
import { 
  Wallet, AlertCircle, TrendingDown, IndianRupee, 
  CheckCircle, RefreshCw, X, Truck, FileText 
} from 'lucide-react';
import { recentTolls } from '@/data/mockData';

// Subset for the requested 4 trucks
const lowBalanceTrucks = [
  { id: '1', rcNumber: 'DL 1C 9999', balance: 120, suggested: 2000, status: 'critical' },
  { id: '2', rcNumber: 'KA 03 CD 7890', balance: 450, suggested: 1000, status: 'low_balance' },
  { id: '3', rcNumber: 'TN 07 EF 3456', balance: 80, suggested: 2000, status: 'critical' },
  { id: '4', rcNumber: 'MH 12 AB 4567', balance: 400, suggested: 3400, status: 'low_balance' },
];

export default function MobileSmallFleetHome() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [rechargeStep, setRechargeStep] = useState(1);

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-5">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">FASTag Fleet Wallet</h1>
          <p className="text-sm text-[#6B7280] mt-1">Manage recharge and tolls for your trucks</p>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FEE2E2] to-transparent opacity-50 rounded-bl-full pointer-events-none" />
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-1.5 mb-2">
            <Wallet className="w-4 h-4 text-[#C1121F]" />
            IDFC FASTag Wallet
          </p>
          <p className="text-3xl font-bold text-[#111827]">₹4,200</p>
          <p className="text-xs text-[#9CA3AF] mt-1">Linked to IDFC Current Account ending 8892</p>
        </div>

        {/* Recharge Alert Card */}
        <div className="bg-[#FEF2F2] rounded-2xl p-5 border border-[#FCA5A5]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-[#991B1B]">Recharge needed for tomorrow</h2>
              <p className="text-2xl font-bold text-[#7F1D1D] mt-1">₹8,400 <span className="text-sm font-medium">required</span></p>
              <p className="text-xs text-[#991B1B] mt-1.5 leading-relaxed">
                4 trucks have low balance. Recharge now to avoid delays at toll plazas.
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div>
          <button 
            className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            onClick={() => { setActiveSheet('recharge'); setRechargeStep(1); }}
          >
            <RefreshCw className="w-4 h-4" />
            Recharge All Trucks
          </button>
          <p className="text-[11px] text-[#6B7280] text-center mt-2 px-4 leading-relaxed">
            One click recharge from your IDFC account. No repeated BBPS entry.
          </p>
        </div>

        {/* Small Stat Row */}
        <div className="flex overflow-x-auto gap-3 pb-1 hide-scrollbar -mx-4 px-4">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 min-w-[120px] shadow-sm flex-shrink-0">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase">Active Trucks</p>
            <p className="text-xl font-bold text-[#111827] mt-1">15</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 min-w-[120px] shadow-sm flex-shrink-0">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase">Low Balance</p>
            <p className="text-xl font-bold text-[#DC2626] mt-1">4</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 min-w-[140px] shadow-sm flex-shrink-0">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase">Today's Spend</p>
            <p className="text-xl font-bold text-[#111827] mt-1">₹8,250</p>
          </div>
        </div>

        {/* Trucks needing recharge */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Trucks needing recharge</h2>
            <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] font-bold px-2 py-0.5 rounded-full">4 trucks</span>
          </div>
          <div className="space-y-3">
            {lowBalanceTrucks.map((truck) => (
              <div key={truck.id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#111827]">{truck.rcNumber}</h3>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                      truck.status === 'critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'
                    }`}>
                      {truck.status === 'critical' ? 'Critical' : 'Low Balance'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B7280]">Balance</p>
                    <p className="font-bold text-[#111827]">₹{truck.balance}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Suggested</p>
                    <p className="text-sm font-bold text-[#111827]">₹{truck.suggested.toLocaleString()}</p>
                  </div>
                  <button className="bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB] px-4 py-2 rounded-lg text-xs font-semibold">
                    Recharge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions (2x2 Grid) */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm active:bg-[#F9FAFB] transition-colors" onClick={() => setActiveSheet('trucks')}>
              <Truck className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">My Trucks</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">15 active trucks</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm active:bg-[#F9FAFB] transition-colors" onClick={() => setActiveSheet('issues')}>
              <AlertCircle className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">Toll Issues</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">2 open disputes</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm active:bg-[#F9FAFB] transition-colors" onClick={() => setActiveSheet('reports')}>
              <FileText className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">Toll Report</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">Download monthly GST</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm active:bg-[#F9FAFB] transition-colors" onClick={() => setActiveSheet('budget')}>
              <IndianRupee className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">Hired Budget</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">Track specific trips</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Recent Toll Deductions</h2>
          <div className="space-y-3">
            {recentTolls.slice(0, 4).map((t, idx) => (
              <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-[#4B5563]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">{t.truck}</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5 line-clamp-1">{t.plaza}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#111827]">-₹{t.amount}</p>
                  <span className="text-[10px] font-medium text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded mt-1 inline-block">
                    Success
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recharge All Trucks Bottom Sheet ── */}
      {activeSheet === 'recharge' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setActiveSheet(null)} />
          <div className="bg-white w-full rounded-t-2xl flex flex-col max-h-[90vh] relative z-10 animate-slideUp">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-base font-bold text-[#111827]">Bulk Recharge</h2>
              <button onClick={() => setActiveSheet(null)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {rechargeStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#6B7280]">Selected trucks</span>
                      <span className="font-semibold text-[#111827]">4 trucks</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B7280]">Total amount</span>
                      <span className="font-bold text-[#111827]">₹8,400</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#374151]">Pay from</label>
                    <div className="border border-[#C1121F] bg-[#FEF2F2] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-[#C1121F]" />
                        <div>
                          <p className="text-sm font-semibold text-[#991B1B]">IDFC Current Account</p>
                          <p className="text-[10px] text-[#DC2626]">Ending 8892</p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-[#C1121F]" />
                    </div>
                  </div>
                </div>
              )}

              {rechargeStep === 2 && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Recharge Successful</h2>
                    <p className="text-sm text-[#6B7280] mt-2 px-4 leading-relaxed">
                      ₹8,400 has been successfully added to 4 FASTag wallets.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Bar */}
            <div className="p-4 border-t border-[#E5E7EB] bg-white pb-safe">
              {rechargeStep === 1 ? (
                <button 
                  className="w-full bg-[#C1121F] text-white rounded-xl py-4 font-semibold text-sm flex items-center justify-center gap-2"
                  onClick={() => setRechargeStep(2)}
                >
                  Confirm Payment — ₹8,400
                </button>
              ) : (
                <button 
                  className="w-full bg-[#F3F4F6] text-[#111827] rounded-xl py-4 font-semibold text-sm"
                  onClick={() => setActiveSheet(null)}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simple placehoder sheets for other quick actions */}
      {['trucks', 'issues', 'reports', 'budget'].includes(activeSheet || '') && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setActiveSheet(null)} />
          <div className="bg-white w-full rounded-t-2xl flex flex-col h-[80vh] relative z-10 animate-slideUp">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-base font-bold text-[#111827] capitalize">{activeSheet}</h2>
              <button onClick={() => setActiveSheet(null)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 flex items-center justify-center text-center">
              <div>
                <p className="text-[#6B7280] mb-4">This section is configured for Enterprise Mode. Enable Enterprise Mode to manage this feature.</p>
                <button className="btn-secondary" onClick={() => setActiveSheet(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
