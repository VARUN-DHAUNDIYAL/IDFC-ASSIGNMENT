import { useState } from 'react';
import { Search, CheckCircle, RefreshCw, Info } from 'lucide-react';
import { vehicleList } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';

export default function MobileOneClickRecharge() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [fundingSource, setFundingSource] = useState('IDFC Current Account ending 8892');
  const [toast, setToast] = useState<string | null>(null);

  const lowBalanceTrucks = vehicleList.filter(
    v => v.status === 'low_balance' || v.status === 'critical'
  );

  const totalAmount = lowBalanceTrucks
    .filter(t => selectedIds.has(t.id))
    .reduce((sum, t) => sum + t.suggestedRecharge, 0);

  const toggleAll = () => {
    if (selectedIds.size === lowBalanceTrucks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(lowBalanceTrucks.map(t => t.id)));
    }
  };

  const toggleTruck = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-40">
      <div className="px-4 py-5 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">One Click Recharge</h1>
          <p className="text-sm text-[#6B7280] mt-1">Recharge fleet from a single IDFC account.</p>
        </div>

        {/* Quick Recharge */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#111827]">Quick Recharge</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Truck Number</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" className="bank-input pl-9" placeholder="Search or enter truck no" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Amount (₹)</label>
              <input type="text" className="bank-input" placeholder="e.g. 2000" />
            </div>
            <button 
              className="btn-secondary w-full justify-center"
              onClick={() => showToast('Quick recharge initiated')}
            >
              Recharge Truck
            </button>
          </div>
        </div>

        {/* Bulk Recharge Header */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5">
          <h2 className="text-base font-bold text-[#111827]">Bulk Recharge</h2>
          <p className="text-xs text-[#6B7280] mt-1 mb-4">
            Based on current balances and selected trucks.
          </p>

          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold text-[#374151] flex items-center gap-1.5">
              Pay from
              <InfoTooltip content="Choose whether this recharge uses IDFC Current Account, FASTag Wallet Balance, or approved IDFC Fleet Credit Limit." />
            </label>
            <select
              className="bank-input"
              value={fundingSource}
              onChange={e => setFundingSource(e.target.value)}
            >
              <option value="IDFC Current Account ending 8892">IDFC Current Account</option>
              <option value="FASTag Wallet Balance">FASTag Wallet Balance</option>
              <option value="IDFC Fleet Credit Limit">IDFC Fleet Credit Limit</option>
            </select>
            {fundingSource === 'IDFC Fleet Credit Limit' && (
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 mt-2 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#1D4ED8] leading-relaxed font-medium">
                  Available only for approved enterprise customers. Approval rules apply.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Low Balance Trucks List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Low Balance Trucks</h2>
            <button onClick={toggleAll} className="text-xs font-semibold text-[#C1121F]">
              {selectedIds.size === lowBalanceTrucks.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="space-y-3">
            {lowBalanceTrucks.map((truck) => {
              const isSelected = selectedIds.has(truck.id);
              return (
                <div 
                  key={truck.id} 
                  className={`bg-white border rounded-xl p-4 shadow-sm transition-colors ${
                    isSelected ? 'border-[#C1121F] bg-[#FEF2F2]/30' : 'border-[#E5E7EB]'
                  }`}
                  onClick={() => toggleTruck(truck.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5 flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#C1121F] border-[#C1121F]' : 'border-[#D1D5DB] bg-white'
                      }`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#111827]">{truck.rcNumber}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          truck.status === 'critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'
                        }`}>
                          {truck.status === 'critical' ? 'Critical' : 'Low Balance'}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{truck.driverName}</p>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F3F4F6]">
                        <div>
                          <p className="text-[10px] text-[#6B7280]">Current Balance</p>
                          <p className="text-sm font-semibold text-[#111827]">₹{truck.balance}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#6B7280]">Suggested Recharge</p>
                          <p className="text-sm font-bold text-[#111827]">₹{truck.suggestedRecharge.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-[#6B7280]">Selected</p>
            <p className="font-bold text-[#111827]">{selectedIds.size} trucks</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">Total Amount</p>
            <p className="text-lg font-bold text-[#111827]">₹{totalAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <button 
          className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
          disabled={selectedIds.size === 0}
          onClick={() => showToast(`Recharging ${selectedIds.size} trucks...`)}
        >
          <RefreshCw className="w-4 h-4" />
          Recharge Selected
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-slideUp">
          {toast}
        </div>
      )}
    </div>
  );
}
