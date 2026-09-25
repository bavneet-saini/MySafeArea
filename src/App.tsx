import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppScreen, CivicReport, NotificationItem, ReportStatus, CivicCategory } from './types';
import { INITIAL_REPORTS, INITIAL_NOTIFICATIONS, MUNICIPAL_WARDS } from './data/mockData';

// Components
import { DeviceFrame } from './components/common/DeviceFrame';
import { SplashScreen } from './components/splash/SplashScreen';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { CitizenHomeScreen } from './components/home/CitizenHomeScreen';
import { ReportHubScreen } from './components/report/ReportHubScreen';
import { CameraReportScreen } from './components/report/CameraReportScreen';
import { VoiceReportScreen } from './components/report/VoiceReportScreen';
import { FullMapView } from './components/map/FullMapView';
import { MyReportsScreen } from './components/reports/MyReportsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { AuthorityDashboard } from './components/officer/AuthorityDashboard';
import { ReportDetailModal } from './components/reports/ReportDetailModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';

export function App() {
  // App Navigation State
  const [activeScreen, setActiveScreen] = useState<AppScreen>('splash');
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  // Core Data States
  const [reports, setReports] = useState<CivicReport[]>(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedWard, setSelectedWard] = useState<string>(MUNICIPAL_WARDS[0]);

  // Modals & Sheets
  const [activeDetailReport, setActiveDetailReport] = useState<CivicReport | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Prefilled parameters when navigating to camera scan from hub
  const [cameraScanParams, setCameraScanParams] = useState<{
    photoUrl?: string;
    category?: CivicCategory;
    location?: string;
  }>({});

  // Hub initial reporting method
  const [hubInitialMethod, setHubInitialMethod] = useState<'photo' | 'video' | 'voice' | 'text'>('photo');

  // Handle Splash Complete
  const handleSplashComplete = () => {
    if (hasOnboarded) {
      setActiveScreen('home');
    } else {
      setActiveScreen('welcome');
    }
  };

  // Handle Onboarding Completion
  const handleGetStarted = () => {
    setHasOnboarded(true);
    setActiveScreen('home');
  };

  const handleLogIn = () => {
    setActiveScreen('authority_dashboard');
  };

  // Handle New Report Submission
  const handleReportSubmitted = (newReport: CivicReport) => {
    setReports((prev) => [newReport, ...prev]);

    // Add a real-time notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Report Registered & Dispatched',
      message: `Ticket #${newReport.ticketNumber} for "${newReport.title}" was submitted to ${newReport.department}. Target resolution: <${newReport.slaHours}h.`,
      timestamp: 'Just now',
      read: false,
      type: 'update',
      reportTicket: newReport.ticketNumber,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Show the ticket lifecycle modal directly for immediate gratification
    setActiveDetailReport(newReport);
    setActiveScreen('my_reports');
  };

  // Update Report Status (from Authority or Citizen)
  const handleUpdateReportStatus = (reportId: string, newStatus: ReportStatus) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedTimeline = [...rep.timeline];
          if (newStatus === 'assigned') {
            updatedTimeline.push({
              step: 'Field Crew Dispatched',
              time: 'Just now',
              description: 'Municipal engineering crew allocated and in transit.',
              completed: true,
            });
          } else if (newStatus === 'resolved') {
            updatedTimeline.push({
              step: 'Verified & Marked Resolved',
              time: 'Just now',
              description: 'Municipal supervisor verified repair with photographic evidence.',
              completed: true,
            });
          }

          return {
            ...rep,
            status: newStatus,
            priority: newStatus === 'resolved' ? ('resolved' as const) : rep.priority,
            timeline: updatedTimeline,
          };
        }
        return rep;
      })
    );
  };

  // Upvote Report
  const handleUpvoteReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, votes: r.votes + 1 } : r))
    );
  };

  // Reset Mock Data
  const handleResetData = () => {
    setReports(INITIAL_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveScreen('splash');
  };

  // Notifications Actions
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectTicketFromNotification = (ticket: string) => {
    const found = reports.find((r) => r.ticketNumber === ticket);
    if (found) {
      setActiveDetailReport(found);
    }
  };

  return (
    <DeviceFrame
      activeScreen={activeScreen}
      onNavigate={(s) => setActiveScreen(s)}
      onResetData={handleResetData}
    >
      <AnimatePresence mode="wait">
        {/* ==================================================
            1. APP OPENING ANIMATION (Splash Screen)
           ================================================== */}
        {activeScreen === 'splash' && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {/* ==================================================
            2. WELCOME / ONBOARDING SCREEN
           ================================================== */}
        {activeScreen === 'welcome' && (
          <WelcomeScreen
            key="welcome"
            onGetStarted={handleGetStarted}
            onLogIn={handleLogIn}
          />
        )}

        {/* ==================================================
            3. CITIZEN HOME SCREEN
           ================================================== */}
        {activeScreen === 'home' && (
          <CitizenHomeScreen
            key="home"
            reports={reports}
            selectedWard={selectedWard}
            onSelectWard={setSelectedWard}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadNotificationsCount={notifications.filter((n) => !n.read).length}
            onOpenReportCamera={() => {
              setCameraScanParams({});
              setActiveScreen('camera_report');
            }}
            onOpenReportVoice={() => setActiveScreen('voice_report')}
            onOpenReportHub={(method) => {
              setHubInitialMethod(method || 'photo');
              setActiveScreen('report_hub');
            }}
            onOpenFullMap={() => setActiveScreen('map')}
            onSelectReport={(rep) => setActiveDetailReport(rep)}
            onOpenMyReports={() => setActiveScreen('my_reports')}
          />
        )}

        {/* ==================================================
            4. REPORT A PROBLEM (Hub Screen)
           ================================================== */}
        {activeScreen === 'report_hub' && (
          <ReportHubScreen
            key="report_hub"
            initialMethod={hubInitialMethod}
            selectedWard={selectedWard}
            onBack={() => setActiveScreen('home')}
            onOpenLiveCameraScan={(photoUrl, category, location) => {
              setCameraScanParams({ photoUrl, category, location });
              setActiveScreen('camera_report');
            }}
            onSubmitSuccess={handleReportSubmitted}
          />
        )}

        {/* ==================================================
            5. CAMERA REPORT SCREEN (AI Scan with Laser Line)
           ================================================== */}
        {activeScreen === 'camera_report' && (
          <CameraReportScreen
            key="camera_report"
            onBack={() => setActiveScreen('home')}
            onSubmitSuccess={handleReportSubmitted}
            initialPhotoUrl={cameraScanParams.photoUrl}
            initialCategory={cameraScanParams.category}
            initialLocation={cameraScanParams.location}
          />
        )}

        {/* ==================================================
            6. VOICE REPORT SCREEN
           ================================================== */}
        {activeScreen === 'voice_report' && (
          <VoiceReportScreen
            key="voice_report"
            selectedWard={selectedWard}
            onBack={() => setActiveScreen('home')}
            onSubmitSuccess={handleReportSubmitted}
          />
        )}

        {/* ==================================================
            7. FULL MAP SCREEN
           ================================================== */}
        {activeScreen === 'map' && (
          <FullMapView
            key="map"
            reports={reports}
            selectedWard={selectedWard}
            onSelectReport={(rep) => setActiveDetailReport(rep)}
          />
        )}

        {/* ==================================================
            8. MY REPORTS SCREEN
           ================================================== */}
        {activeScreen === 'my_reports' && (
          <MyReportsScreen
            key="my_reports"
            reports={reports}
            onSelectReport={(rep) => setActiveDetailReport(rep)}
            onOpenNewReport={() => setActiveScreen('report_hub')}
          />
        )}

        {/* ==================================================
            9. PROFILE SCREEN
           ================================================== */}
        {activeScreen === 'profile' && (
          <ProfileScreen
            key="profile"
            selectedWard={selectedWard}
            onReplaySplash={() => setActiveScreen('splash')}
            onSwitchToOfficer={() => setActiveScreen('authority_dashboard')}
          />
        )}

        {/* ==================================================
            10. MUNICIPAL AUTHORITY / OFFICER PORTAL
           ================================================== */}
        {activeScreen === 'authority_dashboard' && (
          <AuthorityDashboard
            key="authority_dashboard"
            reports={reports}
            onBackToCitizen={() => setActiveScreen('home')}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        )}
      </AnimatePresence>

      {/* Ticket Details & Lifecycle Timeline Modal */}
      {activeDetailReport && (
        <ReportDetailModal
          report={activeDetailReport}
          onClose={() => setActiveDetailReport(null)}
          onUpvote={handleUpvoteReport}
        />
      )}

      {/* Citizen Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectTicket={handleSelectTicketFromNotification}
      />
    </DeviceFrame>
  );
}

export default App;
