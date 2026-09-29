# CampusFix — University Classroom & Lab Maintenance System

A specialized token management and emergency dispatch application built for university staff, faculty/professors, lab assistants, and the campus maintenance department.

---

## 🌟 Key Problem Solved & Core Scenarios

### 🎓 Scenario 1: Faculty / Professor (Active Classroom Emergency)
- **Example**: In **CV Raman Block**, on the **6th Floor**, in room **CV603**, the display screen is malfunctioning due to connectivity or Wi-Fi issues.
- **Workflow**: 
  1. The professor opens the app in **Faculty Mode**.
  2. Selects CV Raman Block, 6th Floor, Room CV603.
  3. Enters their name and describes the problem **in their own words** (e.g. *"Display screen is not functioning properly due to Wi-Fi/connectivity issues"*).
  4. Submits the token (`TKN-CV603-XXXX`).
  5. The **Maintenance Department receives an immediate high-priority audio & visual alarm**.
  6. Maintenance immediately assigns a capable technician (e.g., **Amit Verma**, AV & Display Specialist) with a **10-15 minute SLA** so the lecture proceeds smoothly without disruption.

### 🔬 Scenario 2: Lab Assistant (Scheduled Weekend Maintenance)
- **Example**: In the same block and floor, **CV606 is a Computer Lab**. A particular system (**PC-14**) requires maintenance (e.g., random restarts, 3 RAM beep codes, loose USB port).
- **Workflow**:
  1. The lab assistant selects **Lab Assistant Mode**.
  2. Enters their name, Room **CV606**, and Target System **PC-14**.
  3. Describes the problem in their own words.
  4. Queues the ticket for **Upcoming Weekend (Saturday or Sunday)** batch servicing so weekday student practicals are not interrupted.
  5. Maintenance assigns a capable computer hardware technician (e.g., **Karthik Nair**, Hardware & Lab Systems Tech) with spare RAM and SMPS units for Saturday morning.

---

## 🚀 Features

- **Role Switcher Header**:
  - **1. Faculty / Professor Mode**: Fast, single-page emergency submission with classroom presets and 10-15 min SLA badge.
  - **2. Lab Assistant Mode**: Dedicated system/PC identifier, hardware component selectors, and Saturday/Sunday batch scheduling.
  - **3. Maintenance Department Desk**: Triage incoming tickets, audio alarm, filter by urgency (Immediate vs Weekend), search, and assign capable personnel.
  - **4. Capable Technician Portal**: Certified technicians view their assigned orders, update on-site status, and record root cause & replaced parts upon resolution.
  - **5. Live Token Tracker**: Search any token ID (e.g. `TKN-CV603-9821`) to see real-time progress steps and assigned technician contact card.
- **Smart Technician Matching**: Recommends the right technician based on category (AV specialist for displays, network engineer for Wi-Fi, PC tech for lab systems).
- **Built-in Audio Chimes**: Web Audio API synthesized alert chimes (immediate double alarm for emergency classroom tokens; pleasant chord for resolutions) without needing external audio files.
- **Local Persistence**: State is saved automatically to browser `localStorage` across page reloads.
- **One-Click Demo Pre-fills**: "Load Prompt Example" buttons on both forms to instantly test the exact CV Raman Block CV603 & CV606 cases.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Sound**: Web Audio API (Synthesized tone generator)
- **Storage**: Browser LocalStorage with fallback mock datasets

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:5173` in your browser.
