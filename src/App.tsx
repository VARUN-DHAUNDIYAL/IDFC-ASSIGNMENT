import { Routes, Route, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';

// Pages
import SmallFleetHome from '@/pages/SmallFleetHome';
import SmallFleetRecharge from '@/pages/SmallFleetRecharge';
import EnterpriseDashboard from '@/pages/EnterpriseDashboard';

import FigmaSmallFleetCapture from '@/pages/FigmaSmallFleetCapture';
import FigmaEnterpriseCapture from '@/pages/FigmaEnterpriseCapture';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

import OneClickRecharge from '@/pages/OneClickRecharge';
import AutoRechargeRules from '@/pages/AutoRechargeRules';
import FleetRoster from '@/pages/FleetRoster';
import TripTollBudget from '@/pages/TripTollBudget';
import Disputes from '@/pages/Disputes';
import GstReports from '@/pages/GstReports';
import Settings from '@/pages/Settings';

type PortalMode = 'small-fleet' | 'enterprise';

const ENTERPRISE_PATHS = [
  '/enterprise',
  '/enterprise/recharge',
  '/enterprise/auto-rules',
  '/enterprise/fleet',
  '/enterprise/trips',
  '/enterprise/issues',
  '/enterprise/gst',
  '/enterprise/settings',
];

function Portal() {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive initial mode from current path
  const [portalMode, setPortalMode] = useState<PortalMode>(() => {
    const saved = sessionStorage.getItem('portalMode') as PortalMode | null;
    if (saved) return saved;
    return ENTERPRISE_PATHS.some(p => location.pathname.startsWith(p))
      ? 'enterprise'
      : 'small-fleet';
  });

  // Sync mode with route
  useEffect(() => {
    const isEnterprise = ENTERPRISE_PATHS.some(p => location.pathname.startsWith(p));
    setPortalMode(isEnterprise ? 'enterprise' : 'small-fleet');
  }, [location.pathname]);

  const handleModeChange = (mode: PortalMode) => {
    setPortalMode(mode);
    sessionStorage.setItem('portalMode', mode);
    if (mode === 'enterprise') {
      navigate('/enterprise');
    } else {
      navigate('/');
    }
  };

  const renderPage = () => {
    switch (location.pathname) {
      // Small Fleet
      case '/':          return <SmallFleetHome />;
      case '/recharge':  return <SmallFleetRecharge />;
      // Enterprise
      case '/enterprise':              return <EnterpriseDashboard />;
      case '/enterprise/recharge':     return <OneClickRecharge />;
      case '/enterprise/auto-rules':   return <AutoRechargeRules />;
      case '/enterprise/fleet':        return <FleetRoster />;
      case '/enterprise/trips':        return <TripTollBudget />;
      case '/enterprise/issues':       return <Disputes />;
      case '/enterprise/gst':          return <GstReports />;
      case '/enterprise/settings':     return <Settings />;
      default:                         return <NotFound />;
    }
  };

  return (
    <AppShell portalMode={portalMode} onModeChange={handleModeChange}>
      {renderPage()}
    </AppShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/figma-small-fleet-capture" element={<FigmaSmallFleetCapture />} />
      <Route path="/figma-enterprise-capture" element={<FigmaEnterpriseCapture />} />
      <Route path="/*" element={<Portal />} />
    </Routes>
  );
}
