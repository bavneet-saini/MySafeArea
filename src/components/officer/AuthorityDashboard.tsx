import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Users,
  Building,
  RefreshCw,
  Sparkles,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { CivicReport, Priority, ReportStatus } from '../../types';

interface AuthorityDashboardProps {
  reports: CivicReport[];
  onBackToCitizen: () => void;
  onUpdateReportStatus: (reportId: string, newStatus: ReportStatus) => void;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({
  reports,
  onBackToCitizen,
  onUpdateReportStatus,
}) => {
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const departments = [
    'all',
    'Public Works Department (PWD)',
    'Municipal Electrical Board',
    'Solid Waste Management (SWM)',
    'Water Supply & Sewerage Board',
  ];

  const filteredReports = reports.filter((r) => {
    if (filterDepartment !== 'all' && r.department !== filterDepartment) return false;
    return true;
  });

  const handleQuickStatusChange = (id: string, status: ReportStatus) => {
    setUpdatingId(id);
    setTimeout(() => {
      onUpdateReportStatus(id, status);
      setUpdatingId(null);
    }, 400);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#0B2A52] text-white overflow-y-auto no-scrollbar pb-20 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#0B2A52]/95 backdrop-blur-md px-5 py-3 border-b border-blue-900/60 flex items-center justify-between">
        <button
          onClick={onBackToCitizen}
          className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors text-blue-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Citizen View</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#20B86B] animate-pulse" />
            MUNICIPAL COMMAND
          </span>
          <span className="text-[10px] text-blue-200">Zonal Operations Portal</span>
        </div>

        <div className="w-12 text-right">
          <span className="text-[10px] font-mono bg-blue-950 px-2 py-1 rounded text-cyan-300 border border-blue-800">
            OFFICER
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-5 space-y-5">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] text-blue-200 font-semibold block">Total Live Reports</span>
            <span className="text-xl font-black text-white mt-1 block">{reports.length}</span>
            <span className="text-[10px] text-emerald-400 font-medium">98.2% AI Auto-Classified</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] text-blue-200 font-semibold block">Critical High-Urgency</span>
            <span className="text-xl font-black text-red-400 mt-1 block">
              {reports.filter((r) => r.priority === 'high' && r.status !== 'resolved').length}
            </span>
            <span className="text-[10px] text-amber-300 font-medium">Dispatch SLA &lt; 24h</span>
          </div>
        </div>

        {/* Filter by Municipal Department */}
        <div>
          <label className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block mb-1.5">
            Filter Municipal Department:
          </label>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white focus:outline-none"
          >
            {departments.map((d) => (
              <option key={d} value={d} className="bg-slate-900 text-white">
                {d === 'all' ? 'All Departments (Combined Queue)' : d}
              </option>
            ))}
          </select>
        </div>

        {/* Real-Time Queue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#16B8C4]" />
              <span>AI Triage Dispatch Queue</span>
            </h3>
            <span className="text-[10px] font-mono text-blue-200">
              {filteredReports.length} Active Items
            </span>
          </div>

          {filteredReports.map((rep) => (
            <div
              key={rep.id}
              className="bg-white rounded-2xl p-4 text-slate-900 shadow-lg border border-slate-100 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {rep.ticketNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      rep.priority === 'high'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : rep.priority === 'medium'
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {rep.priority}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-[#0B2A52] mt-0.5">
                    {rep.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {rep.location} • {rep.ward}
                  </p>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0878D1] border border-blue-200">
                  {rep.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Department & SLA details */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Dept:</span>
                  <span className="font-bold text-slate-800">{rep.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AI Confidence:</span>
                  <span className="font-extrabold text-[#20B86B]">{rep.aiConfidence}%</span>
                </div>
              </div>

              {/* Authority Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {rep.status !== 'assigned' && rep.status !== 'resolved' && (
                  <button
                    disabled={updatingId === rep.id}
                    onClick={() => handleQuickStatusChange(rep.id, 'assigned')}
                    className="py-2 px-3 rounded-xl bg-[#0878D1] hover:bg-[#076bc0] text-white font-bold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Dispatch Field Crew</span>
                  </button>
                )}

                {rep.status !== 'resolved' ? (
                  <button
                    disabled={updatingId === rep.id}
                    onClick={() => handleQuickStatusChange(rep.id, 'resolved')}
                    className="py-2 px-3 rounded-xl bg-[#20B86B] hover:bg-[#1a9a58] text-white font-bold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                ) : (
                  <div className="col-span-2 py-1.5 rounded-xl bg-emerald-50 text-[#20B86B] font-bold text-xs text-center border border-emerald-200 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified & Resolved</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
