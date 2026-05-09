import { useState } from 'react';
import { Shield, Info, CheckCircle } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';

export default function MobileAutoRechargeRules() {
  const [triggerAmount, setTriggerAmount] = useState('500');
  const [rechargeAmount, setRechargeAmount] = useState('2000');
  const [applyTo, setApplyTo] = useState('selected');
  const [fundingSource, setFundingSource] = useState('IDFC Current Account');
  const [approvalAbove, setApprovalAbove] = useState('5000');
  const [dailyLimitEnabled, setDailyLimitEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = () => {
    showToast('Auto recharge rule saved successfully');
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-28">
      <div className="px-4 py-5 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Auto Recharge Rules</h1>
          <p className="text-sm text-[#6B7280] mt-1">Set rules to automatically top up low balance FASTags.</p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-5">
          
          {/* Trigger */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-[#374151]">
              When balance falls below
              <InfoTooltip content="When a truck balance falls below this amount, the recharge rule becomes active." />
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm font-medium">₹</span>
              <input
                className="bank-input pl-7 w-full text-base"
                value={triggerAmount}
                onChange={e => setTriggerAmount(e.target.value)}
                type="number"
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
                className="bank-input pl-7 w-full text-base"
                value={rechargeAmount}
                onChange={e => setRechargeAmount(e.target.value)}
                type="number"
              />
            </div>
            <p className="text-[11px] text-[#9CA3AF]">Amount added to wallet each time</p>
          </div>

          {/* Apply To */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#374151]">Apply to</label>
            <select
              className="bank-input w-full text-base"
              value={applyTo}
              onChange={e => setApplyTo(e.target.value)}
            >
              <option value="selected">Selected trucks (12)</option>
              <option value="all_own">All own trucks</option>
              <option value="all_hired">All hired trucks</option>
            </select>
          </div>

          {/* Funding Source */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-[#374151]">
              Funding Source
              <InfoTooltip content="Select whether automatic recharge uses wallet balance, linked IDFC account, or approved fleet credit limit." />
            </label>
            <select
              className="bank-input w-full text-base"
              value={fundingSource}
              onChange={e => setFundingSource(e.target.value)}
            >
              <option value="IDFC Current Account">IDFC Current Account</option>
              <option value="FASTag Wallet Balance">FASTag Wallet Balance</option>
              <option value="IDFC Fleet Credit Limit">IDFC Fleet Credit Limit</option>
            </select>
          </div>

          {/* Approval threshold */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-[#374151]">
              Require approval above
              <InfoTooltip content="Helps finance teams control large recharges before money is used." />
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm font-medium">₹</span>
              <input
                className="bank-input pl-7 w-full text-base"
                value={approvalAbove}
                onChange={e => setApprovalAbove(e.target.value)}
                type="number"
              />
            </div>
            <p className="text-[11px] text-[#9CA3AF]">Finance teams must approve large automated recharges.</p>
          </div>
          
        </div>

        {/* Daily Spend Limit toggle */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm flex items-start gap-4">
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
                <InfoTooltip content="Caps daily FASTag spend to reduce misuse if a tag is lost." />
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              Stops unusual toll spend. Spending above the limit pauses the FASTag until reviewed.
            </p>
          </div>
        </div>

        {/* Preview Info */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A]">
              This rule applies to 12 trucks.
            </p>
            <p className="text-[10px] text-[#1E40AF] mt-0.5">
              Estimated auto recharges tomorrow: ~3 trucks
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        <button 
          className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          onClick={handleSave}
        >
          <CheckCircle className="w-4 h-4" />
          Save Rule
        </button>
      </div>

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
