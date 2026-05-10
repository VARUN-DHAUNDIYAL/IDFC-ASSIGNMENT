import { useState } from 'react';
import { Search, Info, X, Shield, RefreshCw, CheckCircle, Truck } from 'lucide-react';
import { vehicleList, recentTolls } from '@/data/mockData';

type FilterType = 'All' | 'Own Trucks' | 'Hired Trucks' | 'Low Balance' | 'KYC Issue';

export default function MobileFleetRoster() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [activeTruck, setActiveTruck] = useState<typeof vehicleList[0] | null>(null);

  const filters: FilterType[] = ['All', 'Own Trucks', 'Hired Trucks', 'Low Balance', 'KYC Issue'];

  const filtered = vehicleList.filter(v => {
    const matchSearch = v.rcNumber.toLowerCase().includes(search.toLowerCase()) || 
                       v.driverName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = 
      activeFilter === 'All' ? true :
      activeFilter === 'Own Trucks' ? v.type === 'own' :
      activeFilter === 'Hired Trucks' ? v.type === 'hired' :
      activeFilter === 'Low Balance' ? (v.status === 'low_balance' || v.status === 'critical') :
      activeFilter === 'KYC Issue' ? v.kycStatus === 'kyc_issue' : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-5">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Fleet Roster</h1>
          <p className="text-sm text-[#6B7280] mt-1">Manage all your vehicles and FASTags</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search truck or driver..." 
            className="bank-input pl-10 w-full py-3 text-base"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto gap-2 pb-1 hide-scrollbar -mx-4 px-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeFilter === f 
                  ? 'bg-[#111827] text-white border-[#111827]' 
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#111827]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Vehicle Cards */}
        <div className="space-y-3">
          {filtered.map(truck => (
            <div key={truck.id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-[#111827]">{truck.rcNumber}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${truck.type === 'own' ? 'bg-[#EFF6FF] text-[#1E40AF]' : 'bg-[#F3F4F6] text-[#4B5563]'}`}>
                      {truck.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                    </span>
                    <p className="text-xs text-[#6B7280]">{truck.driverName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#111827]">₹{truck.balance}</p>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${
                    truck.status === 'critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : 
                    truck.status === 'low_balance' ? 'bg-[#FFFBEB] text-[#D97706]' : 
                    'bg-[#DCFCE7] text-[#16A34A]'
                  }`}>
                    {truck.status === 'critical' ? 'Critical' : truck.status === 'low_balance' ? 'Low Balance' : 'Active'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F3F4F6] text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                <div className="flex flex-col gap-1">
                  <span>KYC Status</span>
                  {truck.kycStatus === 'verified' ? (
                    <span className="text-[#16A34A] flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</span>
                  ) : (
                    <span className="text-[#DC2626] flex items-center gap-1"><Info className="w-3 h-3" /> Pending</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span>Auto Recharge</span>
                  {truck.autoRecharge ? (
                    <span className="text-[#111827]">Active</span>
                  ) : (
                    <span className="text-[#9CA3AF]">Off</span>
                  )}
                </div>
              </div>

              <button 
                className="mt-4 w-full bg-[#F3F4F6] text-[#111827] rounded-lg py-2.5 font-semibold text-xs active:bg-[#E5E7EB] transition-colors"
                onClick={() => setActiveTruck(truck)}
              >
                Manage
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 bg-white border border-[#E5E7EB] rounded-xl">
              <Truck className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3 opacity-50" />
              <p className="text-[#6B7280] text-sm">No trucks found.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Manage Bottom Sheet ── */}
      {activeTruck && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setActiveTruck(null)} />
          <div className="bg-[#F7F8FA] w-full rounded-t-2xl flex flex-col h-[90vh] relative z-10 animate-slideUp">
            
            <div className="flex items-center justify-between px-5 py-4 bg-white rounded-t-2xl border-b border-[#E5E7EB]">
              <div>
                <h2 className="text-lg font-bold text-[#111827]">{activeTruck.rcNumber}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${activeTruck.type === 'own' ? 'bg-[#EFF6FF] text-[#1E40AF]' : 'bg-[#F3F4F6] text-[#4B5563]'}`}>
                    {activeTruck.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                  </span>
                  <p className="text-xs text-[#6B7280]">{activeTruck.driverName}</p>
                </div>
              </div>
              <button onClick={() => setActiveTruck(null)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Balances */}
              <div className="flex gap-3">
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex-1 shadow-sm">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold">Current Balance</p>
                  <p className="text-xl font-bold text-[#111827] mt-1">₹{activeTruck.balance}</p>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex-1 shadow-sm">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold">Today's Spend</p>
                  <p className="text-xl font-bold text-[#111827] mt-1">₹850</p>
                </div>
              </div>

              {/* Rules & Limits */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#C1121F]" />
                    <span className="text-sm font-semibold text-[#111827]">Auto Recharge Rule</span>
                  </div>
                  {activeTruck.autoRecharge ? (
                    <span className="text-xs font-semibold text-[#16A34A]">Active</span>
                  ) : (
                    <span className="text-xs text-[#6B7280]">Not Setup</span>
                  )}
                </div>
                {activeTruck.autoRecharge && (
                  <div className="bg-[#F9FAFB] rounded-lg p-3 text-xs text-[#374151] border border-[#E5E7EB]">
                    Adds <span className="font-bold">₹2,000</span> when balance falls below <span className="font-bold">₹500</span>.
                  </div>
                )}
                
                <div className="border-t border-[#F3F4F6] pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#D97706]" />
                    <span className="text-sm font-semibold text-[#111827]">Daily Spend Limit</span>
                  </div>
                  <span className="text-xs font-semibold text-[#111827]">₹4,000</span>
                </div>
              </div>

              {/* Recent Tolls */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#111827] mb-3">Recent Tolls</h3>
                <div className="space-y-3">
                  {recentTolls.slice(0, 3).map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-semibold text-[#374151]">{t.plaza}</p>
                        <p className="text-[10px] text-[#9CA3AF] mt-0.5">{t.date}</p>
                      </div>
                      <span className="font-bold text-[#111827]">-₹{t.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="p-4 bg-white border-t border-[#E5E7EB] pb-safe grid grid-cols-2 gap-3">
              <button className="bg-[#C1121F] text-white rounded-xl py-3 font-semibold text-xs text-center">
                Recharge Truck
              </button>
              <button className="bg-[#F3F4F6] text-[#111827] rounded-xl py-3 font-semibold text-xs text-center border border-[#E5E7EB]">
                Edit Rules
              </button>
              <button className="bg-[#FFFBEB] text-[#D97706] rounded-xl py-3 font-semibold text-xs text-center border border-[#FEF3C7]">
                Raise Dispute
              </button>
              <button className="bg-[#F3F4F6] text-[#111827] rounded-xl py-3 font-semibold text-xs text-center border border-[#E5E7EB]">
                View History
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
