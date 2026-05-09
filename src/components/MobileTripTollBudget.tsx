import { useState } from 'react';
import { Plus, CheckCircle, Search, MapPin, Truck, ArrowRight, X } from 'lucide-react';
import { tripBudgets } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';

export default function MobileTripTollBudget() {
  const [toast, setToast] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleCreate = () => {
    setShowCreate(false);
    showToast('Trip Toll Budget created successfully');
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-5">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Trip Toll Budget</h1>
          <p className="text-sm text-[#6B7280] mt-1">Set toll limits for hired and own trucks per trip.</p>
        </div>

        {/* Create Button */}
        <button 
          className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="w-4 h-4" />
          Create Trip Budget
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by truck or route..." 
            className="bank-input pl-10 w-full py-3 text-base"
          />
        </div>

        {/* Trip Cards */}
        <div className="space-y-4 mt-2">
          {tripBudgets.map(trip => {
            const usagePercent = (trip.spent / trip.totalBudget) * 100;
            const remaining = trip.totalBudget - trip.spent;
            const isExceeded = usagePercent >= 100;

            return (
              <div key={trip.tripId} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm relative overflow-hidden">
                {/* Status Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  trip.status === 'completed' ? 'bg-[#9CA3AF]' :
                  isExceeded ? 'bg-[#DC2626]' : 'bg-[#16A34A]'
                }`} />

                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#111827]">
                    <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    {trip.from} <ArrowRight className="w-3 h-3 text-[#6B7280]" /> {trip.to}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    trip.status === 'completed' ? 'bg-[#F3F4F6] text-[#6B7280]' :
                    isExceeded ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#DCFCE7] text-[#16A34A]'
                  }`}>
                    {trip.status === 'completed' ? 'Completed' : 'Active'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#4B5563] mb-4">
                  <Truck className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[#111827]">{trip.truckNumber}</span>
                  <span className="text-[#9CA3AF]">|</span>
                  <span>Today</span>
                </div>

                <div className="bg-[#F9FAFB] rounded-lg p-3 border border-[#E5E7EB] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B7280]">Budget: <span className="font-semibold text-[#111827]">₹{trip.totalBudget}</span></span>
                    <span className="text-[#6B7280]">Spent: <span className="font-semibold text-[#111827]">₹{trip.spent}</span></span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isExceeded ? 'bg-[#DC2626]' : 'bg-[#16A34A]'}`}
                      style={{ width: `${Math.min(usagePercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={isExceeded ? 'text-[#DC2626]' : 'text-[#16A34A]'}>
                      {isExceeded ? 'Budget Exceeded' : `${usagePercent.toFixed(0)}% Used`}
                    </span>
                    <span className="text-[#111827]">
                      ₹{remaining > 0 ? remaining : 0} Remaining
                    </span>
                  </div>
                </div>

                <button 
                  className="mt-4 w-full bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB] rounded-lg py-2.5 font-semibold text-xs transition-colors"
                  onClick={() => showToast('Viewing trip details')}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Create Budget Bottom Sheet ── */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="bg-white w-full rounded-t-2xl flex flex-col max-h-[90vh] relative z-10 animate-slideUp">
            
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-base font-bold text-[#111827]">Create Trip Toll Budget</h2>
              <button onClick={() => setShowCreate(false)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">Truck Number</label>
                <input type="text" className="bank-input text-base" placeholder="Enter truck number" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">Driver Mobile</label>
                <input type="tel" className="bank-input text-base" placeholder="Enter driver mobile" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#374151]">From City</label>
                  <input type="text" className="bank-input text-base" placeholder="Origin" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#374151]">To City</label>
                  <input type="text" className="bank-input text-base" placeholder="Destination" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center text-xs font-semibold text-[#374151]">
                  Estimated Toll Budget
                  <InfoTooltip content="The maximum amount of toll this truck can spend during this specific trip." />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm font-medium">₹</span>
                  <input type="number" className="bank-input pl-7 text-base" placeholder="e.g. 5000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Start Date</label>
                  <input type="date" className="bank-input text-base" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#374151]">End Date</label>
                  <input type="date" className="bank-input text-base" />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E7EB] bg-white pb-safe">
              <button 
                className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center"
                onClick={handleCreate}
              >
                Create Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-slideUp flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
          {toast}
        </div>
      )}
    </div>
  );
}
