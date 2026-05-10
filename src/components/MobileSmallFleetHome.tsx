import { useState } from 'react';
import {
  Wallet, AlertCircle, TrendingDown, IndianRupee,
  CheckCircle, RefreshCw, X, Truck, FileText, MapPin, User, Users, Briefcase
} from 'lucide-react';
import { recentTolls } from '@/data/mockData';

const trucks = [
  { id: 'DL 1C 9999', balance: 120, suggested: 2000, status: 'Low Balance', type: 'own', driver: 'Suresh Singh', phone: '+91 98123 45678', route: 'Kota to Jaipur' },
  { id: 'KA 03 CD 7890', balance: 450, suggested: 1000, status: 'Low Balance', type: 'own', driver: 'Vijay Reddy', phone: '+91 98765 01234', route: '' },
  { id: 'TN 07 EF 3456', balance: 80, suggested: 2000, status: 'Critical', type: 'hired', driver: 'Karthik Iyer', phone: '+91 96543 21987', route: 'Kota to Jaipur' },
  { id: 'MH 12 AB 4567', balance: 400, suggested: 3400, status: 'Low Balance', type: 'hired', driver: 'Deepak Patil', phone: '+91 97654 32198', route: 'Delhi to Mumbai' },
];

export default function MobileSmallFleetHome() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [rechargeStep, setRechargeStep] = useState<'confirm' | 'pending' | 'success' | 'failed'>('confirm');
  const [toast, setToast] = useState<string | null>(null);
  const [tripTruck, setTripTruck] = useState('DL 1C 9999');
  const [tripFrom, setTripFrom] = useState('Kota');
  const [tripTo, setTripTo] = useState('Jaipur');
  const [tripType, setTripType] = useState('One Way');
  const [showEstimate, setShowEstimate] = useState(true);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-5">

        {/* SECTION 1: Fleet Readiness */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-sm relative">
          <div className="flex items-start justify-between gap-3 relative">
            <div className="absolute -top-1 right-0 text-[10px] text-[#6B7280]">15 trucks tracked · Last updated 5 min ago</div>
            <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mt-3">
              <AlertCircle className="w-5 h-5 text-[#C1121F]" />
            </div>
            <div className="flex-1 mt-3">
              <p className="text-[10px] font-bold text-[#C1121F] uppercase tracking-wide mb-1">
                4 of 15 trucks need recharge today
              </p>
              <h1 className="text-base font-bold text-[#111827] leading-tight">
                11 trucks ready, 4 need recharge before next movement
              </h1>
              <p className="text-xl font-bold text-[#111827] mt-1.5">
                ₹8,400 <span className="text-[11px] font-normal text-[#6B7280]">required</span>
              </p>
              <p className="text-[11px] text-[#6B7280] mt-1">Recharge now to avoid delays at toll plazas.</p>
            </div>
          </div>
          <button
            className="w-full mt-4 bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            onClick={() => { setActiveSheet('recharge'); setRechargeStep('confirm'); }}
          >
            <RefreshCw className="w-4 h-4" />
            Recharge All Trucks
          </button>
        </div>

        {/* SECTION 2: Plan Today's Trip */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#C1121F]" />
            <h2 className="text-base font-bold text-[#111827]">Plan Today's Trip</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-[#374151] mb-1.5 block">Truck</label>
              <select className="bank-input text-sm py-2" value={tripTruck} onChange={e => { setTripTruck(e.target.value); setShowEstimate(false); }}>
                {trucks.map(t => <option key={t.id}>{t.id}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#374151] mb-1.5 block">From</label>
                <input className="bank-input text-sm py-2" value={tripFrom} onChange={e => { setTripFrom(e.target.value); setShowEstimate(false); }} placeholder="e.g. Kota" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#374151] mb-1.5 block">To</label>
                <input className="bank-input text-sm py-2" value={tripTo} onChange={e => { setTripTo(e.target.value); setShowEstimate(false); }} placeholder="e.g. Jaipur" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#374151] mb-1.5 block">Trip Type</label>
              <select className="bank-input text-sm py-2" value={tripType} onChange={e => { setTripType(e.target.value); setShowEstimate(false); }}>
                <option>One Way</option>
                <option>Return Trip</option>
              </select>
            </div>
          </div>

          {showEstimate ? (
            <div className="mt-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
              <h3 className="text-[11px] font-bold text-[#111827] mb-3 uppercase tracking-wide">Toll Estimate</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-[#6B7280] font-medium">Estimated Toll</p>
                  <p className="text-base font-bold text-[#111827] mt-0.5">₹1,850</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#6B7280] font-medium">Current Balance</p>
                  <p className="text-base font-bold text-[#DC2626] mt-0.5">₹450</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#6B7280] font-medium">Suggested</p>
                  <p className="text-base font-bold text-[#111827] mt-0.5">₹1,500</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-1/3 border border-[#E5E7EB] text-[#111827] rounded-xl py-3 text-sm font-semibold"
                  onClick={() => setShowEstimate(false)}
                >
                  Edit Trip
                </button>
                <button
                  className="w-2/3 bg-[#C1121F] text-white rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2"
                  onClick={() => { setActiveSheet('recharge'); setRechargeStep('confirm'); }}
                >
                  Use This Recharge
                </button>
              </div>
              <p className="text-[10px] text-[#9CA3AF] mt-3 text-center leading-tight">Estimate is based on route, vehicle type, and available toll data. Actual tolls may vary slightly.</p>
            </div>
          ) : (
            <button className="w-full mt-4 border border-[#E5E7EB] text-[#111827] rounded-xl py-3 text-sm font-semibold" onClick={() => setShowEstimate(true)}>
              Get Trip Toll Estimate
            </button>
          )}
        </div>

        {/* SECTION 3: Wallet */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FEE2E2] to-transparent opacity-50 rounded-bl-full pointer-events-none" />
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">IDFC FASTag Wallet</p>
            <p className="text-lg font-bold text-[#111827]">₹4,200 <span className="text-[11px] font-medium text-[#6B7280] lowercase">available</span></p>
            <p className="text-[10px] text-[#9CA3AF]">Linked to IDFC Current Account ending 8892</p>
        </div>

        {/* SECTION 4: Trucks Needing Recharge */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#111827]">Trucks Needing Recharge</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#6B7280]">15 trucks: 12 Own, 3 Hired</span>
              <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] font-bold px-2 py-0.5 rounded-full">4 trucks</span>
            </div>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-1 mb-3">Suggested amounts use current balance and planned trip estimate where available.</p>
          <div className="space-y-3">
            {trucks.map(truck => (
              <div key={truck.id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#111827]">{truck.id}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${truck.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0`}>
                        {truck.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${truck.status === 'Critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'}`}>
                        {truck.status}
                      </span>
                    </div>
                    {truck.route && (
                      <p className="text-[10px] text-[#6B7280] mt-1.5">Current trip: {truck.route}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B7280]">Balance</p>
                    <p className="font-bold text-[#DC2626]">₹{truck.balance}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Suggested Recharge</p>
                    <p className="text-sm font-bold text-[#111827]">₹{truck.suggested.toLocaleString()}</p>
                  </div>
                  <button
                    className="bg-[#C1121F] text-white px-4 py-2 rounded-lg text-xs font-semibold"
                    onClick={() => showToast(`Recharge of ₹${truck.suggested.toLocaleString()} submitted for ${truck.id}`)}
                  >
                    Recharge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Recent Toll Deductions */}
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
                    <p className="text-[10px] text-[#6B7280] mt-0.5">{t.plaza}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#111827]">₹{t.amount.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] font-medium text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded mt-1 inline-block">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Toll Issues */}
        <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-5 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-[#111827]">2 toll issues open</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Track failed recharge, double deduction, and wrong toll charges.</p>
            </div>
          </div>
          <button
            className="bg-white border border-[#E5E7EB] text-[#111827] text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0"
            onClick={() => setActiveSheet('issues')}
          >
            Track Issues
          </button>
        </div>

        {/* SECTION 7: Quick Actions */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm" onClick={() => setActiveSheet('trucks')}>
              <Truck className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">My Trucks</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">View truck balance and status.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm" onClick={() => setActiveSheet('issues')}>
              <AlertCircle className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">Toll Issues</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">Track recharge and toll problems.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm" onClick={() => showToast('Monthly toll report downloaded.')}>
              <FileText className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">Monthly Toll Report</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">Download toll spend for accounting and GST support.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm" onClick={() => setActiveSheet('budget')}>
              <IndianRupee className="w-5 h-5 text-[#4B5563] mb-2" />
              <h3 className="font-semibold text-sm text-[#111827]">Hired Truck Budget</h3>
              <p className="text-[10px] text-[#6B7280] mt-1">Track toll money for hired trucks.</p>
            </div>
          </div>
        </div>

        {/* SECTION 8: Staff Access */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-1">Staff Access</h2>
          <p className="text-[11px] text-[#6B7280] mb-3">Give helpers or accountants limited access without sharing your account.</p>
          <div className="grid gap-3">
            {[
              { icon: User, title: 'Owner', access: 'Full access', color: 'text-[#C1121F]', bg: 'bg-[#FEF2F2]' },
              { icon: Users, title: 'Staff', access: 'Recharge access', color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
              { icon: Briefcase, title: 'Accountant', access: 'Report only', color: 'text-[#2563EB]', bg: 'bg-[#EFF6FF]' },
            ].map(({ icon: Icon, title, access, color, bg }) => (
              <div key={title} className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#111827]">{title}</p>
                  <p className="text-[10px] text-[#6B7280]">{access}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 bg-white border border-[#E5E7EB] text-[#111827] rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm" onClick={() => showToast('Staff access invite sent')}>
            <Users className="w-4 h-4" />
            Invite Staff
          </button>
        </div>
      </div>

      {/* Recharge Sheet */}
      {activeSheet === 'recharge' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setActiveSheet(null)} />
          <div className="bg-white w-full rounded-t-2xl flex flex-col max-h-[90vh] relative z-10 animate-slideUp">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-base font-bold text-[#111827]">Bulk Recharge</h2>
              <button onClick={() => setActiveSheet(null)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {rechargeStep === 'confirm' && (
                <div className="space-y-6">
                  <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]">
                    <div className="flex justify-between text-sm mb-2"><span className="text-[#6B7280]">Selected trucks</span><span className="font-semibold text-[#111827]">4 trucks</span></div>
                    <div className="flex justify-between text-sm"><span className="text-[#6B7280]">Total amount</span><span className="font-bold text-[#111827]">₹8,400</span></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#374151]">Pay from</label>
                    <div className="border border-[#C1121F] bg-[#FEF2F2] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-[#C1121F]" />
                        <div><p className="text-sm font-semibold text-[#991B1B]">IDFC Current Account</p><p className="text-[10px] text-[#DC2626]">Ending 8892</p></div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-[#C1121F]" />
                    </div>
                  </div>
                </div>
              )}
              {rechargeStep === 'pending' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-[#C1121F] animate-spin" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Recharge Pending</h2>
                    <p className="text-sm text-[#6B7280] mt-1 px-4 leading-relaxed">We will update the status once confirmed.</p>
                  </div>
                </div>
              )}
              {rechargeStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Recharge Successful</h2>
                    <p className="text-sm text-[#6B7280] mt-2 px-4 leading-relaxed">₹8,400 has been successfully added to 4 FASTag wallets.</p>
                  </div>
                  <button className="text-[10px] text-[#6B7280] hover:underline mt-4" onClick={() => setRechargeStep('failed')}>Simulate Failed State</button>
                </div>
              )}
              {rechargeStep === 'failed' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-[#DC2626]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Recharge Failed</h2>
                    <p className="text-sm text-[#6B7280] mt-2 px-4 leading-relaxed">Bank timeout or insufficient funds.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-[#E5E7EB] bg-white pb-safe">
              {rechargeStep === 'confirm' && (
                <button className="w-full bg-[#C1121F] text-white rounded-xl py-4 font-semibold text-sm flex items-center justify-center gap-2" onClick={() => {
                  setRechargeStep('pending');
                  setTimeout(() => setRechargeStep('success'), 1500);
                }}>
                  Confirm Payment — ₹8,400
                </button>
              )}
              {rechargeStep === 'success' && (
                <button className="w-full bg-[#F3F4F6] text-[#111827] rounded-xl py-4 font-semibold text-sm" onClick={() => setActiveSheet(null)}>Done</button>
              )}
              {rechargeStep === 'failed' && (
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#F3F4F6] text-[#111827] rounded-xl py-4 font-semibold text-sm" onClick={() => { setActiveSheet('issues'); setRechargeStep('confirm'); }}>Raise Issue</button>
                  <button className="flex-1 bg-[#C1121F] text-white rounded-xl py-4 font-semibold text-sm" onClick={() => setRechargeStep('confirm')}>Retry</button>
                </div>
              )}
              {rechargeStep === 'pending' && null}
            </div>
          </div>
        </div>
      )}

      {['trucks', 'issues', 'budget'].includes(activeSheet || '') && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setActiveSheet(null)} />
          <div className="bg-white w-full rounded-t-2xl flex flex-col h-[85vh] relative z-10 animate-slideUp">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-base font-bold text-[#111827] capitalize">{activeSheet === 'issues' ? 'Toll Issues' : activeSheet === 'budget' ? 'Hired Truck Budget' : 'My Trucks'}</h2>
              <button onClick={() => setActiveSheet(null)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-[#F7F8FA]">
              {activeSheet === 'trucks' && (
                <div className="space-y-3">
                  {trucks.map(truck => (
                    <div key={truck.id} className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-[#111827]">{truck.id}</p>
                          <span className={`badge ${truck.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0 mt-1`}>
                            {truck.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${truck.balance < 500 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>₹{truck.balance}</p>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${truck.status === 'Critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'}`}>
                            {truck.status}
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#F9FAFB] rounded-lg p-3 text-xs mb-3">
                        <div className="flex justify-between mb-1.5"><span className="text-[#6B7280]">Driver</span><span className="font-medium text-[#111827]">{truck.driver}</span></div>
                        <div className="flex justify-between mb-1.5"><span className="text-[#6B7280]">Phone</span><span className="font-medium text-[#111827]">{truck.phone}</span></div>
                        <div className="flex justify-between"><span className="text-[#6B7280]">Current Route</span><span className="font-medium text-[#111827]">{truck.route || '-'}</span></div>
                      </div>
                      <button className="w-full bg-[#C1121F] text-white py-2.5 rounded-lg text-sm font-semibold" onClick={() => { setActiveSheet(null); showToast(`Recharge submitted for ${truck.id}`); }}>
                        Recharge
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {activeSheet === 'budget' && (
                <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xl font-bold text-[#111827] flex items-center gap-2">RJ 14 XZ 9999 <span className="badge badge-gray text-[10px] py-0">Hired Truck</span></p>
                      <p className="text-sm font-medium text-[#6B7280] mt-1">Driver: Mukesh Bhai</p>
                      <p className="text-sm font-medium text-[#6B7280]">Trip: Delhi to Jaipur</p>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#F3F4F6]"><p className="text-[10px] text-[#6B7280] uppercase font-semibold">Total Budget</p><p className="font-bold mt-1 text-base text-[#111827]">₹3,450</p></div>
                    <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#F3F4F6]"><p className="text-[10px] text-[#6B7280] uppercase font-semibold">Next Toll Bal.</p><p className="font-bold mt-1 text-base text-[#111827]">₹450</p></div>
                    <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#F3F4F6]"><p className="text-[10px] text-[#6B7280] uppercase font-semibold">Spent</p><p className="font-bold mt-1 text-base text-[#111827]">₹1,200</p></div>
                    <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#F3F4F6]"><p className="text-[10px] text-[#6B7280] uppercase font-semibold">Remaining</p><p className="font-bold mt-1 text-base text-[#16A34A]">₹2,250</p></div>
                  </div>
                  <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full" style={{width: '34%'}} />
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] mt-2">34% of budget used</p>
                </div>
              )}
              {activeSheet === 'issues' && (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-[#111827]">Double Deduction</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">MH 04 1234</p>
                      </div>
                      <span className="badge badge-warning">Open</span>
                    </div>
                    <p className="text-lg font-bold text-[#111827] mt-1 mb-3">₹1,450</p>
                    <button className="w-full bg-[#F3F4F6] text-[#111827] py-2 rounded-lg text-sm font-semibold" onClick={() => setActiveSheet(null)}>View</button>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-[#111827]">Failed Recharge Deducted</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">KA 03 CD 7890</p>
                      </div>
                      <span className="badge badge-warning">Open</span>
                    </div>
                    <p className="text-lg font-bold text-[#111827] mt-1 mb-3">₹2,100</p>
                    <button className="w-full bg-[#F3F4F6] text-[#111827] py-2 rounded-lg text-sm font-semibold" onClick={() => setActiveSheet(null)}>Track</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-slideUp">
          {toast}
        </div>
      )}
    </div>
  );
}
