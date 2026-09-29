import React from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  Building2, 
  GraduationCap, 
  FlaskConical, 
  Wrench, 
  Search, 
  Volume2, 
  VolumeX, 
  AlertTriangle,
  LogOut
} from 'lucide-react';

export default function Navbar({ onLogout }) {
  const { 
    activeRole, 
    setActiveRole, 
    soundEnabled, 
    setSoundEnabled, 
    tickets,
    loggedInPortal
  } = useTickets();

  // Count pending immediate classroom tickets
  const pendingImmediateCount = tickets.filter(
    (t) => t.urgency === 'IMMEDIATE' && t.status === 'PENDING_ASSIGNMENT'
  ).length;

  const totalPending = tickets.filter((t) => t.status === 'PENDING_ASSIGNMENT').length;

  // Determine which tabs to show based on logged-in portal
  const isMaintenance = loggedInPortal === 'maintenance';
  const isFaculty = loggedInPortal === 'faculty';
  const isTracker = loggedInPortal === 'tracker';

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-lg shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & University Header */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white">CampusFix</span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-300 font-semibold px-1.5 py-0.5 rounded-full border border-indigo-500/40 hidden sm:inline">
                  {isMaintenance ? 'Maintenance Portal' : isFaculty ? 'Faculty Portal' : 'Token Tracker'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal hidden sm:block">
                University Maintenance Hub
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute alert sounds' : 'Enable alert sounds'}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors ${
                soundEnabled 
                  ? 'bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-700' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 border border-slate-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Role Switching Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none py-1.5 gap-1.5 border-t border-slate-800/80">
          
          {/* Faculty Tab - visible for faculty & maintenance portals */}
          {(isFaculty || isMaintenance) && (
            <button
              onClick={() => setActiveRole('FACULTY')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeRole === 'FACULTY'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              <span>Faculty</span>
              <span className="text-[9px] bg-red-500/20 text-red-300 px-1 py-0.5 rounded font-mono">
                Immediate
              </span>
            </button>
          )}

          {/* Lab Assistant Tab - visible for faculty & maintenance portals */}
          {(isFaculty || isMaintenance) && (
            <button
              onClick={() => setActiveRole('LAB_ASSISTANT')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeRole === 'LAB_ASSISTANT'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lab Assistant</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded font-mono">
                Weekend
              </span>
            </button>
          )}

          {/* Maintenance Tab - visible for maintenance portal */}
          {isMaintenance && (
            <button
              onClick={() => setActiveRole('MAINTENANCE')}
              className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeRole === 'MAINTENANCE'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-300" />
              <span>Maintenance Desk</span>
              
              {pendingImmediateCount > 0 ? (
                <span className="flex items-center space-x-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{pendingImmediateCount}</span>
                </span>
              ) : totalPending > 0 ? (
                <span className="bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalPending}
                </span>
              ) : null}
            </button>
          )}

          {/* Token Tracker - visible for all */}
          <button
            onClick={() => setActiveRole('TRACKER')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeRole === 'TRACKER'
                ? 'bg-gradient-to-r from-purple-600 to-pink-700 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-purple-300" />
            <span>Track Token</span>
          </button>
        </div>
      </div>
    </header>
  );
}
