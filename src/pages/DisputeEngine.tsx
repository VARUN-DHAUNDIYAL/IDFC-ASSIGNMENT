import { useState } from 'react';
import {
  Gavel,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';

interface DisputeCase {
  id: string;
  title: string;
  vehicleId: string;
  amount: number;
  status: 'open' | 'resolved' | 'pending_evidence';
  filedDate: string;
  sla: string;
  type: string;
}

const mockDisputes: DisputeCase[] = [
  {
    id: 'DISP-2026-001',
    title: 'Double Deduction at Plaza A',
    vehicleId: 'MH-04-1234',
    amount: 1450,
    status: 'open',
    filedDate: 'May 8, 2026',
    sla: '48h',
    type: 'Double Charge',
  },
  {
    id: 'DISP-2026-002',
    title: 'Wrong Vehicle Class Billing',
    vehicleId: 'DL-1C-9999',
    amount: 3200,
    status: 'pending_evidence',
    filedDate: 'May 7, 2026',
    sla: '72h',
    type: 'Class Mismatch',
  },
  {
    id: 'DISP-2026-003',
    title: 'Geofence Mismatch - Delhi vs Mumbai',
    vehicleId: 'MH-04-1234',
    amount: 850,
    status: 'resolved',
    filedDate: 'May 5, 2026',
    sla: 'Complete',
    type: 'Location Fraud',
  },
  {
    id: 'DISP-2026-004',
    title: 'NPCI Timeout - Amount Deducted',
    vehicleId: 'KA-03-CD-7890',
    amount: 2100,
    status: 'open',
    filedDate: 'May 9, 2026',
    sla: '24h',
    type: 'Timeout',
  },
  {
    id: 'DISP-2026-005',
    title: 'Toll Plaza Overcharge - Class 4',
    vehicleId: 'RJ-14-XZ-9999',
    amount: 4500,
    status: 'pending_evidence',
    filedDate: 'May 6, 2026',
    sla: '96h',
    type: 'Overcharge',
  },
];

const statusConfig = {
  open: { label: 'Open', className: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: AlertTriangle },
  resolved: { label: 'Resolved', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
  pending_evidence: { label: 'Pending Evidence', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Clock },
};

export default function DisputeEngine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = mockDisputes.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Dispute Engine</h1>
          <p className="text-sm text-gray-500 mt-1">NPCI dispute management & resolution tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#111111] border border-[#27272A] rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search disputes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-600 w-48"
            />
          </div>
          <div className="flex items-center gap-1 bg-[#111111] border border-[#27272A] rounded-lg p-1">
            {(['all', 'open', 'pending_evidence', 'resolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-[#8B0000]/15 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {s === 'all' ? 'All' : s === 'pending_evidence' ? 'Pending' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dispute Table */}
      <div className="bg-[#111111] rounded-xl border border-[#27272A] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272A]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">Case ID</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">Description</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">Vehicle</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">Amount</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">Type</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">Status</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium">SLA</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((dispute, index) => {
              const config = statusConfig[dispute.status];
              const StatusIcon = config.icon;
              return (
                <tr
                  key={dispute.id}
                  className="border-b border-[#27272A]/50 hover:bg-white/[0.01] transition-colors animate-slideInLeft"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards', opacity: 0 }}
                >
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-gray-400">{dispute.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-white font-medium">{dispute.title}</span>
                    <p className="text-xs text-gray-600 mt-0.5">Filed: {dispute.filedDate}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-400 font-medium">{dispute.vehicleId}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-white">Rs.{dispute.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-500 bg-[#1A1A1A] px-2 py-1 rounded">{dispute.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${config.className}`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-500">{dispute.sla}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-colors group">
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Gavel className="w-8 h-8 text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-600">No disputes found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
