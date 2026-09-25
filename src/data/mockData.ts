import { CivicReport, NotificationItem } from '../types';

// Preset sample real-world photos for camera simulation / instant testing
export const SAMPLE_CIVIC_PHOTOS = [
  {
    id: 'pothole',
    name: 'Severe Pothole',
    category: 'Road Infrastructure' as const,
    priority: 'high' as const,
    defaultLocation: 'Main Road, near ABC Public School',
    ward: 'Ward 14 • Metro Central',
    confidence: 98.4,
    department: 'Public Works Department (PWD)',
    slaHours: 24,
    description: 'Deep road crater approximately 2.5 feet wide causing severe vehicle deceleration and two-wheeler skid hazards.',
    // Stylized SVG Data URI of a realistic pothole in asphalt road
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%232b313a"/><line x1="0" y1="200" x2="600" y2="200" stroke="%23ffeb3b" stroke-dasharray="30 20" stroke-width="8"/><ellipse cx="320" cy="220" rx="140" ry="70" fill="%2314161a"/><ellipse cx="315" cy="225" rx="110" ry="50" fill="%23090a0c"/><path d="M 200,210 Q 240,170 300,180 T 420,200 T 450,250 T 360,280 T 220,260 Z" fill="%231a1d24"/><circle cx="270" cy="210" r="14" fill="%232f3542"/><circle cx="370" cy="240" r="18" fill="%232f3542"/><path d="M 180,190 L 150,170 M 440,260 L 490,290 M 230,280 L 210,320" stroke="%23383f4a" stroke-width="4"/><text x="20" y="370" fill="%2394a3b8" font-family="sans-serif" font-size="14" font-weight="600">GEO-STAMP: LAT 12.9716° N, LON 77.5946° E • SPEED LIMIT 40</text></svg>'
  },
  {
    id: 'streetlight',
    name: 'Broken Streetlight',
    category: 'Street Lighting' as const,
    priority: 'medium' as const,
    defaultLocation: '5th Cross, Near Metro Station Pillar 104',
    ward: 'Ward 14 • Metro Central',
    confidence: 96.8,
    department: 'Municipal Electrical Board',
    slaHours: 36,
    description: 'Sodium vapor pole fixture fractured and hanging loose by exposed wiring; creating zero visibility in dark alley.',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%230f172a"/><path d="M 100,400 L 100,100 Q 100,40 180,40 L 300,40" stroke="%23475569" stroke-width="16" fill="none"/><line x1="300" y1="40" x2="300" y2="90" stroke="%2364748b" stroke-width="8"/><rect x="250" y="90" width="100" height="45" rx="8" fill="%23334155" transform="rotate(18 300 110)"/><circle cx="310" cy="140" r="12" fill="%23ef4444" opacity="0.8"/><line x1="280" y1="120" x2="270" y2="160" stroke="%23f59e0b" stroke-width="3" stroke-dasharray="4 4"/><circle cx="100" cy="380" r="22" fill="%23334155"/><text x="20" y="370" fill="%2364748b" font-family="sans-serif" font-size="14" font-weight="600">WARD 14 SMART ASSET #LT-4409 • REPORTED DARK SPOT</text></svg>'
  },
  {
    id: 'garbage',
    name: 'Garbage Dump Overflow',
    category: 'Sanitation & Waste' as const,
    priority: 'medium' as const,
    defaultLocation: 'Market Square, Sector 4 Secondary Gate',
    ward: 'Ward 12 • East Market',
    confidence: 97.2,
    department: 'Solid Waste Management (SWM)',
    slaHours: 12,
    description: 'Community dumpster completely overflowing onto pedestrian walkway; unattended organic and plastic waste.',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23e2e8f0"/><rect x="180" y="160" width="240" height="180" rx="12" fill="%2316a34a"/><rect x="160" y="140" width="280" height="24" rx="6" fill="%2315803d"/><path d="M 200,140 Q 250,90 320,110 T 400,130 Q 420,80 340,70 T 260,110 Z" fill="%2364748b"/><circle cx="280" cy="120" r="22" fill="%233b82f6"/><circle cx="340" cy="105" r="18" fill="%23eab308"/><path d="M 120,320 Q 180,310 210,340 T 380,330 T 490,345 L 480,380 L 100,380 Z" fill="%23475569"/><text x="20" y="370" fill="%230f172a" font-family="sans-serif" font-size="14" font-weight="600">SWM COLLECTION ZONE #04 • BIO-HAZARD RISK LEVEL 3</text></svg>'
  },
  {
    id: 'water_leak',
    name: 'Burst Water Pipeline',
    category: 'Water Supply' as const,
    priority: 'high' as const,
    defaultLocation: 'Civic Center Boulevard & 4th Avenue',
    ward: 'Ward 14 • Metro Central',
    confidence: 99.1,
    department: 'Water Supply & Sewerage Board',
    slaHours: 8,
    description: 'High-pressure clean municipal supply pipeline fractured underground; significant drinking water loss and road flooding.',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23334155"/><ellipse cx="300" cy="240" rx="200" ry="90" fill="%230284c7" opacity="0.85"/><ellipse cx="290" cy="235" rx="150" ry="60" fill="%2338bdf8" opacity="0.9"/><path d="M 300,240 Q 310,130 330,80 Q 290,120 280,240" fill="%23e0f2fe" opacity="0.95"/><circle cx="320" cy="90" r="16" fill="%23bae6fd"/><circle cx="290" cy="110" r="12" fill="%23bae6fd"/><text x="20" y="370" fill="%23f1f5f9" font-family="sans-serif" font-size="14" font-weight="600">MUNICIPAL PIPELINE PRESSURE SENSOR: CRITICAL DROP (4.2 BAR -> 0.6 BAR)</text></svg>'
  }
];

export const INITIAL_REPORTS: CivicReport[] = [
  {
    id: 'rep-001',
    ticketNumber: 'MSA-2026-8942',
    title: 'Pothole on Main Road',
    category: 'Road Infrastructure',
    priority: 'high',
    status: 'under_review',
    location: 'Main Road, near ABC School',
    ward: 'Ward 14 • Metro Central',
    coordinates: [12.9716, 77.5946],
    timestamp: '25 mins ago',
    description: 'Severe pothole crater posing immediate safety hazard to two-wheelers and school buses during morning rush hours.',
    imageUrl: SAMPLE_CIVIC_PHOTOS[0].url,
    method: 'photo',
    votes: 42,
    aiConfidence: 98.4,
    department: 'Public Works Department (PWD)',
    slaHours: 24,
    assignedOfficer: 'Officer Rajesh Kumar (Zone Engineer)',
    timeline: [
      {
        step: 'Report Filed by Citizen',
        time: 'Today, 08:30 AM',
        description: 'Captured with MySafeArea AI Camera. Instant geo-tagging verified.',
        completed: true
      },
      {
        step: 'AI Computer Vision Analysis',
        time: 'Today, 08:31 AM',
        description: 'Pothole identified with 98.4% confidence. Priority classified as HIGH due to proximity to school zone.',
        completed: true
      },
      {
        step: 'Under Municipal Review',
        time: 'Today, 08:45 AM',
        description: 'Dispatched to PWD Road Maintenance Division queue. Priority token generated.',
        completed: true
      },
      {
        step: 'Crew Dispatch & Repair',
        time: 'Scheduled: Today, 02:00 PM',
        description: 'Asphalt patching vehicle PWD-08 allocated.',
        completed: false
      },
      {
        step: 'AI Proof-of-Resolution Verification',
        time: 'Pending',
        description: 'Citizen validation and thermal compaction inspection.',
        completed: false
      }
    ]
  },
  {
    id: 'rep-002',
    ticketNumber: 'MSA-2026-8931',
    title: 'Broken Streetlight',
    category: 'Street Lighting',
    priority: 'medium',
    status: 'assigned',
    location: '5th Cross, Near Metro Pillar 104',
    ward: 'Ward 14 • Metro Central',
    coordinates: [12.9754, 77.5998],
    timestamp: '3 hours ago',
    description: 'Streetlight pole 4409 bulb damaged with loose hanging bracket, causing dark stretch for night commuters.',
    imageUrl: SAMPLE_CIVIC_PHOTOS[1].url,
    method: 'photo',
    votes: 18,
    aiConfidence: 96.8,
    department: 'Municipal Electrical Board',
    slaHours: 36,
    assignedOfficer: 'Electrical Crew 3 (Supervisor A. Nair)',
    timeline: [
      {
        step: 'Report Filed',
        time: 'Yesterday, 07:15 PM',
        description: 'Submitted via citizen quick-report.',
        completed: true
      },
      {
        step: 'AI Diagnostic',
        time: 'Yesterday, 07:16 PM',
        description: 'Identified loose mechanical fixture and zero illumination.',
        completed: true
      },
      {
        step: 'Technician Assigned',
        time: 'Today, 09:00 AM',
        description: 'Field engineer assigned with replacement 80W LED fixture.',
        completed: true
      },
      {
        step: 'Resolution in Progress',
        time: 'In Progress',
        description: 'Boom lift truck dispatched to 5th Cross.',
        completed: false
      }
    ]
  },
  {
    id: 'rep-003',
    ticketNumber: 'MSA-2026-8890',
    title: 'Garbage Accumulation',
    category: 'Sanitation & Waste',
    priority: 'resolved',
    status: 'resolved',
    location: 'Market Square, Sector 4 Secondary Gate',
    ward: 'Ward 12 • East Market',
    coordinates: [12.9680, 77.6015],
    timestamp: 'Yesterday',
    description: 'Overflowing community waste bin near vegetable market cleared and sanitized.',
    imageUrl: SAMPLE_CIVIC_PHOTOS[2].url,
    method: 'photo',
    votes: 67,
    aiConfidence: 97.2,
    department: 'Solid Waste Management (SWM)',
    slaHours: 12,
    assignedOfficer: 'Sanitation Inspector Deepa V.',
    resolutionPhoto: SAMPLE_CIVIC_PHOTOS[2].url,
    timeline: [
      {
        step: 'Report Filed',
        time: 'Sep 23, 10:20 AM',
        description: 'Citizens reported severe overflow and pedestrian obstruction.',
        completed: true
      },
      {
        step: 'AI Waste Density Check',
        time: 'Sep 23, 10:21 AM',
        description: 'SWM priority flagged high due to marketplace footfall.',
        completed: true
      },
      {
        step: 'Compactor Truck Dispatched',
        time: 'Sep 23, 11:30 AM',
        description: 'SWM Compact-4 cleared 1.8 tons of mixed waste.',
        completed: true
      },
      {
        step: 'Resolved & Disinfected',
        time: 'Sep 23, 01:15 PM',
        description: 'Spot washed with disinfectant and new bin deployed. Verified by AI comparison.',
        completed: true
      }
    ]
  },
  {
    id: 'rep-004',
    ticketNumber: 'MSA-2026-8950',
    title: 'Burst Water Pipeline',
    category: 'Water Supply',
    priority: 'high',
    status: 'assigned',
    location: 'Civic Center Boulevard & 4th Ave',
    ward: 'Ward 14 • Metro Central',
    coordinates: [12.9730, 77.5912],
    timestamp: '45 mins ago',
    description: 'Major drinking water pipe leak flooding outer lane of boulevard. Low water pressure reported nearby.',
    imageUrl: SAMPLE_CIVIC_PHOTOS[3].url,
    method: 'voice',
    votes: 35,
    aiConfidence: 99.1,
    department: 'Water Supply & Sewerage Board',
    slaHours: 8,
    assignedOfficer: 'Emergency Rapid Response Unit W-2',
    timeline: [
      {
        step: 'Voice Report Processed',
        time: 'Today, 09:12 AM',
        description: 'Audio transcribed and analyzed: "Water gushing from road crack".',
        completed: true
      },
      {
        step: 'Emergency Valve Isolation Alert',
        time: 'Today, 09:15 AM',
        description: 'Automated telemetry notification sent to sector pumping substation.',
        completed: true
      },
      {
        step: 'Repair Crew on Site',
        time: 'Today, 09:40 AM',
        description: 'Excavation team isolating damaged 150mm ductile iron pipe.',
        completed: false
      }
    ]
  },
  {
    id: 'rep-005',
    ticketNumber: 'MSA-2026-8875',
    title: 'Damaged Footpath Slabs',
    category: 'Road Infrastructure',
    priority: 'medium',
    status: 'in_progress',
    location: 'Park Avenue, Near Community Library',
    ward: 'Ward 14 • Metro Central',
    coordinates: [12.9695, 77.5930],
    timestamp: '2 days ago',
    description: 'Broken concrete pavers exposing metal reinforcements; tripping hazard for senior citizens.',
    method: 'text',
    votes: 29,
    aiConfidence: 94.5,
    department: 'Pedestrian Safety Cell (PWD)',
    slaHours: 48,
    assignedOfficer: 'PWD Contractor G. Narayana',
    timeline: [
      {
        step: 'Report Filed',
        time: 'Sep 22, 04:00 PM',
        description: 'Submitted by Senior Citizen Forum member.',
        completed: true
      },
      {
        step: 'Material Procurement',
        time: 'Sep 23, 11:00 AM',
        description: 'Anti-skid replacement tactile pavers approved.',
        completed: true
      },
      {
        step: 'Relaying Pavers',
        time: 'Today, 08:00 AM',
        description: 'Work crew relaying 15-meter stretch.',
        completed: true
      }
    ]
  }
];

export const MUNICIPAL_WARDS = [
  'Ward 14 • Metro Central',
  'Ward 07 • Silicon Corridor',
  'Ward 22 • Heritage District',
  'Ward 03 • Green Valley Eco Zone',
  'Ward 12 • East Market Sector'
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pothole Repair Scheduled',
    message: 'PWD Rapid Patch unit scheduled repair for Main Road (Ticket #MSA-2026-8942) today at 2:00 PM.',
    timestamp: '10m ago',
    read: false,
    type: 'update',
    reportTicket: 'MSA-2026-8942'
  },
  {
    id: 'notif-2',
    title: 'AI Civic Triage Complete',
    message: 'Your report on Broken Streetlight (Ticket #MSA-2026-8931) was assigned to Municipal Electrical Board.',
    timestamp: '2h ago',
    read: false,
    type: 'update',
    reportTicket: 'MSA-2026-8931'
  },
  {
    id: 'notif-3',
    title: 'Issue Resolved & Validated',
    message: 'Market Square garbage dump has been cleared and sanitized. Tap to review before-and-after verification.',
    timestamp: '1d ago',
    read: true,
    type: 'resolution',
    reportTicket: 'MSA-2026-8890'
  },
  {
    id: 'notif-4',
    title: 'Ward 14 Cleanliness Milestone 🎉',
    message: 'Citizen reporting helped Ward 14 achieve a 94.2% resolution rate this month. Thank you for making our city safer!',
    timestamp: '2d ago',
    read: true,
    type: 'alert'
  }
];
