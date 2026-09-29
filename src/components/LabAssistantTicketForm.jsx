import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  FlaskConical, 
  Cpu, 
  HardDrive, 
  Mouse, 
  Network, 
  Calendar, 
  Clock, 
  Sparkles, 
  Send,
  Building,
  Layers,
  MapPin,
  Laptop,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import SuccessTokenModal from './SuccessTokenModal';

export default function LabAssistantTicketForm() {
  const { blocks, createTicket, setActiveRole } = useTickets();

  // Form State
  const [reporterName, setReporterName] = useState('Rajesh Kumar');
  const [reporterRole, setReporterRole] = useState('Lab Assistant, Advanced Systems & AI Lab');
  const [reporterPhone, setReporterPhone] = useState('+91 98860-99214');
  const [selectedBlockId, setSelectedBlockId] = useState('CV_RAMAN');
  const [selectedFloor, setSelectedFloor] = useState(6);
  const [roomNumber, setRoomNumber] = useState('CV606');
  const [systemNumber, setSystemNumber] = useState('PC-14 (Workstation Node 14)');
  const [category, setCategory] = useState('PC Hardware & Power SMPS');
  const [preferredWindow, setPreferredWindow] = useState('Upcoming Saturday (10:00 AM - 1:00 PM)');
  const [isImmediateOverride, setIsImmediateOverride] = useState(false);
  const [problemDescription, setProblemDescription] = useState(
    'System PC-14 in CV606 Lab powers off abruptly after 5-10 minutes of usage and emits 3 continuous beep codes (RAM / SMPS power surge). The optical mouse USB port also has physical looseness. Please service during the upcoming weekend so weekday lab practicals are not disturbed.'
  );

  const [createdToken, setCreatedToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected block data
  const currentBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[0];
  const currentFloorData = currentBlock.floors.find((f) => f.floorNumber === Number(selectedFloor)) || currentBlock.floors[0];

  // Quick problem templates for lab assistant
  const labTemplates = [
    'System PC-14 in CV606 Lab powers off abruptly after 5-10 minutes and gives 3 beep codes on boot.',
    'Workstation mouse and keyboard unresponsive; USB port physically loose on front I/O panel.',
    'Dual-boot GRUB rescue error on startup; unable to load Ubuntu lab environment.',
    'System powers on with fan at 100% speed but no display output to monitor (RAM reseat needed).',
    'Ethernet port not detecting LAN cable; network status shows "Network Cable Unplugged".'
  ];

  // Pre-fill user prompt case
  const handlePreFillPromptCase = () => {
    setReporterName('Rajesh Kumar');
    setReporterRole('Lab Assistant, CV606 Lab');
    setReporterPhone('+91 98860-99214');
    setSelectedBlockId('CV_RAMAN');
    setSelectedFloor(6);
    setRoomNumber('CV606');
    setSystemNumber('PC-14 (Workstation Node 14)');
    setCategory('PC Hardware & Power SMPS');
    setPreferredWindow('Upcoming Saturday (10:00 AM - 1:00 PM)');
    setIsImmediateOverride(false);
    setProblemDescription(
      'In CV Raman Block, 6th floor, room number CV606 (Computer Lab), system PC-14 needs maintenance. It keeps restarting randomly during student practicals. Please assign a capable technician to resolve the problem in the coming week like Saturday or Sunday.'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reporterName.trim() || !roomNumber.trim() || !systemNumber.trim() || !problemDescription.trim()) {
      alert('Please fill in your name, lab room number, system number, and problem description.');
      return;
    }

    setIsSubmitting(true);

    const token = createTicket({
      roleType: 'LAB_ASSISTANT',
      reporterName: reporterName.trim(),
      reporterRole: reporterRole.trim(),
      reporterPhone: reporterPhone.trim(),
      blockId: currentBlock.id,
      blockName: currentBlock.name.split(' (')[0],
      floor: Number(selectedFloor),
      roomNumber: roomNumber.trim(),
      roomType: 'Computer Lab',
      systemNumber: systemNumber.trim(),
      category,
      urgency: isImmediateOverride ? 'IMMEDIATE' : 'SCHEDULED_WEEKEND',
      urgencyLabel: isImmediateOverride ? 'Immediate Emergency (Lab Exam)' : 'Scheduled Weekend Maintenance',
      preferredResolutionWindow: isImmediateOverride ? 'Immediate Dispatch' : preferredWindow,
      problemDescription: problemDescription.trim()
    });

    setIsSubmitting(false);
    setCreatedToken(token);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Role Selection Tabs */}
      <div className="bg-slate-200 p-1.5 rounded-2xl flex items-center mb-8 shadow-inner max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => setActiveRole('FACULTY')}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Faculty / Professor</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveRole('LAB_ASSISTANT')}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-emerald-600 text-white shadow-md transition"
        >
          <FlaskConical className="w-4 h-4" />
          <span>Lab Assistant</span>
          <span className="text-xs bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded-full font-mono">
            Weekend
          </span>
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500/30 text-emerald-100 border border-emerald-400/40 text-xs uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Scheduled Weekend Resolution (Sat / Sun)
                </span>
                <span className="text-xs bg-teal-500/30 text-teal-100 px-2 py-1 rounded-full">
                  Batch Non-Disruptive
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Computer Lab System Maintenance Token
              </h2>
              <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
                For lab assistants reporting malfunctioning lab PCs, peripherals, and network nodes. Work will be assigned to a capable technician for upcoming Saturday / Sunday service.
              </p>
            </div>

            {/* Quick Demo Fill Button */}
            <button
              type="button"
              onClick={handlePreFillPromptCase}
              className="self-start sm:self-center shrink-0 bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-semibold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              title="Click to load CV Raman Block 6th Floor CV606 Lab scenario"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Load Prompt Example (CV606 Lab)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Section 1: Lab Assistant Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>1. Lab Assistant Details</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assistant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Designation / Assigned Lab
                </label>
                <input
                  type="text"
                  value={reporterRole}
                  onChange={(e) => setReporterRole(e.target.value)}
                  placeholder="e.g. Lab Assistant, Advanced Systems Lab"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / Intercom
                </label>
                <input
                  type="text"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="e.g. +91 98860-99214"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 2: Lab Location & System Identifier */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-emerald-600" />
              <span>2. Lab Location & System Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Block Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Campus Block
                </label>
                <select
                  value={selectedBlockId}
                  onChange={(e) => setSelectedBlockId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {blocks.map((block) => (
                    <option key={block.id} value={block.id}>
                      {block.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Floor Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Floor
                </label>
                <select
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {currentBlock.floors.map((floor) => (
                    <option key={floor.floorNumber} value={floor.floorNumber}>
                      {floor.floorName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lab Room Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lab Room No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="e.g. CV606"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Specific System / PC Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific System / PC # <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={systemNumber}
                  onChange={(e) => setSystemNumber(e.target.value)}
                  placeholder="e.g. PC-14, System 08"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Quick System Badge helper */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-slate-500 font-medium">Quick System Tags:</span>
              {['PC-14', 'PC-08', 'PC-22', 'PC-35', 'Server Node 1'].map((pc) => (
                <button
                  key={pc}
                  type="button"
                  onClick={() => setSystemNumber(pc)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition ${
                    systemNumber.includes(pc)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {pc} {pc === 'PC-14' && '★ (Prompt Case)'}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 3: Hardware / Component Category */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>3. Component Requiring Maintenance</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'PC Hardware & Power SMPS', icon: Cpu, desc: 'Motherboard, RAM, PSU, Beeps' },
                { name: 'Peripherals & Cables', icon: Mouse, desc: 'Mouse, Keyboard, Monitor' },
                { name: 'Lab LAN Port & Switch', icon: Network, desc: 'Ethernet, IP address, socket' },
                { name: 'OS & Boot Recovery', icon: HardDrive, desc: 'Dual Boot, BSOD, Linux image' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = category === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setCategory(item.name)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-bold leading-snug">{item.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 4: Maintenance Schedule Window (Weekend Preference) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>4. Target Resolution Window (Coming Weekend)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {[
                { slot: 'Upcoming Saturday (10:00 AM - 1:00 PM)', label: 'Saturday Morning Batch', desc: 'Standard hardware repair & memory tests' },
                { slot: 'Upcoming Saturday (2:00 PM - 5:00 PM)', label: 'Saturday Afternoon Batch', desc: 'OS re-imaging & software diagnostics' },
                { slot: 'Upcoming Sunday (10:00 AM - 1:00 PM)', label: 'Sunday Morning Batch', desc: 'Network cabling & peripheral replacements' },
                { slot: 'Upcoming Sunday (2:00 PM - 5:00 PM)', label: 'Sunday Afternoon Batch', desc: 'Final testing before Monday lab classes' },
              ].map((item) => {
                const isSelected = preferredWindow === item.slot && !isImmediateOverride;
                return (
                  <button
                    key={item.slot}
                    type="button"
                    onClick={() => {
                      setPreferredWindow(item.slot);
                      setIsImmediateOverride(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500 text-emerald-950 font-medium'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{item.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="text-xs text-slate-600 mt-1 font-mono">{item.slot}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Emergency Override Option */}
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                id="emergencyOverride"
                checked={isImmediateOverride}
                onChange={(e) => setIsImmediateOverride(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
              />
              <label htmlFor="emergencyOverride" className="text-xs text-amber-900 cursor-pointer font-medium">
                <strong>Emergency Exception:</strong> Need immediate repair today (e.g. Scheduled practical exam or whole lab affected).
              </label>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 5: Problem Description in Lab Assistant's Own Words */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>5. Describe the Problem in Your Own Words</span>
                <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">
                {problemDescription.length} characters
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-2">
              Detail specific hardware symptoms, beep patterns, peripheral behavior, or operating system errors:
            </p>

            <textarea
              required
              rows={4}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g. When a particular system in the lab needs maintenance, describe the exact problem here (e.g. system restarts after 5 mins, 3 beep codes, mouse USB connection loose)..."
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-800 leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none transition"
            ></textarea>

            {/* Quick-fill helper tags */}
            <div className="mt-3">
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                💡 One-click lab symptom templates (click to append/replace):
              </span>
              <div className="flex flex-wrap gap-2">
                {labTemplates.map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProblemDescription(text)}
                    className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 text-left transition"
                  >
                    "{text.slice(0, 45)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Policy Notice */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-xl flex items-start gap-3">
            <Calendar className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              <strong className="font-bold text-emerald-950">Weekend Batch Maintenance Workflow:</strong>
              <p className="mt-0.5">
                The maintenance department queues lab workstation tokens for Saturday and Sunday slots. A capable computer hardware specialist (e.g. Karthik Nair / Pooja Rao) will be assigned with required replacement parts (RAM, SMPS, mouse) to resolve the issue before Monday classes resume.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 transition transform active:scale-[0.99]"
            >
              <Send className="w-5 h-5" />
              <span>Submit Lab Token (Scheduled for {isImmediateOverride ? 'Immediate Dispatch' : 'Weekend Servicing'})</span>
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {createdToken && (
        <SuccessTokenModal
          token={createdToken}
          onClose={() => setCreatedToken(null)}
        />
      )}
    </div>
  );
}
