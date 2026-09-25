import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  MapPin,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Mic,
  Video,
  Plus
} from 'lucide-react';
import { CivicReport, Priority, ReportStatus } from '../../types';

interface MyReportsScreenProps {
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
  onOpenNewReport: () => void;
}

export const MyReportsScreen: React.FC<MyReportsScreenProps> = ({
  reports,
  onSelectReport,
  onOpenNewReport,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReports = reports.filter((rep) => {
    if (statusFilter === 'all') return true;
    return rep.status === statusFilter;
  });

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'under_review':
        return { label: 'Under Review', bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
      case 'assigned':
        return { label: 'Assigned', bg: 'bg-blue-50 text-[#0878D1] border-blue-200', dot: 'bg-[#0878D1]' };
      case 'in_progress':
        return { label: 'In Progress', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' };
      case 'resolved':
        return { label: 'Resolved', bg: 'bg-emerald-50 text-[#20B86B] border-emerald-200', dot: 'bg-[#20B86B]' };
      default:
        return { label: status, bg: 'bg-slate-50 text-slate-700', dot: 'bg-slate-400' };
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#F5F9FC] text-slate-900 overflow-y-auto no-scrollbar pb-24 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#F5F9FC]/95 backdrop-blur-md px-5 pt-4 pb-3 border-b border-slate-200/60 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B2A52] tracking-tight">
            My Reports
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            Active tracking & verification lifecycle
          </p>
        </div>

        <button
          onClick={onOpenNewReport}
          className="h-9 px-3 rounded-xl bg-[#0878D1] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#076bc0] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Report</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="p-5 space-y-4">
        {/* Statistics Bar */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-lg font-black text-[#0B2A52]">{reports.length}</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Total Filed</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-lg font-black text-[#0878D1]">
              {reports.filter((r) => r.status === 'under_review' || r.status === 'assigned').length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">In Pipeline</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-lg font-black text-[#20B86B]">
              {reports.filter((r) => r.status === 'resolved').length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Resolved</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'assigned', label: 'Assigned' },
            { id: 'resolved', label: 'Resolved' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === pill.id
                  ? 'bg-[#0B2A52] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const badge = getStatusBadge(report.status);
            return (
              <motion.div
                key={report.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectReport(report)}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                {/* Left: Image / Method */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/80 relative">
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
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white p-0.5 rounded text-[8px]">
                    {report.method === 'photo' && <Camera className="w-2.5 h-2.5" />}
                    {report.method === 'voice' && <Mic className="w-2.5 h-2.5" />}
                    {report.method === 'text' && <FileText className="w-2.5 h-2.5" />}
                    {report.method === 'video' && <Video className="w-2.5 h-2.5" />}
                  </span>
                </div>

                {/* Middle: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {report.ticketNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      report.priority === 'high' ? 'bg-red-50 text-red-600' : report.priority === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-[#20B86B]'
                    }`}>
                      {report.priority}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {report.title}
                  </h4>

                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span>{report.location}</span>
                  </p>

                  <div className="flex items-center gap-3 mt-1.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>

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
      </main>
    </div>
  );
};
