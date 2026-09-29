import React from 'react';
import { TicketProvider, useTickets } from './context/TicketContext';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import NotificationToast from './components/NotificationToast';
import CreateTicketForm from './components/CreateTicketForm';
import MaintenanceDashboard from './components/MaintenanceDashboard';
import TokenTracker from './components/TokenTracker';

function AppContent() {
  const { activeRole, loggedInPortal, login, logout } = useTickets();

  // Show login page if not logged in
  if (!loggedInPortal) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 text-slate-900 overflow-hidden">
      {/* Top Navigation */}
      <Navbar onLogout={logout} />

      {/* Floating Alert Toasts & Sound */}
      <NotificationToast />

      {/* Main View Router — fills remaining height with scroll */}
      <main className="flex-1 overflow-y-auto">
        {(activeRole === 'FACULTY' || activeRole === 'LAB_ASSISTANT') && <CreateTicketForm />}
        {activeRole === 'MAINTENANCE' && <MaintenanceDashboard />}
        {activeRole === 'TRACKER' && <TokenTracker />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TicketProvider>
      <AppContent />
    </TicketProvider>
  );
}
