import React from 'react';
import { 
  CheckCircle, AlertCircle, Download, Search, Upload, Plus, MapPin, RefreshCw
} from 'lucide-react';

const StaticHeader = () => (
  <div className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6">
    <div className="flex items-center">
      <div className="flex flex-col">
        <div className="text-lg font-black text-[#991B1B] tracking-tight leading-none">IDFC FIRST</div>
        <div className="text-xs text-[#111827] font-semibold tracking-wide uppercase mt-0.5">Fleet Portal</div>
      </div>
      <div className="ml-8 px-3 py-1 bg-[#F3F4F6] text-[#374151] text-xs font-semibold rounded-md">
        Enterprise Mode
      </div>
    </div>
    <div className="flex items-center gap-3 border-l border-[#E5E7EB] pl-6">
      <div className="w-8 h-8 rounded-full bg-[#111827] flex items-center justify-center text-xs font-semibold text-white">
        EA
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-[#111827] leading-none">Enterprise Admin</p>
        <p className="text-[10px] text-[#6B7280] mt-1 leading-none">Super Admin</p>
      </div>
    </div>
  </div>
);

const Frame = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-16 flex flex-col items-center">
    <h1 className="text-[#111827] font-semibold text-xl mb-6">{title}</h1>
    <div className="w-[1440px] overflow-hidden bg-white border border-[#E5E7EB] shadow-xl relative flex flex-col" style={{ background: 'var(--surface-page)' }}>
      <StaticHeader />
      <div className="p-8 flex-1">
        {children}
      </div>
    </div>
  </div>
);

export default function FigmaEnterpriseCapture() {
  return (
    <div className="min-h-screen bg-[#E5E7EB] py-16 flex flex-col items-center gap-16">
      
      {/* FRAME 1: Enterprise Dashboard */}
      <Frame title="Screen 1: Enterprise Dashboard">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Dashboard</h1>
              <p className="text-sm text-[#6B7280] mt-0.5">Fleet overview for today</p>
            </div>
            <button className="btn-primary text-sm">
              <RefreshCw className="w-4 h-4" />
              One Click Recharge
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#111827]">Today’s Action Queue</h2>
                <p className="text-xs text-[#6B7280]">Items that need operator attention before trucks move.</p>
              </div>
              <span className="badge badge-error text-xs">5 items</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
              <div className="bank-card p-4 border-l-4 border-[#DC2626] flex flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Failed Recharge</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">Bulk recharge failed for 2 trucks.</p>
                  </div>
                </div>
                <button className="btn-secondary text-xs w-full justify-center">Retry</button>
              </div>

              <div className="bank-card p-4 border-l-4 border-[#D97706] flex flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#111827]">Low Balance</p>
                      <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">Truck DL 1C 9999 has ₹120 balance. Suggested recharge ₹2,000.</p>
                  </div>
                </div>
                <button className="btn-primary text-xs w-full justify-center">Recharge Now</button>
              </div>

              <div className="bank-card p-4 border-l-4 border-[#DC2626] flex flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#111827]">KYC Issue</p>
                      <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">Truck HR 26 8888 has a previous tag conflict.</p>
                  </div>
                </div>
                <button className="btn-secondary text-xs w-full justify-center">Upload RC</button>
              </div>

              <div className="bank-card p-4 border-l-4 border-[#D97706] flex flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Toll Issue Pending</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">Evidence required for double deduction or wrong toll charge.</p>
                  </div>
                </div>
                <button className="btn-secondary text-xs w-full justify-center">Review</button>
              </div>

              <div className="bank-card p-4 border-l-4 border-[#2563EB] flex flex-col justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#111827]">Hired Trip Near Budget</p>
                      <span className="badge badge-gray text-[10px] px-1.5 py-0">Hired Truck</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">2 hired truck trips are close to toll budget limit.</p>
                  </div>
                </div>
                <button className="btn-secondary text-xs w-full justify-center">View Budget</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#111827]">Fleet Coverage</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="bank-card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Own Trucks</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">110 active · 14 need recharge</p>
                  </div>
                  <button className="btn-secondary text-[11px] px-3 py-1.5">View Own Trucks</button>
                </div>
                <div className="bank-card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Hired Trucks</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">32 active trips · 2 trips need budget review</p>
                  </div>
                  <button className="btn-secondary text-[11px] px-3 py-1.5">View Hired Trucks</button>
                </div>
                <div className="bank-card p-4 flex items-center justify-between bg-[#F9FAFB]">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Total Fleet Tracked</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">142 active · 5 Open Toll Issues</p>
                  </div>
                  <button className="btn-secondary text-[11px] px-3 py-1.5 bg-white">View Fleet Roster</button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#111827]">Recharge Readiness</h2>
                <button className="btn-secondary text-xs">Review Recharge Plan</button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bank-card p-5 border-t-4 border-t-[#111827]">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Own Truck Recharge Need</p>
                  <p className="text-2xl font-bold text-[#111827] mt-1">₹46,000 <span className="text-sm font-normal text-[#6B7280]">needed tomorrow</span></p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Bulk recharge from one IDFC account. No repeated vehicle entry.</p>
                </div>
                <div className="bank-card p-5 border-t-4 border-t-[#6B7280]">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Failed Recharges / Pending</p>
                  <p className="text-2xl font-bold text-[#DC2626] mt-1">2 <span className="text-sm font-normal text-[#6B7280]">/ 14 pending</span></p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Requires immediate attention before trucks move.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">Spend Summary</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bank-card p-5">
                <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 flex items-center">Total Fleet Balance</p>
                <p className="text-3xl font-bold text-[#111827]">₹18,50,000</p>
              </div>
              <div className="bank-card p-5">
                <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 flex items-center">Today's Toll Spend</p>
                <p className="text-3xl font-bold text-[#111827]">₹42,300</p>
              </div>
              <div className="bank-card p-5">
                <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 flex items-center">This Week</p>
                <p className="text-3xl font-bold text-[#111827]">₹2,49,600</p>
              </div>
              <div className="bank-card p-5">
                <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 flex items-center">This Month</p>
                <p className="text-3xl font-bold text-[#111827]">₹9,82,400</p>
              </div>
            </div>
          </div>

          <div className="bank-card p-5">
            <h2 className="text-sm font-semibold text-[#111827] mb-3">Recent Activity</h2>
            <div className="space-y-0 divide-y divide-[#F9FAFB]">
              {[
                { action: 'Bulk recharge approved — 14 trucks, ₹28,000', by: 'Fleet Owner', time: '10m ago' },
                { action: 'Auto recharge rule updated — threshold ₹500', by: 'System', time: '1h ago' },
                { action: 'Toll issue evidence uploaded — DISP-001', by: 'Operations Manager', time: '2h ago' },
                { action: 'GST report downloaded — April 2026', by: 'Finance Manager', time: '4h ago' },
                { action: 'Trip budget created — Trip #4092', by: 'Operations Manager', time: '5h ago' },
              ].map((entry, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB] mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111827]">{entry.action}</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">{entry.by} · {entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>

      {/* FRAME 2: One Click Recharge */}
      <Frame title="Screen 2: One Click Recharge">
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">One Click Recharge</h1>
            <p className="text-sm text-[#6B7280] mt-1">Recharge own trucks and fund hired truck trips from a single IDFC account.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bank-card p-4 border-t-4 border-t-[#111827]">
              <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Own Trucks</p>
              <p className="text-xl font-bold text-[#111827] mt-1">₹5,000</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">recharge needed</p>
            </div>
            <div className="bank-card p-4 border-t-4 border-t-[#6B7280]">
              <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Hired Trucks</p>
              <p className="text-xl font-bold text-[#111827] mt-1">₹750</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">toll budget needed</p>
            </div>
            <div className="bank-card p-4 border-t-4 border-t-[#C1121F] bg-[#FEF2F2]">
              <p className="text-[10px] font-semibold text-[#991B1B] uppercase tracking-wide">Total</p>
              <p className="text-xl font-bold text-[#7F1D1D] mt-1">₹5,750</p>
              <p className="text-xs text-[#991B1B] mt-0.5">action required</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bank-card p-6 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[#111827]">Quick Recharge</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">Recharge a specific truck right now</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Truck Number</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <div className="bank-input pl-9 text-[#9CA3AF] flex items-center">e.g. MH 04 1234</div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Recharge Amount (₹)</label>
                  <div className="bank-input text-[#9CA3AF] flex items-center">e.g. 2000</div>
                </div>
              </div>
              <button className="btn-primary w-full justify-center">
                <RefreshCw className="w-4 h-4" />
                Recharge Truck
              </button>
            </div>

            <div className="bank-card p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-semibold text-[#111827]">Bulk Recharge</h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">Based on current balances and selected trucks</p>
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-2 border border-[#E5E7EB]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Selected vehicles</span>
                    <span className="font-semibold text-[#111827]">5 trucks/trips</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Total recharge amount</span>
                    <span className="font-bold text-[#111827]">₹5,750</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-[#374151]">Funding Source</label>
                  <div className="bank-input bg-white text-[#111827] flex items-center justify-between">
                    <span>IDFC Current Account ending 8892</span>
                    <span className="text-xs text-[#6B7280]">(Primary)</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button className="btn-primary w-full justify-center">
                  <RefreshCw className="w-4 h-4" />
                  Approve and Recharge Selected
                </button>
              </div>
            </div>
          </div>

          <div className="bank-card overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center gap-3">
              <div className="w-4 h-4 rounded border-2 flex items-center justify-center bg-[#C1121F] border-[#C1121F]">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-[#111827]">Vehicles needing attention</h2>
              <span className="badge badge-gray ml-auto">5 items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="bank-table">
                <thead>
                  <tr>
                    <th className="w-10"></th>
                    <th>Truck / Trip</th>
                    <th>Current Balance</th>
                    <th>Action Required</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { t: 'DL 1C 9999', type: 'own', b: 120, a: 2000, actL: '(Recharge)', s: 'Low Balance', sC: 'badge-warning' },
                    { t: 'KA 03 CD 7890', type: 'own', b: 450, a: 1000, actL: '(Recharge)', s: 'Low Balance', sC: 'badge-warning' },
                    { t: 'TN 07 EF 3456', type: 'own', b: 80, a: 2000, actL: '(Recharge)', s: 'Critical', sC: 'badge-error' },
                    { t: 'RJ 14 XZ 9999', type: 'hired', b: 2250, a: 400, actL: '(Budget)', s: 'Active Trip', sC: 'badge-success' },
                    { t: 'MH 12 AB 4567', type: 'hired', b: 400, a: 350, actL: '(Budget)', s: 'Near Limit', sC: 'badge-warning' },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td>
                        <div className="w-4 h-4 rounded border-2 flex items-center justify-center bg-[#C1121F] border-[#C1121F]">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#111827]">{r.t}</p>
                          <span className={`badge ${r.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0`}>
                            {r.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                          </span>
                        </div>
                      </td>
                      <td className="font-medium text-[#111827]">
                        {r.b < 500 && r.type === 'own' ? (
                          <span className="text-[#DC2626]">₹{r.b.toLocaleString('en-IN')}</span>
                        ) : (
                          <span>₹{r.b.toLocaleString('en-IN')}</span>
                        )}
                      </td>
                      <td className="font-semibold text-[#111827]">
                        ₹{r.a.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-[#6B7280] ml-1">{r.actL}</span>
                      </td>
                      <td><span className={`badge ${r.sC}`}>{r.s}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bank-card overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-base font-semibold text-[#111827] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C1121F]" />
                Route Based Recharge Estimate
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="bank-table">
                <thead>
                  <tr>
                    <th>Truck Number</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Current Balance</th>
                    <th>Estimated Toll Needed</th>
                    <th>Suggested Recharge</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { t: 'DL 1C 9999', f: 'Kota', to: 'Jaipur', b: 120, e: 1850, s: 2000 },
                    { t: 'MH 04 1234', f: 'Mumbai', to: 'Pune', b: 300, e: 1600, s: 1500 },
                    { t: 'TN 07 EF 3456', f: 'Chennai', to: 'Vellore', b: 80, e: 1950, s: 2000 },
                    { t: 'KA 03 CD 7890', f: 'Bengaluru', to: 'Mysuru', b: 450, e: 1300, s: 1000 }
                  ].map((r, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-[#111827]">{r.t}</td>
                      <td className="text-sm text-[#374151]">{r.f}</td>
                      <td className="text-sm text-[#374151]">{r.to}</td>
                      <td className={`font-medium ${r.b < 200 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>₹{r.b.toLocaleString('en-IN')}</td>
                      <td className="font-medium text-[#111827]">₹{r.e.toLocaleString('en-IN')}</td>
                      <td className="font-semibold text-[#111827]">₹{r.s.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-[#F9FAFB] border-t border-[#F3F4F6]">
              <p className="text-[11px] text-[#9CA3AF]">Estimates are based on route, vehicle type, and available toll data. Actual tolls may vary slightly.</p>
            </div>
          </div>

          <div className="bank-card p-6">
            <h2 className="text-base font-semibold text-[#111827] mb-4">Why this is better than BBPS</h2>
            <ul className="space-y-3 text-sm text-[#374151]">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />No repeated vehicle entry</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />Bulk recharge from one IDFC account</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" />Recharge history stored for reports and toll issues</li>
            </ul>
          </div>
        </div>
      </Frame>

      {/* FRAME 3: Fleet Roster */}
      <Frame title="Screen 3: Fleet Roster">
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Fleet Roster</h1>
            <p className="text-sm text-[#6B7280] mt-1">Manage vehicles, balances, and KYC status.</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <div className="bank-input pl-9 text-[#9CA3AF] flex items-center">Search truck or driver...</div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#111827] text-white">All</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151]">Own Trucks</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151]">Hired Trucks</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151]">Low Balance</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#374151]">KYC Issue</button>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary text-sm"><Upload className="w-4 h-4" /> Upload Vehicle Excel</button>
              <button className="btn-secondary text-sm"><Download className="w-4 h-4" /> Download Report</button>
              <button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Truck</button>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 bank-card overflow-hidden">
              <table className="bank-table">
                <thead>
                  <tr>
                    <th>Truck Number</th>
                    <th>Type</th>
                    <th>Driver</th>
                    <th>FASTag Balance</th>
                    <th>KYC Status</th>
                    <th>Auto Recharge</th>
                    <th>Daily Limit</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { t: 'MH 04 1234', type: 'own', d: 'Ramesh Kumar', b: 2400, kyc: 'Verified', ar: 'On', l: '₹5,000', s: 'Active', sC: 'badge-success' },
                    { t: 'DL 1C 9999', type: 'own', d: 'Suresh Singh', b: 120, kyc: 'Verified', ar: 'On', l: '₹5,000', s: 'Low Balance', sC: 'badge-warning' },
                    { t: 'RJ 14 XZ 9999', type: 'hired', d: 'Pankaj Gupta', b: 0, kyc: 'Trip Budget Active', ar: 'Off', l: '₹2,000', s: 'Active', sC: 'badge-success' },
                    { t: 'HR 26 8888', type: 'own', d: 'Amit Sharma', b: 800, kyc: 'KYC Issue', ar: 'Off', l: '₹5,000', s: 'Inactive', sC: 'badge-gray' },
                    { t: 'KA 03 CD 7890', type: 'own', d: 'Vijay Reddy', b: 450, kyc: 'Verified', ar: 'On', l: '₹5,000', s: 'Low Balance', sC: 'badge-warning' },
                    { t: 'MH 12 AB 4567', type: 'hired', d: 'Deepak Patil', b: 400, kyc: 'Trip Budget Active', ar: 'Off', l: '₹2,000', s: 'Low Balance', sC: 'badge-warning' },
                    { t: 'TN 07 EF 3456', type: 'own', d: 'Karthik Iyer', b: 80, kyc: 'Verified', ar: 'On', l: '₹5,000', s: 'Critical', sC: 'badge-error' },
                    { t: 'UP 32 GH 6789', type: 'own', d: 'Rajesh Yadav', b: 4600, kyc: 'Verified', ar: 'On', l: '₹5,000', s: 'Active', sC: 'badge-success' },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-[#111827]">{r.t}</td>
                      <td>
                        <span className={`badge ${r.type === 'own' ? 'badge-info' : 'badge-gray'} text-[10px] px-1.5 py-0`}>
                          {r.type === 'own' ? 'Own Truck' : 'Hired Truck'}
                        </span>
                      </td>
                      <td className="font-medium text-[#111827]">{r.d}</td>
                      <td className={`font-medium ${r.b < 500 && r.type === 'own' ? 'text-[#DC2626]' : 'text-[#111827]'}`}>₹{r.b.toLocaleString('en-IN')}</td>
                      <td>{r.kyc === 'KYC Issue' ? <span className="text-[#DC2626] font-medium text-xs">KYC Issue</span> : <span className="text-[#059669] font-medium text-xs">{r.kyc}</span>}</td>
                      <td className="text-[#374151] font-medium">{r.ar}</td>
                      <td className="text-[#374151] font-medium">{r.l}</td>
                      <td><span className={`badge ${r.sC}`}>{r.s}</span></td>
                      <td><button className="text-[#2563EB] text-xs font-semibold">Manage</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="w-80 flex-shrink-0 bank-card">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">DL 1C 9999</h2>
                    <p className="text-sm text-[#6B7280]">Driver: Suresh Singh</p>
                  </div>
                  <span className="badge badge-info text-[10px] px-1.5 py-0">Own Truck</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">FASTag Balance</span>
                    <span className="font-bold text-[#DC2626] text-lg">₹120</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">KYC Status</span>
                    <span className="font-medium text-[#16A34A] text-sm">Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">Auto Recharge</span>
                    <span className="font-medium text-[#111827] text-sm">On</span>
                  </div>
                </div>
                <div className="border-t border-[#E5E7EB] pt-4">
                  <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-3">Recent Activity</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5"></div>
                      <p className="text-sm text-[#111827] font-medium">Recharge failed — ₹2,000</p>
                    </li>
                    <li className="flex gap-2 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-1.5"></div>
                      <p className="text-sm text-[#111827] font-medium">Toll deduction — ₹620</p>
                    </li>
                    <li className="flex gap-2 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5"></div>
                      <p className="text-sm text-[#111827] font-medium">Low balance alert sent</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* FRAME 4: Auto Recharge Rules and Trip Toll Budget */}
      <Frame title="Screen 4: Auto Recharge Rules and Trip Toll Budget">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Auto Recharge Rules</h1>
              <p className="text-sm text-[#6B7280] mt-1">Configure automated recharges for your own trucks.</p>
            </div>
            <div className="bank-card p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">When balance falls below</label>
                  <div className="bank-input text-[#111827] flex items-center bg-[#F9FAFB]">₹500</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Recharge amount</label>
                  <div className="bank-input text-[#111827] flex items-center bg-[#F9FAFB]">₹2,000</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Apply to</label>
                  <div className="bank-input flex items-center justify-between bg-[#F9FAFB]">
                    <span className="text-[#111827]">Selected trucks</span>
                    <span className="badge badge-gray text-xs">8 items</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Funding Source</label>
                  <div className="bank-input text-[#111827] flex items-center bg-[#F9FAFB]">IDFC Current Account</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Require approval if recharge amount exceeds</label>
                  <div className="bank-input text-[#111827] flex items-center bg-[#F9FAFB]">₹5,000</div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-medium text-[#111827] text-sm">Daily Spend Limit</span>
                  <div className="toggle-track bg-[#16A34A]">
                    <div className="toggle-thumb translate-x-[22px]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bank-card p-4 bg-[#F0FDF4] border-[#BBF7D0]">
              <h3 className="font-semibold text-[#166534] text-sm mb-1">Rule Summary</h3>
              <p className="text-sm text-[#14532D] mb-1">Automatically recharge 8 trucks with ₹2,000 when balance drops below ₹500.</p>
              <p className="text-sm font-medium text-[#166534]">Estimated recharges tomorrow: 2 trucks.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Trip Toll Budget</h1>
              <p className="text-sm text-[#6B7280] mt-1">For hired trucks, set a toll budget for a specific trip and track spend.</p>
            </div>

            <h3 className="font-semibold text-[#111827] text-sm mb-2">Active Trips</h3>
            <div className="bank-card p-5 border-l-4 border-l-[#16A34A] mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-[#111827]">Trip #4092</h4>
                    <span className="badge badge-success text-[10px] px-1.5 py-0">Active</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">Delhi to Jaipur • Truck: RJ 14 XZ 9999</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Budget</p>
                  <p className="text-lg font-bold text-[#111827]">₹3,450</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Spent</p>
                  <p className="font-semibold text-sm text-[#111827]">₹1,200</p>
                </div>
                <div className="w-px bg-[#E5E7EB]"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Remaining</p>
                  <p className="font-bold text-sm text-[#16A34A]">₹2,250</p>
                </div>
                <div className="w-px bg-[#E5E7EB]"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Next Toll Balance</p>
                  <p className="font-semibold text-sm text-[#111827]">₹400</p>
                </div>
              </div>
            </div>

            <div className="bank-card p-5 border-l-4 border-l-[#D97706] mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-[#111827]">Trip #4093</h4>
                    <span className="badge badge-warning text-[10px] px-1.5 py-0">Near Limit</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">Mumbai to Pune • Truck: MH 12 AB 4567</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Budget</p>
                  <p className="text-lg font-bold text-[#111827]">₹2,200</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Spent</p>
                  <p className="font-semibold text-sm text-[#111827]">₹1,800</p>
                </div>
                <div className="w-px bg-[#E5E7EB]"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Remaining</p>
                  <p className="font-bold text-sm text-[#D97706]">₹400</p>
                </div>
                <div className="w-px bg-[#E5E7EB]"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Next Toll Balance</p>
                  <p className="font-bold text-sm text-[#DC2626]">₹350</p>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-[#111827] text-sm mb-2">Completed Trips</h3>
            <div className="bank-card p-5 opacity-75">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-[#111827]">Trip #4091</h4>
                    <span className="badge badge-gray text-[10px] px-1.5 py-0">Completed</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">Bangalore to Chennai • Truck: KA 03 CD 7890</p>
                </div>
                <div className="text-right flex gap-4">
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Budget</p>
                    <p className="font-semibold text-sm text-[#111827]">₹7,800</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Spent</p>
                    <p className="font-semibold text-sm text-[#111827]">₹7,800</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Remaining</p>
                    <p className="font-semibold text-sm text-[#111827]">₹0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* FRAME 5: Toll Issues and GST Reports */}
      <Frame title="Screen 5: Toll Issues and GST Reports">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Toll Issues</h1>
              <p className="text-sm text-[#6B7280] mt-1">Raise and track toll related issues in one place.</p>
            </div>
            
            <div className="flex gap-2 border-b border-[#E5E7EB]">
              <div className="px-4 py-3 border-b-2 border-[#C1121F] font-semibold text-[#C1121F] text-sm flex items-center gap-2">All <span className="bg-[#FEE2E2] text-[#991B1B] px-1.5 py-0.5 rounded text-xs">4</span></div>
              <div className="px-4 py-3 font-medium text-[#6B7280] text-sm flex items-center gap-2">Open <span className="badge badge-gray px-1.5 py-0.5 rounded text-xs">2</span></div>
              <div className="px-4 py-3 font-medium text-[#6B7280] text-sm flex items-center gap-2">Pending Evidence <span className="badge badge-gray px-1.5 py-0.5 rounded text-xs">1</span></div>
              <div className="px-4 py-3 font-medium text-[#6B7280] text-sm flex items-center gap-2">Resolved <span className="badge badge-gray px-1.5 py-0.5 rounded text-xs">1</span></div>
            </div>

            <div className="space-y-4">
              {[
                { id: 'DISP-001', truck: 'MH 04 1234', issue: 'Double Deduction', amt: '₹1,450', date: 'May 8, 2026', s: 'Open', sC: 'badge-warning', act: 'View', actC: 'btn-secondary text-xs py-1.5 px-4 min-h-0' },
                { id: 'DISP-002', truck: 'DL 1C 9999', issue: 'Wrong Vehicle Class', amt: '₹3,200', date: 'May 7, 2026', s: 'Pending Evidence', sC: 'badge-error', act: 'Upload', actC: 'btn-primary text-xs py-1.5 px-4 min-h-0' },
                { id: 'DISP-003', truck: 'MH 04 1234', issue: 'Location Mismatch', amt: '₹850', date: 'May 5, 2026', s: 'Resolved', sC: 'badge-success', act: 'View', actC: 'btn-secondary text-xs py-1.5 px-4 min-h-0' },
                { id: 'DISP-004', truck: 'KA 03 CD 7890', issue: 'Failed Recharge Deducted', amt: '₹2,100', date: 'May 8, 2026', s: 'Open', sC: 'badge-warning', act: 'View', actC: 'btn-secondary text-xs py-1.5 px-4 min-h-0' },
              ].map((r, i) => (
                <div key={i} className="bank-card p-5 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-semibold text-[#6B7280]">{r.id}</span>
                      <span className={`badge ${r.sC} text-[10px] px-1.5 py-0 uppercase tracking-wide`}>{r.s}</span>
                    </div>
                    <p className="font-bold text-[#111827] text-sm">{r.issue}</p>
                    <p className="text-xs text-[#4B5563] mt-1">Truck: {r.truck} • Amount: <span className="font-semibold text-[#111827]">{r.amt}</span></p>
                    <p className="text-[11px] text-[#6B7280] mt-1">Filed on: {r.date}</p>
                  </div>
                  <button className={r.actC}>{r.act}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">GST Reports</h1>
              <p className="text-sm text-[#6B7280] mt-1">Download monthly toll spend reports for accounting and reconciliation.</p>
            </div>

            <div className="bank-card bg-[#111827] border-[#111827] p-6 text-white">
              <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1">Generate Monthly GST Report</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-2xl font-bold">April 2026</p>
                <button className="bg-white text-[#111827] border-none font-semibold text-sm py-2 px-4 rounded-lg flex items-center gap-2 shadow-sm">
                  <Download className="w-4 h-4" /> Generate Report
                </button>
              </div>
            </div>

            <div className="bank-card p-5">
              <h2 className="text-sm font-semibold text-[#111827] mb-3">This Month at a Glance</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Receipts Reconciled</p>
                  <p className="text-lg font-bold text-[#111827] mt-0.5">342</p>
                </div>
                <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Toll Issues Resolved</p>
                  <p className="text-lg font-bold text-[#111827] mt-0.5">4</p>
                </div>
                <div className="bg-[#FEF2F2] p-3 rounded-lg border border-[#FCA5A5]">
                  <p className="text-[10px] text-[#991B1B] uppercase font-semibold tracking-wide">Duplicate Tolls Flagged</p>
                  <p className="text-lg font-bold text-[#DC2626] mt-0.5">₹12,400</p>
                </div>
                <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB]">
                  <p className="text-[10px] text-[#6B7280] uppercase font-semibold tracking-wide">Total Toll Spend</p>
                  <p className="text-lg font-bold text-[#111827] mt-0.5">₹9,82,400</p>
                </div>
              </div>
            </div>

            <div className="bank-card overflow-hidden">
              <div className="px-5 py-4 border-b border-[#F3F4F6]">
                <h2 className="text-sm font-semibold text-[#111827]">Available Reports</h2>
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {[
                  { m: 'April 2026', a: '₹9,82,400', rec: '342 receipts', t: '4 toll issues resolved' },
                  { m: 'March 2026', a: '₹8,74,600', rec: '318 receipts', t: '2 toll issues resolved' },
                  { m: 'February 2026', a: '₹7,91,300', rec: '291 receipts', t: '6 toll issues resolved' }
                ].map((r, i) => (
                  <div key={i} className="p-4 px-5 flex justify-between items-center bg-white hover:bg-[#F9FAFB] transition-colors">
                    <div>
                      <p className="font-semibold text-[#111827] text-sm">{r.m}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{r.a} • {r.rec} • {r.t}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="badge badge-success text-[10px] uppercase tracking-wide">Ready</span>
                      <button className="text-[#2563EB] font-semibold text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* FRAME 6: Settings, Roles and Audit Log */}
      <Frame title="Screen 6: Settings, Roles and Audit Log">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bank-card p-5">
              <h2 className="text-base font-semibold text-[#111827] mb-4">Approval Rules</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                  <span className="text-sm font-medium text-[#374151]">Require approval for recharge above</span>
                  <span className="font-semibold text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-1 rounded text-sm">₹5,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                  <span className="text-sm font-medium text-[#374151]">Require approval for IDFC Fleet Credit Limit funded recharge above</span>
                  <span className="font-semibold text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-1 rounded text-sm">₹5,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
                  <span className="text-sm font-medium text-[#374151]">Require approval for hired truck budget above</span>
                  <span className="font-semibold text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-1 rounded text-sm">₹10,000</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-[#374151]">Send alerts for failed recharge</span>
                  <div className="toggle-track bg-[#16A34A]"><div className="toggle-thumb translate-x-[22px]"></div></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-[#374151]">Send alerts for low balance</span>
                  <div className="toggle-track bg-[#16A34A]"><div className="toggle-thumb translate-x-[22px]"></div></div>
                </div>
              </div>
            </div>

            <div className="bank-card p-5">
              <h2 className="text-base font-semibold text-[#111827] mb-4">Linked Bank Account</h2>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-[#C1121F] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] text-sm">IDFC FIRST Current Account</h3>
                    <p className="text-xs text-[#6B7280]">Account ending 8892 • Primary recharge source</p>
                  </div>
                </div>
                <span className="badge badge-success text-[10px] uppercase tracking-wide">Active</span>
              </div>
            </div>

            <div className="bank-card p-5">
              <h2 className="text-base font-semibold text-[#111827] mb-4">Notification Preferences</h2>
              <div className="space-y-3">
                {['Low balance alerts', 'Recharge confirmations', 'Toll issue updates', 'GST report ready'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border-2 border-[#C1121F] bg-[#C1121F] flex items-center justify-center"><CheckCircle className="w-3 h-3 text-white" /></div>
                    <span className="text-sm font-medium text-[#374151]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bank-card p-5">
              <h2 className="text-sm font-semibold text-[#111827] mb-3">Audit Log</h2>
              <div className="space-y-0 divide-y divide-[#F9FAFB]">
                {[
                  { text: 'Bulk recharge approved — 14 trucks, ₹28,000', time: '10m ago' },
                  { text: 'Auto recharge rule updated — threshold ₹500', time: '1h ago' },
                  { text: 'Toll issue evidence uploaded — DISP-001', time: '2h ago' },
                  { text: 'GST report downloaded — April 2026', time: '4h ago' },
                  { text: 'Trip budget created — Trip #4092', time: '5h ago' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start py-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB] mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#111827]">{item.text}</p>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bank-card p-6">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-[#111827]">Access and Roles</h2>
                <p className="text-xs text-[#6B7280] mt-1">Control what each team can approve, edit, view, and download.</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="border border-[#E5E7EB] rounded-lg p-4 bg-[#F9FAFB]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-[#111827] text-sm">Fleet Owner / Super Admin</h3>
                  </div>
                  <p className="text-xs text-[#6B7280]">Full access to account, approvals, users, reports and settings.</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-[#111827] text-sm">Finance Manager</h3>
                  </div>
                  <p className="text-xs text-[#6B7280]">Can approve recharges, manage funding source, download GST reports and view audit log.</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-[#111827] text-sm">Operations Manager</h3>
                  </div>
                  <p className="text-xs text-[#6B7280]">Can manage fleet roster, trip toll budget, toll issues and prepare recharge actions.</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-[#111827] text-sm">Viewer / Auditor</h3>
                  </div>
                  <p className="text-xs text-[#6B7280]">Read only access to fleet status, reports and audit history.</p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#111827] mb-3">Active Team Members</h3>
                <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                  <table className="bank-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold text-[#111827]">Amit Desai</td>
                        <td><span className="badge badge-error text-[10px] px-1.5 py-0 uppercase">Fleet Owner</span></td>
                        <td><span className="text-[#16A34A] text-xs font-medium">Active</span></td>
                        <td><button className="text-[#2563EB] text-xs font-semibold">Edit</button></td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-[#111827]">Priya Patel</td>
                        <td><span className="badge badge-success text-[10px] px-1.5 py-0 uppercase">Finance Manager</span></td>
                        <td><span className="text-[#16A34A] text-xs font-medium">Active</span></td>
                        <td><button className="text-[#2563EB] text-xs font-semibold">Edit</button></td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-[#111827]">Rohan Sharma</td>
                        <td><span className="badge badge-warning text-[10px] px-1.5 py-0 uppercase">Operations Manager</span></td>
                        <td><span className="text-[#16A34A] text-xs font-medium">Active</span></td>
                        <td><button className="text-[#2563EB] text-xs font-semibold">Edit</button></td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-[#111827]">Neha Gupta</td>
                        <td><span className="badge badge-info text-[10px] px-1.5 py-0 uppercase">Viewer / Auditor</span></td>
                        <td><span className="text-[#6B7280] text-xs font-medium">Invite Pending</span></td>
                        <td><button className="text-[#2563EB] text-xs font-semibold">Resend</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="btn-secondary w-full justify-center text-sm">
                Invite Staff Member
              </button>
            </div>
          </div>
        </div>
      </Frame>
      
    </div>
  );
}
