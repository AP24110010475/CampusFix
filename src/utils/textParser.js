// Utility to dynamically extract location, room, system, and issue details directly from free-form text

function capitalizeWords(str) {
  if (!str) return '';
  return str
    .split(/\s+/)
    .map((word) => {
      // Preserve uppercase abbreviations like CV, APJ, IT, AI, PC, AC, UPS, RAM, SMPS, GPU, BSOD, HDMI, VGA, LAN
      const upper = word.toUpperCase();
      if (['CV', 'APJ', 'IT', 'AI', 'PC', 'AC', 'UPS', 'RAM', 'SMPS', 'GPU', 'BSOD', 'HDMI', 'VGA', 'LAN', 'LED', 'LCD'].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function parseProblemText(text = '', roleType = 'FACULTY') {
  const clean = text.trim();
  if (!clean) {
    return {
      roomNumber: roleType === 'FACULTY' ? 'Room' : 'Lab',
      blockName: 'Campus Block',
      floor: 1,
      systemNumber: roleType === 'LAB_ASSISTANT' ? 'PC-1' : '',
      category: roleType === 'FACULTY' ? 'Equipment' : 'Lab Maintenance'
    };
  }

  // 1. DYNAMIC BLOCK EXTRACTION
  let blockName = '';

  // Pattern A: '[Name] Block' (e.g. "CV Raman Block", "Science Block", "Aryabhata Block", "Admin Block", "Mechanical Block")
  const suffixMatch = clean.match(/(?:in\s+|at\s+)?([A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,3}\s+block)\b/i);
  if (suffixMatch) {
    let raw = suffixMatch[1].replace(/^(?:in|at)\s+/i, '').trim();
    if (raw.toLowerCase() !== 'block') {
      blockName = capitalizeWords(raw);
    }
  }

  // Pattern B: "Block [A-Z0-9]" (e.g. "Block B", "Block 4", "Block C", "Block-3") but exclude ordinals like "Block 4th floor"
  if (!blockName) {
    const prefixMatch = clean.match(/\b(block\s*[-#]?\s*(?!(?:\d+(?:st|nd|rd|th)|floor|room|lab|and|is|in|the)\b)[A-Za-z0-9]{1,10})\b/i);
    if (prefixMatch) {
      blockName = capitalizeWords(prefixMatch[1].trim());
    }
  }

  // Pattern C: Campus building keywords (e.g. Raman Building, Library Wing, Kalam Complex)
  if (!blockName) {
    const buildingMatch = clean.match(/\b([A-Za-z0-9.'-]+\s+(?:building|wing|complex|hall))\b/i);
    if (buildingMatch) {
      blockName = capitalizeWords(buildingMatch[1].trim());
    }
  }

  // Fallback if no block name was typed at all
  if (!blockName) {
    blockName = 'Campus Block';
  }

  // 2. DYNAMIC FLOOR EXTRACTION
  let floor = 6;
  const floorMatch = clean.match(/(?:in\s+|at\s+|on\s+)?(\d+)(?:st|nd|rd|th)?\s*fl(?:oo)?r\b/i) ||
                     clean.match(/\bfl(?:oo)?r\s*(?:number|no\.?|#)?\s*(\d+)\b/i);
  if (floorMatch) {
    floor = parseInt(floorMatch[1], 10);
  } else if (/ground\s*floor/i.test(clean)) {
    floor = 1;
  }

  // 3. DYNAMIC ROOM / LAB NUMBER EXTRACTION
  let roomNumber = '';

  // Pattern A: "room number CV603", "room no 603", "room CV603", "room 603"
  const explicitRoom = clean.match(/\broom\s*(?:number|no\.?|#)?\s*([a-zA-Z0-9_-]+)/i);
  if (explicitRoom) {
    roomNumber = explicitRoom[1].toUpperCase();
  }

  // Pattern B: "CV606 is a lab", "in lab CV606", "lab 14"
  if (!roomNumber) {
    const explicitLab = clean.match(/\b([a-zA-Z0-9_-]+)\s+is\s+a\s+lab\b/i) ||
                        clean.match(/\blab\s*(?:number|no\.?|#)?\s*([a-zA-Z0-9_-]+)/i);
    if (explicitLab) {
      roomNumber = explicitLab[1].toUpperCase();
    }
  }

  // Pattern C: Alphanumeric code like CV603, CV606, EC401, CS302, LH101
  if (!roomNumber) {
    const alphaNumMatch = clean.match(/\b([A-Za-z]{1,4}\s*\d{2,4}[A-Za-z]?)\b/);
    if (alphaNumMatch) {
      roomNumber = alphaNumMatch[1].replace(/\s+/g, '').toUpperCase();
    }
  }

  // Fallback
  if (!roomNumber) {
    roomNumber = roleType === 'FACULTY' ? 'Classroom' : 'Lab';
  }

  // 4. DYNAMIC SYSTEM / PC NUMBER EXTRACTION (for Lab)
  let systemNumber = '';
  const sysMatch = clean.match(/(?:pc|system|node|workstation|machine)\s*(?:#|no\.?|number)?\s*([a-zA-Z0-9_-]+)/i);
  if (sysMatch) {
    const rawNum = sysMatch[1];
    systemNumber = /^pc/i.test(rawNum) ? rawNum.toUpperCase() : `PC-${rawNum.toUpperCase()}`;
  } else if (roleType === 'LAB_ASSISTANT') {
    systemNumber = 'Lab System';
  }

  // 5. DYNAMIC ISSUE COMPONENT EXTRACTION
  // Matches any campus equipment, facility, or custom typed device
  const knownEquipmentList = [
    // Displays, TVs & Screens
    { match: ['interactive smart board', 'interactive board', 'smart board', 'touch board'], label: 'Interactive Smart Board' },
    { match: ['display screen', 'smart tv', 'touch screen', 'led wall', 'display', 'screen', 'tv screen'], label: 'Display Screen' },
    { match: ['projector screen', 'motorized screen'], label: 'Projector Screen' },
    { match: ['projector', 'ceiling projector'], label: 'Projector' },
    { match: ['hdmi cable', 'hdmi cord', 'hdmi port', 'hdmi lead', 'hdmi'], label: 'HDMI Cable / Port' },
    { match: ['vga cable', 'vga port', 'vga'], label: 'VGA Cable' },
    
    // Audio & Mic
    { match: ['collar mic', 'wireless mic', 'podium mic', 'lapel mic', 'microphone', 'mic'], label: 'Microphone' },
    { match: ['speaker', 'speakers', 'sound system', 'audio system', 'amplifier', 'audio', 'sound'], label: 'Audio / Speaker System' },
    
    // Connectivity & Wi-Fi
    { match: ['wifi router', 'wi-fi router', 'access point', 'wifi ap', 'wi-fi ap'], label: 'Wi-Fi Router' },
    { match: ['wifi', 'wi-fi', 'internet connection', 'internet', 'connectivity'], label: 'Wi-Fi / Internet' },
    { match: ['ethernet cable', 'lan cable', 'lan cord', 'lan port', 'ethernet port', 'ethernet', 'lan socket', 'network switch'], label: 'LAN Port / Cable' },
    
    // HVAC & Electrical
    { match: ['air conditioner', 'ac unit', 'ac cooling', 'air conditioning', 'ac'], label: 'Air Conditioner (AC)' },
    { match: ['ceiling fan', 'exhaust fan', 'pedestal fan', 'fan', 'fans'], label: 'Ceiling Fan' },
    { match: ['tube light', 'led tube', 'tube lights', 'led light', 'ceiling light', 'lighting', 'lights', 'light'], label: 'Lighting / Tube Light' },
    { match: ['switchboard', 'switch board', 'power socket', 'plug socket', 'plug point', 'electrical socket', 'wall socket', 'socket', 'switch'], label: 'Switchboard / Socket' },
    { match: ['ups battery', 'ups backup', 'inverter', 'ups', 'power backup'], label: 'UPS / Power Backup' },
    
    // Computers & Lab Peripherals
    { match: ['smps', 'power supply unit', 'power supply', 'psu'], label: 'SMPS / Power Supply' },
    { match: ['ram stick', 'ram memory', 'ddr4', 'ddr5', 'ram'], label: 'RAM Memory' },
    { match: ['motherboard', 'mainboard'], label: 'Motherboard' },
    { match: ['hard disk', 'hard drive', 'ssd drive', 'ssd', 'hdd'], label: 'Storage (SSD/HDD)' },
    { match: ['graphics card', 'gpu card', 'gpu'], label: 'Graphics Card (GPU)' },
    { match: ['optical mouse', 'usb mouse', 'mouse'], label: 'Mouse' },
    { match: ['mechanical keyboard', 'usb keyboard', 'keyboard'], label: 'Keyboard' },
    { match: ['computer monitor', 'pc monitor', 'monitor'], label: 'Computer Monitor' },
    { match: ['3d printer', 'laser printer', 'printer', 'scanner'], label: 'Printer / Scanner' },
    { match: ['blue screen', 'bsod', 'crash screen'], label: 'Windows BSOD Crash' },
    { match: ['dual boot', 'grub rescue', 'grub', 'ubuntu', 'linux lab', 'os image'], label: 'OS / Dual-Boot' },
    { match: ['computer', 'workstation', 'cpu cabinet', 'cpu', 'system'], label: 'Computer System' },
    
    // Classroom Facilities & Furniture
    { match: ['door lock', 'door handle', 'door latch', 'door'], label: 'Room Door / Lock' },
    { match: ['classroom podium', 'podium desk', 'podium'], label: 'Classroom Podium' },
    { match: ['whiteboard marker', 'whiteboard', 'blackboard', 'greenboard'], label: 'Whiteboard' },
    { match: ['water cooler', 'water dispenser', 'water filter'], label: 'Water Dispenser' },
    { match: ['window latch', 'window glass', 'window'], label: 'Window' },
    { match: ['desk', 'bench', 'chair', 'furniture'], label: 'Classroom Furniture' }
  ];

  let category = '';
  const lower = clean.toLowerCase();

  // Step 1: Match against known university devices and components
  for (const item of knownEquipmentList) {
    for (const term of item.match) {
      // word boundary check
      const regex = new RegExp('(?:^|[^a-z0-9])' + term + '(?:[^a-z0-9]|$)', 'i');
      if (regex.test(lower)) {
        category = item.label;
        break;
      }
    }
    if (category) break;
  }

  // Step 2: Dynamic grammatical extraction if it was not in the predefined list
  // Matches "the [device / machine / component] is/are not working" or "the [device] is broken"
  if (!category) {
    const dynamicMatch = clean.match(/\bthe\s+([a-zA-Z0-9\s/-]{2,35}?)\s+(?:is\s+not|are\s+not|is|are|has|have|needs|was|were)\b/i);
    if (dynamicMatch) {
      const raw = dynamicMatch[1].trim();
      // Ensure it's not a location keyword like "the 6th floor" or "the room"
      if (!/^(?:room|floor|block|lab|classroom|lecture|hall|today|now)\b/i.test(raw)) {
        category = capitalizeWords(raw);
      }
    }
  }

  // Step 3: Matches "issue with [device]" or "problem with [device]"
  if (!category) {
    const faultMatch = clean.match(/\b(?:issue|problem|fault|error|trouble)\s+(?:with|in|of)\s+(?:the\s+)?([a-zA-Z0-9\s/-]{2,35}?)(?:[.,;]|\s+due|\s+because|\s+and|\s+is|\s*$)/i);
    if (faultMatch) {
      const raw = faultMatch[1].trim();
      if (!/^(?:room|floor|block|lab|today)\b/i.test(raw)) {
        category = capitalizeWords(raw);
      }
    }
  }

  // Final fallback if no specific component could be identified
  if (!category) {
    category = roleType === 'FACULTY' ? 'Classroom Equipment' : 'Lab Workstation';
  }

  return {
    roomNumber,
    blockName,
    floor,
    systemNumber,
    category
  };
}
