import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  Wrench, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  Search, 
  Phone,
  Eye,
  Check,
  User,
  Users
} from 'lucide-react';
import AssignTechnicianModal from './AssignTechnicianModal';
import ResolveTicketModal from './ResolveTicketModal';
import TicketDetailModal from './TicketDetailModal';
import TechnicianManager from './TechnicianManager';

export default function MaintenanceDashboard() {
  const { tickets, technicians, blocks, updateTicketStatus, setActiveRole } = useTickets();

  // Filters state
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' or 'technicians'

  // Modals state
  const [selectedTicketForAssign, setSelectedTicketForAssign] = useState(null);
  const [selectedTicketForResolve, setSelectedTicketForResolve] = useState(null);
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState(null);

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    if (urgencyFilter !== 'ALL' && t.urgency !== urgencyFilter) return false;
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        t.tokenNumber.toLowerCase().includes(q) ||
        t.roomNumber.toLowerCase().includes(q) ||
        t.reporterName.toLowerCase().includes(q) ||
        (t.blockName && t.blockName.toLowerCase().includes(q)) ||
        (t.systemNumber && t.systemNumber.toLowerCase().includes(q)) ||
        t.problemDescription.toLowerCase().includes(q) ||
        (t.assignedTechnicianName && t.assignedTechnicianName.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // KPI Metrics
  const immediateEmergencyCount = tickets.filter(
    (t) => t.urgency === 'IMMEDIATE' && t.status !== 'RESOLVED'
  ).length;

  const weekendLabCount = tickets.filter(
    (t) => t.urgency === 'SCHEDULED_WEEKEND' && t.status !== 'RESOLVED'
  ).length;

  const inProgressCount = tickets.filter((t) => t.status === 'IN_PROGRESS').length;
  const resolvedCount = tickets.filter((t) => t.status === 'RESOLVED').length;

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 space-y-4">
      
      {/* Dashboard Header - compact */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-300">
              Campus Operations Dispatch Center
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Maintenance Department Desk
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage tickets, assign technicians, and resolve issues.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveRole('FACULTY')}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
          >
            + Faculty Ticket
          </button>
          <button
            onClick={() => setActiveRole('LAB_ASSISTANT')}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
          >
            + Lab Ticket
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid - compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div 
          onClick={() => { setUrgencyFilter('IMMEDIATE'); setStatusFilter('ALL'); setActiveTab('tickets'); }}
          className={`p-3 rounded-xl border transition cursor-pointer shadow-sm ${
            urgencyFilter === 'IMMEDIATE'
              ? 'bg-red-50 border-red-400 ring-2 ring-red-400'
              : 'bg-white border-slate-200 hover:border-red-300 hover:bg-red-50/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              Immediate
            </span>
            <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{immediateEmergencyCount}</span>
            <span className="text-[10px] text-red-600 font-semibold">Active</span>
          </div>
        </div>

        <div 
          onClick={() => { setUrgencyFilter('SCHEDULED_WEEKEND'); setStatusFilter('ALL'); setActiveTab('tickets'); }}
          className={`p-3 rounded-xl border transition cursor-pointer shadow-sm ${
            urgencyFilter === 'SCHEDULED_WEEKEND'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Weekend Lab
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{weekendLabCount}</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Queued</span>
          </div>
        </div>

        <div 
          onClick={() => { setStatusFilter('IN_PROGRESS'); setActiveTab('tickets'); }}
          className={`p-3 rounded-xl border transition cursor-pointer shadow-sm ${
            statusFilter === 'IN_PROGRESS'
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400'
              : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              In Progress
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{inProgressCount}</span>
            <span className="text-[10px] text-blue-700 font-semibold">Active</span>
          </div>
        </div>

        <div 
          onClick={() => { setStatusFilter('RESOLVED'); setActiveTab('tickets'); }}
          className={`p-3 rounded-xl border transition cursor-pointer shadow-sm ${
            statusFilter === 'RESOLVED'
              ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Resolved
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{resolvedCount}</span>
            <span className="text-[10px] text-slate-500 font-semibold">Done</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher: Tickets vs Technician Manager */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex gap-1">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'tickets'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Tickets Queue ({tickets.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('technicians')}
          className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'technicians'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Manage Technicians ({technicians.length})</span>
        </button>
      </div>

      {/* Conditional Content */}
      {activeTab === 'technicians' ? (
        <TechnicianManager />
      ) : (
        <>
          {/* Filter and Search Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Room, Token, Block, or keywords..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Urgencies</option>
                <option value="IMMEDIATE">🚨 Immediate</option>
                <option value="SCHEDULED_WEEKEND">🛠️ Weekend</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING_ASSIGNMENT">⏳ Pending</option>
                <option value="ASSIGNED">👤 Assigned</option>
                <option value="IN_PROGRESS">⚡ In Progress</option>
                <option value="RESOLVED">✅ Resolved</option>
              </select>

              {(urgencyFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
                <button
                  onClick={() => {
                    setUrgencyFilter('ALL');
                    setStatusFilter('ALL');
                    setSearchQuery('');
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Incoming Tokens</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
                  {filteredTickets.length}
                </span>
              </h2>
            </div>

            {filteredTickets.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900">No Tickets Found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  No active tokens matching the current filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredTickets.map((ticket) => {
                  const isImmediate = ticket.urgency === 'IMMEDIATE';
                  const isPending = ticket.status === 'PENDING_ASSIGNMENT';
                  const isAssigned = ticket.status === 'ASSIGNED';
                  const isInProgress = ticket.status === 'IN_PROGRESS';
                  const isResolved = ticket.status === 'RESOLVED';

                  return (
                    <div
                      key={ticket.id}
                      className={`bg-white rounded-xl border transition-all p-4 shadow-sm hover:shadow-md relative overflow-hidden ${
                        isImmediate && isPending
                          ? 'border-red-500 ring-2 ring-red-400/40 bg-red-50/20'
                          : isResolved
                          ? 'border-slate-200 bg-slate-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      {/* Left urgency stripe */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        isImmediate ? 'bg-red-600' : 'bg-emerald-600'
                      }`} />

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pl-2">
                        
                        {/* Main Ticket Info */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-md">
                              {ticket.tokenNumber}
                            </span>
                            {isImmediate ? (
                              <span className="flex items-center gap-1 bg-red-100 text-red-800 border border-red-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                🚨 Immediate
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                🛠️ Weekend
                              </span>
                            )}
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isResolved ? 'bg-emerald-100 text-emerald-800'
                              : isInProgress ? 'bg-blue-100 text-blue-800'
                              : isAssigned ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </div>

                          {/* Room Title */}
                          <h3 className="text-sm font-extrabold text-slate-900">
                            {ticket.blockName} — Floor {ticket.floor}, Room <span className="text-indigo-600">{ticket.roomNumber}</span>
                            {ticket.systemNumber && (
                              <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-1.5 py-0.5 rounded-md font-mono ml-2">
                                {ticket.systemNumber}
                              </span>
                            )}
                          </h3>

                          {/* Problem */}
                          <p className="text-xs text-slate-600 italic truncate">
                            "{ticket.problemDescription}"
                          </p>

                          {/* Reporter */}
                          <div className="flex items-center gap-3 text-[10px] text-slate-500">
                            <span>By: <strong className="text-slate-700">{ticket.reporterName}</strong></span>
                            <span>Slot: <strong className={isImmediate ? 'text-red-600' : 'text-emerald-700'}>{ticket.scheduledSlot}</strong></span>
                          </div>
                        </div>

                        {/* Right: Tech & Actions */}
                        <div className="lg:w-56 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 pt-3 lg:pt-0 lg:pl-4 flex flex-col space-y-2">
                          
                          {/* Assigned Tech */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                              Technician
                            </span>
                            {ticket.assignedTechnicianName ? (
                              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                                <div className="font-bold text-xs text-slate-900">{ticket.assignedTechnicianName}</div>
                                <div className="text-[10px] text-indigo-700 font-mono flex items-center gap-1 mt-0.5">
                                  <Phone className="w-3 h-3 text-slate-500" />
                                  {ticket.assignedTechnicianPhone || 'N/A'}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-red-50 p-2 rounded-lg border border-red-200 text-[10px] text-red-900 font-bold">
                                ⚠️ Unassigned
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="space-y-1">
                            {!isResolved && (
                              <button
                                onClick={() => setSelectedTicketForAssign(ticket)}
                                className="w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                {ticket.assignedTechnicianName ? 'Reassign' : 'Assign'}
                              </button>
                            )}
                            {isAssigned && (
                              <button
                                onClick={() => updateTicketStatus(ticket.id, 'IN_PROGRESS')}
                                className="w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                In Progress
                              </button>
                            )}
                            {(isAssigned || isInProgress) && (
                              <button
                                onClick={() => setSelectedTicketForResolve(ticket)}
                                className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedTicketForDetail(ticket)}
                              className="w-full py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-semibold transition flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      {selectedTicketForAssign && (
        <AssignTechnicianModal
          ticket={selectedTicketForAssign}
          onClose={() => setSelectedTicketForAssign(null)}
        />
      )}

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
          onAssign={(t) => setSelectedTicketForAssign(t)}
          onResolve={(t) => setSelectedTicketForResolve(t)}
        />
      )}
    </div>
  );
}
