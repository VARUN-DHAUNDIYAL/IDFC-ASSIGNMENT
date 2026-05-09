import { useState } from 'react';
import {
  Plus, Download, X, CheckCircle, AlertCircle, Clock, Upload,
} from 'lucide-react';
import { disputes } from '@/data/mockData';
import type { DisputeCase } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';
import MobileDisputes from '@/components/MobileDisputes';

type TabType = 'all' | 'open' | 'pending_evidence' | 'resolved';

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast toast-success animate-slideInRight">
      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
      <div className="flex-1"><p className="text-sm font-medium text-[#111827]">{message}</p></div>
      <button onClick={onClose} className="text-[#9CA3AF] text-lg leading-none">×</button>
    </div>
  );
}

const statusConfig = {
  open: { label: 'Open', class: 'badge-error', icon: AlertCircle },
  pending_evidence: { label: 'Pending Evidence', class: 'badge-warning', icon: Clock },
  resolved: { label: 'Resolved', class: 'badge-success', icon: CheckCircle },
};

function DisputeDrawer({ dispute, onClose, onToast }: {
  dispute: DisputeCase;
  onClose: () => void;
  onToast: (msg: string) => void;
}) {
  const config = statusConfig[dispute.status];
  const Icon = config.icon;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-panel">
        <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-[#9CA3AF]">{dispute.id}</p>
            <h2 className="text-base font-semibold text-[#111827] mt-0.5">{dispute.issue}</h2>
          </div>
          <button onClick={onClose} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {/* Status + Info */}
          <div className="flex items-center justify-between">
            <span className={`badge ${config.class} flex items-center gap-1.5`}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
            <span className="text-xs text-[#9CA3AF]">Filed: {dispute.filedOn}</span>
          </div>

          {/* Transaction Details */}
          <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Transaction Details</p>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Truck</span>
              <span className="font-medium text-[#111827]">{dispute.truck}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Issue Type</span>
              <span className="font-medium text-[#111827]">{dispute.issueType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Disputed Amount</span>
              <span className="font-bold text-[#111827]">₹{dispute.amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Expected Resolution</span>
              <div className="text-right">
                <p className="text-sm font-medium text-[#111827] flex items-center justify-end gap-1">
                  {dispute.expectedResolution}
                  <InfoTooltip content="Estimated date by which the issue is expected to be updated or resolved." />
                </p>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div>
            <p className="text-sm font-semibold text-[#111827] mb-2">Evidence</p>
            <div className={`rounded-xl border p-3 flex items-center gap-3 ${
              dispute.evidenceUploaded
                ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                : 'bg-[#FFFBEB] border-[#FDE68A]'
            }`}>
              {dispute.evidenceUploaded
                ? <><CheckCircle className="w-4 h-4 text-[#16A34A]" /><p className="text-xs text-[#15803D]">Evidence uploaded successfully</p></>
                : <><Clock className="w-4 h-4 text-[#D97706]" /><p className="text-xs text-[#92400E]">Evidence required — please upload documents</p></>
              }
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-sm font-semibold text-[#111827] mb-3">Status Timeline</p>
            <div className="space-y-3">
              {dispute.timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 ${i === dispute.timeline.length - 1 ? 'bg-[#C1121F]' : 'bg-[#16A34A]'}`} />
                    {i < dispute.timeline.length - 1 && <div className="w-px h-6 bg-[#E5E7EB] mt-1" />}
                  </div>
                  <div>
                    <p className="text-sm text-[#111827]">{t.event}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust note */}
          <div className="bg-[#F9FAFB] rounded-xl p-3 text-xs text-[#6B7280]">
            All dispute actions are tracked with service request ID <span className="font-mono font-medium text-[#111827]">{dispute.id}</span>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {dispute.status !== 'resolved' && (
              <button
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={() => { onToast('Evidence uploaded for ' + dispute.id); onClose(); }}
              >
                <Upload className="w-4 h-4" />
                Add Evidence
                <InfoTooltip content="Upload receipt, transaction proof, vehicle details, or supporting documents for this issue." />
              </button>
            )}
            <button className="btn-secondary w-full justify-center">Download Details</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Disputes() {
  const [tab, setTab] = useState<TabType>('all');
  const [selectedDispute, setSelectedDispute] = useState<DisputeCase | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const filtered = tab === 'all' ? disputes : disputes.filter(d => d.status === tab);
  const counts = {
    all: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    pending_evidence: disputes.filter(d => d.status === 'pending_evidence').length,
    resolved: disputes.filter(d => d.status === 'resolved').length,
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'all', label: `All (${counts.all})` },
    { id: 'open', label: `Open (${counts.open})` },
    { id: 'pending_evidence', label: `Pending Evidence (${counts.pending_evidence})` },
    { id: 'resolved', label: `Resolved (${counts.resolved})` },
  ];

  const actionBtn = (d: DisputeCase) => {
    if (d.status === 'open') return (
      <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => setSelectedDispute(d)}>View</button>
    );
    if (d.status === 'pending_evidence') return (
      <button className="btn-primary text-xs px-3 py-1.5" onClick={() => setSelectedDispute(d)}>Upload</button>
    );
    return (
      <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => setSelectedDispute(d)}>View</button>
    );
  };

  return (
    <>
      <div className="block md:hidden">
        <MobileDisputes />
      </div>
      <div className="hidden md:block space-y-5 animate-fadeIn pb-28">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#111827] flex items-center gap-2">
            Disputes
            <InfoTooltip content="Raise and track toll related issues such as failed recharge, double deduction, or wrong vehicle class." />
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Raise and track toll related issues in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-sm" onClick={() => showToast('Disputes exported to CSV')}>
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary text-sm" onClick={() => showToast('Dispute creation form opened')}>
            <Plus className="w-4 h-4" />
            Raise New Dispute
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#F3F4F6] rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              tab === t.id
                ? 'bg-white text-[#111827] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bank-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="bank-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Truck</th>
                <th>Issue</th>
                <th>Amount</th>
                <th>Filed On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const config = statusConfig[d.status];
                const Icon = config.icon;
                return (
                  <tr key={d.id}>
                    <td><span className="font-mono text-xs text-[#6B7280]">{d.id}</span></td>
                    <td className="font-medium text-[#111827]">{d.truck}</td>
                    <td>
                      <p className="text-sm text-[#111827]">{d.issue}</p>
                      {d.status === 'pending_evidence' && (
                        <div className="flex items-center gap-1">
                          <p className="text-[11px] text-[#D97706] font-medium">Action Required: Upload Evidence</p>
                          <InfoTooltip content="The bank or toll operator needs supporting proof before the issue can move forward." />
                        </div>
                      )}
                    </td>
                    <td className="font-semibold text-[#111827]">₹{d.amount.toLocaleString('en-IN')}</td>
                    <td className="text-[#6B7280]">{d.filedOn}</td>
                    <td>
                      <span className={`badge ${config.class} flex items-center gap-1.5 w-fit`}>
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </td>
                    <td>{actionBtn(d)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <CheckCircle className="w-8 h-8 text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-sm text-[#9CA3AF]">No disputes in this category</p>
          </div>
        )}
      </div>

      {selectedDispute && (
        <DisputeDrawer
          dispute={selectedDispute}
          onClose={() => setSelectedDispute(null)}
          onToast={showToast}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
