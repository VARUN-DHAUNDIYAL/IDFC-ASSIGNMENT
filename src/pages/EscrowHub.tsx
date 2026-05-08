import { marketEscrows } from '@/data/mockData';
import { InfoTooltip } from '@/components/TooltipEngine';
import {
  Plus,
  MapPin,
  Navigation,
  FileText,
  CheckCircle2,
  ArrowRight,
  Eye,
} from 'lucide-react';

export default function EscrowHub() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">JIT Escrow Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Active Trip Escrows (Just-In-Time Funding)</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B0000] to-[#DC2626] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-red-900/30 transition-all duration-200">
          <Plus className="w-4 h-4" />
          Create New Trip Escrow
        </button>
      </div>

      {/* Trip Cards */}
      <div className="space-y-4">
        {marketEscrows.map((trip, index) => {
          const progressPercent = (trip.spent / trip.totalBudget) * 100;
          const consumedPercent = (trip.spent / trip.totalBudget) * 100;
          const remainingPercent = (trip.remaining / trip.totalBudget) * 100;

          return (
            <div
              key={trip.tripId}
              className="bg-[#111111] rounded-xl border border-[#27272A] overflow-hidden card-hover animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-[#27272A]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8B0000]/15 flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-[#DC2626]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Trip #{trip.tripId}
                        <span className="text-gray-500 font-normal mx-2">{String.fromCharCode(8226)}</span>
                        {trip.origin}
                        <ArrowRight className="w-3.5 h-3.5 text-gray-600 inline mx-2" />
                        {trip.destination}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-600" />
                    <span className="text-xs text-gray-500">E-Way Bill: {trip.eWayBill}</span>
                  </div>
                </div>

                {/* Card Sub-header */}
                <div className="flex items-center gap-2 mt-2 ml-11">
                  <span className="text-xs text-gray-500">
                    Contractor Asset: <span className="text-gray-400 font-medium">{trip.vehicleReg}</span>
                  </span>
                  <span className="text-gray-700">|</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-gray-500">
                      Driver: Verified via WhatsApp Gateway
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial UI: Progress Bar */}
              <div className="px-6 py-5">
                {/* Multi-segmented Progress Bar */}
                <div className="relative w-full h-3 bg-[#0a0a0a] rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-[#8B0000] to-[#DC2626] progress-segment rounded-l-full"
                    style={{ width: `${consumedPercent}%` }}
                  />
                  <div
                    className="h-full bg-[#27272A] progress-segment"
                    style={{ width: `${remainingPercent}%` }}
                  />
                </div>

                {/* Data Points */}
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Escrow Locked</p>
                    <p className="text-sm font-semibold text-white">Rs.{trip.escrowLocked.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Consumed</p>
                    <p className="text-sm font-semibold text-[#DC2626]">Rs.{trip.spent.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Remaining</p>
                    <p className="text-sm font-semibold text-emerald-400">Rs.{trip.remaining.toLocaleString()}</p>
                  </div>
                </div>

                {/* Budget context */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#27272A]/50">
                  <span className="text-xs text-gray-600">
                    Total Budget: <span className="text-gray-400">Rs.{trip.totalBudget.toLocaleString()}</span>
                  </span>
                  <span className="text-xs text-gray-600">
                    Next Toll: <span className="text-gray-400">{trip.nextTollName} ({trip.nextTollDistance}km)</span>
                  </span>
                </div>
              </div>

              {/* Telematics Trigger UI */}
              <div className="mx-6 mb-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-radar-ping" />
                    </div>
                    <span className="text-xs text-gray-400">
                      Asset approaching <span className="text-emerald-400 font-medium">{trip.nextTollName}</span>
                      <span className="text-gray-600"> ({trip.nextTollDistance}km away). Triggering </span>
                      <span className="text-emerald-400 font-medium">Rs.{trip.preCacheAmount}</span>
                      <span className="text-gray-600"> TTL Pre-Cache via BBPS.</span>
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500/20 rounded-lg text-xs text-emerald-400 hover:bg-emerald-500/10 transition-colors flex-shrink-0">
                    <Eye className="w-3 h-3" />
                    View Geofence Radius
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
