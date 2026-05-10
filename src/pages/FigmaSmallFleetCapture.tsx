import React from 'react';
import SmallFleetHome from './SmallFleetHome';
import { 
  CheckCircle, AlertCircle, TrendingDown, Download,
  User, Users, Briefcase
} from 'lucide-react';

const StaticHeader = () => (
  <div className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6">
    <div className="flex items-center">
      <div className="flex flex-col">
        <div className="text-lg font-black text-[#991B1B] tracking-tight leading-none">IDFC FIRST</div>
        <div className="text-xs text-[#111827] font-semibold tracking-wide uppercase mt-0.5">Fleet Portal</div>
      </div>
      <div className="ml-8 px-3 py-1 bg-[#F3F4F6] text-[#374151] text-xs font-semibold rounded-md">
        Small Fleet Mode
      </div>
    </div>
    <div className="flex items-center gap-3 border-l border-[#E5E7EB] pl-6">
      <div className="w-8 h-8 rounded-full bg-[#C1121F] flex items-center justify-center text-xs font-semibold text-white">
        FA
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-[#111827] leading-none">Fleet Admin</p>
        <p className="text-[10px] text-[#6B7280] mt-1 leading-none">Fleet Owner</p>
      </div>
    </div>
  </div>
);

const Frame = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-20 flex flex-col items-center">
    <h1 className="text-[#111827] font-semibold text-xl mb-6">{title}</h1>
    <div className="w-[1440px] overflow-hidden bg-[#F7F8FA] border border-[#E5E7EB] shadow-2xl relative" style={{ minHeight: '800px' }}>
      <StaticHeader />
      <div className="p-8">
        {children}
      </div>
    </div>
  </div>
);

export default function FigmaSmallFleetCapture() {
  return (
    <div className="min-h-screen bg-[#E5E7EB] py-16 flex flex-col items-center">
      
      {/* FRAME 1: Live Small Fleet Home */}
      <Frame title="Screen 1: Small Fleet Home">
        <div className="max-w-7xl mx-auto">
          <SmallFleetHome />
        </div>
      </Frame>

      {/* FRAME 2: My Trucks Expanded */}
      <Frame title="Screen 2: My Trucks">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#F3F4F6]">
            <h2 className="text-xl font-bold text-[#111827]">My Trucks</h2>
            <p className="text-sm text-[#6B7280] mt-1">15 trucks tracked · 12 Own · 3 Hired · 4 need recharge</p>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                <th className="px-6 py-4">Truck Details</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Current Route</th>
                <th className="px-6 py-4 text-right">FASTag Balance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              <tr className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#111827]">MH 04 1234</p>
                  <span className="inline-block bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-bold px-2 py-0.5 rounded mt-1">Own Truck</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#111827]">Ramesh Kumar</p>
                  <p className="text-xs text-[#6B7280]">9876543210</p>
                </td>
                <td className="px-6 py-4 text-sm text-[#374151] font-medium">Local supply route</td>
                <td className="px-6 py-4 text-right font-bold text-[#111827]">₹2,400</td>
                <td className="px-6 py-4"><span className="bg-[#DCFCE7] text-[#16A34A] text-xs font-bold px-2 py-1 rounded">Active</span></td>
                <td className="px-6 py-4 text-right"><button className="border border-[#E5E7EB] text-[#111827] text-xs font-semibold px-4 py-2 rounded-lg">View</button></td>
              </tr>
              <tr className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#111827]">DL 1C 9999</p>
                  <span className="inline-block bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-bold px-2 py-0.5 rounded mt-1">Own Truck</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#111827]">Suresh Singh</p>
                  <p className="text-xs text-[#6B7280]">9812345678</p>
                </td>
                <td className="px-6 py-4 text-sm text-[#374151] font-medium">Kota to Jaipur</td>
                <td className="px-6 py-4 text-right font-bold text-[#DC2626]">₹120</td>
                <td className="px-6 py-4"><span className="bg-[#FFFBEB] text-[#D97706] text-xs font-bold px-2 py-1 rounded">Low Balance</span></td>
                <td className="px-6 py-4 text-right"><button className="bg-[#C1121F] text-white text-xs font-semibold px-4 py-2 rounded-lg">Recharge</button></td>
              </tr>
              <tr className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#111827]">TN 07 EF 3456</p>
                  <span className="inline-block bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold px-2 py-0.5 rounded mt-1">Hired Truck</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#111827]">Karthik Iyer</p>
                  <p className="text-xs text-[#6B7280]">9654321987</p>
                </td>
                <td className="px-6 py-4 text-sm text-[#374151] font-medium">Kota to Jaipur</td>
                <td className="px-6 py-4 text-right font-bold text-[#DC2626]">₹80</td>
                <td className="px-6 py-4"><span className="bg-[#FEF2F2] text-[#DC2626] text-xs font-bold px-2 py-1 rounded">Critical</span></td>
                <td className="px-6 py-4 text-right"><button className="bg-[#C1121F] text-white text-xs font-semibold px-4 py-2 rounded-lg">Recharge</button></td>
              </tr>
              <tr className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#111827]">MH 12 AB 4567</p>
                  <span className="inline-block bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold px-2 py-0.5 rounded mt-1">Hired Truck</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#111827]">Deepak Patil</p>
                  <p className="text-xs text-[#6B7280]">9765432198</p>
                </td>
                <td className="px-6 py-4 text-sm text-[#374151] font-medium">Delhi to Mumbai</td>
                <td className="px-6 py-4 text-right font-bold text-[#DC2626]">₹400</td>
                <td className="px-6 py-4"><span className="bg-[#FFFBEB] text-[#D97706] text-xs font-bold px-2 py-1 rounded">Low Balance</span></td>
                <td className="px-6 py-4 text-right"><button className="border border-[#E5E7EB] text-[#111827] text-xs font-semibold px-4 py-2 rounded-lg">View Budget</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Frame>

      {/* FRAME 3: Toll Issues & Recharge Proof */}
      <Frame title="Screen 3: Toll Issues and Recharge Proof">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
          {/* Toll Issues */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden h-fit">
            <div className="px-6 py-5 border-b border-[#F3F4F6] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#D97706]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#111827]">Toll Issues</h2>
                <p className="text-xs text-[#6B7280]">3 items requiring attention</p>
              </div>
            </div>
            <div className="divide-y divide-[#F3F4F6]">
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#111827] text-base">Failed Recharge Deducted</p>
                  <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-2">
                    KA 03 CD 7890 <span className="w-1 h-1 bg-[#D1D5DB] rounded-full" /> ₹2,100
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-[#FFFBEB] text-[#D97706] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Open</span>
                  <button className="text-sm font-semibold text-[#111827] border border-[#E5E7EB] px-4 py-1.5 rounded-lg">Track</button>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#111827] text-base">Double Deduction</p>
                  <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-2">
                    MH 04 1234 <span className="w-1 h-1 bg-[#D1D5DB] rounded-full" /> ₹1,450
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-[#FFFBEB] text-[#D97706] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Open</span>
                  <button className="text-sm font-semibold text-[#111827] border border-[#E5E7EB] px-4 py-1.5 rounded-lg">View</button>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#111827] text-base">Wrong Vehicle Class</p>
                  <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-2">
                    DL 1C 9999 <span className="w-1 h-1 bg-[#D1D5DB] rounded-full" /> ₹3,200
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-[#FEF2F2] text-[#DC2626] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Pending Evidence</span>
                  <button className="text-sm font-semibold text-white bg-[#C1121F] px-4 py-1.5 rounded-lg">Upload</button>
                </div>
              </div>
            </div>
          </div>

          {/* Recharge Proof States */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-[#16A34A]" />
              </div>
              <h2 className="text-2xl font-bold text-[#111827]">Recharge Successful</h2>
              <p className="text-base text-[#6B7280] mt-1">4 trucks updated</p>
              
              <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 text-left space-y-3 mt-6">
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                  <span className="text-sm text-[#6B7280]">Amount</span>
                  <span className="text-lg font-bold text-[#111827]">₹8,400</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                  <span className="text-sm text-[#6B7280]">Funding source</span>
                  <span className="text-sm font-semibold text-[#111827]">IDFC Current Account ending 8892</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B7280]">Reference ID</span>
                  <span className="text-sm font-mono text-[#111827]">IDFCFASTAG2408</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#FEF2F2] rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-10 h-10 text-[#DC2626]" />
              </div>
              <h2 className="text-2xl font-bold text-[#111827]">Recharge Failed</h2>
              <p className="text-base text-[#6B7280] mt-1">Bank timeout or insufficient funds.</p>
              
              <div className="w-full flex gap-4 mt-8">
                <button className="flex-1 border border-[#E5E7EB] text-[#111827] font-semibold py-3 rounded-xl">Raise Toll Issue</button>
                <button className="flex-1 bg-[#C1121F] text-white font-semibold py-3 rounded-xl">Retry Recharge</button>
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* FRAME 4: Monthly Toll Report & Hired Truck Budget */}
      <Frame title="Screen 4: Monthly Report and Hired Truck Budget">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
          
          {/* Monthly Toll Report */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 h-fit">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">April 2026 Report Ready</h2>
                <p className="text-sm text-[#6B7280] mt-1">Summary of all toll spend and receipts.</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                <span className="text-sm font-semibold text-[#6B7280]">Total Toll Spend</span>
                <span className="text-xl font-bold text-[#111827]">₹82,500</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                <span className="text-sm font-semibold text-[#6B7280]">Receipts Matched</span>
                <span className="text-lg font-bold text-[#111827]">64</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                <span className="text-sm font-semibold text-[#6B7280]">Toll Issues</span>
                <span className="text-lg font-bold text-[#111827]">2</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#FEF2F2] rounded-xl border border-[#FCA5A5]">
                <span className="text-sm font-semibold text-[#991B1B]">Duplicate Tolls Flagged</span>
                <span className="text-lg font-bold text-[#DC2626]">₹1,450</span>
              </div>
            </div>

            <button className="w-full bg-[#C1121F] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Monthly Report
            </button>
          </div>

          {/* Hired Truck Budget */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 h-fit">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-2xl font-bold text-[#111827] flex items-center gap-3">
                  RJ 14 XZ 9999 
                  <span className="bg-[#F3F4F6] text-[#4B5563] text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">Hired Truck</span>
                </p>
                <p className="text-base font-medium text-[#374151] mt-3">Driver: Pankaj Gupta</p>
                <p className="text-base font-medium text-[#374151] mt-1">Trip: Delhi to Jaipur</p>
              </div>
              <span className="bg-[#DCFCE7] text-[#16A34A] text-sm font-bold px-3 py-1 rounded uppercase tracking-wide">Active</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#F9FAFB] p-5 rounded-xl border border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] uppercase font-bold tracking-wider mb-1">Budget</p>
                <p className="font-bold text-2xl text-[#111827]">₹3,450</p>
              </div>
              <div className="bg-[#F9FAFB] p-5 rounded-xl border border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] uppercase font-bold tracking-wider mb-1">Estimated Toll Needed</p>
                <p className="font-bold text-2xl text-[#111827]">₹3,200</p>
              </div>
              <div className="bg-[#F9FAFB] p-5 rounded-xl border border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] uppercase font-bold tracking-wider mb-1">Spent</p>
                <p className="font-bold text-2xl text-[#111827]">₹1,200</p>
              </div>
              <div className="bg-[#F9FAFB] p-5 rounded-xl border border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] uppercase font-bold tracking-wider mb-1">Remaining</p>
                <p className="font-bold text-2xl text-[#16A34A]">₹2,250</p>
              </div>
            </div>

            <div className="p-5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex justify-between items-center">
              <div>
                <p className="text-xs text-[#6B7280] uppercase font-bold tracking-wider">Next Toll Balance</p>
                <p className="text-sm font-medium text-[#374151] mt-1">Current unspent FASTag balance</p>
              </div>
              <p className="text-3xl font-bold text-[#111827]">₹400</p>
            </div>
          </div>

        </div>
      </Frame>

      {/* FRAME 5: Staff Access */}
      <Frame title="Screen 5: Staff Access">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden h-fit">
          <div className="px-8 py-6 border-b border-[#F3F4F6] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Staff Access</h2>
              <p className="text-sm text-[#6B7280] mt-1">Manage access for drivers, helpers, and accountants.</p>
            </div>
            <button className="bg-white border border-[#E5E7EB] text-[#111827] text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
              <Users className="w-4 h-4" />
              Invite Staff
            </button>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: User,
                  title: 'Owner',
                  access: 'Full access',
                  desc: 'Can recharge, add trucks, download reports, and raise toll issues.',
                  color: 'text-[#C1121F]',
                  bg: 'bg-[#FEF2F2]',
                },
                {
                  icon: Users,
                  title: 'Staff',
                  access: 'Recharge access',
                  desc: 'Can view trucks, prepare recharge, and raise toll issues.',
                  color: 'text-[#D97706]',
                  bg: 'bg-[#FFFBEB]',
                },
                {
                  icon: Briefcase,
                  title: 'Accountant',
                  access: 'Report only',
                  desc: 'Can view toll history and download monthly reports.',
                  color: 'text-[#2563EB]',
                  bg: 'bg-[#EFF6FF]',
                },
              ].map(({ icon: Icon, title, access, desc, color, bg }) => (
                <div key={title} className="flex flex-col gap-4 p-6 border border-[#F3F4F6] rounded-xl bg-[#F9FAFB]">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-lg font-bold text-[#111827]">{title}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bg} ${color} uppercase tracking-wide`}>{access}</span>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#F3F4F6] pt-8">
              <h3 className="text-lg font-bold text-[#111827] mb-4">Active Team Members</h3>
              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    <tr className="hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4 font-bold text-[#111827]">Ramesh Kumar</td>
                      <td className="px-6 py-4"><span className="bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold px-2 py-0.5 rounded uppercase">Owner</span></td>
                      <td className="px-6 py-4"><span className="text-[#16A34A] text-sm font-semibold">Active</span></td>
                      <td className="px-6 py-4 text-right"><button className="text-[#2563EB] text-sm font-semibold">Edit</button></td>
                    </tr>
                    <tr className="hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4 font-bold text-[#111827]">Suresh Singh</td>
                      <td className="px-6 py-4"><span className="bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold px-2 py-0.5 rounded uppercase">Accountant</span></td>
                      <td className="px-6 py-4"><span className="text-[#16A34A] text-sm font-semibold">Active</span></td>
                      <td className="px-6 py-4 text-right"><button className="text-[#2563EB] text-sm font-semibold">Edit</button></td>
                    </tr>
                    <tr className="hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4 font-bold text-[#111827]">Deepak Patil</td>
                      <td className="px-6 py-4"><span className="bg-[#FFFBEB] text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded uppercase">Staff</span></td>
                      <td className="px-6 py-4"><span className="text-[#6B7280] text-sm font-semibold">Invite Pending</span></td>
                      <td className="px-6 py-4 text-right"><button className="text-[#2563EB] text-sm font-semibold">Resend</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </Frame>

    </div>
  );
}
