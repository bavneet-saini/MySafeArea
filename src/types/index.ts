export type Priority = 'high' | 'medium' | 'low' | 'resolved';

export type ReportStatus = 'under_review' | 'assigned' | 'in_progress' | 'resolved';

export type CivicCategory = 
  | 'Road Infrastructure' 
  | 'Street Lighting' 
  | 'Sanitation & Waste' 
  | 'Water Supply' 
  | 'Public Safety' 
  | 'Parks & Greenery';

export type ReportMethod = 'photo' | 'video' | 'voice' | 'text';

export interface TimelineEvent {
  step: string;
  time: string;
  description: string;
  completed: boolean;
  officerNote?: string;
}

export interface CivicReport {
  id: string;
  ticketNumber: string;
  title: string;
  category: CivicCategory;
  priority: Priority;
  status: ReportStatus;
  location: string;
  ward: string;
  coordinates: [number, number]; // lat, lng
  timestamp: string;
  description: string;
  imageUrl?: string;
  method: ReportMethod;
  votes: number;
  aiConfidence: number;
  department: string;
  slaHours: number;
  assignedOfficer?: string;
  resolutionPhoto?: string;
  timeline: TimelineEvent[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'update' | 'alert' | 'resolution';
  reportTicket?: string;
}

export type AppScreen = 
  | 'splash'
  | 'welcome'
  | 'home'
  | 'report_hub'
  | 'camera_report'
  | 'voice_report'
  | 'map'
  | 'my_reports'
  | 'profile'
  | 'authority_dashboard';

export type UserRole = 'citizen' | 'officer';
