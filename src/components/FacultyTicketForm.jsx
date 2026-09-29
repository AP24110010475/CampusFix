import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  GraduationCap, 
  Monitor, 
  Wifi, 
  Tv, 
  Mic2, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Send,
  Building,
  Layers,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';
import SuccessTokenModal from './SuccessTokenModal';

export default function FacultyTicketForm() {
  const { blocks, createTicket, setActiveRole } = useTickets();

  // Form State
  const [reporterName, setReporterName] = useState('Prof. Rameshwar Sharma');
  const [reporterRole, setReporterRole] = useState('Professor, Dept. of Computer Science');
  const [reporterPhone, setReporterPhone] = useState('+91 94481-10293');
  const [selectedBlockId, setSelectedBlockId] = useState('CV_RAMAN');
  const [selectedFloor, setSelectedFloor] = useState(6);
  const [roomNumber, setRoomNumber] = useState('CV603');
  const [category, setCategory] = useState('Display Screen & Connectivity');
  const [problemDescription, setProblemDescription] = useState(
    'The 75-inch smart display screen in CV603 is not functioning properly due to connectivity / Wi-Fi issues. When trying to mirror the laptop, screen shows "Connection Lost" error. Lecture is currently in progress with 75 students.'
  );

  const [createdToken, setCreatedToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected block data
  const currentBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[0];
  const currentFloorData = currentBlock.floors.find((f) => f.floorNumber === Number(selectedFloor)) || currentBlock.floors[0];

  // Quick problem templates for faculty
  const quickTemplates = [
    'Display screen is not functioning properly due to connectivity or Wi-Fi issues in the classroom.',
    'Screen turns on but displays "No Input Signal" from HDMI / Wireless casting receiver.',
    'Display screen is flickering violently and cuts out every 30 seconds during slide presentation.',
    'Wi-Fi router in the classroom is not assigning IP address to faculty podium laptop.',
    'Projector lamp indicator blinking red and display turns off automatically.'
  ];

  // Fill User's Exact Prompt Scenario
  const handlePreFillPromptCase = () => {
    setReporterName('Prof. Rameshwar Sharma');
    setReporterRole('Professor, Dept. of Computer Science');
    setReporterPhone('+91 94481-10293');
    setSelectedBlockId('CV_RAMAN');
    setSelectedFloor(6);
    setRoomNumber('CV603');
    setCategory('Display Screen & Connectivity');
    setProblemDescription(
      'In CV Raman Block, 6th floor, room number CV603, the display screen is not functioning properly due to some connectivity issues or Wi-Fi issues. Need immediate technician to resolve so class can proceed smoothly.'
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reporterName.trim() || !roomNumber.trim() || !problemDescription.trim()) {
      alert('Please fill in your name, room number, and problem description.');
      return;
    }

    setIsSubmitting(true);

    const token = createTicket({
      roleType: 'FACULTY',
      reporterName: reporterName.trim(),
      reporterRole: reporterRole.trim(),
      reporterPhone: reporterPhone.trim(),
      blockId: currentBlock.id,
      blockName: currentBlock.name.split(' (')[0],
      floor: Number(selectedFloor),
      roomNumber: roomNumber.trim(),
      roomType: 'Classroom',
      systemNumber: '',
      category,
      urgency: 'IMMEDIATE',
      urgencyLabel: 'Immediate Action (Active Class)',
      preferredResolutionWindow: 'Immediate Dispatch (Classroom in use)',
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
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-indigo-600 text-white shadow-md transition"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Faculty / Professor</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveRole('LAB_ASSISTANT')}
          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition"
        >
          <span>Lab Assistant</span>
          <span className="text-xs bg-slate-300 text-slate-800 px-1.5 py-0.5 rounded-full font-mono">
            Weekend
          </span>
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500/20 text-red-100 border border-red-400/40 text-xs uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  High Priority SLA: 10-15 Mins
                </span>
                <span className="text-xs bg-indigo-500/40 text-indigo-100 px-2 py-1 rounded-full">
                  Active Class Support
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Classroom Immediate Maintenance Token
              </h2>
              <p className="text-indigo-100 text-sm mt-1 max-w-2xl">
                For professors & faculty facing display, connectivity, or audio issues during active lectures. Maintenance is alerted instantly with high-priority dispatch.
              </p>
            </div>

            {/* Quick Demo Fill Button */}
            <button
              type="button"
              onClick={handlePreFillPromptCase}
              className="self-start sm:self-center shrink-0 bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-semibold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              title="Click to load CV Raman Block 6th Floor CV603 scenario"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Load Prompt Example (CV603)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Section 1: Professor Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>1. Faculty Details</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faculty Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Prof. Rameshwar Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Designation
                </label>
                <input
                  type="text"
                  value={reporterRole}
                  onChange={(e) => setReporterRole(e.target.value)}
                  placeholder="e.g. Dept of Computer Science"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>Mobile / Intercom for Callback</span>
                </label>
                <input
                  type="text"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="e.g. +91 94481-10293"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 2: Classroom Location */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>2. Classroom Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Block Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Campus Block</span>
                </label>
                <select
                  value={selectedBlockId}
                  onChange={(e) => {
                    setSelectedBlockId(e.target.value);
                    const b = blocks.find((blk) => blk.id === e.target.value);
                    if (b && b.floors.length > 0) {
                      setSelectedFloor(b.floors[0].floorNumber);
                      if (b.floors[0].rooms.length > 0) {
                        setRoomNumber(b.floors[0].rooms[0].roomNumber);
                      }
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Floor</span>
                </label>
                <select
                  value={selectedFloor}
                  onChange={(e) => {
                    setSelectedFloor(Number(e.target.value));
                    const f = currentBlock.floors.find((fl) => fl.floorNumber === Number(e.target.value));
                    if (f && f.rooms.length > 0) {
                      setRoomNumber(f.rooms[0].roomNumber);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {currentBlock.floors.map((floor) => (
                    <option key={floor.floorNumber} value={floor.floorNumber}>
                      {floor.floorName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Number Selection / Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Room / Classroom Number <span className="text-red-500">*</span></span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="e.g. CV603"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {currentFloorData?.rooms && currentFloorData.rooms.length > 0 && (
                    <select
                      onChange={(e) => setRoomNumber(e.target.value)}
                      value={roomNumber}
                      className="px-2 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-700"
                      title="Quick select room on this floor"
                    >
                      {currentFloorData.rooms.map((r) => (
                        <option key={r.roomNumber} value={r.roomNumber}>
                          {r.roomNumber} ({r.type})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Room Badges on 6th Floor */}
            {selectedBlockId === 'CV_RAMAN' && Number(selectedFloor) === 6 && (
              <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-500 font-medium">Quick Rooms:</span>
                {['CV601', 'CV602', 'CV603', 'CV604'].map((rm) => (
                  <button
                    key={rm}
                    type="button"
                    onClick={() => setRoomNumber(rm)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition ${
                      roomNumber === rm
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {rm} {rm === 'CV603' && '★ (CV603)'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <hr className="border-slate-200" />

          {/* Section 3: Equipment & Category */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-indigo-600" />
              <span>3. Malfunctioning Component</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Display Screen & Connectivity', icon: Tv, desc: 'Smart TV, Screen, HDMI' },
                { name: 'Wi-Fi & Network', icon: Wifi, desc: 'Classroom Wi-Fi, LAN' },
                { name: 'Projector & Motorized Screen', icon: Monitor, desc: 'Ceiling projector' },
                { name: 'Audio & Collar Mic', icon: Mic2, desc: 'Podium mic, speakers' },
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
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
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

          {/* Section 4: Problem Description in Professor's Own Words */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>4. Describe the Problem in Your Own Words</span>
                <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">
                {problemDescription.length} characters
              </span>
            </div>
            
            <p className="text-xs text-slate-500 mb-2">
              Explain clearly what you are seeing on screen, connectivity status, or any error messages displayed:
            </p>

            <textarea
              required
              rows={4}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g. In 6th floor room CV603, the display screen is not functioning properly due to connectivity or Wi-Fi issues. When we plug HDMI cable, screen blinks and shows 'Disconnected'..."
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-800 leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            ></textarea>

            {/* Quick-fill helper tags */}
            <div className="mt-3">
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                💡 One-click issue templates (click to append/replace):
              </span>
              <div className="flex flex-wrap gap-2">
                {quickTemplates.map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProblemDescription(text)}
                    className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 text-left transition"
                  >
                    "{text.slice(0, 45)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Urgency SLA Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
            <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-900 leading-relaxed">
              <strong className="font-bold text-red-950">Immediate Classroom Dispatch Policy:</strong>
              <p className="mt-0.5">
                Submitting this token sends a live audio alert to the Maintenance Department dispatch screen. A capable Audio-Visual & Network technician (e.g. Amit Verma / Suresh Patel) will be assigned within 3-5 minutes to resolve the issue directly in room <span className="font-mono font-bold">{roomNumber}</span> so your lecture continues smoothly.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 transition transform active:scale-[0.99]"
            >
              <Send className="w-5 h-5" />
              <span>Raise Token & Alert Maintenance Department Immediately</span>
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
