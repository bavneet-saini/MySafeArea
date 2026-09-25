import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Bell,
  Camera,
  Mic,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  Video,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { CivicReport, Priority, ReportStatus } from '../../types';
import { HomeMapPreview } from './HomeMapPreview';
import { MUNICIPAL_WARDS } from '../../data/mockData';

interface CitizenHomeScreenProps {
  reports: CivicReport[];
  selectedWard: string;
  onSelectWard: (ward: string) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onOpenReportCamera: () => void;
  onOpenReportVoice: () => void;
  onOpenReportHub: (method?: 'photo' | 'video' | 'voice' | 'text') => void;
  onOpenFullMap: () => void;
  onSelectReport: (report: CivicReport) => void;
  onOpenMyReports: () => void;
}

export const CitizenHomeScreen: React.FC<CitizenHomeScreenProps> = ({
  reports,
  selectedWard,
  onSelectWard,
  onOpenNotifications,
  unreadNotificationsCount,
  onOpenReportCamera,
  onOpenReportVoice,
  onOpenReportHub,
  onOpenFullMap,
  onSelectReport,
  onOpenMyReports,
}) => {
  const [showWardPicker, setShowWardPicker] = useState<boolean>(false);

  // Status badge styling helper
  const getStatusBadge = (status: ReportStatus, priority: Priority) => {
    switch (status) {
      case 'under_review':
        return {
          label: 'Under Review',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'assigned':
        return {
          label: 'Assigned',
          bg: 'bg-blue-50 text-[#0878D1] border-blue-200',
          dot: 'bg-[#0878D1]'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500'
        };
      case 'resolved':
        return {
          label: 'Resolved',
          bg: 'bg-emerald-50 text-[#20B86B] border-emerald-200',
          dot: 'bg-[#20B86B]'
        };
      default:
        return {
          label: status,
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
    }
  };

  const getPriorityPill = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Medium Priority
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Low Priority
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#20B86B]" />
            Resolved
          </span>
        );
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#F5F9FC] text-slate-900 overflow-y-auto no-scrollbar pb-24 select-none">
      {/* ==================================================
          TOP SECTION
         ================================================== */}
      <header className="sticky top-0 z-30 bg-[#F5F9FC]/90 backdrop-blur-md px-5 pt-4 pb-3 border-b border-slate-200/60 flex items-center justify-between">
        {/* Current Selected Area Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowWardPicker(!showWardPicker)}
            className="flex items-center space-x-1.5 bg-white/90 hover:bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-all text-left"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0878D1] flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-medium leading-none">Reporting In</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 max-w-[130px] truncate">
                  {selectedWard}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </button>

          {/* Ward Picker Dropdown */}
          {showWardPicker && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
            >
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Municipal Ward
              </div>
              {MUNICIPAL_WARDS.map((ward) => (
                <button
                  key={ward}
                  onClick={() => {
                    onSelectWard(ward);
                    setShowWardPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedWard === ward
                      ? 'bg-blue-50 text-[#0878D1] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{ward}</span>
                  {selectedWard === ward && <CheckCircle2 className="w-3.5 h-3.5 text-[#0878D1]" />}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Brand Micro Mark & Notification Bell */}
        <div className="flex items-center space-x-2">
          {/* AI Active Indicator */}
          <div className="hidden xs:flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-[11px] font-semibold text-[#20B86B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B86B] animate-pulse" />
            <span>AI Ready</span>
          </div>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-5 space-y-6">
        {/* ==================================================
            MAIN CARD: "Report a Problem"
           ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0B2A52 0%, #0878D1 80%, #1595E7 100%)',
          }}
        >
          {/* Subtle civic circuit background artwork */}
          <div className="absolute right-0 top-0 bottom-0 w-44 pointer-events-none opacity-20">
            <svg viewBox="0 0 160 200" fill="none" className="w-full h-full">
              <circle cx="120" cy="50" r="40" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 120,50 L 50,110 L 20,110" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="20" cy="110" r="6" fill="#16B8C4" />
              <path d="M 50,110 L 80,160 L 140,160" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="140" cy="160" r="6" fill="#20B86B" />
            </svg>
          </div>

          {/* Card Header */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-blue-100 mb-2 border border-white/10">
              <Sparkles className="w-3 h-3 text-[#16B8C4]" />
              <span>Smart Civic Assistant</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Report a Problem
            </h2>
            <p className="mt-1 text-sm text-blue-100 font-normal leading-snug max-w-[270px]">
              Help make your community safer and cleaner.
            </p>
          </div>

          {/* TWO LARGE ACTION BUTTONS AS REQUIRED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 relative z-10">
            {/* [ 📷 Report with Camera ] */}
            <button
              onClick={onOpenReportCamera}
              className="h-14 px-4 rounded-2xl bg-white text-[#0B2A52] font-bold text-sm shadow-md hover:bg-blue-50 transition-all flex items-center justify-center space-x-2.5 active:scale-[0.98] group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-[#0878D1] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Camera className="w-4.5 h-4.5" />
              </div>
              <span className="font-extrabold tracking-tight">Report with Camera</span>
            </button>

            {/* [ 🎤 Report with Voice ] */}
            <button
              onClick={onOpenReportVoice}
              className="h-14 px-4 rounded-2xl bg-[#0B2A52]/80 hover:bg-[#0B2A52] border border-white/20 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2.5 active:scale-[0.98] group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#20B86B] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mic className="w-4.5 h-4.5" />
              </div>
              <span className="font-extrabold tracking-tight">Report with Voice</span>
            </button>
          </div>

          {/* Quick methods access link */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
            <span className="font-medium">More options:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenReportHub('video')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
              >
                <Video className="w-3 h-3" /> Video
              </button>
              <button
                onClick={() => onOpenReportHub('text')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
              >
                <FileText className="w-3 h-3" /> Text
              </button>
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            VIEW PROBLEMS AROUND YOU (Interactive Map Preview)
           ================================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#0B2A52] tracking-tight">
                View Problems Around You
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Live geotagged reports in {selectedWard.split('•')[0]}
              </p>
            </div>
            <button
              onClick={onOpenFullMap}
              className="text-xs font-bold text-[#0878D1] hover:underline flex items-center gap-0.5"
            >
              <span>See All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Map Component */}
          <HomeMapPreview
            reports={reports}
            onOpenFullMap={onOpenFullMap}
            onSelectReport={onSelectReport}
          />
        </section>

        {/* ==================================================
            YOUR RECENT REPORTS
           ================================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#0B2A52] tracking-tight">
                Your Recent Reports
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Real-time municipal tracking and dispatch
              </p>
            </div>
            <button
              onClick={onOpenMyReports}
              className="text-xs font-bold text-[#0878D1] hover:underline flex items-center gap-0.5"
            >
              <span>History ({reports.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List of Recent Reports */}
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => {
              const statusBadge = getStatusBadge(report.status, report.priority);
              return (
                <motion.div
                  key={report.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectReport(report)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  {/* Left: Thumbnail or Category Icon */}
                  <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/60 relative">
                    {report.imageUrl ? (
                      <img
                        src={report.imageUrl}
                        alt={report.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#0878D1]">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    {/* Method badge */}
                    <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white p-0.5 rounded text-[9px]">
                      {report.method === 'photo' && <Camera className="w-2.5 h-2.5" />}
                      {report.method === 'voice' && <Mic className="w-2.5 h-2.5" />}
                      {report.method === 'text' && <FileText className="w-2.5 h-2.5" />}
                      {report.method === 'video' && <Video className="w-2.5 h-2.5" />}
                    </span>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {report.title}
                      </h4>
                      {getPriorityPill(report.priority)}
                    </div>

                    <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{report.location}</span>
                    </p>

                    <div className="flex items-center gap-3 mt-1.5">
                      {/* Status indicator */}
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                        {statusBadge.label}
                      </span>

                      {/* Time */}
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <div className="text-slate-400 pr-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Civic Quick Facts / National Competition Callout */}
        <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-50 to-teal-50/50 border border-blue-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0878D1]/10 text-[#0878D1] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[#0878D1]" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#0B2A52]">AI Autonomous Civic Dispatch</h5>
            <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
              Reports are classified and forwarded directly to municipal departmental workflows in &lt;1.2 seconds.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
