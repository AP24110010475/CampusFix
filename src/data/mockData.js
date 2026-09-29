// University Campus Hierarchy & Capable Technicians Data

export const UNIVERSITY_BLOCKS = [
  {
    id: 'CV_RAMAN',
    name: 'CV Raman Block (Engineering & Computing)',
    code: 'CV',
    floors: [
      {
        floorNumber: 6,
        floorName: '6th Floor',
        rooms: [
          { roomNumber: 'CV601', type: 'Classroom', capacity: 70, defaultDisplay: 'Interactive Smart Board' },
          { roomNumber: 'CV602', type: 'Classroom', capacity: 75, defaultDisplay: 'Dual 4K Projector' },
          { roomNumber: 'CV603', type: 'Classroom', capacity: 80, defaultDisplay: 'Ultra-HD Smart TV Screen & HDMI Hub' },
          { roomNumber: 'CV604', type: 'Lecture Hall', capacity: 120, defaultDisplay: 'Motorized Projector & Podium' },
          { roomNumber: 'CV605', type: 'Seminar Hall', capacity: 150, defaultDisplay: 'LED Video Wall' },
          { roomNumber: 'CV606', type: 'Computer Lab', capacity: 60, name: 'Advanced Systems & AI Lab', totalSystems: 40 },
          { roomNumber: 'CV607', type: 'Computer Lab', capacity: 60, name: 'Cloud Computing & Networks Lab', totalSystems: 40 },
          { roomNumber: 'CV608', type: 'Computer Lab', capacity: 50, name: 'Cyber Security & IoT Lab', totalSystems: 35 },
        ]
      },
      {
        floorNumber: 5,
        floorName: '5th Floor',
        rooms: [
          { roomNumber: 'CV501', type: 'Classroom', capacity: 70 },
          { roomNumber: 'CV502', type: 'Classroom', capacity: 70 },
          { roomNumber: 'CV506', type: 'Computer Lab', capacity: 55, name: 'Data Science Lab', totalSystems: 35 },
        ]
      },
      {
        floorNumber: 4,
        floorName: '4th Floor',
        rooms: [
          { roomNumber: 'CV401', type: 'Classroom', capacity: 75 },
          { roomNumber: 'CV404', type: 'Computer Lab', capacity: 50, name: 'Software Engineering Lab', totalSystems: 30 },
        ]
      },
      {
        floorNumber: 3,
        floorName: '3rd Floor',
        rooms: [
          { roomNumber: 'CV301', type: 'Classroom', capacity: 80 },
          { roomNumber: 'CV305', type: 'Computer Lab', capacity: 50, name: 'Microprocessor & VLSI Lab', totalSystems: 30 },
        ]
      },
      {
        floorNumber: 2,
        floorName: '2nd Floor',
        rooms: [
          { roomNumber: 'CV201', type: 'Classroom', capacity: 80 },
          { roomNumber: 'CV202', type: 'Faculty Cabin Complex', capacity: 30 },
        ]
      },
      {
        floorNumber: 1,
        floorName: '1st Floor (Ground)',
        rooms: [
          { roomNumber: 'CV101', type: 'Auditorium', capacity: 300 },
          { roomNumber: 'CV102', type: 'Maintenance Dept & Helpdesk', capacity: 20 },
        ]
      }
    ]
  },
  {
    id: 'VISVESVARAYA',
    name: 'Sir M. Visvesvaraya Block (Mechanical & Civil)',
    code: 'MV',
    floors: [
      {
        floorNumber: 3,
        floorName: '3rd Floor',
        rooms: [
          { roomNumber: 'MV301', type: 'Classroom', capacity: 65 },
          { roomNumber: 'MV305', type: 'CAD/CAM Lab', capacity: 40, totalSystems: 30 },
        ]
      },
      {
        floorNumber: 2,
        floorName: '2nd Floor',
        rooms: [
          { roomNumber: 'MV201', type: 'Classroom', capacity: 70 },
          { roomNumber: 'MV204', type: 'Robotics Lab', capacity: 35, totalSystems: 25 },
        ]
      }
    ]
  },
  {
    id: 'KALAM',
    name: 'APJ Abdul Kalam Block (Sciences & Basic Engg)',
    code: 'AK',
    floors: [
      {
        floorNumber: 4,
        floorName: '4th Floor',
        rooms: [
          { roomNumber: 'AK401', type: 'Classroom', capacity: 85 },
          { roomNumber: 'AK405', type: 'Physics Simulation Lab', capacity: 45, totalSystems: 30 },
        ]
      },
      {
        floorNumber: 3,
        floorName: '3rd Floor',
        rooms: [
          { roomNumber: 'AK302', type: 'Smart Classroom', capacity: 75 },
        ]
      }
    ]
  }
];

export const CAPABLE_TECHNICIANS = [
  {
    id: 'TECH-01',
    name: 'Amit Verma',
    role: 'Senior AV & Display Specialist',
    phone: '+91 98451-22301',
    email: 'amit.verma@university.edu',
    specialties: ['Display Screens', 'Projectors', 'Smart TVs', 'HDMI/VGA Hubs', 'Audio & Microphones'],
    rating: 4.9,
    resolvedCount: 142,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    status: 'Available', // Available, Busy, On Leave
    currentAssignment: null
  },
  {
    id: 'TECH-02',
    name: 'Suresh Patel',
    role: 'Lead Network & Connectivity Engineer',
    phone: '+91 98451-22302',
    email: 'suresh.patel@university.edu',
    specialties: ['Wi-Fi Connectivity', 'Access Points', 'Campus LAN & Switches', 'IP Allocation', 'Firewall'],
    rating: 4.8,
    resolvedCount: 128,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    status: 'Available',
    currentAssignment: null
  },
  {
    id: 'TECH-03',
    name: 'Karthik Nair',
    role: 'Computer Hardware & Lab Systems Tech',
    phone: '+91 98451-22303',
    email: 'karthik.nair@university.edu',
    specialties: ['Lab Workstations', 'PC Hardware / RAM / SMPS', 'Dual-Boot OS', 'Monitors & Peripherals'],
    rating: 4.7,
    resolvedCount: 215,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    status: 'Assigned',
    currentAssignment: 'CV606 Lab - System #14'
  },
  {
    id: 'TECH-04',
    name: 'Manoj Kumar',
    role: 'Campus Master Electrician',
    phone: '+91 98451-22304',
    email: 'manoj.kumar@university.edu',
    specialties: ['Power Sockets', 'Classroom Air Conditioning', 'UPS Backup', 'Circuit Breakers'],
    rating: 4.9,
    resolvedCount: 98,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    status: 'Available',
    currentAssignment: null
  },
  {
    id: 'TECH-05',
    name: 'Pooja Rao',
    role: 'Lab Software & OS Deployment Tech',
    phone: '+91 98451-22305',
    email: 'pooja.rao@university.edu',
    specialties: ['Linux / Ubuntu Lab Image', 'MATLAB & IDE Licenses', 'Network Boot (PXE)', 'Mouse/Keyboards'],
    rating: 4.8,
    resolvedCount: 86,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    status: 'Available',
    currentAssignment: null
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'TKN-CV603-9821',
    tokenNumber: 'TKN-CV603-9821',
    roleType: 'FACULTY', // FACULTY or LAB_ASSISTANT
    reporterName: 'Prof. Rameshwar Sharma',
    reporterRole: 'Professor, Dept. of Computer Science',
    reporterPhone: '+91 94481-10293',
    blockId: 'CV_RAMAN',
    blockName: 'CV Raman Block',
    floor: 6,
    roomNumber: 'CV603',
    roomType: 'Classroom',
    systemNumber: '', // N/A for classroom
    category: 'Display Screen / Connectivity',
    urgency: 'IMMEDIATE', // IMMEDIATE or SCHEDULED_WEEKEND
    urgencyLabel: 'Immediate Action (Active Class)',
    preferredResolutionWindow: 'Immediate Dispatch (Classroom in use)',
    problemDescription: 'The 75-inch smart display screen is flickering and showing "No Signal / Wi-Fi disconnected" error. I have a 3rd-year CS lecture scheduled right now with 75 students waiting. Unable to mirror my laptop via Wi-Fi or HDMI.',
    status: 'ASSIGNED', // PENDING_ASSIGNMENT, ASSIGNED, IN_PROGRESS, RESOLVED
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    assignedTechnicianId: 'TECH-01',
    assignedTechnicianName: 'Amit Verma',
    assignedTechnicianRole: 'Senior AV & Display Specialist',
    assignedTechnicianPhone: '+91 98451-22301',
    assignedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    scheduledDate: 'Today (Immediate)',
    scheduledSlot: 'Current Period (within 10 mins)',
    technicianNotes: 'Dispatched to 6th floor CV603 with replacement HDMI 2.1 cable and Wi-Fi dongle.',
    resolutionNotes: '',
    resolvedAt: null
  },
  {
    id: 'TKN-CV606-4412',
    tokenNumber: 'TKN-CV606-4412',
    roleType: 'LAB_ASSISTANT',
    reporterName: 'Rajesh Kumar',
    reporterRole: 'Lab Assistant, Advanced Systems & AI Lab',
    reporterPhone: '+91 98860-99214',
    blockId: 'CV_RAMAN',
    blockName: 'CV Raman Block',
    floor: 6,
    roomNumber: 'CV606',
    roomType: 'Computer Lab',
    systemNumber: 'PC-14 (Workstation Node 14)',
    category: 'PC Hardware & Motherboard Power',
    urgency: 'SCHEDULED_WEEKEND',
    urgencyLabel: 'Scheduled Weekend Maintenance',
    preferredResolutionWindow: 'Upcoming Saturday (10:00 AM - 1:00 PM)',
    problemDescription: 'System PC-14 in CV606 Lab powers off abruptly after 5-10 minutes of usage and emits 3 continuous beep codes (RAM / SMPS power surge). The optical mouse USB port also has physical looseness. Please service during the upcoming weekend so weekday lab practicals are not disturbed.',
    status: 'ASSIGNED',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(), // 2 hours ago
    assignedTechnicianId: 'TECH-03',
    assignedTechnicianName: 'Karthik Nair',
    assignedTechnicianRole: 'Computer Hardware & Lab Systems Tech',
    assignedTechnicianPhone: '+91 98451-22303',
    assignedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    scheduledDate: 'Upcoming Saturday',
    scheduledSlot: 'Morning Slot (10:00 AM - 1:00 PM)',
    technicianNotes: 'Queued for Saturday morning lab maintenance round. Spare 16GB DDR4 RAM stick and 450W SMPS kept ready.',
    resolutionNotes: '',
    resolvedAt: null
  },
  {
    id: 'TKN-CV602-1109',
    tokenNumber: 'TKN-CV602-1109',
    roleType: 'FACULTY',
    reporterName: 'Dr. Sunita Kulkarni',
    reporterRole: 'Associate Professor, Electronics Dept',
    reporterPhone: '+91 94812-77112',
    blockId: 'CV_RAMAN',
    blockName: 'CV Raman Block',
    floor: 6,
    roomNumber: 'CV602',
    roomType: 'Classroom',
    systemNumber: '',
    category: 'Audio / Collar Mic System',
    urgency: 'IMMEDIATE',
    urgencyLabel: 'Immediate Action (Active Class)',
    preferredResolutionWindow: 'Immediate Dispatch',
    problemDescription: 'The wireless collar microphone in CV602 is making loud static feedback and batteries died mid-lecture.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 300 * 60 * 1000).toISOString(),
    assignedTechnicianId: 'TECH-01',
    assignedTechnicianName: 'Amit Verma',
    assignedTechnicianRole: 'Senior AV & Display Specialist',
    assignedTechnicianPhone: '+91 98451-22301',
    assignedAt: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
    scheduledDate: 'Today',
    scheduledSlot: 'Immediate',
    technicianNotes: 'Replaced AA rechargeable batteries and readjusted receiver frequency channel from 640MHz to 648MHz.',
    resolutionNotes: 'Tested with Dr. Sunita Kulkarni. Audio clarity restored and static feedback completely eliminated.',
    resolvedAt: new Date(Date.now() - 240 * 60 * 1000).toISOString()
  }
];
