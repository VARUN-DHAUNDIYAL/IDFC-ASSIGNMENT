// IDFC FIRST Fleet Portal — Enriched Mock Data

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FleetSummary {
  totalBalance: number;
  todayTollSpend: number;
  pendingRechargeActions: number;
  openDisputes: number;
  activeVehicles: number;
  lowBalanceCount: number;
  walletBalance: number;
  linkedAccount: string;
}

export interface Vehicle {
  id: string;
  rcNumber: string;
  driverName: string;
  driverMobile: string;
  type: 'own' | 'hired';
  status: 'active' | 'inactive' | 'low_balance' | 'critical';
  balance: number;
  kycStatus: 'verified' | 'kyc_issue' | 'pending' | 'trip_budget_active';
  autoRecharge: boolean;
  dailyLimit: number;
  suggestedRecharge: number;
  todaySpend: number;
  lastTrip: string;
}

export interface TollDeduction {
  date: string;
  truck: string;
  plaza: string;
  amount: number;
  status: 'paid' | 'failed' | 'pending';
}

export interface TripBudget {
  tripId: string;
  truckNumber: string;
  driverMobile: string;
  from: string;
  to: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  nextPreload: number;
  status: 'active' | 'near_limit' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
}

export interface DisputeCase {
  id: string;
  truck: string;
  issue: string;
  issueType: string;
  amount: number;
  filedOn: string;
  status: 'open' | 'pending_evidence' | 'resolved';
  evidenceUploaded: boolean;
  expectedResolution: string;
  timeline: { date: string; event: string }[];
}

export interface GstReport {
  month: string;
  year: number;
  totalTollSpend: number;
  receipts: number;
  disputes: number;
  status: 'ready' | 'generating' | 'not_generated';
}

export interface AuditLogEntry {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
}

// ─── Fleet Summary ───────────────────────────────────────────────────────────

export const fleetSummary: FleetSummary = {
  totalBalance: 1850000,
  todayTollSpend: 42300,
  pendingRechargeActions: 14,
  openDisputes: 5,
  activeVehicles: 15,
  lowBalanceCount: 4,
  walletBalance: 4200,
  linkedAccount: '8892',
};

// ─── Vehicles ────────────────────────────────────────────────────────────────

export const vehicleList: Vehicle[] = [
  {
    id: 'v001',
    rcNumber: 'MH 04 1234',
    driverName: 'Ramesh Kumar',
    driverMobile: '9876543210',
    type: 'own',
    status: 'active',
    balance: 2400,
    kycStatus: 'verified',
    autoRecharge: true,
    dailyLimit: 5000,
    suggestedRecharge: 0,
    todaySpend: 850,
    lastTrip: '2h ago',
  },
  {
    id: 'v002',
    rcNumber: 'DL 1C 9999',
    driverName: 'Suresh Singh',
    driverMobile: '9812345678',
    type: 'own',
    status: 'low_balance',
    balance: 120,
    kycStatus: 'verified',
    autoRecharge: true,
    dailyLimit: 5000,
    suggestedRecharge: 2000,
    todaySpend: 620,
    lastTrip: '15m ago',
  },
  {
    id: 'v003',
    rcNumber: 'RJ 14 XZ 9999',
    driverName: 'Pankaj Gupta',
    driverMobile: '9988776655',
    type: 'hired',
    status: 'active',
    balance: 0,
    kycStatus: 'trip_budget_active',
    autoRecharge: false,
    dailyLimit: 2000,
    suggestedRecharge: 0,
    todaySpend: 400,
    lastTrip: '1h ago',
  },
  {
    id: 'v004',
    rcNumber: 'HR 26 8888',
    driverName: 'Amit Sharma',
    driverMobile: '9911223344',
    type: 'own',
    status: 'inactive',
    balance: 800,
    kycStatus: 'kyc_issue',
    autoRecharge: false,
    dailyLimit: 5000,
    suggestedRecharge: 0,
    todaySpend: 0,
    lastTrip: '3d ago',
  },
  {
    id: 'v005',
    rcNumber: 'KA 03 CD 7890',
    driverName: 'Vijay Reddy',
    driverMobile: '9876501234',
    type: 'own',
    status: 'low_balance',
    balance: 450,
    kycStatus: 'verified',
    autoRecharge: true,
    dailyLimit: 5000,
    suggestedRecharge: 1000,
    todaySpend: 0,
    lastTrip: '45m ago',
  },
  {
    id: 'v006',
    rcNumber: 'MH 12 AB 4567',
    driverName: 'Deepak Patil',
    driverMobile: '9765432198',
    type: 'hired',
    status: 'low_balance',
    balance: 400,
    kycStatus: 'trip_budget_active',
    autoRecharge: false,
    dailyLimit: 2000,
    suggestedRecharge: 3400,
    todaySpend: 1800,
    lastTrip: '3h ago',
  },
  {
    id: 'v007',
    rcNumber: 'TN 07 EF 3456',
    driverName: 'Karthik Iyer',
    driverMobile: '9654321987',
    type: 'own',
    status: 'low_balance',
    balance: 80,
    kycStatus: 'verified',
    autoRecharge: true,
    dailyLimit: 5000,
    suggestedRecharge: 2000,
    todaySpend: 500,
    lastTrip: '30m ago',
  },
  {
    id: 'v008',
    rcNumber: 'UP 32 GH 6789',
    driverName: 'Rajesh Yadav',
    driverMobile: '9543219876',
    type: 'own',
    status: 'active',
    balance: 4600,
    kycStatus: 'verified',
    autoRecharge: true,
    dailyLimit: 5000,
    suggestedRecharge: 0,
    todaySpend: 0,
    lastTrip: '1.5h ago',
  },
];

// ─── Recent Toll Deductions ──────────────────────────────────────────────────

export const recentTolls: TollDeduction[] = [
  { date: 'May 8', truck: 'MH 04 1234', plaza: 'Khalapur Toll', amount: 450, status: 'paid' },
  { date: 'May 8', truck: 'DL 1C 9999', plaza: 'Kherki Daula Toll', amount: 620, status: 'paid' },
  { date: 'May 8', truck: 'RJ 14 XZ 9999', plaza: 'Jaipur Toll', amount: 400, status: 'paid' },
  { date: 'May 7', truck: 'KA 03 CD 7890', plaza: 'Tumkur Toll', amount: 850, status: 'paid' },
  { date: 'May 7', truck: 'TN 07 EF 3456', plaza: 'Poonamallee Toll', amount: 500, status: 'paid' },
];

// ─── Trip Budgets ────────────────────────────────────────────────────────────

export const tripBudgets: TripBudget[] = [
  {
    tripId: '4092',
    truckNumber: 'RJ 14 XZ 9999',
    driverMobile: '9988776655',
    from: 'Delhi',
    to: 'Jaipur',
    totalBudget: 3450,
    spent: 1200,
    remaining: 2250,
    nextPreload: 400,
    status: 'active',
    startDate: 'May 8, 2026',
    endDate: 'May 10, 2026',
  },
  {
    tripId: '4093',
    truckNumber: 'MH 12 AB 4567',
    driverMobile: '9765432198',
    from: 'Mumbai',
    to: 'Pune',
    totalBudget: 2200,
    spent: 1800,
    remaining: 400,
    nextPreload: 350,
    status: 'near_limit',
    startDate: 'May 8, 2026',
    endDate: 'May 9, 2026',
  },
  {
    tripId: '4091',
    truckNumber: 'KA 03 CD 7890',
    driverMobile: '9876501234',
    from: 'Bangalore',
    to: 'Chennai',
    totalBudget: 7800,
    spent: 7800,
    remaining: 0,
    nextPreload: 0,
    status: 'completed',
    startDate: 'May 6, 2026',
    endDate: 'May 8, 2026',
  },
];

// ─── Disputes ────────────────────────────────────────────────────────────────

export const disputes: DisputeCase[] = [
  {
    id: 'DISP-001',
    truck: 'MH 04 1234',
    issue: 'Double Deduction',
    issueType: 'Double Charge',
    amount: 1450,
    filedOn: 'May 8, 2026',
    status: 'open',
    evidenceUploaded: true,
    expectedResolution: 'May 12, 2026',
    timeline: [
      { date: 'May 8', event: 'Dispute raised' },
      { date: 'May 8', event: 'Acknowledgement received from NPCI' },
    ],
  },
  {
    id: 'DISP-002',
    truck: 'DL 1C 9999',
    issue: 'Wrong Vehicle Class',
    issueType: 'Class Mismatch',
    amount: 3200,
    filedOn: 'May 7, 2026',
    status: 'pending_evidence',
    evidenceUploaded: false,
    expectedResolution: 'May 13, 2026',
    timeline: [
      { date: 'May 7', event: 'Dispute raised' },
      { date: 'May 8', event: 'Evidence requested' },
    ],
  },
  {
    id: 'DISP-003',
    truck: 'MH 04 1234',
    issue: 'Location Mismatch',
    issueType: 'Location Mismatch',
    amount: 850,
    filedOn: 'May 5, 2026',
    status: 'resolved',
    evidenceUploaded: true,
    expectedResolution: 'Resolved',
    timeline: [
      { date: 'May 5', event: 'Dispute raised' },
      { date: 'May 6', event: 'Evidence submitted' },
      { date: 'May 7', event: 'Resolved — ₹850 credited back' },
    ],
  },
  {
    id: 'DISP-004',
    truck: 'KA 03 CD 7890',
    issue: 'Failed Recharge Deducted',
    issueType: 'Failed Transaction',
    amount: 2100,
    filedOn: 'May 8, 2026',
    status: 'open',
    evidenceUploaded: false,
    expectedResolution: 'May 11, 2026',
    timeline: [
      { date: 'May 8', event: 'Dispute raised' },
    ],
  },
];

// ─── GST Reports ─────────────────────────────────────────────────────────────

export const gstReports: GstReport[] = [
  { month: 'April', year: 2026, totalTollSpend: 982400, receipts: 342, disputes: 4, status: 'ready' },
  { month: 'March', year: 2026, totalTollSpend: 874600, receipts: 318, disputes: 2, status: 'ready' },
  { month: 'February', year: 2026, totalTollSpend: 791300, receipts: 291, disputes: 6, status: 'ready' },
  { month: 'January', year: 2026, totalTollSpend: 40250, receipts: 330, disputes: 3, status: 'ready' },
];

export const gstStats = {
  receiptsReconciled: 342,
  disputesResolved: 4,
  duplicateTollsPrevented: 12400,
  totalTollSpend: 982400,
};

// ─── Audit Log ───────────────────────────────────────────────────────────────

export const auditLog: AuditLogEntry[] = [
  { id: 'a001', action: 'Bulk recharge approved — 14 trucks, ₹28,000', performedBy: 'Fleet Owner', timestamp: 'May 9, 2026 · 09:14 AM' },
  { id: 'a002', action: 'Auto recharge rule updated — threshold ₹500', performedBy: 'Fleet Owner', timestamp: 'May 8, 2026 · 06:30 PM' },
  { id: 'a003', action: 'Dispute evidence uploaded — DISP-001', performedBy: 'Operations Manager', timestamp: 'May 8, 2026 · 04:45 PM' },
  { id: 'a004', action: 'GST report downloaded — April 2026', performedBy: 'Finance Manager', timestamp: 'May 8, 2026 · 11:20 AM' },
  { id: 'a005', action: 'Trip budget created — Trip #4092', performedBy: 'Fleet Owner', timestamp: 'May 8, 2026 · 08:05 AM' },
];
