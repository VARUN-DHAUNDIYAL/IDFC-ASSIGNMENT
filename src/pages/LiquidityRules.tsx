import { useState } from 'react';
import { vehicleList } from '@/data/mockData';
import { InfoTooltip } from '@/components/TooltipEngine';
import {
  Search,
  Check,
  Filter,
  ChevronDown,
  Shield,
  Rocket,
} from 'lucide-react';

type FilterType = 'all' | 'low_balance' | 'active' | 'inactive';

export default function LiquidityRules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedVehicles, setSelectedVehicles] = useState<Set<string>>(new Set(vehicleList.map(v => v.id)));
  const [triggerAmount, setTriggerAmount] = useState('500');
  const [sweepAmount, setSweepAmount] = useState('2000');
  const [velocityLockEnabled, setVelocityLockEnabled] = useState(true);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'low_balance', label: 'Low Balance' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const filteredVehicles = vehicleList.filter((v) => {
    const matchesSearch =
      v.rcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' || v.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleVehicle = (id: string) => {
    const next = new Set(selectedVehicles);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedVehicles(next);
  };

  const toggleAll = () => {
    if (selectedVehicles.size === vehicleList.length) {
      setSelectedVehicles(new Set());
    } else {
      setSelectedVehicles(new Set(vehicleList.map(v => v.id)));
    }
  };

  const statusStyles: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    low_balance: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6 animate-fadeIn">
      {/* Left Pane: Asset Selection (30%) */}
      <div className="w-[30%] min-w-[320px] flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Dynamic Liquidity Rules</h1>
          <p className="text-sm text-gray-500 mt-1">Configure autonomous capital allocation</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#111111] border border-[#27272A] rounded-lg px-3 py-2.5">
          <Search className="w-4 h-4 text-gray-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search RC Number or Driver Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-600 w-full"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                activeFilter === f.id
                  ? 'bg-[#8B0000]/15 border-[#8B0000]/40 text-white'
                  : 'bg-transparent border-[#27272A] text-gray-500 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vehicle List */}
        <div className="flex-1 bg-[#111111] rounded-xl border border-[#27272A] overflow-hidden flex flex-col">
          {/* Select All Header */}
          <div className="px-4 py-3 border-b border-[#27272A] flex items-center gap-3">
            <button
              onClick={toggleAll}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                selectedVehicles.size === vehicleList.length
                  ? 'bg-[#DC2626] border-[#DC2626]'
                  : 'border-[#27272A] hover:border-gray-500'
              }`}
            >
              {selectedVehicles.size === vehicleList.length && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className="text-xs font-medium text-gray-400">
              Select All ({vehicleList.length} Owned Vehicles)
            </span>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => toggleVehicle(vehicle.id)}
                className={`px-4 py-3 flex items-center gap-3 border-b border-[#27272A]/50 cursor-pointer transition-colors hover:bg-white/[0.02] ${
                  selectedVehicles.has(vehicle.id) ? 'bg-[#8B0000]/5' : ''
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                    selectedVehicles.has(vehicle.id)
                      ? 'bg-[#DC2626] border-[#DC2626]'
                      : 'border-[#27272A]'
                  }`}
                >
                  {selectedVehicles.has(vehicle.id) && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">{vehicle.rcNumber}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${statusStyles[vehicle.status]}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">{vehicle.driverName}</span>
                </div>
                <span className="text-xs text-gray-600 flex-shrink-0">{vehicle.lastTrip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Pane: Logic Form (70%) */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-[#111111] rounded-xl border border-[#27272A] p-6 flex-1">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white">Configure Fleet Liquidity Rules</h2>
            <p className="text-sm text-gray-500 mt-1">Set autonomous capital allocation boundaries</p>
          </div>

          <div className="space-y-8 max-w-2xl">
            {/* Form Group 1: Trigger */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-300">
                  When vehicle FASTag balance falls below
                </label>
                <InfoTooltip content="Trigger threshold for auto-sweep activation. When balance drops below this value, the system executes a pull from the master FD." />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rs.</span>
                <input
                  type="text"
                  value={triggerAmount}
                  onChange={(e) => setTriggerAmount(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#27272A] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-[#8B0000]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Form Group 2: Execution */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-300">
                  Automatically pull funds from Master Lien-Marked FD
                </label>
                <InfoTooltip content="The sweep amount pulled from the lien-marked fixed deposit to replenish the FASTag wallet." />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rs.</span>
                <input
                  type="text"
                  value={sweepAmount}
                  onChange={(e) => setSweepAmount(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#27272A] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-[#8B0000]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Form Group 3: The Guardrail */}
            <div className="bg-[#1A1A1A] rounded-xl border border-amber-500/20 p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setVelocityLockEnabled(!velocityLockEnabled)}
                  className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors duration-300 ${
                    velocityLockEnabled ? 'bg-amber-500' : 'bg-[#27272A]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      velocityLockEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-white">
                    Enable Physics-Based Velocity Hard-Lock
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-16">
                Mathematically lock the physical tag if 24-hour route spend exceeds Rs.5,000.
                This is a deterministic failsafe against physical tag theft and postpaid credit bust-outs. Zero AI required.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <button className="w-full bg-gradient-to-r from-[#8B0000] to-[#DC2626] hover:from-[#9a0000] hover:to-[#e53030] text-white py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30 active:scale-[0.99]">
          <Rocket className="w-4 h-4" />
          Deploy Auto-Sweep Rules to {selectedVehicles.size} Assets
        </button>
      </div>
    </div>
  );
}
