import { useState } from 'react';
import { Search, CheckCircle, RefreshCw, Info, MapPin } from 'lucide-react';
import { vehicleList, tripBudgets } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';

export default function MobileOneClickRecharge() {
  const [filter, setFilter] = useState<'all' | 'own' | 'hired'>('all');
  const [fundingSource, setFundingSource] = useState('IDFC Current Account ending 8892');
  const [toast, setToast] = useState<string | null>(null);

  const ownItems = vehicleList
    .filter(v => v.type === 'own' && (v.status === 'low_balance' || v.status === 'critical'))
    .map(v => ({
      id: v.id,
      rcNumber: v.rcNumber,
      driverName: v.driverName,
      balance: v.balance,
      suggestedRecharge: v.suggestedRecharge,
      status: v.status,
      type: 'own' as const
    }));

  const hiredItems = tripBudgets
    .filter(t => t.status === 'active' || t.status === 'near_limit')
    .map(t => ({
      id: t.tripId,
      rcNumber: t.truckNumber,
      driverName: `${t.from} → ${t.to}`,
      balance: t.remaining,
      suggestedRecharge: t.nextPreload || 2000,
      status: t.status,
      type: 'hired' as const
    }));

  const allItems = [...ownItems, ...hiredItems];
  const displayItems = filter === 'all' ? allItems : filter === 'own' ? ownItems : hiredItems;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(allItems.map(i => i.id))
  );

  const totalOwnAmount = ownItems.reduce((sum, item) => sum + item.suggestedRecharge, 0);
  const totalHiredAmount = hiredItems.reduce((sum, item) => sum + item.suggestedRecharge, 0);
  const overallTotal = totalOwnAmount + totalHiredAmount;

  const totalSelectedAmount = Array.from(selectedIds).reduce((sum, id) => {
    const item = allItems.find(i => i.id === id);
    return sum + (item?.suggestedRecharge ?? 0);
  }, 0);

  const toggleAll = () => {
    const displayIds = displayItems.map(i => i.id);
    const allSelected = displayIds.every(id => selectedIds.has(id));
    
    const next = new Set(selectedIds);
    if (allSelected) {
      displayIds.forEach(id => next.delete(id));
    } else {
      displayIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
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
          <p className="text-sm text-[#6B7280] mt-1">Recharge own trucks and fund hired truck trips from a single IDFC account.</p>
        </div>

        {/* Compact Split Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-[#E5E7EB] border-t-4 border-t-[#111827] rounded-xl p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Own Trucks</p>
            <p className="text-xl font-bold text-[#111827] mt-1">₹{totalOwnAmount.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-[#9CA3AF] mt-0.5">recharge needed</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] border-t-4 border-t-[#6B7280] rounded-xl p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Hired Trucks</p>
            <p className="text-xl font-bold text-[#111827] mt-1">₹{totalHiredAmount.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-[#9CA3AF] mt-0.5">toll budget needed</p>
          </div>
          <div className="col-span-2 bg-[#FEF2F2] border border-[#FCA5A5] border-t-4 border-t-[#C1121F] rounded-xl p-4 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-[10px] font-semibold text-[#991B1B] uppercase tracking-wide">Total Required</p>
              <p className="text-xl font-bold text-[#7F1D1D] mt-0.5">₹{overallTotal.toLocaleString('en-IN')}</p>
            </div>
            <p className="text-xs font-semibold text-[#991B1B] bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#FCA5A5]/50">
              Action Required
            </p>
          </div>
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
            Approve combined recharges for own trucks and budgets for hired trucks.
          </p>

          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold text-[#374151] flex items-center gap-1.5">
              Funding Source
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

        {/* Filters and List */}
        <div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mb-4 -mx-4 px-4">
            {['All', 'Own Trucks', 'Hired Trucks'].map((f) => {
              const val = f.split(' ')[0].toLowerCase() as 'all' | 'own' | 'hired';
              return (
                <button
                  key={f}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    filter === val ? 'bg-[#111827] text-white' : 'bg-white border border-[#E5E7EB] text-[#374151]'
                  }`}
                  onClick={() => setFilter(val)}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Vehicles needing attention</h2>
            <button onClick={toggleAll} className="text-xs font-semibold text-[#C1121F]">
              {displayItems.every(i => selectedIds.has(i.id)) && displayItems.length > 0 ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="space-y-3">
            {displayItems.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl border border-[#E5E7EB]">
                <p className="text-[#6B7280] text-sm">No vehicles found for this filter.</p>
              </div>
            ) : (
              displayItems.map((truck) => {
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
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#111827]">{truck.rcNumber}</h3>
                            <span className={`badge ${truck.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0`}>
                              {truck.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            truck.status === 'critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : 
                            truck.status === 'low_balance' ? 'bg-[#FFFBEB] text-[#D97706]' : 
                            truck.status === 'near_limit' ? 'bg-[#FFFBEB] text-[#D97706]' : 
                            'bg-[#ECFDF5] text-[#059669]'
                          }`}>
                            {truck.status === 'critical' ? 'Critical' : 
                             truck.status === 'low_balance' ? 'Low Balance' : 
                             truck.status === 'near_limit' ? 'Near Limit' : 
                             'Active'}
                          </span>
                        </div>
                        {truck.type === 'hired' ? (
                          <p className="text-[10px] text-[#6B7280] flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {truck.driverName}
                          </p>
                        ) : (
                          <p className="text-[10px] text-[#6B7280] mt-1">{truck.driverName}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F3F4F6]">
                          <div>
                            <p className="text-[10px] text-[#6B7280]">Current Balance</p>
                            <p className="text-sm font-semibold text-[#111827]">₹{truck.balance.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-[#6B7280]">{truck.type === 'own' ? 'Suggested Recharge' : 'Required Budget'}</p>
                            <p className="text-sm font-bold text-[#111827]">₹{truck.suggestedRecharge.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-[#6B7280]">Selected</p>
            <p className="font-bold text-[#111827]">{selectedIds.size} vehicles</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">Total Amount</p>
            <p className="text-lg font-bold text-[#111827]">₹{totalSelectedAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <button 
          className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
          disabled={selectedIds.size === 0}
          onClick={() => showToast(`Recharging ${selectedIds.size} vehicles...`)}
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
