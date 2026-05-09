import { useState } from 'react';
import { Download, CheckCircle, RefreshCw, ChevronDown, FileText } from 'lucide-react';
import { gstReports, gstStats } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';

const months = ['March 2024', 'February 2024', 'January 2024', 'December 2023'];

export default function MobileGstReports() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">GST Reports</h1>
          <p className="text-sm text-[#6B7280] mt-1">Download monthly toll reconciliation for input tax credit.</p>
        </div>

        {/* Generate Report Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#111827]">Generate Report</h2>
            <p className="text-xs text-[#6B7280] mt-1">Select a month to reconcile toll receipts</p>
          </div>
          <div className="relative">
            <select
              className="bank-input appearance-none w-full text-base pr-9"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {months.map(m => <option key={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
          </div>
          <button
            className="w-full bg-[#C1121F] text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            onClick={() => showToast(`Report generation started for ${selectedMonth}`)}
          >
            <RefreshCw className="w-4 h-4" />
            Generate Report
          </button>
        </div>

        {/* This Month at a Glance */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">This Month at a Glance</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide font-semibold mb-1">Receipts</p>
              <p className="text-xl font-bold text-[#111827]">{gstStats.receiptsReconciled}</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide font-semibold mb-1">Disputes</p>
              <p className="text-xl font-bold text-[#16A34A]">{gstStats.disputesResolved}</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide font-semibold mb-1 flex items-center gap-1">
                Duplicates
                <InfoTooltip content="Possible duplicate toll deductions identified." />
              </p>
              <p className="text-xl font-bold text-[#2563EB]">₹{gstStats.duplicateTollsPrevented.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide font-semibold mb-1">Total Spend</p>
              <p className="text-xl font-bold text-[#111827]">₹{(gstStats.totalTollSpend / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div>
          <h2 className="text-sm font-bold text-[#111827] mb-3">Available Reports</h2>
          <div className="space-y-3">
            {gstReports.map((r) => (
              <div key={`${r.month}-${r.year}`} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#4B5563]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827]">{r.month} {r.year}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#DCFCE7] text-[#16A34A] inline-block mt-0.5">
                        Ready
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#111827]">₹{r.totalTollSpend.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-[#F3F4F6] text-xs text-[#6B7280] mb-4">
                  <span>{r.receipts} receipts</span>
                  <span>{r.disputes} disputes resolved</span>
                </div>

                <button
                  className="w-full bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB] rounded-lg py-2.5 font-semibold text-xs flex justify-center items-center gap-2 transition-colors"
                  onClick={() => showToast(`GST report for ${r.month} ${r.year} downloaded`)}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Report
                </button>
              </div>
            ))}
          </div>
        </div>

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
