import { useState } from 'react';
import { Search, Check, CheckCircle, Shield, Info } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import MobileAutoRechargeRules from '@/components/MobileAutoRechargeRules';
import { vehicleList } from '@/data/mockData';

type FilterType = 'all' | 'low_balance' | 'active' | 'hired' | 'own';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

export default function AutoRechargeRules() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(vehicleList.map(v => v.id))
  );
  const [triggerAmount, setTriggerAmount] = useState('500');
  const [rechargeAmount, setRechargeAmount] = useState('2000');
  const [applyTo, setApplyTo] = useState('selected');
  const [fundingSource, setFundingSource] = useState('IDFC Current Account');
  const [approvalAbove, setApprovalAbove] = useState('5000');
  const [dailyLimitEnabled, setDailyLimitEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'low_balance', label: 'Low Balance' },
    { id: 'active', label: 'Active' },
    { id: 'own', label: 'Own Trucks' },
    { id: 'hired', label: 'Hired Trucks' },
  ];

  const filtered = vehicleList.filter(v => {
    const matchSearch =
      v.rcNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.driverName.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ? true :
      filter === 'low_balance' ? (v.status === 'low_balance' || v.status === 'critical') :
      filter === 'active' ? v.status === 'active' :
      filter === 'own' ? v.type === 'own' :
      filter === 'hired' ? v.type === 'hired' : true;
    return matchSearch && matchFilter;
  });

  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(v => v.id)));
    }
  };

  const handleSave = () => {
    setToast('Auto recharge rule saved successfully');
    setTimeout(() => setToast(null), 4000);
  };

  const statusLabel = (v: typeof vehicleList[0]) => {
    if (v.status === 'critical') return <span className="badge badge-error text-[10px]">Critical</span>;
    if (v.status === 'low_balance') return <span className="badge badge-warning text-[10px]">Low Balance</span>;
    if (v.status === 'active') return <span className="badge badge-success text-[10px]">Active</span>;
    return <span className="badge badge-gray text-[10px]">Inactive</span>;
  };

  return (
    <>
      <div className="block md:hidden">
        <MobileAutoRechargeRules />
      </div>
      <div className="hidden md:flex h-[calc(100vh-88px)] gap-5 animate-fadeIn">

      {/* Left: Vehicle Selection */}
      <div className="w-[320px] min-w-[280px] flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#111827] flex items-center">
            Auto Recharge Rules
            <InfoTooltip content="Set simple rules so trucks are recharged before they run out of FASTag balance." />
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Set rules so trucks don't run out of FASTag balance.</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            className="bank-input pl-9"
            placeholder="Search truck or driver"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filter === f.id
                  ? 'bg-[#FEF2F2] border-[#C1121F] text-[#C1121F]'
                  : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vehicle list */}
        <div className="bank-card flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#F3F4F6] flex items-center gap-3">
            <button
              onClick={toggleAll}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                selectedIds.size === filtered.length
                  ? 'bg-[#C1121F] border-[#C1121F]'
                  : 'border-[#D1D5DB]'
              }`}
            >
              {selectedIds.size === filtered.length && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className="text-xs font-medium text-[#6B7280]">
              {selectedIds.size} of {filtered.length} selected
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(v => (
              <div
                key={v.id}
                onClick={() => toggle(v.id)}
                className={`px-4 py-2.5 flex items-center gap-3 border-b border-[#F3F4F6] cursor-pointer transition-colors hover:bg-[#F9FAFB] ${
                  selectedIds.has(v.id) ? 'bg-[#FEF2F2]/40' : ''
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selectedIds.has(v.id) ? 'bg-[#C1121F] border-[#C1121F]' : 'border-[#D1D5DB]'
                }`}>
                  {selectedIds.has(v.id) && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#111827] truncate">{v.rcNumber}</p>
                    {v.type === 'hired' && (
                      <span className="text-[10px] text-[#6B7280] bg-[#F3F4F6] px-1.5 py-0.5 rounded flex-shrink-0">Hired</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-[#9CA3AF] truncate">{v.driverName}</span>
                    {statusLabel(v)}
                  </div>
                </div>
                <span className="text-xs font-medium text-[#111827] flex-shrink-0">₹{v.balance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Rule Form */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
        <div className="bank-card p-6 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-[#111827]">Create Rule</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">This rule will apply automatically to selected trucks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Trigger */}
            <div className="space-y-1.5">
              <label className="flex items-center text-sm font-medium text-[#374151]">
                When balance falls below
                <InfoTooltip content="When a truck balance falls below this amount, the recharge rule becomes active." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm font-medium">₹</span>
                <input
                  className="bank-input pl-7"
                  value={triggerAmount}
                  onChange={e => setTriggerAmount(e.target.value)}
                />
              </div>
              <p className="text-[11px] text-[#9CA3AF]">Auto recharge will trigger below this balance</p>
            </div>

            {/* Recharge Amount */}
            <div className="space-y-1.5">
              <label className="flex items-center text-sm font-medium text-[#374151]">
                Recharge amount
                <InfoTooltip content="The amount added automatically when the truck crosses the low balance limit." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm font-medium">₹</span>
                <input
                  className="bank-input pl-7"
                  value={rechargeAmount}
                  onChange={e => setRechargeAmount(e.target.value)}
                />
              </div>
              <p className="text-[11px] text-[#9CA3AF]">Amount added to FASTag wallet each time</p>
            </div>

            {/* Apply To */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#374151]">Apply to</label>
              <select
                className="bank-input"
                value={applyTo}
                onChange={e => setApplyTo(e.target.value)}
              >
                <option value="selected">Selected trucks ({selectedIds.size})</option>
                <option value="all_own">All own trucks</option>
                <option value="all_hired">All hired trucks</option>
                <option value="route_group">Specific route group</option>
              </select>
            </div>

            {/* Funding Source */}
            <div className="space-y-1.5">
              <label className="flex items-center text-sm font-medium text-[#374151]">
                Funding Source
                <InfoTooltip content="Select whether automatic recharge uses wallet balance, linked IDFC account, or approved fleet credit limit." />
              </label>
              <select
                className="bank-input"
                value={fundingSource}
                onChange={e => setFundingSource(e.target.value)}
              >
                <option value="IDFC Current Account">IDFC Current Account</option>
                <option value="FASTag Wallet Balance">FASTag Wallet Balance</option>
                <option value="IDFC Fleet Credit Limit">IDFC Fleet Credit Limit</option>
              </select>
            </div>

            {/* Approval threshold */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="flex items-center text-sm font-medium text-[#374151]">
                Require approval if recharge amount exceeds
                <InfoTooltip content="Helps finance teams control large or credit funded recharges before money is used." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm font-medium">₹</span>
                <input
                  className="bank-input pl-7"
                  value={approvalAbove}
                  onChange={e => setApprovalAbove(e.target.value)}
                />
              </div>
              <p className="text-[11px] text-[#9CA3AF]">Finance teams can control when credit funded recharges need approval.</p>
            </div>
          </div>

          {/* Daily Spend Limit toggle */}
          <div className="border border-[#E5E7EB] rounded-xl p-5 flex items-start gap-4">
            <button
              onClick={() => setDailyLimitEnabled(!dailyLimitEnabled)}
              className={`toggle-track flex-shrink-0 mt-0.5 ${dailyLimitEnabled ? 'bg-[#C1121F]' : 'bg-[#D1D5DB]'}`}
            >
              <div className={`toggle-thumb ${dailyLimitEnabled ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D97706]" />
                <span className="text-sm font-semibold text-[#111827] flex items-center">
                  Daily Spend Limit
                  <InfoTooltip content="Caps daily FASTag spend for a vehicle to reduce misuse if a tag is lost or misused." />
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                Prevents unauthorized toll usage by capping maximum daily spend per truck.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#1E40AF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1E40AF]">
                Rule Summary: Automatically recharge {selectedIds.size} truck{selectedIds.size !== 1 ? 's' : ''} with ₹{rechargeAmount} when balance drops below ₹{triggerAmount}.
              </p>
              <p className="text-xs text-[#3B82F6] mt-1">
                Estimated recharges tomorrow: ~{Math.round(selectedIds.size * 0.2)} trucks
              </p>
            </div>
          </div>

          <button
            className="btn-primary w-full justify-center"
            onClick={handleSave}
          >
            <CheckCircle className="w-4 h-4" />
            Save Auto Recharge Rule
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
