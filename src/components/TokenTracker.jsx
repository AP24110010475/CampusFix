import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  HardHat, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function TokenTracker() {
  const { tickets, lastCreatedToken, setActiveRole } = useTickets();

  const [tokenInput, setTokenInput] = useState(
    lastCreatedToken?.tokenNumber || tickets[0]?.tokenNumber || 'TKN-CV603-9821'
  );
  const [searchedTokenId, setSearchedTokenId] = useState(tokenInput);

  const matchedTicket = tickets.find(
    (t) => t.tokenNumber.toLowerCase() === searchedTokenId.trim().toLowerCase()
  ) || tickets[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setSearchedTokenId(tokenInput.trim());
    }
  };

  if (!matchedTicket) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <h3 className="text-lg font-bold text-slate-800">No token found</h3>
      </div>
    );
  }

  const isImmediate = matchedTicket.urgency === 'IMMEDIATE';
  const isResolved = matchedTicket.status === 'RESOLVED';
  const isInProgress = matchedTicket.status === 'IN_PROGRESS';
  const isAssigned = matchedTicket.status === 'ASSIGNED' || isInProgress || isResolved;

  const steps = [
    {
      title: 'Token Raised',
      subtitle: `${new Date(matchedTicket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by ${matchedTicket.reporterName}`,
      completed: true,
      current: matchedTicket.status === 'PENDING_ASSIGNMENT'
    },
    {
      title: 'Personnel Assigned',
      subtitle: matchedTicket.assignedTechnicianName ? `${matchedTicket.assignedTechnicianName}` : 'Awaiting assignment',
      completed: isAssigned,
      current: matchedTicket.status === 'ASSIGNED'
    },
    {
      title: 'In Progress',
      subtitle: isImmediate ? 'On-site assistance' : `${matchedTicket.scheduledDate}`,
      completed: isInProgress || isResolved,
      current: isInProgress
    },
    {
      title: 'Resolved',
      subtitle: isResolved ? `Closed at ${new Date(matchedTicket.resolvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Pending',
      completed: isResolved,
      current: isResolved
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 space-y-4">
      
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-4">
          <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Track Token Status
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Enter your token number to view live resolution progress.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="e.g. TKN-CV603-9821"
            className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-600/30 transition"
          >
            Track
          </button>
        </form>

        {/* Quick Pills */}
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[10px] text-slate-400 font-medium">Quick:</span>
          {tickets.slice(0, 3).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTokenInput(t.tokenNumber);
                setSearchedTokenId(t.tokenNumber);
              }}
              className="text-[10px] font-mono bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 transition"
            >
              {t.tokenNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Details & Timeline */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Banner */}
        <div className={`p-4 text-white ${
          isImmediate
            ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700'
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-[10px] uppercase bg-black/20 font-extrabold px-2 py-0.5 rounded-full">
                  {matchedTicket.tokenNumber}
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  {matchedTicket.roleType === 'FACULTY' ? '🎓 Faculty' : '🔬 Lab Assistant'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold">
                {matchedTicket.blockName} — Floor {matchedTicket.floor}, Room {matchedTicket.roomNumber}
              </h3>
              {matchedTicket.systemNumber && (
                <div className="text-[10px] font-mono font-bold mt-0.5 text-emerald-100">
                  Workstation: {matchedTicket.systemNumber}
                </div>
              )}
            </div>

            <div className="text-right sm:self-center">
              <span className="text-[10px] text-white/80 block">Status</span>
              <span className="text-sm font-black bg-white text-slate-900 px-3 py-0.5 rounded-lg shadow-sm inline-block mt-0.5">
                {matchedTicket.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
            Dispatch & Resolution Progress
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  step.completed
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : step.current
                    ? 'bg-amber-500 text-white ring-4 ring-amber-200'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-slate-900">{step.title}</h5>
                  <p className="text-[9px] text-slate-500">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Problem */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Problem Statement
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs italic leading-relaxed">
              "{matchedTicket.problemDescription}"
            </div>
          </div>

          {/* Technician */}
          {matchedTicket.assignedTechnicianName ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Assigned Technician
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">
                      {matchedTicket.assignedTechnicianName}
                    </h5>
                    <p className="text-[10px] text-slate-500">{matchedTicket.assignedTechnicianRole}</p>
                    <div className="text-[10px] text-indigo-600 font-mono font-semibold mt-0.5">
                      {matchedTicket.assignedTechnicianPhone}
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 block">Dispatch Window</span>
                  <span className={`text-xs font-bold ${isImmediate ? 'text-red-600' : 'text-emerald-700'}`}>
                    {matchedTicket.scheduledDate} ({matchedTicket.scheduledSlot})
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div className="text-xs text-amber-900">
                <span className="font-bold block">Pending Dispatch</span>
                <span className="text-[10px]">Assigning a capable technician...</span>
              </div>
              <button
                onClick={() => setActiveRole('MAINTENANCE')}
                className="text-[10px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-lg transition"
              >
                Assign Now →
              </button>
            </div>
          )}

          {/* Resolution */}
          {matchedTicket.status === 'RESOLVED' && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[10px] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Issue Resolved & Closed</span>
              </div>
              {matchedTicket.rootCause && (
                <div className="text-xs text-emerald-950">
                  <span className="font-semibold text-slate-600">Root Cause: </span>
                  <span className="font-bold">{matchedTicket.rootCause}</span>
                </div>
              )}
              <div className="text-xs text-emerald-900">
                <span className="font-semibold text-slate-600">Action: </span>
                <span>{matchedTicket.resolutionNotes}</span>
              </div>
              {matchedTicket.partsReplaced && (
                <div className="text-xs text-emerald-900">
                  <span className="font-semibold text-slate-600">Parts: </span>
                  <span className="font-mono font-bold">{matchedTicket.partsReplaced}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
