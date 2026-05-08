import { useState } from 'react';
import { useNavigate } from 'react-router';
import InfoTooltip from '@/components/InfoTooltip';
import {
  Wallet, AlertCircle, Truck, TrendingDown, IndianRupee,
  ArrowRight, CheckCircle, RefreshCw, ChevronRight, X,
} from 'lucide-react';
import { fleetSummary, recentTolls, vehicleList } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-[#111827]">{message}</p>
      </div>
      <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none">×</button>
    </div>
  );
}

export default function SmallFleetHome() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'trucks' | 'issues' | 'budget' | null>(null);

  const lowBalanceTrucks = vehicleList.filter(
    (v) => v.status === 'low_balance' || v.status === 'critical'
  );

  const formatCurrency = (n: number) =>
    '₹' + n.toLocaleString('en-IN');

  const handleRecharge = (truck: string) => {
    setToast(`Recharge request submitted for ${truck}`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
    <div className="space-y-6 animate-fadeIn">

      {/* ── Quick Menu ─────────────────────────────────────── */}
      <div className="flex items-center gap-6 border-b border-[#E5E7EB] pb-3 mb-6 overflow-x-auto hide-scrollbar">
        {[
          { id: 'home', label: 'Home' },
          { id: 'trucks', label: 'Trucks' },
          { id: 'issues', label: 'Toll Issues' },
          { id: 'reports', label: 'Reports' },
          { id: 'budget', label: 'Hired Truck Budget' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'reports') {
                setToast('Monthly toll report downloaded.');
                setTimeout(() => setToast(null), 4000);
              } else if (item.id !== 'home') {
                setActiveModal(item.id as any);
              }
            }}
            className={`text-sm font-medium whitespace-nowrap transition-colors ${
              item.id === 'home' 
                ? 'text-[#C1121F] border-b-2 border-[#C1121F] pb-3 -mb-[14px]' 
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Page Title ─────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">FASTag Fleet Wallet</h1>
        <p className="text-sm text-[#6B7280] mt-1">Recharge and track all your trucks from one IDFC account.</p>
      </div>

      {/* ── Top Section: Wallet + Alert ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Wallet Card */}
        <div className="bank-card p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#C1121F]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide flex items-center">
                IDFC FASTag Wallet
                <InfoTooltip content="Shows the total FASTag balance available for your fleet from your linked IDFC account." position="right" />
              </p>
              <p className="text-[10px] text-[#9CA3AF]">Linked to IDFC Current Account ending 8892</p>
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#111827]">{formatCurrency(fleetSummary.walletBalance)}</p>
            <p className="text-sm text-[#6B7280] mt-1">Available balance</p>
          </div>
          <button className="btn-secondary text-sm self-start">
            View Linked Account
          </button>
        </div>

        {/* Alert Card */}
        <div className="bank-card p-6 border-l-4 border-l-[#D97706] flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">Recharge needed for tomorrow</p>
              <p className="text-2xl font-bold text-[#111827] mt-1">₹8,400 <span className="text-sm font-normal text-[#6B7280]">required</span></p>
              <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                {lowBalanceTrucks.length} trucks have low balance. Recharge now to avoid delays at toll plazas.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="btn-primary w-full justify-center text-sm"
              onClick={() => navigate('/recharge')}
            >
              <RefreshCw className="w-4 h-4" />
              Recharge All Trucks
            </button>
            <p className="text-[11px] text-[#9CA3AF] text-center flex items-center justify-center">
              One-click recharge from your IDFC account · No repeated BBPS entry
              <InfoTooltip content="Recharge all selected low balance trucks together, without entering each vehicle again in BBPS." />
            </p>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bank-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">{fleetSummary.activeVehicles}</p>
            <p className="text-xs text-[#6B7280] font-medium">Active Trucks</p>
          </div>
        </div>
        <div className="bank-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-[#D97706]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#D97706]">{fleetSummary.lowBalanceCount}</p>
            <p className="text-xs text-[#6B7280] font-medium">Low Balance</p>
          </div>
        </div>
        <div className="bank-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
            <IndianRupee className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#111827]">₹8,250</p>
            <p className="text-xs text-[#6B7280] font-medium">Today's Toll Spend</p>
          </div>
        </div>
      </div>

      {/* ── Recent Toll Deductions ─────────────────────────── */}
      <div className="bank-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#111827]">Recent Toll Deductions</h2>
          <button className="text-xs text-[#C1121F] font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="bank-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Truck Number</th>
                <th>Toll Plaza</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTolls.map((toll, i) => (
                <tr key={i}>
                  <td className="text-[#6B7280]">{toll.date}</td>
                  <td className="font-medium">{toll.truck}</td>
                  <td className="text-[#6B7280]">{toll.plaza}</td>
                  <td className="font-medium">₹{toll.amount}</td>
                  <td>
                    <span className="badge badge-success">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────── */}
      <div>
        <h2 className="text-base font-semibold text-[#111827] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bank-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">My Trucks</h3>
              <p className="text-2xl font-bold text-[#111827] mt-2">15 active trucks</p>
              <p className="text-xs text-[#6B7280] mt-1">4 low balance, 1 KYC issue</p>
            </div>
            <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => setActiveModal('trucks')}>View Trucks</button>
          </div>
          <div className="bank-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#111827] flex items-center">
                Toll Issues
                <InfoTooltip content="Track failed recharge, double deduction, wrong toll charge, or other FASTag related issues." />
              </h3>
              <p className="text-2xl font-bold text-[#111827] mt-2">2 open issues</p>
              <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">Track double deductions, failed recharge, and wrong toll charges</p>
            </div>
            <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => setActiveModal('issues')}>Track Issues</button>
          </div>
          <div className="bank-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#111827] flex items-center">
                Monthly Toll Report
                <InfoTooltip content="Download monthly toll spend history for accounting, GST support, and internal reconciliation." />
              </h3>
              <p className="text-2xl font-bold text-[#111827] mt-2">April 2026 ready</p>
              <p className="text-xs text-[#6B7280] mt-1">Download toll spend report for GST and accounting</p>
            </div>
            <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => {
              setToast('Monthly toll report downloaded.');
              setTimeout(() => setToast(null), 4000);
            }}>Download Report</button>
          </div>
          <div className="bank-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">Hired Truck Budget</h3>
              <p className="text-2xl font-bold text-[#111827] mt-2">1 active trip</p>
              <p className="text-xs text-[#6B7280] mt-1">Track toll budget for hired trucks</p>
            </div>
            <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => setActiveModal('budget')}>View Budget</button>
          </div>
        </div>
      </div>

      {/* ── Low Balance Trucks ─────────────────────────────── */}
      <div className="bank-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F3F4F6]">
          <h2 className="text-base font-semibold text-[#111827] flex items-center">
            Trucks needing recharge
            <InfoTooltip content="Shows trucks likely to face low balance issues soon, with suggested recharge amounts." />
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Recharge individually or use Recharge All Trucks for faster processing</p>
        </div>
        <div className="divide-y divide-[#F9FAFB]">
          {lowBalanceTrucks.map((truck) => (
            <div key={truck.id} className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[#111827]">{truck.rcNumber}</p>
                  <span className={`badge ${truck.status === 'critical' ? 'badge-error' : 'badge-warning'}`}>
                    {truck.status === 'critical' ? 'Critical' : 'Low Balance'}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">{truck.driverName}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-[#111827]">₹{truck.balance.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-[#9CA3AF]">current balance</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium text-[#6B7280]">₹{truck.suggestedRecharge.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-[#9CA3AF]">suggested</p>
              </div>
              <button
                onClick={() => handleRecharge(truck.rcNumber)}
                className="btn-primary text-xs px-4 py-2 flex-shrink-0"
              >
                Recharge
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 bg-[#F9FAFB] border-t border-[#F3F4F6]">
          <button
            className="btn-primary w-full justify-center"
            onClick={() => navigate('/recharge')}
          >
            <RefreshCw className="w-4 h-4" />
            Recharge All Trucks
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        </div>
      </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────── */}
      {activeModal === 'trucks' && (
        <div className="modal-overlay">
          <div className="modal-box max-w-2xl">
            <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">My Trucks</h2>
              <button onClick={() => setActiveModal(null)} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="bank-table w-full">
                <thead>
                  <tr><th>Truck Number</th><th>Driver</th><th>FASTag Balance</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-[#111827]">MH 04 1234</td><td>Ramesh Kumar</td><td className="font-medium text-[#111827]">₹2,400</td><td><span className="badge badge-success">Active</span></td><td><button className="btn-secondary text-xs px-3 py-1.5">View</button></td></tr>
                  <tr><td className="font-semibold text-[#111827]">DL 1C 9999</td><td>Suresh Singh</td><td className="font-bold text-[#DC2626]">₹120</td><td><span className="badge badge-warning">Low Balance</span></td><td><button className="btn-primary text-xs px-3 py-1.5">Recharge</button></td></tr>
                  <tr><td className="font-semibold text-[#111827]">KA 03 CD 7890</td><td>Vijay Reddy</td><td className="font-bold text-[#DC2626]">₹450</td><td><span className="badge badge-warning">Low Balance</span></td><td><button className="btn-primary text-xs px-3 py-1.5">Recharge</button></td></tr>
                  <tr><td className="font-semibold text-[#111827]">HR 26 8888</td><td>Amit Sharma</td><td className="font-medium text-[#111827]">₹800</td><td><span className="badge badge-error">KYC Issue</span></td><td><button className="btn-secondary text-xs px-3 py-1.5">Upload RC</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'issues' && (
        <div className="modal-overlay">
          <div className="modal-box max-w-2xl">
            <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">Toll Issues</h2>
              <button onClick={() => setActiveModal(null)} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="bank-table w-full">
                <thead>
                  <tr><th>Issue</th><th>Truck</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  <tr><td className="font-medium text-[#111827]">Double Deduction</td><td>MH 04 1234</td><td className="font-medium">₹1,450</td><td><span className="badge badge-warning">Open</span></td><td><button className="btn-secondary text-xs px-3 py-1.5">View</button></td></tr>
                  <tr><td className="font-medium text-[#111827]">Failed Recharge Deducted</td><td>KA 03 CD 7890</td><td className="font-medium">₹2,100</td><td><span className="badge badge-warning">Open</span></td><td><button className="btn-secondary text-xs px-3 py-1.5">Track</button></td></tr>
                  <tr><td className="font-medium text-[#111827]">Wrong Vehicle Class</td><td>DL 1C 9999</td><td className="font-medium">₹3,200</td><td><span className="badge badge-error">Pending Evidence</span></td><td><button className="btn-secondary text-xs px-3 py-1.5">Upload</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'budget' && (
        <div className="modal-overlay">
          <div className="modal-box max-w-lg">
            <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">Hired Truck Budget</h2>
              <button onClick={() => setActiveModal(null)} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">Trip: Delhi to Jaipur</p>
                  <p className="text-xl font-bold text-[#111827] mt-1">RJ 14 XZ 9999</p>
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                 <div><p className="text-xs text-[#6B7280]">Budget</p><p className="font-semibold mt-1 text-[#111827]">₹3,450</p></div>
                 <div><p className="text-xs text-[#6B7280]">Spent</p><p className="font-semibold mt-1 text-[#111827]">₹1,200</p></div>
                 <div><p className="text-xs text-[#6B7280]">Remaining</p><p className="font-bold text-[#111827] mt-1">₹2,250</p></div>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                 <div className="bg-[#16A34A] h-full rounded-full" style={{width: '34%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
