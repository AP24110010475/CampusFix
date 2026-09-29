import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  X, 
  UserCheck, 
  Phone, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  User
} from 'lucide-react';

export default function AssignTechnicianModal({ ticket, onClose }) {
  const { technicians, assignTechnician } = useTickets();

  const [selectedTechId, setSelectedTechId] = useState(() => ticket.assignedTechnicianId || technicians[0]?.id || 'TECH-01');
  const [scheduledDate, setScheduledDate] = useState(() => 
    ticket.urgency === 'IMMEDIATE' ? 'Today (Immediate)' : 'Upcoming Saturday'
  );
  const [scheduledSlot, setScheduledSlot] = useState(() => 
    ticket.urgency === 'IMMEDIATE' ? 'Immediate (within 10-15 mins)' : (ticket.preferredResolutionWindow || 'Morning Slot (10:00 AM - 1:00 PM)')
  );
  const [notes, setNotes] = useState(() => {
    if (ticket.urgency === 'IMMEDIATE') {
      return `Priority dispatch for room ${ticket.roomNumber}. Call professor upon arrival.`;
    }
    return `Scheduled weekend service for ${ticket.roomNumber} ${ticket.systemNumber || ''}.`;
  });

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedTechId) return;

    assignTechnician(ticket.id, selectedTechId, {
      scheduledDate,
      scheduledSlot,
      technicianNotes: notes.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Assign Technician</h3>
              <p className="text-xs text-slate-400">
                Token: <span className="font-mono text-amber-400 font-semibold">{ticket.tokenNumber}</span> — {ticket.roomNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleAssign} className="p-6 space-y-4">
          
          {/* Issue Summary */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div className="font-bold text-slate-900">
              {ticket.blockName}, Floor {ticket.floor}, Room {ticket.roomNumber}
            </div>
            <p className="text-slate-600 italic">"{ticket.problemDescription}"</p>
          </div>

          {/* Section: Select Technician (Showing Name and Mobile No.) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Technician (Name & Mobile Number)
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {technicians.map((tech) => {
                const isSelected = selectedTechId === tech.id;

                return (
                  <div
                    key={tech.id}
                    onClick={() => setSelectedTechId(tech.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{tech.name}</div>
                        <div className="text-xs text-indigo-700 font-mono flex items-center gap-1 font-semibold">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{tech.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-indigo-200 text-indigo-900 font-bold' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timing / Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dispatch Window
              </label>
              <select
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Today (Immediate)">Today (Immediate)</option>
                <option value="Upcoming Saturday">Upcoming Saturday</option>
                <option value="Upcoming Sunday">Upcoming Sunday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Allocated Time Slot
              </label>
              <input
                type="text"
                value={scheduledSlot}
                onChange={(e) => setScheduledSlot(e.target.value)}
                placeholder="e.g. Immediate (within 10-15 mins)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm Assignment</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
