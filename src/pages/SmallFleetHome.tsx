import { useState } from 'react';
import { useNavigate } from 'react-router';
import InfoTooltip from '@/components/InfoTooltip';
import MobileSmallFleetHome from '@/components/MobileSmallFleetHome';
import {
  Wallet, AlertCircle, Truck, TrendingDown, IndianRupee,
  CheckCircle, RefreshCw, ChevronRight, X, MapPin,
  User, Users, Briefcase
} from 'lucide-react';
import { recentTolls } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none">×</button>
    </div>
  );
}


const trucks = [
  { id: 'DL 1C 9999', balance: 120, suggested: 2000, status: 'Low Balance', type: 'own', driver: 'Suresh Singh', phone: '+91 98123 45678', route: 'Kota to Jaipur' },
  { id: 'KA 03 CD 7890', balance: 450, suggested: 1000, status: 'Low Balance', type: 'own', driver: 'Vijay Reddy', phone: '+91 98765 01234', route: '' },
  { id: 'TN 07 EF 3456', balance: 80, suggested: 2000, status: 'Critical', type: 'hired', driver: 'Karthik Iyer', phone: '+91 96543 21987', route: 'Kota to Jaipur' },
  { id: 'MH 12 AB 4567', balance: 400, suggested: 3400, status: 'Low Balance', type: 'hired', driver: 'Deepak Patil', phone: '+91 97654 32198', route: 'Delhi to Mumbai' },
];

const tripEstimate = {
  truck: 'DL 1C 9999',
  from: 'Kota',
  to: 'Jaipur',
  tripType: 'One Way',
  estimatedToll: 1850,
  currentBalance: 450,
  suggestedRecharge: 1500,
};

export default function SmallFleetHome() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'trucks' | 'issues' | 'budget' | 'recharge' | null>(null);
  const [tripTruck, setTripTruck] = useState(tripEstimate.truck);
  const [tripFrom, setTripFrom] = useState(tripEstimate.from);
  const [tripTo, setTripTo] = useState(tripEstimate.to);
  const [tripType, setTripType] = useState('One Way');
  const [showEstimate, setShowEstimate] = useState(true);
  const [rechargeStep, setRechargeStep] = useState<'confirm' | 'pending' | 'success' | 'failed'>('confirm');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
      <div className="block md:hidden"><MobileSmallFleetHome /></div>
      <div className="hidden md:block space-y-6 animate-fadeIn">

        {/* ── SECTION 1: Fleet Readiness ── */}
        <div className="bank-card p-6 border-l-4 border-l-[#C1121F] relative">
          <div className="absolute top-4 right-6 text-[11px] text-[#6B7280]">15 trucks tracked · Last updated 5 min ago</div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[#C1121F]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#C1121F] uppercase tracking-wide mb-1">
                  4 of 15 trucks need recharge today
                </p>
                <h1 className="text-lg font-bold text-[#111827]">
                  11 trucks ready, 4 need recharge before next movement
                </h1>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  ₹8,400 <span className="text-sm font-normal text-[#6B7280]">required</span>
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  Recharge now to avoid delays at toll plazas.
                </p>
              </div>
            </div>
            <button
              className="btn-primary text-sm flex-shrink-0 mt-6"
              onClick={() => navigate('/recharge')}
            >
              <RefreshCw className="w-4 h-4" />
              Recharge All Trucks
            </button>
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-3 flex items-center gap-1">
            One-click recharge from your IDFC account · No repeated BBPS entry
            <InfoTooltip content="Recharge all selected low balance trucks together, without entering each vehicle again in BBPS." />
          </p>
        </div>

        {/* ── SECTION 2: Plan Today's Trip ── */}
        <div className="bank-card p-5 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C1121F]" />
              Plan Today's Trip
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#374151] mb-1">Truck</label>
              <select className="bank-input text-sm py-1.5" value={tripTruck} onChange={e => { setTripTruck(e.target.value); setShowEstimate(false); }}>
                {trucks.map(t => <option key={t.id}>{t.id}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#374151] mb-1">From</label>
              <input className="bank-input text-sm py-1.5" value={tripFrom} onChange={e => { setTripFrom(e.target.value); setShowEstimate(false); }} placeholder="e.g. Kota" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#374151] mb-1">To</label>
              <input className="bank-input text-sm py-1.5" value={tripTo} onChange={e => { setTripTo(e.target.value); setShowEstimate(false); }} placeholder="e.g. Jaipur" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#374151] mb-1">Trip Type</label>
              <select className="bank-input text-sm py-1.5" value={tripType} onChange={e => { setTripType(e.target.value); setShowEstimate(false); }}>
                <option>One Way</option>
                <option>Return Trip</option>
              </select>
            </div>
          </div>

          {showEstimate ? (
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#111827] mb-3 uppercase tracking-wide">Toll Estimate</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] text-[#6B7280] font-medium">Estimated Toll Needed</p>
                    <p className="text-base font-bold text-[#111827]">₹{tripEstimate.estimatedToll.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] font-medium">Current FASTag Balance</p>
                    <p className="text-base font-bold text-[#DC2626]">₹{tripEstimate.currentBalance.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] font-medium">Suggested Recharge</p>
                    <p className="text-base font-bold text-[#111827]">₹{tripEstimate.suggestedRecharge.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <button className="btn-secondary text-xs py-1.5 px-3" onClick={() => setShowEstimate(false)}>
                      Edit Trip
                    </button>
                    <button className="btn-primary text-xs py-1.5 px-3" onClick={() => setActiveModal('recharge')}>
                      Use This Recharge
                    </button>
                  </div>
                  <p className="text-[9px] text-[#9CA3AF] max-w-[250px] text-right leading-tight">
                    Estimate is based on route, vehicle type, and available toll data. Actual tolls may vary slightly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="btn-secondary text-xs py-1.5"
              onClick={() => setShowEstimate(true)}
            >
              Get Trip Toll Estimate
            </button>
          )}
        </div>

        {/* ── SECTION 3: Wallet ── */}
        <div className="bank-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
            <Wallet className="w-5 h-5 text-[#C1121F]" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
              IDFC FASTag Wallet
            </p>
            <p className="text-xl font-bold text-[#111827]">₹4,200 <span className="text-sm font-medium text-[#6B7280] lowercase">available</span></p>
            <p className="text-[11px] text-[#9CA3AF]">Linked to IDFC Current Account ending 8892</p>
          </div>
        </div>

        {/* ── SECTION 4: Trucks Needing Recharge ── */}
        <div className="bank-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827] flex items-center">
                Trucks Needing Recharge
                <InfoTooltip content="Trucks with low or critical FASTag balance that need recharge before movement." />
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Suggested amounts use current balance and planned trip estimate where available.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6B7280]">15 trucks: <span className="font-medium text-[#374151]">12 Own, 3 Hired</span></span>
              <span className="badge badge-error">{trucks.length} trucks</span>
            </div>
          </div>
          <div className="divide-y divide-[#F9FAFB]">
            {trucks.map(truck => (
              <div key={truck.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="text-sm font-semibold text-[#111827]">{truck.id}</p>
                    <span className={`badge ${truck.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0`}>
                      {truck.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                    </span>
                    <span className={`badge ${truck.status === 'Critical' ? 'badge-error' : 'badge-warning'} text-[10px]`}>
                      {truck.status}
                    </span>
                  </div>
                  {truck.type === 'hired' && truck.route && (
                    <p className="text-[11px] text-[#6B7280]">Current trip: {truck.route}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0 mr-4">
                  <p className="text-sm text-[#6B7280] font-medium mb-0.5">Current balance: <span className="text-[#DC2626] font-semibold">₹{truck.balance.toLocaleString('en-IN')}</span></p>
                  <p className="text-sm text-[#6B7280] font-medium">Suggested recharge: <span className="text-[#111827] font-bold">₹{truck.suggested.toLocaleString('en-IN')}</span></p>
                </div>
                <button
                  onClick={() => setActiveModal('recharge')}
                  className="btn-primary text-xs px-4 py-2 flex-shrink-0"
                >
                  Recharge
                </button>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-[#F9FAFB] border-t border-[#F3F4F6]">
            <button className="btn-primary w-full justify-center" onClick={() => setActiveModal('recharge')}>
              <RefreshCw className="w-4 h-4" />
              Recharge All Trucks
            </button>
          </div>
        </div>

        {/* ── SECTION 5: Recent Toll Deductions ── */}
        <div className="bank-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#111827]">Recent Toll Deductions</h2>
            <button className="text-xs text-[#C1121F] font-medium hover:underline flex items-center gap-1" onClick={() => showToast('Monthly toll report downloaded.')}>
              Download Report <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            {recentTolls.map((toll, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A] font-medium uppercase tracking-wide">Paid</span>
                    <p className="text-sm font-medium text-[#111827]">{toll.plaza}</p>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-2">
                    <span>{toll.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                    <span>Truck: <span className="font-medium text-[#374151]">{toll.truck}</span></span>
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#111827]">₹{toll.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 6: Toll Issues ── */}
        <div className="bank-card p-5 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">2 toll issues open</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Track failed recharge, double deduction, and wrong toll charges.</p>
            </div>
          </div>
          <button className="btn-secondary text-sm flex-shrink-0" onClick={() => setActiveModal('issues')}>Track Issues</button>
        </div>

        {/* ── SECTION 7: Quick Actions ── */}
        <div>
          <h2 className="text-base font-semibold text-[#111827] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bank-card p-5 flex flex-col justify-between">
              <div>
                <Truck className="w-5 h-5 text-[#4B5563] mb-2" />
                <h3 className="text-sm font-semibold text-[#111827]">My Trucks</h3>
                <p className="text-xs text-[#6B7280] mt-1">View truck balance and status.</p>
              </div>
              <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => setActiveModal('trucks')}>View Trucks</button>
            </div>
            <div className="bank-card p-5 flex flex-col justify-between">
              <div>
                <AlertCircle className="w-5 h-5 text-[#4B5563] mb-2" />
                <h3 className="text-sm font-semibold text-[#111827]">Toll Issues</h3>
                <p className="text-xs text-[#6B7280] mt-1">Track recharge and toll problems.</p>
              </div>
              <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => setActiveModal('issues')}>Track Issues</button>
            </div>
            <div className="bank-card p-5 flex flex-col justify-between">
              <div>
                <TrendingDown className="w-5 h-5 text-[#4B5563] mb-2" />
                <h3 className="text-sm font-semibold text-[#111827] flex items-center">
                  Monthly Toll Report
                  <InfoTooltip content="Download monthly toll spend for accounting, GST support, and internal reconciliation." />
                </h3>
                <p className="text-xs text-[#6B7280] mt-1">Download toll spend for accounting and GST support.</p>
              </div>
              <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => showToast('Monthly toll report downloaded.')}>Download Report</button>
            </div>
            <div className="bank-card p-5 flex flex-col justify-between">
              <div>
                <IndianRupee className="w-5 h-5 text-[#4B5563] mb-2" />
                <h3 className="text-sm font-semibold text-[#111827]">Hired Truck Budget</h3>
                <p className="text-xs text-[#6B7280] mt-1">Track toll money for hired trucks.</p>
              </div>
              <button className="btn-secondary w-full justify-center mt-4 text-xs" onClick={() => setActiveModal('budget')}>View Budget</button>
            </div>
          </div>
        </div>

        {/* ── SECTION 8: Staff Access ── */}
        <div className="bank-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[#111827] flex items-center">
                Staff Access
                <InfoTooltip content="Give helpers or accountants limited access without sharing your full account." />
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Manage access for drivers, helpers, and accountants.</p>
            </div>
            <button className="btn-secondary text-xs flex items-center gap-1" onClick={() => showToast('Staff access invite sent')}>
              <Users className="w-3.5 h-3.5" />
              Invite Staff
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: User,
                title: 'Owner',
                access: 'Full access',
                desc: 'Can recharge, add trucks, download reports, and raise toll issues.',
                color: 'text-[#C1121F]',
                bg: 'bg-[#FEF2F2]',
              },
              {
                icon: Users,
                title: 'Staff',
                access: 'Recharge access',
                desc: 'Can view trucks, prepare recharge, and raise toll issues.',
                color: 'text-[#D97706]',
                bg: 'bg-[#FFFBEB]',
              },
              {
                icon: Briefcase,
                title: 'Accountant',
                access: 'Report only',
                desc: 'Can view toll history and download monthly reports.',
                color: 'text-[#2563EB]',
                bg: 'bg-[#EFF6FF]',
              },
            ].map(({ icon: Icon, title, access, desc, color, bg }) => (
              <div key={title} className="flex items-start gap-3 p-4 border border-[#F3F4F6] rounded-xl">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{title}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${bg} ${color} inline-block mt-0.5`}>{access}</span>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>

      {/* ── Modals (outside animated wrapper to preserve position:fixed) ── */}
      {activeModal === 'recharge' && (
        <div className="modal-overlay">
          <div className="modal-box max-w-sm">
            <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">Recharge Proof</h2>
              <button onClick={() => { setActiveModal(null); setRechargeStep('confirm'); }} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            
            {rechargeStep === 'confirm' && (
              <div className="p-6">
                <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB] mb-6">
                  <div className="flex justify-between text-sm mb-2"><span className="text-[#6B7280]">Selected trucks</span><span className="font-semibold text-[#111827]">4 trucks</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#6B7280]">Total amount</span><span className="font-bold text-[#111827]">₹8,400</span></div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-semibold text-[#374151]">Pay from</label>
                  <div className="border border-[#C1121F] bg-[#FEF2F2] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-[#C1121F]" />
                      <div><p className="text-sm font-semibold text-[#991B1B]">IDFC Current Account</p><p className="text-[10px] text-[#DC2626]">Ending 8892</p></div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-[#C1121F]" />
                  </div>
                </div>
                <button className="btn-primary w-full justify-center" onClick={() => {
                  setRechargeStep('pending');
                  setTimeout(() => setRechargeStep('success'), 1500);
                }}>Confirm Payment</button>
              </div>
            )}

            {rechargeStep === 'pending' && (
              <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-[#C1121F] animate-spin" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">Recharge Pending</h2>
                  <p className="text-sm text-[#6B7280] mt-1">We will update the status once confirmed.</p>
                </div>
              </div>
            )}

            {rechargeStep === 'success' && (
              <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">Recharge Successful</h2>
                  <p className="text-sm text-[#6B7280] mt-1">4 trucks updated</p>
                </div>
                <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 text-left space-y-2 mt-2">
                  <div className="flex justify-between"><span className="text-xs text-[#6B7280]">Amount</span><span className="text-sm font-bold text-[#111827]">₹8,400</span></div>
                  <div className="flex justify-between"><span className="text-xs text-[#6B7280]">Funding source</span><span className="text-sm font-medium text-[#111827]">IDFC Current A/C ending 8892</span></div>
                  <div className="flex justify-between"><span className="text-xs text-[#6B7280]">Reference ID</span><span className="text-sm font-medium text-[#111827]">IDFCFASTAG2408</span></div>
                </div>
                <button className="btn-secondary w-full justify-center mt-2" onClick={() => { setActiveModal(null); setRechargeStep('confirm'); }}>Done</button>
                <button className="text-[10px] text-[#6B7280] hover:underline" onClick={() => setRechargeStep('failed')}>Simulate Failed State</button>
              </div>
            )}

            {rechargeStep === 'failed' && (
              <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-[#DC2626]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">Recharge Failed</h2>
                  <p className="text-sm text-[#6B7280] mt-1">Bank timeout or insufficient funds.</p>
                </div>
                <div className="w-full flex gap-3 mt-4">
                  <button className="btn-secondary flex-1 justify-center" onClick={() => { setActiveModal('issues'); setRechargeStep('confirm'); }}>Raise Toll Issue</button>
                  <button className="btn-primary flex-1 justify-center" onClick={() => setRechargeStep('confirm')}>Retry Recharge</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {activeModal === 'trucks' && (
        <div className="modal-overlay">
          <div className="modal-box max-w-3xl">
            <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#111827]">My Trucks</h2>
              <button onClick={() => setActiveModal(null)} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="bank-table w-full">
                <thead><tr><th className="whitespace-nowrap">Truck Number</th><th className="whitespace-nowrap">Type</th><th className="whitespace-nowrap">Driver</th><th className="whitespace-nowrap">Current Route</th><th className="whitespace-nowrap">FASTag Balance</th><th className="whitespace-nowrap">Status</th><th className="whitespace-nowrap">Action</th></tr></thead>
                <tbody>
                  {trucks.map(truck => (
                    <tr key={truck.id}>
                      <td className="font-semibold text-[#111827] whitespace-nowrap">{truck.id}</td>
                      <td className="whitespace-nowrap"><span className={`badge ${truck.type === 'own' ? 'badge-info' : 'badge-gray'}`}>{truck.type === 'own' ? 'Own Truck' : 'Hired Truck'}</span></td>
                      <td className="whitespace-nowrap">
                        <div className="text-[#111827] font-medium">{truck.driver}</div>
                        <div className="text-xs text-[#6B7280]">{truck.phone}</div>
                      </td>
                      <td className="whitespace-nowrap text-[#6B7280] text-sm">{truck.route || '-'}</td>
                      <td className={`font-semibold whitespace-nowrap ${truck.balance < 500 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>₹{truck.balance.toLocaleString('en-IN')}</td>
                      <td className="whitespace-nowrap"><span className={`badge ${truck.status === 'Critical' ? 'badge-error' : 'badge-warning'}`}>{truck.status}</span></td>
                      <td className="whitespace-nowrap">
                        {truck.balance < 500 ? (
                           <button className="btn-primary text-xs px-3 py-1.5" onClick={() => { setActiveModal(null); showToast(`Recharge submitted for ${truck.id}`); }}>Recharge</button>
                        ) : (
                           <button className="btn-secondary text-xs px-3 py-1.5">View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="font-semibold text-[#111827] whitespace-nowrap">MH 04 1234</td>
                    <td className="whitespace-nowrap"><span className="badge badge-info">Own Truck</span></td>
                    <td className="whitespace-nowrap">
                      <div className="text-[#111827] font-medium">Rajesh Verma</div>
                      <div className="text-xs text-[#6B7280]">+91 98765 43214</div>
                    </td>
                    <td className="whitespace-nowrap text-[#6B7280] text-sm">-</td>
                    <td className="font-semibold text-[#111827] whitespace-nowrap">₹2,400</td>
                    <td className="whitespace-nowrap"><span className="badge badge-success">Active</span></td>
                    <td className="whitespace-nowrap"><button className="btn-secondary text-xs px-3 py-1.5">View</button></td>
                  </tr>
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
                <thead><tr><th className="whitespace-nowrap">Issue</th><th className="whitespace-nowrap">Truck</th><th className="whitespace-nowrap">Amount</th><th className="whitespace-nowrap">Status</th><th className="whitespace-nowrap">Action</th></tr></thead>
                <tbody>
                  <tr><td className="font-medium text-[#111827] whitespace-nowrap">Double Deduction</td><td className="whitespace-nowrap">MH 04 1234</td><td className="font-medium whitespace-nowrap">₹1,450</td><td className="whitespace-nowrap"><span className="badge badge-warning">Open</span></td><td className="whitespace-nowrap"><button className="btn-secondary text-xs px-3 py-1.5">View</button></td></tr>
                  <tr><td className="font-medium text-[#111827] whitespace-nowrap">Failed Recharge Deducted</td><td className="whitespace-nowrap">KA 03 CD 7890</td><td className="font-medium whitespace-nowrap">₹2,100</td><td className="whitespace-nowrap"><span className="badge badge-warning">Open</span></td><td className="whitespace-nowrap"><button className="btn-secondary text-xs px-3 py-1.5">Track</button></td></tr>
                  <tr><td className="font-medium text-[#111827] whitespace-nowrap">Wrong Vehicle Class</td><td className="whitespace-nowrap">DL 1C 9999</td><td className="font-medium whitespace-nowrap">₹3,200</td><td className="whitespace-nowrap"><span className="badge badge-error">Pending Evidence</span></td><td className="whitespace-nowrap"><button className="btn-secondary text-xs px-3 py-1.5" onClick={() => { setActiveModal(null); showToast('Evidence upload opened'); }}>Upload</button></td></tr>
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
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xl font-bold text-[#111827] flex items-center gap-2">RJ 14 XZ 9999 <span className="badge badge-gray text-[10px] py-0">Hired Truck</span></p>
                  <p className="text-sm font-medium text-[#6B7280] mt-1">Driver: Mukesh Bhai</p>
                  <p className="text-sm font-medium text-[#6B7280]">Trip: Delhi to Jaipur</p>
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F9FAFB] p-3 rounded-lg"><p className="text-[11px] text-[#6B7280] uppercase font-semibold">Total Budget</p><p className="font-bold mt-0.5 text-lg text-[#111827]">₹3,450</p></div>
                <div className="bg-[#F9FAFB] p-3 rounded-lg"><p className="text-[11px] text-[#6B7280] uppercase font-semibold">Next Toll Bal.</p><p className="font-bold mt-0.5 text-lg text-[#111827]">₹450</p></div>
                <div className="bg-[#F9FAFB] p-3 rounded-lg"><p className="text-[11px] text-[#6B7280] uppercase font-semibold">Spent</p><p className="font-bold mt-0.5 text-lg text-[#111827]">₹1,200</p></div>
                <div className="bg-[#F9FAFB] p-3 rounded-lg"><p className="text-[11px] text-[#6B7280] uppercase font-semibold">Remaining</p><p className="font-bold mt-0.5 text-lg text-[#16A34A]">₹2,250</p></div>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                <div className="bg-[#16A34A] h-full rounded-full" style={{width: '34%'}} />
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-2">34% of budget used</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
