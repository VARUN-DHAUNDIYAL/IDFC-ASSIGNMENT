import { useState } from 'react';
import { Search, CheckCircle, RefreshCw, MapPin } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import MobileOneClickRecharge from '@/components/MobileOneClickRecharge';
import { vehicleList, tripBudgets } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight z-[100]">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

export default function OneClickRecharge() {
  const [filter, setFilter] = useState<'all' | 'own' | 'hired'>('all');
  const [singleTruck, setSingleTruck] = useState('');
  const [singleAmount, setSingleAmount] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [fundingSource, setFundingSource] = useState('IDFC Current Account');

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

  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };


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

  const totalSelectedAmount = Array.from(selectedIds).reduce((sum, id) => {
    const item = allItems.find(i => i.id === id);
    return sum + (item?.suggestedRecharge ?? 0);
  }, 0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const statusLabel = (status: string, type: 'own' | 'hired') => {
    if (type === 'own') {
      if (status === 'critical') return <span className="badge badge-error">Critical</span>;
      if (status === 'low_balance') return <span className="badge badge-warning">Low Balance</span>;
    } else {
      if (status === 'near_limit') return <span className="badge badge-warning">Near Limit</span>;
      if (status === 'active') return <span className="badge badge-success">Active Trip</span>;
    }
    return <span className="badge badge-success">Active</span>;
  };

  return (
    <>
      <div className="block md:hidden">
        <MobileOneClickRecharge />
      </div>
      <div className="hidden md:block space-y-6 animate-fadeIn pb-28">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#111827] flex items-center">
          One Click Recharge
          <InfoTooltip content="Recharge own trucks and fund hired truck trips from one IDFC account." />
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Recharge own trucks and fund hired truck trips from a single IDFC account.
        </p>
      </div>

      {/* Compact Split Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bank-card p-4 border-t-4 border-t-[#111827]">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Own Trucks</p>
          <p className="text-xl font-bold text-[#111827] mt-1">₹{totalOwnAmount.toLocaleString('en-IN')}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">recharge needed</p>
        </div>
        <div className="bank-card p-4 border-t-4 border-t-[#6B7280]">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Hired Trucks</p>
          <p className="text-xl font-bold text-[#111827] mt-1">₹{totalHiredAmount.toLocaleString('en-IN')}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">toll budget needed</p>
        </div>
        <div className="bank-card p-4 border-t-4 border-t-[#C1121F] bg-[#FEF2F2]">
          <p className="text-[10px] font-semibold text-[#991B1B] uppercase tracking-wide">Total</p>
          <p className="text-xl font-bold text-[#7F1D1D] mt-1">₹{overallTotal.toLocaleString('en-IN')}</p>
          <p className="text-xs text-[#991B1B] mt-0.5">action required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Quick Recharge — single truck */}
        <div className="bank-card p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-[#111827]">Quick Recharge</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">Recharge a specific truck right now</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Truck Number</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  className="bank-input pl-9"
                  placeholder="e.g. MH 04 1234"
                  value={singleTruck}
                  onChange={e => setSingleTruck(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Recharge Amount (₹)</label>
              <input
                className="bank-input"
                placeholder="e.g. 2000"
                value={singleAmount}
                onChange={e => setSingleAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn-primary w-full justify-center"
            onClick={() => {
              if (singleTruck && singleAmount) {
                showToast(`Recharge of ₹${singleAmount} submitted for ${singleTruck}`);
                setSingleTruck(''); setSingleAmount('');
              }
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Recharge Truck
          </button>
        </div>

        {/* Bulk Recharge summary */}
        <div className="bank-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-[#111827] flex items-center">
                Bulk Recharge
                <InfoTooltip content="Approve combined recharges for own trucks and budgets for hired trucks." />
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Based on current balances and selected trucks</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-2 border border-[#E5E7EB]">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Selected vehicles</span>
                <span className="font-semibold text-[#111827]">{selectedIds.size} trucks/trips</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Total recharge amount</span>
                <span className="font-bold text-[#111827]">
                  ₹{totalSelectedAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-[#374151]">
                Funding Source
                <InfoTooltip content="Choose whether this recharge uses IDFC Current Account, FASTag Wallet Balance, or approved IDFC Fleet Credit Limit." />
              </label>
              <select
                className="bank-input"
                value={fundingSource}
                onChange={e => setFundingSource(e.target.value)}
              >
                <option value="IDFC Current Account">IDFC Current Account</option>
                <option value="FASTag Wallet">FASTag Wallet</option>
                <option value="IDFC Fleet Credit Limit">IDFC Fleet Credit Limit</option>
              </select>
            </div>

            {fundingSource === 'IDFC Fleet Credit Limit' && (
              <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#BFDBFE] space-y-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1E40AF] flex items-center">
                    Available Credit
                  </span>
                  <span className="font-semibold text-[#1E40AF]">₹12,00,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1E40AF]">Selected Recharge Amount</span>
                  <span className="font-semibold text-[#1E40AF]">₹{totalSelectedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#BFDBFE]">
                  <span className="text-[#1E40AF] font-medium">Remaining Credit After Recharge</span>
                  <span className="font-bold text-[#1E40AF]">
                    ₹{(1200000 - totalSelectedAmount).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-[#1D4ED8] mt-2 leading-relaxed bg-white/50 p-2 rounded border border-[#BFDBFE]/50">
                  Available only for approved enterprise customers. Company approval rules apply.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <button
              className="btn-primary w-full justify-center"
              onClick={() => showToast(`Recharge submitted successfully`)}
              disabled={selectedIds.size === 0}
            >
              <RefreshCw className="w-4 h-4" />
              Approve and Recharge Selected
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {['All', 'Own Trucks', 'Hired Trucks'].map((f) => {
            const val = f.split(' ')[0].toLowerCase() as 'all' | 'own' | 'hired';
            return (
              <button
                key={f}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === val ? 'bg-[#111827] text-white' : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]'
                }`}
                onClick={() => setFilter(val)}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="bank-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center gap-3">
            <button
              onClick={toggleAll}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                displayItems.every(i => selectedIds.has(i.id)) && displayItems.length > 0
                  ? 'bg-[#C1121F] border-[#C1121F]'
                  : 'border-[#D1D5DB] hover:border-[#9CA3AF]'
              }`}
            >
              {displayItems.every(i => selectedIds.has(i.id)) && displayItems.length > 0 && (
                <CheckCircle className="w-3 h-3 text-white" />
              )}
            </button>
            <h2 className="text-sm font-semibold text-[#111827]">Vehicles needing attention</h2>
            <span className="badge badge-gray ml-auto">{displayItems.length} items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="bank-table">
              <thead>
                <tr>
                  <th className="w-10"></th>
                  <th>Truck / Trip</th>
                  <th>Current Balance</th>
                  <th>Action Required</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-[#6B7280] text-sm">
                      No vehicles found for this filter.
                    </td>
                  </tr>
                ) : (
                  displayItems.map((v) => (
                    <tr
                      key={v.id}
                      className="cursor-pointer"
                      onClick={() => toggle(v.id)}
                    >
                      <td>
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                          selectedIds.has(v.id)
                            ? 'bg-[#C1121F] border-[#C1121F]'
                            : 'border-[#D1D5DB]'
                        }`}>
                          {selectedIds.has(v.id) && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#111827]">{v.rcNumber}</p>
                          <span className={`badge ${v.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0`}>
                            {v.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                          </span>
                        </div>
                        {v.type === 'hired' ? (
                          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" /> {v.driverName}
                          </p>
                        ) : (
                          <p className="text-[11px] text-[#9CA3AF] mt-0.5">{v.driverName}</p>
                        )}
                      </td>
                      <td className="font-medium text-[#111827]">
                        {v.type === 'own' && v.balance < 500 ? (
                          <span className="text-[#DC2626]">₹{v.balance.toLocaleString('en-IN')}</span>
                        ) : (
                          <span>₹{v.balance.toLocaleString('en-IN')}</span>
                        )}
                      </td>
                      <td className="font-semibold text-[#111827]">
                        ₹{v.suggestedRecharge.toLocaleString('en-IN')} 
                        <span className="text-[10px] font-normal text-[#6B7280] ml-1">
                          {v.type === 'own' ? '(Recharge)' : '(Budget)'}
                        </span>
                      </td>
                      <td>{statusLabel(v.status, v.type)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer inside the card */}
          <div className="bg-white border-t border-[#E5E7EB] px-5 py-4 flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                {selectedIds.size} vehicle{selectedIds.size !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-[#6B7280]">Total required: ₹{totalSelectedAmount.toLocaleString('en-IN')}</p>
            </div>
            <button
              className="btn-primary ml-auto"
              disabled={selectedIds.size === 0}
              onClick={() => showToast('Recharge submitted successfully')}
            >
              <RefreshCw className="w-4 h-4" />
              Approve and Recharge Selected
            </button>
          </div>
        </div>
      </div>

      {/* ── Route Based Recharge Estimate ── */}
      <div className="bank-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F3F4F6]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C1121F]" />
                Route Based Recharge Estimate
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Estimate recharge need from planned trips before approving bulk recharge.</p>
            </div>
            <button
              className="btn-secondary text-xs"
              onClick={() => showToast('Route estimates applied to recharge plan.')}
            >
              Use Estimates for Bulk Recharge
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="bank-table">
            <thead>
              <tr>
                <th>Truck Number</th>
                <th>From</th>
                <th>To</th>
                <th>Current Balance</th>
                <th>Estimated Toll Needed</th>
                <th>Suggested Recharge</th>
              </tr>
            </thead>
            <tbody>
              {[
                { truck: 'DL 1C 9999', from: 'Kota', to: 'Jaipur', balance: 120, estimated: 1850, suggested: 2000 },
                { truck: 'MH 04 1234', from: 'Mumbai', to: 'Pune', balance: 300, estimated: 1600, suggested: 1500 },
                { truck: 'TN 07 EF 3456', from: 'Chennai', to: 'Vellore', balance: 80, estimated: 1950, suggested: 2000 },
                { truck: 'KA 03 CD 7890', from: 'Bengaluru', to: 'Mysuru', balance: 450, estimated: 1300, suggested: 1000 },
              ].map(row => (
                <tr key={row.truck}>
                  <td className="font-semibold text-[#111827]">{row.truck}</td>
                  <td className="text-sm text-[#374151]">{row.from}</td>
                  <td className="text-sm text-[#374151]">{row.to}</td>
                  <td className={`font-medium ${row.balance < 200 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>₹{row.balance.toLocaleString('en-IN')}</td>
                  <td className="font-medium text-[#111827]">₹{row.estimated.toLocaleString('en-IN')}</td>
                  <td className="font-semibold text-[#111827]">₹{row.suggested.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-[#F9FAFB] border-t border-[#F3F4F6]">
          <p className="text-[11px] text-[#9CA3AF]">Estimates are based on route, vehicle type, and available toll data. Actual tolls may vary slightly.</p>
        </div>
      </div>

      {/* ── Why this is better than BBPS ── */}
      <div className="bank-card p-6">
        <h2 className="text-base font-semibold text-[#111827] mb-4">Why this is better than BBPS</h2>
        <ul className="space-y-3 text-sm text-[#374151]">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />
            No repeated vehicle entry
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />
            Bulk recharge from one IDFC account
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />
            Recharge history stored for reports and toll issues
          </li>
        </ul>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
