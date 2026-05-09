import { useState } from 'react';
import { Plus, X, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import MobileTripTollBudget from '@/components/MobileTripTollBudget';
import { tripBudgets } from '@/data/mockData';
import type { TripBudget } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

function CreateBudgetModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    truck: '', driver: '', from: '', to: '', budget: '', start: '', end: '',
  });

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#111827]">Create Trip Toll Budget</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">Set a toll budget for a hired truck's trip</p>
          </div>
          <button onClick={onClose} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Truck Number</label>
              <input className="bank-input" placeholder="e.g. RJ 14 XZ 9999" value={form.truck} onChange={e => setForm({ ...form, truck: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Driver Mobile</label>
              <input className="bank-input" placeholder="10-digit mobile" value={form.driver} onChange={e => setForm({ ...form, driver: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">From City</label>
              <input className="bank-input" placeholder="e.g. Delhi" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">To City</label>
              <input className="bank-input" placeholder="e.g. Jaipur" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Estimated Toll Budget (₹)</label>
              <input className="bank-input" placeholder="e.g. 3000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
            </div>
            <div></div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Trip Start Date</label>
              <input type="date" className="bank-input" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">Trip End Date</label>
              <input type="date" className="bank-input" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} />
            </div>
          </div>
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 text-xs text-[#1E40AF] leading-relaxed">
            For hired trucks, set a toll budget for a specific trip and track spend during the journey. This helps avoid loading excess balance into contractor controlled FASTags while still keeping the trip funded.
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-secondary flex-1 justify-center" onClick={onClose}>Cancel</button>
            <button className="btn-primary flex-1 justify-center" onClick={onSave}>
              <CheckCircle className="w-4 h-4" />
              Create Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip }: { trip: TripBudget }) {
  const pct = Math.round((trip.spent / trip.totalBudget) * 100);

  const statusConfig: Record<string, { label: string; class: string }> = {
    active: { label: 'Active', class: 'badge-success' },
    near_limit: { label: 'Near Budget Limit', class: 'badge-warning' },
    completed: { label: 'Completed', class: 'badge-gray' },
    paused: { label: 'Paused', class: 'badge-error' },
  };
  const config = statusConfig[trip.status];

  return (
    <div className={`bank-card p-5 space-y-4 ${trip.status === 'near_limit' ? 'border-l-4 border-l-[#D97706]' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#9CA3AF]">Trip #{trip.tripId}</span>
            <span className={`badge ${config.class} text-[10px]`}>{config.label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#111827]">
            <MapPin className="w-3.5 h-3.5 text-[#C1121F]" />
            {trip.from} → {trip.to}
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">Truck: {trip.truckNumber}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-[#9CA3AF]">Budget</p>
          <p className="text-lg font-bold text-[#111827]">₹{trip.totalBudget.toLocaleString('en-IN')}</p>
        </div>
      </div>
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-[#6B7280]">Spent: <strong className="text-[#111827]">₹{trip.spent.toLocaleString('en-IN')}</strong></span>
          <span className="text-[#6B7280] flex items-center">
            Remaining: <strong className="text-[#111827] ml-1">₹{trip.remaining.toLocaleString('en-IN')}</strong>
            <InfoTooltip content="Shows the toll amount still available for the hired truck trip." />
          </span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-fill ${pct > 80 ? 'bg-[#D97706]' : pct === 100 ? 'bg-[#6B7280]' : 'bg-[#C1121F]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1">{pct}% used</p>
      </div>
      {trip.nextPreload > 0 && (
        <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" />
          <p className="text-xs text-[#374151] flex items-center">
            Next Toll Balance: <strong className="ml-1 mr-1">₹{trip.nextPreload.toLocaleString('en-IN')}</strong> — based on upcoming toll
            <InfoTooltip content="Estimated amount kept ready for the next toll on the trip route." />
          </p>
        </div>
      )}
      <div className="flex gap-2 text-xs">
        <span className="text-[#9CA3AF]">{trip.startDate}</span>
        <span className="text-[#D1D5DB]">→</span>
        <span className="text-[#9CA3AF]">{trip.endDate}</span>
      </div>
    </div>
  );
}

export default function TripTollBudget() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const active = tripBudgets.filter(t => t.status !== 'completed');
  const completed = tripBudgets.filter(t => t.status === 'completed');

  return (
    <>
      <div className="block md:hidden">
        <MobileTripTollBudget />
      </div>
      <div className="hidden md:block space-y-6 animate-fadeIn pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
            Trip Toll Budget
            <InfoTooltip content="Set a toll budget for hired trucks and track spend during the trip." />
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Set a toll budget for hired trucks and track spend during the trip.
          </p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          Create Trip Toll Budget
          <InfoTooltip content="Useful when a vehicle is hired for a specific trip and the company wants controlled toll spending." />
        </button>
      </div>

      {/* Explainer */}
      <div className="bank-card p-5 flex items-start gap-4 bg-[#EFF6FF] border-[#BFDBFE]">
        <MapPin className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#1E40AF] leading-relaxed">
          <strong>How it works:</strong> For hired trucks, set a toll budget for a specific trip and track spend during the journey. This helps avoid loading excess balance into contractor controlled FASTags while still keeping the trip funded.
        </p>
      </div>

      {/* Active Trips */}
      {active.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-[#111827] mb-4">Active Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map(t => <TripCard key={t.tripId} trip={t} />)}
          </div>
        </div>
      )}

      {/* Completed Trips */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-[#6B7280] mb-4 flex items-center gap-2">
            Completed Trips
            <span className="badge badge-gray">{completed.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-75">
            {completed.map(t => <TripCard key={t.tripId} trip={t} />)}
          </div>
        </div>
      )}

      {showModal && (
        <CreateBudgetModal
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            showToast('Trip toll budget created successfully');
          }}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
