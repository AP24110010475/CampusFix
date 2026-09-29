import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TICKETS, CAPABLE_TECHNICIANS, UNIVERSITY_BLOCKS } from '../data/mockData';
import { playNotificationSound } from '../utils/audio';

const TicketContext = createContext();

const LOCAL_STORAGE_KEY_TICKETS = 'campus_unifix_tickets_v1';
const LOCAL_STORAGE_KEY_TECHS = 'campus_unifix_technicians_v1';
const LOCAL_STORAGE_KEY_AUTH = 'campus_unifix_auth_v1';

export function TicketProvider({ children }) {
  // Load tickets from LocalStorage or mock data
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TICKETS);
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [technicians, setTechnicians] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TECHS);
      return saved ? JSON.parse(saved) : CAPABLE_TECHNICIANS;
    } catch {
      return CAPABLE_TECHNICIANS;
    }
  });

  // Auth state
  const [loggedInPortal, setLoggedInPortal] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Current active view role
  // 'FACULTY' | 'LAB_ASSISTANT' | 'MAINTENANCE' | 'TRACKER'
  const [activeRole, setActiveRole] = useState(() => {
    if (loggedInPortal === 'maintenance') return 'MAINTENANCE';
    if (loggedInPortal === 'faculty') return 'FACULTY';
    return 'TRACKER';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [lastCreatedToken, setLastCreatedToken] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TICKETS, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to LocalStorage:', e);
    }
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TECHS, JSON.stringify(technicians));
    } catch (e) {
      console.error('Failed to save technicians to LocalStorage:', e);
    }
  }, [technicians]);

  useEffect(() => {
    try {
      if (loggedInPortal) {
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(loggedInPortal));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error('Failed to save auth to LocalStorage:', e);
    }
  }, [loggedInPortal]);

  // Login / Logout
  const login = (portal) => {
    setLoggedInPortal(portal);
    if (portal === 'maintenance') {
      setActiveRole('MAINTENANCE');
    } else if (portal === 'faculty') {
      setActiveRole('FACULTY');
    } else if (portal === 'tracker') {
      setActiveRole('TRACKER');
    }
  };

  const logout = () => {
    setLoggedInPortal(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH);
  };

  // Toast notification helper
  const addToast = (toast) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    const newToast = { id, ...toast };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Generate unique token number
  const generateTokenNumber = (roomNumber) => {
    const cleanRoom = (roomNumber || 'GEN').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `TKN-${cleanRoom}-${randomSuffix}`;
  };

  // Create Ticket function
  const createTicket = (ticketData) => {
    const tokenNumber = generateTokenNumber(ticketData.roomNumber);
    const newTicket = {
      id: tokenNumber,
      tokenNumber,
      createdAt: new Date().toISOString(),
      status: 'PENDING_ASSIGNMENT',
      assignedTechnicianId: null,
      assignedTechnicianName: null,
      assignedTechnicianRole: null,
      assignedTechnicianPhone: null,
      assignedAt: null,
      scheduledDate: ticketData.urgency === 'IMMEDIATE' ? 'Today (Immediate)' : 'Upcoming Weekend (Saturday/Sunday)',
      scheduledSlot: ticketData.urgency === 'IMMEDIATE' ? 'Active Class Period' : (ticketData.preferredResolutionWindow || 'Weekend Slot'),
      technicianNotes: '',
      resolutionNotes: '',
      resolvedAt: null,
      ...ticketData
    };

    setTickets((prev) => [newTicket, ...prev]);
    setLastCreatedToken(newTicket);

    if (soundEnabled) {
      playNotificationSound(newTicket.urgency === 'IMMEDIATE' ? 'urgent' : 'standard');
    }

    addToast({
      title: newTicket.urgency === 'IMMEDIATE' ? '🚨 EMERGENCY CLASSROOM TICKET RAISED' : '🛠️ LAB MAINTENANCE TICKET LOGGED',
      message: `Token ${tokenNumber} for ${newTicket.roomNumber} submitted! Maintenance department has been alerted.`,
      type: newTicket.urgency === 'IMMEDIATE' ? 'urgent' : 'info',
      tokenNumber: newTicket.tokenNumber
    });

    return newTicket;
  };

  // Assign Technician to Ticket
  const assignTechnician = (ticketId, technicianId, { scheduledDate, scheduledSlot, technicianNotes }) => {
    const tech = technicians.find((t) => t.id === technicianId);
    if (!tech) return;

    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            status: 'ASSIGNED',
            assignedTechnicianId: tech.id,
            assignedTechnicianName: tech.name,
            assignedTechnicianRole: tech.role,
            assignedTechnicianPhone: tech.phone,
            assignedAt: new Date().toISOString(),
            scheduledDate: scheduledDate || ticket.scheduledDate,
            scheduledSlot: scheduledSlot || ticket.scheduledSlot,
            technicianNotes: technicianNotes || `Assigned to ${tech.name} (${tech.role})`
          };
        }
        return ticket;
      })
    );

    // Update technician status
    setTechnicians((prev) =>
      prev.map((t) => {
        if (t.id === technicianId) {
          return {
            ...t,
            status: 'Assigned',
            currentAssignment: `Ticket ${ticketId}`
          };
        }
        return t;
      })
    );

    if (soundEnabled) {
      playNotificationSound('standard');
    }

    addToast({
      title: '👷 Technician Assigned',
      message: `${tech.name} has been assigned to ticket ${ticketId}`,
      type: 'success'
    });
  };

  // Update Status
  const updateTicketStatus = (ticketId, newStatus, extraData = {}) => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          const updated = {
            ...ticket,
            status: newStatus,
            ...extraData
          };
          if (newStatus === 'RESOLVED') {
            updated.resolvedAt = new Date().toISOString();
          }
          return updated;
        }
        return ticket;
      })
    );

    if (newStatus === 'RESOLVED') {
      if (soundEnabled) playNotificationSound('success');
      addToast({
        title: '✅ Issue Resolved',
        message: `Token ${ticketId} has been marked as RESOLVED.`,
        type: 'success'
      });
    } else {
      addToast({
        title: `Status Updated: ${newStatus}`,
        message: `Token ${ticketId} is now ${newStatus.replace('_', ' ')}`,
        type: 'info'
      });
    }
  };

  // ===== TECHNICIAN MANAGEMENT FUNCTIONS =====

  const addTechnician = (techData) => {
    const id = `TECH-${String(Date.now()).slice(-4)}`;
    const newTech = {
      id,
      resolvedCount: 0,
      rating: 0,
      currentAssignment: null,
      avatar: '',
      ...techData
    };
    setTechnicians((prev) => [...prev, newTech]);
    addToast({
      title: '✅ Technician Added',
      message: `${techData.name} has been registered as a new technician.`,
      type: 'success'
    });
  };

  const updateTechnician = (techId, updates) => {
    setTechnicians((prev) =>
      prev.map((t) => {
        if (t.id === techId) {
          return { ...t, ...updates };
        }
        return t;
      })
    );
    addToast({
      title: '✏️ Technician Updated',
      message: `${updates.name || 'Technician'} details have been updated.`,
      type: 'info'
    });
  };

  const removeTechnician = (techId) => {
    const tech = technicians.find(t => t.id === techId);
    setTechnicians((prev) => prev.filter((t) => t.id !== techId));
    addToast({
      title: '🗑️ Technician Removed',
      message: `${tech?.name || 'Technician'} has been removed from the directory.`,
      type: 'info'
    });
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    setTickets(INITIAL_TICKETS);
    setTechnicians(CAPABLE_TECHNICIANS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TICKETS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TECHS);
    addToast({
      title: 'Demo Data Reset',
      message: 'Reset back to standard university demo state (CV Raman Block 6th Floor CV603 & CV606).',
      type: 'info'
    });
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        technicians,
        blocks: UNIVERSITY_BLOCKS,
        activeRole,
        setActiveRole,
        soundEnabled,
        setSoundEnabled,
        toasts,
        addToast,
        removeToast,
        createTicket,
        assignTechnician,
        updateTicketStatus,
        lastCreatedToken,
        setLastCreatedToken,
        resetDemoData,
        // Auth
        loggedInPortal,
        login,
        logout,
        // Technician management
        addTechnician,
        updateTechnician,
        removeTechnician
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}
