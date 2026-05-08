import { Hexagon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login and redirect to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C1121F]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C1121F]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#C1121F] flex items-center justify-center shadow-xl shadow-red-900/10 mb-4">
            <Hexagon className="w-9 h-9 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">IDFC FIRST Fleet Portal</h1>
          <p className="text-sm text-[#6B7280] mt-2">Enterprise Fleet Management Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6B7280] font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@idfcfleet.com"
                className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:border-[#C1121F] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6B7280] font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:border-[#C1121F] focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleLogin}
              className="btn-primary w-full py-3.5 justify-center text-sm"
            >
              Sign In to Fleet Portal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-[#F3F4F6] text-center">
            <p className="text-xs text-gray-600">
              Protected by IDFC FIRST Bank Enterprise Security
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          &copy; 2026 IDFC FIRST Bank. All rights reserved.
        </p>
      </div>
    </div>
  );
}
