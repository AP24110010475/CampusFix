import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { CheckCircle2, X, Wrench, ShieldCheck, Check } from 'lucide-react';

export default function ResolveTicketModal({ ticket, onClose }) {
  const { updateTicketStatus } = useTickets();

  const [rootCause, setRootCause] = useState(() => {
    if (ticket.category.includes('Display') || ticket.category.includes('Connectivity')) {
      return 'Damaged HDMI cable pin & classroom Wi-Fi AP channel congestion';
    }
    if (ticket.category.includes('PC') || ticket.category.includes('Hardware')) {
      return 'Faulty 450W SMPS causing voltage drop under load & dust on RAM contacts';
    }
    return 'Component loose contact / firmware reset required';
  });

  const [actionTaken, setActionTaken] = useState(() => {
    if (ticket.urgency === 'IMMEDIATE') {
      return `Replaced HDMI cable with heavy-duty gold-plated 4K lead, reset classroom Wi-Fi bridge, verified screen projection with ${ticket.reporterName}. Class resumed smoothly.`;
    }
    return `Replaced faulty SMPS unit with new 500W PSU, cleaned RAM slots with contact cleaner, tested 30-minute stress test. System fully stable.`;
  });

  const [partsReplaced, setPartsReplaced] = useState(() => {
    if (ticket.category.includes('Display')) return '1x High-speed HDMI 2.1 Cable (2m)';
    if (ticket.category.includes('PC')) return '1x 500W CoolerMaster PSU, 1x Optical USB Mouse';
    return 'None / Configuration update only';
  });

  const handleResolve = (e) => {
    e.preventDefault();
    if (!actionTaken.trim()) return;

    updateTicketStatus(ticket.id, 'RESOLVED', {
      resolutionNotes: actionTaken.trim(),
      rootCause: rootCause.trim(),
      partsReplaced: partsReplaced.trim(),
      resolvedBy: ticket.assignedTechnicianName || 'Maintenance Duty Officer',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Mark Ticket Resolved</h3>
              <p className="text-xs text-emerald-100">
                Token: <span className="font-mono font-bold">{ticket.tokenNumber}</span> — {ticket.roomNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleResolve} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Root Cause Identified
            </label>
            <input
              type="text"
              required
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              placeholder="e.g. HDMI port pin bent, Wi-Fi channel collision"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Action Taken & Resolution Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              placeholder="Detail what was done to fix the issue and ensure the professor / lab can continue..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Parts or Components Replaced
            </label>
            <input
              type="text"
              value={partsReplaced}
              onChange={(e) => setPartsReplaced(e.target.value)}
              placeholder="e.g. 1x HDMI cable, 1x RAM stick, or None"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold block text-slate-800">Assigned Technician:</span>
              <span>{ticket.assignedTechnicianName || 'Maintenance Duty Officer'}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold block text-slate-800">Verification:</span>
              <span className="text-emerald-700 font-medium">On-site tested</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5 transition"
            >
              <Check className="w-4 h-4" />
              <span>Complete & Close Ticket</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
