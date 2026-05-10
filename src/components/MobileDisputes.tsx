import { useState } from 'react';
import { AlertCircle, ChevronRight, X, UploadCloud, FileText, Search, CheckCircle } from 'lucide-react';
import { disputes } from '@/data/mockData';
import InfoTooltip from '@/components/InfoTooltip';

export default function MobileDisputes() {
  const [activeDispute, setActiveDispute] = useState<typeof disputes[0] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20">
      <div className="px-4 py-5 space-y-5">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Toll Issues</h1>
          <p className="text-sm text-[#6B7280] mt-1">Track incorrect toll deductions and upload evidence.</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by Case ID or Truck..." 
            className="bank-input pl-10 w-full py-3 text-base"
          />
        </div>

        {/* Dispute Cards */}
        <div className="space-y-4">
          {disputes.map(d => (
            <div key={d.id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-[#111827]">{d.id}</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">{d.truck}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  d.status === 'resolved' ? 'bg-[#DCFCE7] text-[#16A34A]' :
                  d.status === 'pending_evidence' ? 'bg-[#FEF2F2] text-[#DC2626]' :
                  'bg-[#FFFBEB] text-[#D97706]'
                }`}>
                  {d.status === 'resolved' ? 'Resolved' : d.status === 'pending_evidence' ? 'Action Required' : 'Open'}
                </span>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-3 border border-[#E5E7EB] mb-4">
                <p className="text-sm font-semibold text-[#374151] mb-1">{d.issue}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B7280]">Issue Amount: <span className="font-semibold text-[#111827]">₹{d.amount}</span></span>
                  <span className="text-[#6B7280]">{d.filedOn}</span>
                </div>
              </div>

              <button 
                className="w-full bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB] rounded-lg py-2.5 font-semibold text-xs flex justify-center items-center gap-1 transition-colors"
                onClick={() => setActiveDispute(d)}
              >
                View Details
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dispute Details Bottom Sheet ── */}
      {activeDispute && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setActiveDispute(null)} />
          <div className="bg-[#F7F8FA] w-full rounded-t-2xl flex flex-col h-[90vh] relative z-10 animate-slideUp">
            
            <div className="flex items-center justify-between px-5 py-4 bg-white rounded-t-2xl border-b border-[#E5E7EB]">
              <div>
                <h2 className="text-base font-bold text-[#111827]">Case {activeDispute.id}</h2>
                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeDispute.status === 'resolved' ? 'bg-[#DCFCE7] text-[#16A34A]' :
                  activeDispute.status === 'pending_evidence' ? 'bg-[#FEF2F2] text-[#DC2626]' :
                  'bg-[#FFFBEB] text-[#D97706]'
                }`}>
                  {activeDispute.status === 'resolved' ? 'Resolved' : activeDispute.status === 'pending_evidence' ? 'Action Required' : 'Open'}
                </span>
              </div>
              <button onClick={() => setActiveDispute(null)} className="p-1 text-[#6B7280] bg-[#F3F4F6] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#6B7280] text-xs">Truck Number</p>
                    <p className="font-semibold text-[#111827] mt-0.5">{activeDispute.truck}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs">Issue Amount</p>
                    <p className="font-semibold text-[#111827] mt-0.5">₹{activeDispute.amount}</p>
                  </div>
                  <div className="col-span-2 border-t border-[#F3F4F6] pt-3 mt-1">
                    <p className="text-[#6B7280] text-xs">Issue Description</p>
                    <p className="font-semibold text-[#111827] mt-0.5">{activeDispute.issue}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#111827] mb-4">Status Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-3 relative">
                    <div className="w-0.5 bg-[#E5E7EB] absolute left-2.5 top-6 bottom-0" />
                    <div className="w-5 h-5 rounded-full bg-[#111827] flex items-center justify-center flex-shrink-0 relative z-10 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">Toll Issue Raised</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Jan 12, 2024</p>
                    </div>
                  </div>
                  
                  {activeDispute.status === 'pending_evidence' && (
                    <div className="flex gap-3 relative">
                      <div className="w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 relative z-10 mt-0.5 shadow-[0_0_0_4px_#FEF2F2]">
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#DC2626]">Evidence Required</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Please upload toll receipt to proceed.</p>
                      </div>
                    </div>
                  )}

                  {activeDispute.status !== 'resolved' && (
                    <div className="flex gap-3 relative">
                      <div className="w-5 h-5 rounded-full bg-[#E5E7EB] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#9CA3AF] flex items-center gap-1">
                          Expected Resolution
                          <InfoTooltip content="Estimated date based on typical NHAI response times." />
                        </p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">Jan 20, 2024</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Evidence */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#111827] mb-3">Evidence</h3>
                {activeDispute.status === 'pending_evidence' ? (
                  <button 
                    className="w-full border-2 border-dashed border-[#D1D5DB] bg-[#F9FAFB] rounded-xl py-6 flex flex-col items-center gap-2 hover:bg-[#F3F4F6] transition-colors"
                    onClick={() => showToast('File upload dialogue opened')}
                  >
                    <UploadCloud className="w-6 h-6 text-[#9CA3AF]" />
                    <span className="text-sm font-semibold text-[#4B5563]">Upload Receipt (PDF/JPG)</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                    <FileText className="w-5 h-5 text-[#9CA3AF]" />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">toll_receipt_9999.pdf</p>
                      <p className="text-xs text-[#6B7280]">Uploaded Jan 12</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}

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
