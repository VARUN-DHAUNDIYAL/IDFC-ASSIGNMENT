import { Routes, Route, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import CommandCenter from '@/pages/CommandCenter';
import LiquidityRules from '@/pages/LiquidityRules';
import EscrowHub from '@/pages/EscrowHub';
import DisputeEngine from '@/pages/DisputeEngine';
import GstAggregator from '@/pages/GstAggregator';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fleet mode toggle state - derived from current route
  const [fleetMode, setFleetMode] = useState<'owned' | 'market'>(() => {
    return location.pathname === '/escrow' ? 'market' : 'owned';
  });

  // Sync fleet mode with route changes
  useEffect(() => {
    if (location.pathname === '/escrow') {
      setFleetMode('market');
    } else if (location.pathname === '/') {
      setFleetMode('owned');
    }
  }, [location.pathname]);

  // Handle fleet mode toggle
  const handleFleetModeChange = (mode: 'owned' | 'market') => {
    setFleetMode(mode);
    if (mode === 'market') {
      navigate('/escrow');
    } else {
      navigate('/');
    }
  };

  // Determine which page content to show based on route
  const renderPage = () => {
    switch (location.pathname) {
      case '/':
        return <CommandCenter />;
      case '/liquidity':
        return <LiquidityRules />;
      case '/escrow':
        return <EscrowHub />;
      case '/dispute':
        return <DisputeEngine />;
      case '/gst':
        return <GstAggregator />;
      default:
        return <NotFound />;
    }
  };

  // Only show fleet toggle on Command Center and Escrow pages
  const showFleetToggle = location.pathname === '/' || location.pathname === '/escrow';

  return (
    <AppShell
      fleetMode={fleetMode}
      onFleetModeChange={showFleetToggle ? handleFleetModeChange : () => {}}
    >
      {renderPage()}
    </AppShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/liquidity" element={<Dashboard />} />
      <Route path="/escrow" element={<Dashboard />} />
      <Route path="/dispute" element={<Dashboard />} />
      <Route path="/gst" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}
