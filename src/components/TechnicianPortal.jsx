import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  HardHat, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  Calendar, 
  Wrench, 
  Star, 
  Check
} from 'lucide-react';
import ResolveTicketModal from './ResolveTicketModal';
import TicketDetailModal from './TicketDetailModal';

export default function TechnicianPortal() {
  const { technicians, tickets, updateTicketStatus } = useTickets();

  // Selected active technician simulation
  const [activeTechId, setActiveTechId] = useState(technicians[0]?.id || 'TECH-01');
  const [selectedTicketForResolve, setSelectedTicketForResolve] = useState(null);
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState(null);

  const currentTech = technicians.find((t) => t.id === activeTechId) || technicians[0];

  // Tickets assigned to this technician
  const assignedTickets = tickets.filter(
    (t) => t.assignedTechnicianId === activeTechId || (!t.assignedTechnicianId && t.status === 'PENDING_ASSIGNMENT')
  );

  const myActiveTickets = tickets.filter(
    (t) => t.assignedTechnicianId === activeTechId && t.status !== 'RESOLVED'
  );

  const myResolvedTickets = tickets.filter(
    (t) => t.assignedTechnicianId === activeTechId && t.status === 'RESOLVED'
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Technician Profile Card & Switcher */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentTech.avatar}
            alt={currentTech.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{currentTech.name}</h2>
              <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                Capable Personnel
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">{currentTech.role}</p>
            <div className="flex items-center gap-3 text-xs text-slate-300 font-mono mt-1">
              <span>{currentTech.phone}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {currentTech.rating} Rating
              </span>
              <span>•</span>
              <span>{currentTech.resolvedCount} Lifetime Repairs</span>
            </div>
          </div>
        </div>

        {/* Technician Switcher for Testing */}
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Switch Active Technician View:
          </label>
          <select
            value={activeTechId}
            onChange={(e) => setActiveTechId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Technician Task Columns */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HardHat className="w-6 h-6 text-indigo-600" />
              <span>Assigned Workload & Action Orders</span>
            </h3>
            <p className="text-xs text-slate-500">
              Tasks assigned to {currentTech.name} based on technical specialization.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              {myActiveTickets.length} Active Tasks
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              {myResolvedTickets.length} Resolved
            </span>
          </div>
        </div>

        {assignedTickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-900">All Clear! No Pending Assignments</h4>
            <p className="text-xs text-slate-500 mt-1">
              There are no tasks assigned to {currentTech.name} right now. Switch to another technician or raise a new token.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedTickets.map((ticket) => {
              const isImmediate = ticket.urgency === 'IMMEDIATE';
              const isInProgress = ticket.status === 'IN_PROGRESS';
              const isResolved = ticket.status === 'RESOLVED';

              return (
                <div
                  key={ticket.id}
                  className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 relative overflow-hidden ${
                    isImmediate && !isResolved
                      ? 'border-red-400 ring-2 ring-red-400/30'
                      : isResolved
                      ? 'border-slate-200 bg-slate-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                        {ticket.tokenNumber}
                      </span>
                      {isImmediate ? (
                        <span className="bg-red-100 text-red-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          Immediate Classroom
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-600" />
                          Weekend Lab Service
                        </span>
                      )}
                    </div>

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : isInProgress
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Location & Title */}
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {ticket.blockName} — Floor {ticket.floor}, Room {ticket.roomNumber}
                    </h4>
                    {ticket.systemNumber && (
                      <div className="text-xs font-mono font-bold text-emerald-800 mt-0.5">
                        Target System: {ticket.systemNumber}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-0.5">
                      Category: <strong>{ticket.category}</strong>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 italic">
                    "{ticket.problemDescription}"
                  </div>

                  {/* Reporter Contact Info */}
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
                    <div>
                      <span className="font-semibold block text-slate-800">{ticket.reporterName}</span>
                      <span className="text-[11px] text-slate-400">{ticket.reporterRole}</span>
                    </div>
                    {ticket.reporterPhone && (
                      <a
                        href={`tel:${ticket.reporterPhone}`}
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-mono font-semibold bg-indigo-50 px-2 py-1 rounded-lg"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{ticket.reporterPhone}</span>
                      </a>
                    )}
                  </div>

                  {/* Technician Instructions */}
                  {ticket.technicianNotes && (
                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                      <strong>Dispatch Instructions: </strong>
                      <span>{ticket.technicianNotes}</span>
                    </div>
                  )}

                  {/* Resolution Report (if already resolved) */}
                  {isResolved && (
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-[11px] text-emerald-900">
                      <strong>Resolution Notes: </strong>
                      <span>{ticket.resolutionNotes}</span>
                    </div>
                  )}

                  {/* Action Buttons for Technician */}
                  {!isResolved && (
                    <div className="pt-2 flex items-center gap-2">
                      {!isInProgress ? (
                        <button
                          onClick={() => updateTicketStatus(ticket.id, 'IN_PROGRESS')}
                          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Clock className="w-4 h-4" />
                          <span>Arrived On-Site (Start Work)</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedTicketForResolve(ticket)}
                          className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Complete & Mark Resolved</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedTicketForDetail(ticket)}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                      >
                        Details
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTicketForResolve && (
        <ResolveTicketModal
          ticket={selectedTicketForResolve}
          onClose={() => setSelectedTicketForResolve(null)}
        />
      )}

      {selectedTicketForDetail && (
        <TicketDetailModal
          ticket={selectedTicketForDetail}
          onClose={() => setSelectedTicketForDetail(null)}
          onAssign={() => {}}
          onResolve={(t) => setSelectedTicketForResolve(t)}
        />
      )}

    </div>
  );
}
