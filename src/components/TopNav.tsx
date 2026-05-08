import { useState } from 'react';
import { Search, Bell, Settings, Command } from 'lucide-react';

interface TopNavProps {
  fleetMode: 'owned' | 'market';
  onFleetModeChange: (mode: 'owned' | 'market') => void;
}

export default function TopNav({ fleetMode, onFleetModeChange }: TopNavProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-[72px] sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-[#27272A] flex items-center justify-between px-6">
      {/* Left spacer to account for sidebar */}
      <div className="w-[260px]" />

      {/* Center: Segmented Control */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <div className="flex bg-[#111111] rounded-xl p-1 border border-[#27272A]">
          <button
            onClick={() => onFleetModeChange('owned')}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              fleetMode === 'owned'
                ? 'bg-gradient-to-r from-[#8B0000] to-[#DC2626] text-white shadow-lg shadow-red-900/20'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              Owned Fleet
              <span className="text-[10px] opacity-60">(Direct Assets)</span>
            </span>
          </button>
          <button
            onClick={() => onFleetModeChange('market')}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              fleetMode === 'market'
                ? 'bg-gradient-to-r from-[#8B0000] to-[#DC2626] text-white shadow-lg shadow-red-900/20'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              Market Fleet
              <span className="text-[10px] opacity-60">(Attached Assets)</span>
            </span>
          </button>
        </div>
      </div>

      {/* Right: Search, Notifications, Settings */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div
          className={`flex items-center gap-2 bg-[#111111] border rounded-lg px-3 py-2 transition-all duration-200 ${
            searchFocused ? 'border-[#8B0000]/50 w-72' : 'border-[#27272A] w-56'
          }`}
        >
          <Search className="w-4 h-4 text-gray-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search vehicles, trips..."
            className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-600 w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="flex items-center gap-0.5 text-gray-600 flex-shrink-0">
            <Command className="w-3 h-3" />
            <span className="text-[10px]">K</span>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#111111] border border-[#27272A] hover:border-[#8B0000]/30 transition-colors group">
          <Bell className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DC2626] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse-dot" />
          </span>
        </button>

        {/* Settings */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#111111] border border-[#27272A] hover:border-[#8B0000]/30 transition-colors group">
          <Settings className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
        </button>
      </div>
    </header>
  );
}
