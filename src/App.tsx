import { Routes, Route, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';

// Pages
import SmallFleetHome from '@/pages/SmallFleetHome';
import SmallFleetRecharge from '@/pages/SmallFleetRecharge';
import EnterpriseDashboard from '@/pages/EnterpriseDashboard';

import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

type PortalMode = 'small-fleet' | 'enterprise';

const ENTERPRISE_PATHS = [
  '/enterprise',
  '/enterprise/recharge',
  '/enterprise/auto-rules',
  '/enterprise/fleet',
  '/enterprise/trips',
  '/enterprise/disputes',
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
      case '/enterprise':
      case '/enterprise/recharge':
      case '/enterprise/auto-rules':
      case '/enterprise/fleet':
      case '/enterprise/trips':
      case '/enterprise/disputes':
      case '/enterprise/gst':
      case '/enterprise/settings':
        return <EnterpriseDashboard />;
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
      <Route path="/*" element={<Portal />} />
    </Routes>
  );
}
