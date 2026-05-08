// IDFC FIRST Fleet OS - Data Models & Mock State

export interface FleetLiquidity {
  totalAvailable: number;
  yieldRate: number;
  dailyBurn: number;
  activeVehicles: number;
}

export type AnomalyType = 'fraud' | 'balance' | 'kyc';
export type AnomalySeverity = 'critical' | 'warning' | 'info';
export type AnomalyStatus = 'blocked' | 'triggered' | 'pending';

export interface Anomaly {
  id: string;
  type: AnomalyType;
  vehicleId: string;
  title: string;
  description: string;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  statusLabel: string;
  actionLabel: string;
  tooltipLogic: string;
}

export interface MarketEscrow {
  tripId: string;
  contractorId: string;
  eWayBill: string;
  origin: string;
  destination: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  escrowLocked: number;
  nextTollDistance: number;
  preCacheAmount: number;
  vehicleReg: string;
  driverVerified: boolean;
  nextTollName: string;
}

export interface Vehicle {
  id: string;
  rcNumber: string;
  driverName: string;
  status: 'active' | 'inactive' | 'low_balance';
  balance: number;
  lastTrip: string;
}

export const fleetLiquidity: FleetLiquidity = {
  totalAvailable: 1850000,
  yieldRate: 7.5,
  dailyBurn: 42300,
  activeVehicles: 142,
};

export const anomalies: Anomaly[] = [
  {
    id: 'anom-001',
    type: 'fraud',
    vehicleId: 'MH-04-1234',
    title: 'Geofence Mismatch',
    description: 'Vehicle MH-04-1234 deducted at Plaza B. Live telematics indicate asset is parked in Delhi.',
    severity: 'critical',
    status: 'blocked',
    statusLabel: 'Charge Blocked',
    actionLabel: 'View Prov. Credit Details',
    tooltipLogic: 'System auto-files NPCI dispute and issues instant provisional credit to master wallet, protecting working capital during resolution SLA.',
  },
  {
    id: 'anom-002',
    type: 'balance',
    vehicleId: 'DL-1C-9999',
    title: 'Critical Low Balance',
    description: 'Vehicle DL-1C-9999 approaching Plaza A. Balance: Rs.120. Route Requirement: Rs.800.',
    severity: 'warning',
    status: 'triggered',
    statusLabel: 'TTL Pre-Cache Triggered',
    actionLabel: 'Review Route Map',
    tooltipLogic: 'Executes a Time-To-Live (TTL) smart contract to buffer the next 2 tolls, ensuring asset mobility even during BBPS network timeouts.',
  },
  {
    id: 'anom-003',
    type: 'kyc',
    vehicleId: 'HR-26-8888',
    title: 'VAHAN KYC Conflict',
    description: 'Vehicle HR-26-8888 blocked by NPCI. Previous owner tag remains active in government database.',
    severity: 'info',
    status: 'pending',
    statusLabel: 'Pending Bank Resolution',
    actionLabel: 'Upload RC Document',
    tooltipLogic: 'VAHAN database conflict detected. Upload updated RC to trigger NPCI KYC refresh and unblock the FASTag.',
  },
];

export const marketEscrows: MarketEscrow[] = [
  {
    tripId: '4092',
    contractorId: 'CONT-7841',
    eWayBill: '123456789',
    origin: 'Delhi',
    destination: 'Jaipur',
    totalBudget: 5650,
    spent: 1200,
    remaining: 2250,
    escrowLocked: 3450,
    nextTollDistance: 5,
    preCacheAmount: 400,
    vehicleReg: 'RJ-14-XZ-9999',
    driverVerified: true,
    nextTollName: 'Toll Plaza C',
  },
  {
    tripId: '4093',
    contractorId: 'CONT-9023',
    eWayBill: '987654321',
    origin: 'Mumbai',
    destination: 'Pune',
    totalBudget: 3200,
    spent: 1800,
    remaining: 800,
    escrowLocked: 2200,
    nextTollDistance: 12,
    preCacheAmount: 350,
    vehicleReg: 'MH-12-AB-4567',
    driverVerified: true,
    nextTollName: 'Khalapur Toll',
  },
  {
    tripId: '4094',
    contractorId: 'CONT-4451',
    eWayBill: '456789123',
    origin: 'Bangalore',
    destination: 'Chennai',
    totalBudget: 7800,
    spent: 2400,
    remaining: 4200,
    escrowLocked: 5200,
    nextTollDistance: 8,
    preCacheAmount: 600,
    vehicleReg: 'KA-03-CD-7890',
    driverVerified: true,
    nextTollName: 'Krishnagiri Toll',
  },
];

export const vehicleList: Vehicle[] = [
  { id: 'v001', rcNumber: 'MH-04-1234', driverName: 'Ramesh Kumar', status: 'active', balance: 2450, lastTrip: '2h ago' },
  { id: 'v002', rcNumber: 'DL-1C-9999', driverName: 'Suresh Singh', status: 'low_balance', balance: 120, lastTrip: '15m ago' },
  { id: 'v003', rcNumber: 'HR-26-8888', driverName: 'Amit Sharma', status: 'inactive', balance: 0, lastTrip: '3d ago' },
  { id: 'v004', rcNumber: 'RJ-14-XZ-9999', driverName: 'Pankaj Gupta', status: 'active', balance: 3800, lastTrip: '1h ago' },
  { id: 'v005', rcNumber: 'KA-03-CD-7890', driverName: 'Vijay Reddy', status: 'active', balance: 5200, lastTrip: '45m ago' },
  { id: 'v006', rcNumber: 'MH-12-AB-4567', driverName: 'Deepak Patil', status: 'active', balance: 2100, lastTrip: '3h ago' },
  { id: 'v007', rcNumber: 'TN-07-EF-3456', driverName: 'Karthik Iyer', status: 'low_balance', balance: 350, lastTrip: '30m ago' },
  { id: 'v008', rcNumber: 'UP-32-GH-6789', driverName: 'Rajesh Yadav', status: 'active', balance: 4600, lastTrip: '1.5h ago' },
  { id: 'v009', rcNumber: 'GJ-01-IJ-1234', driverName: 'Mahesh Patel', status: 'active', balance: 3100, lastTrip: '4h ago' },
  { id: 'v010', rcNumber: 'WB-20-KL-5678', driverName: 'Sanjay Bose', status: 'inactive', balance: 0, lastTrip: '1w ago' },
  { id: 'v011', rcNumber: 'AP-28-MN-9012', driverName: 'Ravi Teja', status: 'active', balance: 5800, lastTrip: '2h ago' },
  { id: 'v012', rcNumber: 'PB-10-OP-3456', driverName: 'Gurpreet Singh', status: 'active', balance: 4200, lastTrip: '5h ago' },
];

export const gstStats = {
  receiptsReconciled: 342,
  disputesWon: 4,
  duplicateTollsPrevented: 12400,
};
