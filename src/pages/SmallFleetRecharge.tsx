import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { vehicleList } from '@/data/mockData';

type Step = 1 | 2 | 3;
type SelectionMode = 'low_balance' | 'all_active' | 'manual';

export default function SmallFleetRecharge() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<SelectionMode>('low_balance');
  const [success, setSuccess] = useState(false);

  const lowBalanceTrucks = vehicleList.filter(
    (v) => v.status === 'low_balance' || v.status === 'critical'
  );
  const activeTrucks = vehicleList.filter((v) => v.status === 'active' || v.status === 'low_balance' || v.status === 'critical');

  const selectedTrucks =
    mode === 'low_balance' ? lowBalanceTrucks :
    mode === 'all_active'  ? activeTrucks :
    lowBalanceTrucks;

  const totalAmount = selectedTrucks.reduce((sum, v) => sum + v.suggestedRecharge, 0);

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => navigate('/'), 3500);
  };

  if (success) {
    return (
      <div className="max-w-[540px] mx-auto mt-16 animate-fadeIn">
        <div className="bank-card p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-9 h-9 text-[#16A34A]" />
          </div>
          <h2 className="text-xl font-bold text-[#111827]">Recharge Successful</h2>
          <p className="text-[#6B7280] mt-2 text-sm">
            {selectedTrucks.length} trucks have been recharged from your IDFC account ending 8892.
          </p>
          <div className="mt-6 p-4 bg-[#F9FAFB] rounded-xl text-sm text-[#6B7280]">
            Faster than doing this on BBPS individually — one click, one account.
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full justify-center mt-6"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[640px] mx-auto animate-fadeIn">
      {/* Back button */}
      <button
        onClick={() => step === 1 ? navigate('/') : setStep((s) => (s - 1) as Step)}
        className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {step === 1 ? 'Back to Dashboard' : 'Previous step'}
      </button>

      <h1 className="text-2xl font-bold text-[#111827] mb-1">Recharge All Trucks</h1>
      <p className="text-sm text-[#6B7280] mb-6">
        Faster than repeated BBPS entry. One recharge from your IDFC account.
      </p>

      {/* Step Progress */}
      <div className="flex items-center gap-3 mb-8">
        {([1, 2, 3] as Step[]).map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              s < step
                ? 'bg-[#16A34A] text-white'
                : s === step
                ? 'bg-[#C1121F] text-white'
                : 'bg-[#F3F4F6] text-[#9CA3AF]'
            }`}>
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            <span className={`text-sm font-medium ${s === step ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
              {s === 1 ? 'Select trucks' : s === 2 ? 'Review amount' : 'Confirm payment'}
            </span>
            {s < 3 && <div className={`flex-1 h-px w-10 ${s < step ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="bank-card p-6 space-y-4 animate-fadeIn">
          <h2 className="text-base font-semibold text-[#111827]">Choose which trucks to recharge</h2>
          <div className="space-y-3">
            {([
              { id: 'low_balance', label: 'Recharge all low balance trucks', desc: `${lowBalanceTrucks.length} trucks · ₹${lowBalanceTrucks.reduce((s, v) => s + v.suggestedRecharge, 0).toLocaleString('en-IN')} total`, recommended: true },
              { id: 'all_active', label: 'Recharge all active trucks', desc: `${activeTrucks.length} trucks` },
              { id: 'manual', label: 'Select trucks manually', desc: 'Choose specific trucks from list' },
            ] as { id: SelectionMode; label: string; desc: string; recommended?: boolean }[]).map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  mode === opt.id
                    ? 'border-[#C1121F] bg-[#FEF2F2]'
                    : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  mode === opt.id ? 'border-[#C1121F]' : 'border-[#D1D5DB]'
                }`}>
                  {mode === opt.id && <div className="w-2 h-2 rounded-full bg-[#C1121F]" />}
                </div>
                <input type="radio" className="sr-only" value={opt.id} checked={mode === opt.id} onChange={() => setMode(opt.id)} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#111827]">{opt.label}</p>
                    {opt.recommended && (
                      <span className="badge badge-success text-[10px] py-0.5 px-2">Recommended</span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
          <button className="btn-primary w-full justify-center mt-2" onClick={() => setStep(2)}>
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bank-card p-6 space-y-5 animate-fadeIn">
          <h2 className="text-base font-semibold text-[#111827]">Review recharge amount</h2>
          <div className="bg-[#F9FAFB] rounded-xl p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Trucks selected</span>
              <span className="font-semibold text-[#111827]">{selectedTrucks.length} trucks</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Total recharge amount</span>
              <span className="font-bold text-lg text-[#111827]">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-[#E5E7EB]">
              <span className="text-[#6B7280]">Source account</span>
              <span className="font-medium text-[#111827]">IDFC Current Account ···8892</span>
            </div>
          </div>
          <div className="space-y-2">
            {selectedTrucks.filter(v => v.suggestedRecharge > 0).map((v) => (
              <div key={v.id} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#111827]">{v.rcNumber}</p>
                  <p className="text-[11px] text-[#9CA3AF]">Balance: ₹{v.balance}</p>
                </div>
                <span className="text-sm font-semibold text-[#111827]">+₹{v.suggestedRecharge.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1 justify-center" onClick={() => setStep(1)}>Back</button>
            <button className="btn-primary flex-1 justify-center" onClick={() => setStep(3)}>
              Confirm <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="bank-card p-6 space-y-5 animate-fadeIn">
          <h2 className="text-base font-semibold text-[#111827]">Confirm payment</h2>
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-5 space-y-3">
            <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Recharge Summary</p>
            <div className="flex justify-between">
              <span className="text-sm text-[#6B7280]">Trucks</span>
              <span className="text-sm font-semibold text-[#111827]">{selectedTrucks.length}</span>
            </div>
            <div className="flex justify-between border-t border-[#FECACA] pt-3">
              <span className="text-sm font-semibold text-[#111827]">Total Amount</span>
              <span className="text-xl font-bold text-[#C1121F]">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-[#6B7280]">This amount will be debited from IDFC Current Account ···8892</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1 justify-center" onClick={() => setStep(2)}>Back</button>
            <button className="btn-primary flex-1 justify-center" onClick={handleConfirm}>
              <CheckCircle className="w-4 h-4" />
              Confirm Recharge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
