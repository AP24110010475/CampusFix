import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { 
  UserPlus, 
  Pencil, 
  Trash2, 
  X, 
  Phone, 
  Mail, 
  Save, 
  User, 
  Shield,
  Check,
  Star,
  Users
} from 'lucide-react';

export default function TechnicianManager() {
  const { technicians, addTechnician, updateTechnician, removeTechnician } = useTickets();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Form state
  const emptyForm = {
    name: '',
    role: '',
    phone: '',
    email: '',
    specialties: '',
    status: 'Available'
  };
  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setEditingTech(null);
    setShowAddForm(true);
  };

  const handleOpenEdit = (tech) => {
    setFormData({
      name: tech.name,
      role: tech.role,
      phone: tech.phone,
      email: tech.email || '',
      specialties: Array.isArray(tech.specialties) ? tech.specialties.join(', ') : tech.specialties || '',
      status: tech.status || 'Available'
    });
    setEditingTech(tech);
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.phone.trim()) return;

    const techData = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
      status: formData.status
    };

    if (editingTech) {
      updateTechnician(editingTech.id, techData);
    } else {
      addTechnician(techData);
    }

    setShowAddForm(false);
    setEditingTech(null);
    setFormData(emptyForm);
  };

  const handleDelete = (techId) => {
    removeTechnician(techId);
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">Manage Technicians / Workers</h3>
            <p className="text-[11px] text-slate-500">{technicians.length} registered workers</p>
          </div>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Technician</span>
        </button>
      </div>

      {/* Technician List */}
      <div className="divide-y divide-slate-100">
        {technicians.map((tech) => (
          <div key={tech.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-slate-900">{tech.name}</h4>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    tech.status === 'Available' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : tech.status === 'On Leave'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tech.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{tech.role}</p>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3" />
                    {tech.phone}
                  </span>
                  {tech.email && (
                    <span className="flex items-center gap-1 truncate">
                      <Mail className="w-3 h-3" />
                      {tech.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0 ml-3">
              <button
                onClick={() => handleOpenEdit(tech)}
                className="p-2 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </button>
              
              {confirmDeleteId === tech.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(tech.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDeleteId(tech.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  {editingTech ? <Pencil className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    {editingTech ? 'Edit Technician' : 'Add New Technician'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingTech ? `Editing: ${editingTech.name}` : 'Register a new worker / technician'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setShowAddForm(false); setEditingTech(null); }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amit Verma"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Role / Specialization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior AV & Display Specialist"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98451-XXXXX"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Assigned">Assigned</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="technician@university.edu"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Specialties (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  placeholder="e.g. Projectors, HDMI, Wi-Fi, Audio"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setEditingTech(null); }}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTech ? 'Save Changes' : 'Add Technician'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
