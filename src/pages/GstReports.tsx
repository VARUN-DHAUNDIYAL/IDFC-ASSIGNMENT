import { useState } from 'react';
import { Download, CheckCircle, ChevronDown, RefreshCw } from 'lucide-react';
import InfoTooltip from '@/components/InfoTooltip';
import MobileGstReports from '@/components/MobileGstReports';
import { gstReports, gstStats } from '@/data/mockData';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

export default function GstReports() {
  const [selectedMonth, setSelectedMonth] = useState('April 2026');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const months = ['April 2026', 'March 2026', 'February 2026', 'January 2026'];

  return (
    <>
      <div className="block md:hidden">
        <MobileGstReports />
      </div>
      <div className="hidden md:block space-y-6 animate-fadeIn pb-28">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
          GST Reports
          <InfoTooltip content="Download toll spend reports to support accounting, GST filing, and monthly reconciliation." />
        </h1>
        <p className="text-sm text-[#6B7280] mt-0.5">
          Download monthly toll spend reports for accounting and reconciliation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate Report Card */}
        <div className="bank-card p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-[#111827]">Generate Monthly GST Report</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">Select a month to generate a reconciliation report</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">Month</label>
            <div className="relative">
              <select
                className="bank-input appearance-none pr-9"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
              >
                {months.map(m => <option key={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            </div>
          </div>
          <button
            className="btn-primary w-full justify-center"
            onClick={() => showToast(`GST report for ${selectedMonth} generated successfully`)}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="flex items-center gap-1">
              Generate Report
              <InfoTooltip content="Creates a monthly toll spend report for the selected period." />
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold text-[#111827] mb-4">This Month at a Glance</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bank-card p-5">
              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide mb-2 flex items-center gap-1">
                Receipts Reconciled
                <InfoTooltip content="Number of toll transactions matched and included in the monthly report." />
              </p>
              <p className="text-3xl font-bold text-[#111827]">{gstStats.receiptsReconciled}</p>
            </div>
            <div className="bank-card p-5">
              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide mb-2">Disputes Resolved</p>
              <p className="text-3xl font-bold text-[#16A34A]">{gstStats.disputesResolved}</p>
            </div>
            <div className="bank-card p-5">
              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide mb-2 flex items-center gap-1">
                Duplicate Tolls Flagged
                <InfoTooltip content="Possible duplicate toll deductions identified for review or dispute." />
              </p>
              <p className="text-3xl font-bold text-[#2563EB]">₹{gstStats.duplicateTollsPrevented.toLocaleString('en-IN')}</p>
            </div>
            <div className="bank-card p-5">
              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide mb-2">Total Toll Spend</p>
              <p className="text-3xl font-bold text-[#111827]">₹{gstStats.totalTollSpend.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bank-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F3F4F6]">
          <h2 className="text-base font-semibold text-[#111827]">Available Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="bank-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Toll Spend</th>
                <th>Receipts</th>
                <th>Disputes</th>
                <th>Status</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {gstReports.map((r) => (
                <tr key={`${r.month}-${r.year}`}>
                  <td className="font-semibold text-[#111827]">{r.month} {r.year}</td>
                  <td className="font-bold text-[#111827]">₹{r.totalTollSpend.toLocaleString('en-IN')}</td>
                  <td className="text-[#6B7280]">{r.receipts} receipts</td>
                  <td className="text-[#6B7280]">{r.disputes} resolved</td>
                  <td>
                    <span className="badge badge-success">Ready</span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary text-xs px-3 py-1.5"
                      onClick={() => showToast(`GST report for ${r.month} ${r.year} downloaded`)}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
