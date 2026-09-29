import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';

export default function TicketDetailModal({ ticket, onClose, onAssign, onResolve }) {
  if (!ticket) return null;

  const isImmediate = ticket.urgency === 'IMMEDIATE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className={`p-6 text-white flex items-start justify-between ${
          isImmediate
            ? 'bg-gradient-to-r from-red-700 via-rose-700 to-red-800'
            : 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs uppercase bg-white/20 font-bold px-2.5 py-0.5 rounded-full">
                {ticket.tokenNumber}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                ticket.status === 'RESOLVED'
                  ? 'bg-emerald-200 text-emerald-900'
                  : ticket.status === 'ASSIGNED'
                  ? 'bg-blue-200 text-blue-900'
                  : 'bg-amber-200 text-amber-900'
              }`}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="text-xl font-bold">
              {ticket.blockName} — Floor {ticket.floor}, Room {ticket.roomNumber}
            </h3>

            <p className="text-xs text-white/90 mt-1">
              Reported by: <span className="font-semibold">{ticket.reporterName}</span> ({ticket.reporterRole})
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-black/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Urgency & SLA Card */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isImmediate ? 'bg-red-50/70 border-red-200' : 'bg-emerald-50/70 border-emerald-200'
          }`}>
            <div className="mt-0.5">
              {isImmediate ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <Calendar className="w-5 h-5 text-emerald-600" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {isImmediate ? '🚨 P0 Classroom Emergency' : '🛠️ Scheduled Weekend Lab Maintenance'}
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Target Resolution Window: <strong>{ticket.scheduledSlot || ticket.preferredResolutionWindow}</strong>
              </p>
              {ticket.systemNumber && (
                <div className="mt-1 text-xs font-mono font-bold text-emerald-800">
                  Target Node: {ticket.systemNumber}
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Problem Description (In Reporter's Own Words)
            </h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed italic text-slate-800">
              "{ticket.problemDescription}"
            </div>
          </div>

          {/* Location & Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Campus Block</span>
              <span className="font-semibold text-slate-800">{ticket.blockName}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Floor & Room</span>
              <span className="font-semibold text-slate-800">Floor {ticket.floor} — {ticket.roomNumber}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Category</span>
              <span className="font-semibold text-slate-800">{ticket.category}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Created At</span>
              <span className="font-semibold text-slate-800">{new Date(ticket.createdAt).toLocaleString()}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Reporter Contact</span>
              <span className="font-semibold text-slate-800">{ticket.reporterPhone || 'On Campus'}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 block font-medium">Room Type</span>
              <span className="font-semibold text-slate-800">{ticket.roomType}</span>
            </div>
          </div>

          {/* Assigned Technician Card */}
          {ticket.assignedTechnicianName ? (
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Assigned Capable Technician</span>
                </span>
                <span className="text-[11px] text-blue-700 font-mono">
                  Assigned {ticket.assignedAt ? new Date(ticket.assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">{ticket.assignedTechnicianName}</div>
                  <div className="text-xs text-slate-600">{ticket.assignedTechnicianRole}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{ticket.assignedTechnicianPhone}</div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-400 block">Dispatch Window</span>
                  <span className="font-semibold text-blue-900">{ticket.scheduledDate}</span>
                </div>
              </div>

              {ticket.technicianNotes && (
                <div className="mt-3 pt-2 border-t border-blue-200 text-xs text-blue-900">
                  <span className="font-semibold">Dispatch Note: </span>
                  <span>{ticket.technicianNotes}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div className="text-xs text-amber-900">
                <span className="font-bold block">No technician assigned yet</span>
                <span>Assign a capable personnel to attend to this issue.</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onAssign(ticket);
                }}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition"
              >
                Assign Now
              </button>
            </div>
          )}

          {/* Resolution Summary (If resolved) */}
          {ticket.status === 'RESOLVED' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Resolved Record</span>
              </div>

              {ticket.rootCause && (
                <div className="text-xs">
                  <span className="text-slate-500 font-medium">Root Cause: </span>
                  <span className="font-semibold text-slate-800">{ticket.rootCause}</span>
                </div>
              )}

              <div className="text-xs">
                <span className="text-slate-500 font-medium">Action Taken: </span>
                <span className="text-slate-800">{ticket.resolutionNotes}</span>
              </div>

              {ticket.partsReplaced && (
                <div className="text-xs">
                  <span className="text-slate-500 font-medium">Parts Replaced: </span>
                  <span className="font-mono text-emerald-800 font-semibold">{ticket.partsReplaced}</span>
                </div>
              )}

              <div className="text-[11px] text-slate-400 pt-1">
                Resolved at: {new Date(ticket.resolvedAt).toLocaleString()}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          {ticket.status !== 'RESOLVED' && (
            <>
              <button
                onClick={() => {
                  onClose();
                  onAssign(ticket);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
              >
                {ticket.assignedTechnicianName ? 'Reassign Technician' : 'Assign Capable Personnel'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onResolve(ticket);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
              >
                Mark Resolved
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
