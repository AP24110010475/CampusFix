import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  CheckCircle, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShieldAlert, 
  Calendar, 
  X 
} from 'lucide-react';

export default function SuccessTokenModal({ token, onClose }) {
  const { setActiveRole } = useTickets();
  const [copied, setCopied] = useState(false);

  if (!token) return null;

  const isImmediate = token.urgency === 'IMMEDIATE';

  const handleCopy = () => {
    navigator.clipboard.writeText(token.tokenNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className={`p-6 text-white text-center relative ${
          isImmediate 
            ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700' 
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
        }`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            {isImmediate ? (
              <ShieldAlert className="w-9 h-9 text-white animate-pulse" />
            ) : (
              <CheckCircle className="w-9 h-9 text-white" />
            )}
          </div>

          <h3 className="text-xl font-bold tracking-tight">
            {isImmediate ? '🚨 Emergency Classroom Token Raised!' : '🛠️ Lab Maintenance Token Submitted!'}
          </h3>
          <p className="text-sm text-white/90 mt-1 max-w-xs mx-auto">
            {isImmediate 
              ? 'Maintenance department received an immediate dispatch notification.' 
              : 'Maintenance department scheduled this system for weekend servicing.'}
          </p>
        </div>

        {/* Token Details Card */}
        <div className="p-6 space-y-5">
          {/* Token Number Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">Your Official Token ID</span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-mono text-2xl font-extrabold text-slate-900 tracking-tight">
                {token.tokenNumber}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Copy Token"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-600 font-medium mt-1">Copied to clipboard!</p>}
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block font-medium">Location</span>
                <span className="text-slate-800 font-semibold">
                  {token.blockName}, {token.floor}th Floor, Room {token.roomNumber}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
              {isImmediate ? (
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="text-slate-400 block font-medium">Target SLA</span>
                <span className={`font-semibold ${isImmediate ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
                  {isImmediate ? 'Immediate (~10-15 mins)' : token.scheduledSlot || 'Upcoming Weekend'}
                </span>
              </div>
            </div>
          </div>

          {/* Reported Problem Summary */}
          <div className="text-xs bg-slate-50/80 p-3.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium block mb-1">Issue Reported:</span>
            <p className="text-slate-700 italic">"{token.problemDescription}"</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setActiveRole('MAINTENANCE');
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
            >
              <span>View in Maintenance Department Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveRole('TRACKER');
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition"
            >
              Track Live Token Progress
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-700 transition"
            >
              Close & Raise Another Ticket
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
