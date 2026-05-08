import { useState } from 'react';
import {
  Upload, Plus, Download, X, CheckCircle, RefreshCw,
  AlertCircle, ChevronRight,
} from 'lucide-react';
import { vehicleList } from '@/data/mockData';
import type { Vehicle } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

function KycBadge({ status }: { status: Vehicle['kycStatus'] }) {
  const config = {
    verified: { label: 'Verified', class: 'badge-success' },
    kyc_issue: { label: 'KYC Issue', class: 'badge-error' },
    pending: { label: 'Pending', class: 'badge-warning' },
    trip_budget_active: { label: 'Trip Budget Active', class: 'badge-info' },
  }[status];
  return <span className={`badge ${config.class}`}>{config.label}</span>;
}

function ManageDrawer({ vehicle, onClose, onToast }: {
  vehicle: Vehicle;
  onClose: () => void;
  onToast: (msg: string) => void;
}) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-panel">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#111827]">{vehicle.rcNumber}</h2>
            <p className="text-xs text-[#6B7280]">{vehicle.type === 'own' ? 'Own Truck' : 'Hired Truck'} · {vehicle.driverName}</p>
          </div>
          <button onClick={onClose} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Balance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F9FAFB] rounded-xl p-4">
              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wide">Current Balance</p>
              <p className={`text-2xl font-bold mt-1 ${vehicle.balance < 500 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>
                ₹{vehicle.balance.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-[#F9FAFB] rounded-xl p-4">
              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wide">Today's Toll Spend</p>
              <p className="text-2xl font-bold text-[#111827] mt-1">₹{vehicle.todaySpend.toLocaleString('en-IN')}</p>
            </div>
          </div>
          {/* KYC Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">KYC Status</span>
            <KycBadge status={vehicle.kycStatus} />
          </div>
          {/* Auto Recharge */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">Auto Recharge</span>
            <span className={`badge ${vehicle.autoRecharge ? 'badge-success' : 'badge-gray'}`}>
              {vehicle.autoRecharge ? 'On' : 'Off'}
            </span>
          </div>
          {/* Daily Limit */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">Daily Spend Limit</span>
            <span className="text-sm font-semibold text-[#111827]">₹{vehicle.dailyLimit.toLocaleString('en-IN')}</span>
          </div>
          {/* Recent Transactions */}
          <div>
            <p className="text-sm font-semibold text-[#111827] mb-2">Recent Transactions</p>
            <div className="space-y-2">
              {[
                { type: 'Toll', name: 'Khalapur Toll', amount: -450, date: 'Today 09:15 AM' },
                { type: 'Recharge', name: 'Wallet Recharge', amount: 2000, date: 'Yesterday 06:30 PM', funding: 'IDFC Fleet Credit Limit' },
                { type: 'Toll', name: 'Mumbai Entry', amount: -180, date: 'May 7 · 11:00 AM' },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.type === 'Toll' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#F0FDF4] text-[#16A34A]'}`}>{t.type}</span>
                      <p className="text-sm font-medium text-[#111827]">{t.name}</p>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                      {t.date} {t.funding && `· Funded via ${t.funding}`}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${t.amount > 0 ? 'text-[#16A34A]' : 'text-[#111827]'}`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              className="btn-primary w-full justify-center"
              onClick={() => { onToast(`Recharge submitted for ${vehicle.rcNumber}`); onClose(); }}
            >
              <RefreshCw className="w-4 h-4" />
              Recharge Truck
            </button>
            <button className="btn-secondary w-full justify-center">Edit Rules</button>
            <button
              className="btn-ghost w-full justify-center text-[#DC2626] hover:bg-[#FEF2F2]"
              onClick={() => { onToast(`Dispute raised for ${vehicle.rcNumber}`); onClose(); }}
            >
              <AlertCircle className="w-4 h-4" />
              Raise Dispute
            </button>
            <button className="btn-ghost w-full justify-center">
              <ChevronRight className="w-4 h-4" />
              View History
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function FleetRoster() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const statusBadge = (v: Vehicle) => {
    const config = {
      active: { label: 'Active', class: 'badge-success' },
      low_balance: { label: 'Low Balance', class: 'badge-warning' },
      critical: { label: 'Critical', class: 'badge-error' },
      inactive: { label: 'Inactive', class: 'badge-gray' },
    }[v.status];
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#111827] flex items-center">
            Fleet Roster
            <InfoTooltip content="Manage truck balance, FASTag status, KYC, auto recharge rules, and vehicle type in one place." />
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Manage truck status, FASTag balance, KYC, and recharge rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn-secondary text-sm"
            onClick={() => showToast('Vehicle Excel template downloaded')}
          >
            <Upload className="w-4 h-4" />
            <span className="flex items-center">
              Upload Vehicle Excel
              <InfoTooltip content="Add many trucks at once instead of entering each vehicle manually." />
            </span>
          </button>
          <button
            className="btn-secondary text-sm"
            onClick={() => showToast('Adding new truck...')}
          >
            <Plus className="w-4 h-4" />
            Add Truck
          </button>
          <button
            className="btn-secondary text-sm"
            onClick={() => showToast('Fleet report download started')}
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="relative w-full sm:w-80">
          <input 
            type="text" 
            placeholder="Search truck, driver, or FASTag" 
            className="bank-input pl-10 w-full"
          />
          <svg className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          {['All', 'Own Trucks', 'Hired Trucks', 'Low Balance', 'KYC Issue'].map((pill, i) => (
            <button 
              key={pill} 
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#111827] text-white' : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]'}`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bank-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="bank-table">
            <thead>
              <tr>
                <th>Truck Number</th>
                <th>Type</th>
                <th>Driver</th>
                <th>FASTag Balance</th>
                <th className="whitespace-nowrap">
                  KYC Status
                  <InfoTooltip content="Shows whether the vehicle details are verified for FASTag usage and bank records." />
                </th>
                <th className="whitespace-nowrap">
                  Auto Recharge
                  <InfoTooltip content="Shows whether automatic recharge rules are active for this vehicle." />
                </th>
                <th className="whitespace-nowrap">
                  Daily Limit
                  <InfoTooltip content="Maximum FASTag spend allowed for this vehicle in one day." />
                </th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicleList.map((v) => (
                <tr key={v.id}>
                  <td className="font-semibold text-[#111827]">{v.rcNumber}</td>
                  <td>
                    <span className={`badge ${v.type === 'own' ? 'badge-info' : 'badge-gray'}`}>
                      {v.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                    </span>
                  </td>
                  <td>
                    <p className="text-sm text-[#111827]">{v.driverName}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{v.driverMobile}</p>
                  </td>
                  <td>
                    <span className={`text-sm font-bold ${v.balance < 500 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>
                      ₹{v.balance.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td><KycBadge status={v.kycStatus} /></td>
                  <td>
                    <span className={`badge ${v.autoRecharge ? 'badge-success' : 'badge-gray'}`}>
                      {v.autoRecharge ? 'On' : 'Off'}
                    </span>
                  </td>
                  <td className="text-sm font-medium text-[#111827]">₹{v.dailyLimit.toLocaleString('en-IN')}</td>
                  <td>{statusBadge(v)}</td>
                  <td>
                    <button
                      className="btn-secondary text-xs px-3 py-1.5"
                      onClick={() => setSelectedVehicle(v)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVehicle && (
        <ManageDrawer
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onToast={showToast}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
