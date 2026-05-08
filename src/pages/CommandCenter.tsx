import { fleetLiquidity, anomalies } from '@/data/mockData';
import { InfoTooltip } from '@/components/TooltipEngine';
import {
  AlertTriangle,
  TrendingDown,
  Shield,
  ArrowUpRight,
  Zap,
  Map,
  Upload,
} from 'lucide-react';

const severityConfig = {
  critical: { icon: AlertTriangle, iconColor: 'text-rose-500', bgColor: 'bg-rose-500/10', borderColor: 'border-rose-500/20' },
  warning: { icon: TrendingDown, iconColor: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
  info: { icon: Shield, iconColor: 'text-gray-500', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/20' },
};

const statusConfig = {
  blocked: 'bg-rose-500 text-white',
  triggered: 'bg-amber-500 text-black',
  pending: 'border border-gray-600 text-gray-400',
};

const actionIcons: Record<string, React.ElementType> = {
  'View Prov. Credit Details': Zap,
  'Review Route Map': Map,
  'Upload RC Document': Upload,
};

export default function CommandCenter() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Command Center</h1>
          <p className="text-sm text-gray-500 mt-1">Exception-based fleet management dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-gray-500 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Section 1A: Liquidity Masterboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Available Liquidity */}
        <div className="bg-[#111111] rounded-xl border border-[#27272A] p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Total Available Liquidity</span>
            <InfoTooltip content="Replaces dead prepaid capital with a 7.5% yield Lien-Marked FD, securing IDFC bank credit risk." />
          </div>
          <div className="text-3xl font-semibold text-white tracking-tight">
            {formatCurrency(fleetLiquidity.totalAvailable)}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              +{fleetLiquidity.yieldRate}% Yield Active
            </span>
          </div>
        </div>

        {/* Card 2: Daily Toll Burn Rate */}
        <div className="bg-[#111111] rounded-xl border border-[#27272A] p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Daily Toll Burn Rate</span>
            <InfoTooltip content="Calculated via daily local database cron-job, eliminating real-time execution dependency on NHAI government APIs." />
          </div>
          <div className="text-3xl font-semibold text-white tracking-tight">
            {formatCurrency(fleetLiquidity.dailyBurn)}
          </div>
          <div className="mt-3">
            <span className="text-xs text-gray-500">
              Based on {fleetLiquidity.activeVehicles} active routing vehicles
            </span>
          </div>
        </div>

        {/* Card 3: Pending Auto-Sweeps */}
        <div className="bg-[#111111] rounded-xl border border-[#27272A] p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Pending Auto-Sweeps (24h)</span>
            <InfoTooltip content="Protected by Physics-Based Velocity Locks. Automatically freezes tags exceeding maximum geographical spend of Rs.5,000/day to prevent credit bust-outs." />
          </div>
          <div className="text-3xl font-semibold text-white tracking-tight">
            14 Vehicles
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-medium">
              Action Required: 3 Anomalies
            </span>
          </div>
        </div>
      </div>

      {/* Section 1B: Anomaly Detection & Exceptions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
            Anomaly Detection & Exceptions
          </h2>
          <span className="text-xs text-gray-600">{anomalies.length} critical items</span>
        </div>

        <div className="space-y-3">
          {anomalies.map((anomaly, index) => {
            const config = severityConfig[anomaly.severity];
            const ActionIcon = actionIcons[anomaly.actionLabel] || Zap;
            const IconComponent = config.icon;

            return (
              <div
                key={anomaly.id}
                className={`bg-[#111111] rounded-xl border ${config.borderColor} p-5 animate-slideInUp stagger-${index + 1} opacity-0`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
                  </div>

                  {/* Data Column 1 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">{anomaly.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{anomaly.description}</p>
                  </div>

                  {/* Data Column 2: Status */}
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${statusConfig[anomaly.status]}`}>
                      {anomaly.statusLabel}
                    </span>
                  </div>

                  {/* Action Column */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <button
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        anomaly.type === 'kyc'
                          ? 'bg-gradient-to-r from-[#8B0000] to-[#DC2626] text-white hover:shadow-lg hover:shadow-red-900/30'
                          : 'bg-[#1A1A1A] border border-[#27272A] text-gray-300 hover:border-[#8B0000]/30 hover:text-white'
                      }`}
                    >
                      <ActionIcon className="w-3.5 h-3.5" />
                      {anomaly.actionLabel}
                    </button>
                    <InfoTooltip content={anomaly.tooltipLogic} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
