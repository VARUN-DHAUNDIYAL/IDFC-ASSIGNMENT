import { useNavigate } from 'react-router';
import { ArrowLeft, Hexagon } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#27272A] flex items-center justify-center mb-6">
        <Hexagon className="w-8 h-8 text-[#27272A]" />
      </div>
      <h1 className="text-4xl font-semibold text-white tracking-tight mb-2">404</h1>
      <p className="text-sm text-gray-500 mb-6">Page not found</p>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] border border-[#27272A] text-gray-300 rounded-lg text-sm font-medium hover:border-[#8B0000]/30 hover:text-white transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Command Center
      </button>
    </div>
  );
}
