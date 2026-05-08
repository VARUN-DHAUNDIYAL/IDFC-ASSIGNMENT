import { Hexagon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login and redirect to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B0000]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DC2626]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#DC2626] flex items-center justify-center shadow-xl shadow-red-900/30 mb-4">
            <Hexagon className="w-9 h-9 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">IDFC Fleet Command Center Plus</h1>
          <p className="text-sm text-gray-500 mt-2">Enterprise Fleet Management Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111111] rounded-xl border border-[#27272A] p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@idfcfleet.com"
                className="w-full bg-[#0a0a0a] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B0000]/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full bg-[#0a0a0a] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B0000]/50 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#8B0000] to-[#DC2626] hover:from-[#9a0000] hover:to-[#e53030] text-white py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
            >
              Sign In to Command Center Plus
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-[#27272A] text-center">
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
