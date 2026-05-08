import { useState } from 'react';
import { Search, CheckCircle, RefreshCw, Shield, Clock } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import { vehicleList } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

export default function OneClickRecharge() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(vehicleList.filter(v => v.status === 'low_balance' || v.status === 'critical').map(v => v.id))
  );
  const [singleTruck, setSingleTruck] = useState('');
  const [singleAmount, setSingleAmount] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [fundingSource, setFundingSource] = useState('IDFC Current Account ending 8892');

  const lowBalanceTrucks = vehicleList.filter(v =>
    v.status === 'low_balance' || v.status === 'critical'
  );

  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === lowBalanceTrucks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(lowBalanceTrucks.map(v => v.id)));
    }
  };

  const totalAmount = Array.from(selectedIds).reduce((sum, id) => {
    const v = vehicleList.find(vv => vv.id === id);
    return sum + (v?.suggestedRecharge ?? 0);
  }, 0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const statusLabel = (status: string) => {
    if (status === 'critical') return <span className="badge badge-error">Critical</span>;
    if (status === 'low_balance') return <span className="badge badge-warning">Low Balance</span>;
    return <span className="badge badge-success">Active</span>;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-28">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#111827] flex items-center">
          One Click Recharge
          <InfoTooltip content="Recharge one truck or many trucks from one IDFC account, reducing repeated BBPS style entries." />
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Recharge one truck or the entire fleet from a single IDFC account.
        </p>
      </div>

      {/* Trust line */}
      <div className="flex items-center flex-wrap gap-4 text-xs text-[#6B7280]">
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#16A34A]" /> Directly linked to IDFC account</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#2563EB]" /> Designed to reduce repeated BBPS entry</span>
        <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" /> Recharge history stored for reconciliation</span>
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
                <InfoTooltip content="Select multiple low balance trucks and approve one combined recharge instead of doing separate top ups." />
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Based on current balances and selected trucks</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-2 border border-[#E5E7EB]">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Selected trucks</span>
                <span className="font-semibold text-[#111827]">{selectedIds.size} trucks</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Total recharge amount</span>
                <span className="font-bold text-[#111827]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-[#374151]">
                Pay from
                <InfoTooltip content="Choose whether this recharge uses IDFC Current Account, FASTag Wallet Balance, or approved IDFC Fleet Credit Limit." />
              </label>
              <select
                className="bank-input"
                value={fundingSource}
                onChange={e => setFundingSource(e.target.value)}
              >
                <option value="IDFC Current Account ending 8892">IDFC Current Account ending 8892</option>
                <option value="FASTag Wallet Balance">FASTag Wallet Balance</option>
                <option value="IDFC Fleet Credit Limit">IDFC Fleet Credit Limit</option>
              </select>
            </div>

            {fundingSource === 'IDFC Fleet Credit Limit' && (
              <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#BFDBFE] space-y-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1E40AF] flex items-center">
                    Available Credit
                    <InfoTooltip content="Available only for approved enterprise customers. Used as a recharge funding source with approval controls." />
                  </span>
                  <span className="font-semibold text-[#1E40AF]">₹12,00,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1E40AF]">Selected Recharge Amount</span>
                  <span className="font-semibold text-[#1E40AF]">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#BFDBFE]">
                  <span className="text-[#1E40AF] font-medium">Remaining Credit After Recharge</span>
                  <span className="font-bold text-[#1E40AF]">
                    ₹{(1200000 - totalAmount).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-[#1D4ED8] mt-2 leading-relaxed bg-white/50 p-2 rounded border border-[#BFDBFE]/50">
                  For approved enterprise customers only. Recharge approvals follow company rules.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <button
              className="btn-primary w-full justify-center"
              onClick={() => showToast(`Recharge request submitted for ${selectedIds.size} trucks · ₹${totalAmount.toLocaleString('en-IN')}`)}
              disabled={selectedIds.size === 0}
            >
              <RefreshCw className="w-4 h-4" />
              Approve and Recharge Selected
            </button>
          </div>
        </div>

        {/* Why this is better than BBPS Card */}
        <div className="lg:col-span-2">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#111827] flex items-center mb-3">
              Why this is better than BBPS
              <InfoTooltip content="BBPS is transaction focused. This portal is built for fleet level recharge, tracking, and reporting." />
            </h2>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0" /> Saved trucks, no repeated vehicle entry</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0" /> Bulk recharge from one IDFC account</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0" /> Recharge history available for reports and disputes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Truck Table */}
      <div className="bank-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center gap-3">
          <button
            onClick={toggleAll}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
              selectedIds.size === lowBalanceTrucks.length
                ? 'bg-[#C1121F] border-[#C1121F]'
                : 'border-[#D1D5DB] hover:border-[#9CA3AF]'
            }`}
          >
            {selectedIds.size === lowBalanceTrucks.length && (
              <CheckCircle className="w-3 h-3 text-white" />
            )}
          </button>
          <h2 className="text-sm font-semibold text-[#111827]">Trucks needing recharge</h2>
          <span className="badge badge-warning ml-auto">{lowBalanceTrucks.length} trucks</span>
        </div>
        <div className="overflow-x-auto">
          <table className="bank-table">
            <thead>
              <tr>
                <th className="w-10"></th>
                <th>Truck Number</th>
                <th>Current Balance</th>
                <th>Suggested Recharge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lowBalanceTrucks.map((v) => (
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
                    <p className="font-medium text-[#111827]">{v.rcNumber}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{v.driverName}</p>
                  </td>
                  <td className="font-medium text-[#DC2626]">₹{v.balance.toLocaleString('en-IN')}</td>
                  <td className="font-semibold text-[#111827]">₹{v.suggestedRecharge.toLocaleString('en-IN')}</td>
                  <td>{statusLabel(v.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center gap-4 z-30 shadow-md">
        <div>
          <p className="text-sm font-semibold text-[#111827]">
            {selectedIds.size} truck{selectedIds.size !== 1 ? 's' : ''} selected
          </p>
          <p className="text-xs text-[#6B7280]">Total recharge: ₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <button
          className="btn-primary ml-auto"
          disabled={selectedIds.size === 0}
          onClick={() => showToast(`Recharge request submitted for ${selectedIds.size} trucks · ₹${totalAmount.toLocaleString('en-IN')}`)}
        >
          <RefreshCw className="w-4 h-4" />
          Recharge Selected
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
