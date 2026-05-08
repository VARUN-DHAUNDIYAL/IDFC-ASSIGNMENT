import { useNavigate } from 'react-router';
import { ArrowLeft, Hexagon } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center mb-6 shadow-sm">
        <Hexagon className="w-8 h-8 text-[#C1121F]" />
      </div>
      <h1 className="text-4xl font-bold text-[#111827] tracking-tight mb-2">404</h1>
      <p className="text-sm text-[#6B7280] mb-6">Page not found</p>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#374151] rounded-lg text-sm font-medium hover:border-[#C1121F] hover:text-[#C1121F] transition-all shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>
    </div>
  );
}
