import { useState } from 'react';
import { gstStats } from '@/data/mockData';
import {
  Database,
  CheckCircle2,
  FileText,
  Gavel,
  Ban,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function GstAggregator() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center animate-fadeIn">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Main Graphic */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B0000]/20 to-[#DC2626]/5 animate-pulse-glow" />
          <div className="absolute inset-4 rounded-full bg-[#111111] border border-[#27272A] flex items-center justify-center">
            <Database className="w-12 h-12 text-[#DC2626]" />
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-[#DC2626] shadow-lg shadow-red-500/50" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 rounded-full bg-gray-600" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white tracking-tight">GST Account Aggregator</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Cross-bank reconciliation powered by RBI Account Aggregator API.
            Generate comprehensive input tax credit reports.
          </p>
        </div>

        {/* Primary Action */}
        <div className="space-y-4">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              generated
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : generating
                ? 'bg-[#1A1A1A] text-gray-400 border border-[#27272A] cursor-wait'
                : 'bg-gradient-to-r from-[#8B0000] to-[#DC2626] text-white hover:shadow-lg hover:shadow-red-900/40 animate-pulse-glow'
            }`}
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-600 border-t-gray-300 rounded-full animate-spin" />
                Processing Cross-Bank Reconciliation...
              </>
            ) : generated ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                April 2026 GST Report Generated
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate April 2026 GST Input Tax Credit Report
              </>
            )}
          </button>

          {!generating && !generated && (
            <p className="text-xs text-gray-600">
              Powered by RBI Account Aggregator API. Cross-bank reconciliation.
            </p>
          )}
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div className="bg-[#111111] rounded-xl border border-[#27272A] p-4 text-left card-hover">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-lg font-semibold text-white">{gstStats.receiptsReconciled}</p>
            <p className="text-xs text-gray-500 mt-1">Receipts Auto-Reconciled</p>
          </div>

          <div className="bg-[#111111] rounded-xl border border-[#27272A] p-4 text-left card-hover">
            <div className="w-8 h-8 rounded-lg bg-[#8B0000]/15 flex items-center justify-center mb-3">
              <Gavel className="w-4 h-4 text-[#DC2626]" />
            </div>
            <p className="text-lg font-semibold text-white">{gstStats.disputesWon}</p>
            <p className="text-xs text-gray-500 mt-1">Geospatial Disputes Won</p>
          </div>

          <div className="bg-[#111111] rounded-xl border border-[#27272A] p-4 text-left card-hover">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
              <Ban className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-lg font-semibold text-white">Rs.{gstStats.duplicateTollsPrevented.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Duplicate Tolls Prevented</p>
          </div>
        </div>
      </div>
    </div>
  );
}
