import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  GraduationCap, 
  FlaskConical, 
  User, 
  Send, 
  AlertCircle, 
  Calendar, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import { parseProblemText } from '../utils/textParser';
import SuccessTokenModal from './SuccessTokenModal';

export default function CreateTicketForm() {
  const { activeRole, setActiveRole, createTicket } = useTickets();

  const isFaculty = activeRole === 'FACULTY';

  const [reporterName, setReporterName] = useState('');
  const [problemText, setProblemText] = useState('');
  const [createdToken, setCreatedToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (role) => {
    setActiveRole(role);
  };

  const parsed = parseProblemText(problemText, activeRole);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reporterName.trim() || !problemText.trim()) {
      alert('Please enter your name and describe the problem.');
      return;
    }

    setIsSubmitting(true);

    const token = createTicket({
      roleType: activeRole,
      reporterName: reporterName.trim(),
      reporterRole: isFaculty ? 'Faculty / Professor' : 'Lab Assistant',
      reporterPhone: isFaculty ? '+91 94481-10293' : '+91 98860-99214',
      blockId: parsed.blockName.toUpperCase().replace(/\s+/g, '_'),
      blockName: parsed.blockName,
      floor: parsed.floor,
      roomNumber: parsed.roomNumber,
      roomType: isFaculty ? 'Classroom' : 'Computer Lab',
      systemNumber: parsed.systemNumber,
      category: parsed.category,
      urgency: isFaculty ? 'IMMEDIATE' : 'SCHEDULED_WEEKEND',
      urgencyLabel: isFaculty ? 'Immediate Action (Active Class)' : 'Scheduled Weekend Maintenance',
      preferredResolutionWindow: isFaculty ? 'Immediate Dispatch (Classroom in use)' : 'Upcoming Weekend (Saturday or Sunday)',
      problemDescription: problemText.trim()
    });

    setIsSubmitting(false);
    setCreatedToken(token);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6">
      
      {/* Role Selector */}
      <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 mb-4 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => handleRoleChange('FACULTY')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            isFaculty
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Faculty / Professor</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
            isFaculty ? 'bg-indigo-800 text-indigo-100' : 'bg-red-100 text-red-700'
          }`}>
            Immediate
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('LAB_ASSISTANT')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            !isFaculty
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Lab Assistant</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
            !isFaculty ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
          }`}>
            Weekend
          </span>
        </button>
      </div>

      {/* Main Ticket Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header Banner */}
        <div className={`p-4 sm:p-5 text-white ${
          isFaculty 
            ? 'bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800' 
            : 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${
              isFaculty
                ? 'bg-red-500/20 text-red-100 border-red-400/40'
                : 'bg-emerald-500/20 text-emerald-100 border-emerald-400/40'
            }`}>
              {isFaculty ? '🚨 Active Class Emergency' : '🛠️ Scheduled Weekend Lab Work'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
            {isFaculty ? 'Raise Classroom Issue Token' : 'Raise Lab Maintenance Token'}
          </h2>
          <p className="text-white/80 text-[11px] mt-0.5 max-w-xl">
            {isFaculty 
              ? 'Maintenance receives an immediate notification to dispatch a technician.'
              : 'Maintenance will assign a technician for the coming weekend.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Your Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              required
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder={isFaculty ? 'Enter Professor / Faculty name' : 'Enter Lab Assistant name'}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* Problem Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Describe the Problem <span className="text-red-500">*</span>
              </label>
              {problemText.length > 0 && (
                <span className="text-[10px] text-slate-400">{problemText.length} chars</span>
              )}
            </div>

            {/* Format Guide */}
            <div className={`p-2.5 rounded-lg border text-[10px] mb-2 flex items-center gap-2 ${
              isFaculty 
                ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            }`}>
              <div className="font-bold uppercase text-[9px] bg-white px-1.5 py-0.5 rounded shadow-xs shrink-0 font-mono text-slate-700 border border-slate-200">
                Format
              </div>
              <div className="leading-relaxed font-medium">
                {isFaculty ? (
                  <span>[Block] • [Floor] • [Room] • [What is not working]</span>
                ) : (
                  <span>[Block] • [Floor] • [Lab] • [System/PC] • [Issue]</span>
                )}
              </div>
            </div>

            <textarea
              required
              rows={4}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder={
                isFaculty
                  ? 'e.g. CV Raman Block, 6th floor, room CV603 — display screen flickering...'
                  : 'e.g. CV Raman Block, 6th floor, CV606 lab, system PC-14 — powers off abruptly...'
              }
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            ></textarea>
          </div>

          {/* Live Extraction Preview */}
          {problemText.trim().length > 5 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Detected Details:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-bold uppercase">Block</span>
                  <span className="font-semibold text-slate-800">{parsed.blockName}, F{parsed.floor}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-bold uppercase">Room</span>
                  <span className="font-bold text-indigo-700 font-mono">{parsed.roomNumber}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-bold uppercase">
                    {isFaculty ? 'Issue' : 'System'}
                  </span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {isFaculty ? parsed.category : parsed.systemNumber || 'Lab Station'}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-bold uppercase">Window</span>
                  <span className={`font-bold ${isFaculty ? 'text-red-600' : 'text-emerald-700'}`}>
                    {isFaculty ? 'Immediate' : 'Weekend'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Policy Notice */}
          <div className={`p-3 rounded-lg border flex items-start gap-2.5 ${
            isFaculty 
              ? 'bg-red-50/80 border-red-200 text-red-950' 
              : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
          }`}>
            <div className="mt-0.5">
              {isFaculty ? <Clock className="w-4 h-4 text-red-600" /> : <Calendar className="w-4 h-4 text-emerald-600" />}
            </div>
            <div className="text-[10px] leading-relaxed">
              <strong className="font-bold">
                {isFaculty ? 'Immediate Resolution:' : 'Weekend Maintenance:'}
              </strong>
              <span className="ml-1">
                {isFaculty
                  ? 'A technician will be dispatched immediately so your class goes on smoothly.'
                  : 'A technician will be assigned for the coming weekend so practicals run uninterrupted.'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform active:scale-[0.99] ${
                isFaculty
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 shadow-red-600/30'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-600/30'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>
                {isFaculty 
                  ? 'Raise Token & Alert Maintenance Immediately' 
                  : 'Submit Token to Maintenance (Weekend)'}
              </span>
            </button>
          </div>

        </form>
      </div>

      {/* Success Token Modal */}
      {createdToken && (
        <SuccessTokenModal
          token={createdToken}
          onClose={() => setCreatedToken(null)}
        />
      )}
    </div>
  );
}
