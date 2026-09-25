import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Building2,
  ThumbsUp,
  Share2,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  FileCheck
} from 'lucide-react';
import { CivicReport } from '../../types';

interface ReportDetailModalProps {
  report: CivicReport | null;
  onClose: () => void;
  onUpvote?: (reportId: string) => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  onClose,
  onUpvote,
}) => {
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [localVotes, setLocalVotes] = useState<number>(report ? report.votes : 0);

  if (!report) return null;

  const handleVote = () => {
    if (!upvoted) {
      setUpvoted(true);
      setLocalVotes((v) => v + 1);
      if (onUpvote) onUpvote(report.id);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-md max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 border border-slate-200"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0B2A52] to-[#0878D1] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#20B86B]" />
            <div>
              <span className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">
                MUNICIPAL TICKET
              </span>
              <h3 className="text-sm font-black tracking-tight">{report.ticketNumber}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 no-scrollbar text-xs">
          {/* Main Title & Priority */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {report.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                report.priority === 'high'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : report.priority === 'medium'
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {report.priority} Priority
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-[#0B2A52] mt-1">
              {report.title}
            </h2>

            <p className="mt-1 text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0878D1] flex-shrink-0" />
              <span>{report.location} • {report.ward}</span>
            </p>
          </div>

          {/* Photo Preview if available */}
          {report.imageUrl && (
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={report.imageUrl}
                alt={report.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#16B8C4]" />
                <span>AI Vision Confirmed ({report.aiConfidence}%)</span>
              </div>
            </div>
          )}

          {/* Issue Description */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Citizen Description
            </h4>
            <p className="text-slate-700 leading-relaxed font-medium">
              {report.description}
            </p>
          </div>

          {/* Municipal Routing Box */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
              <span className="text-[10px] text-slate-500 font-semibold block">Handling Department</span>
              <span className="font-extrabold text-[#0B2A52] block mt-0.5 truncate">
                {report.department}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold block">Target SLA</span>
              <span className="font-extrabold text-slate-800 block mt-0.5">
                &lt; {report.slaHours} Hours
              </span>
            </div>
          </div>

          {/* ==================================================
              COMPLETE LIFECYCLE TIMELINE
             ================================================== */}
          <div>
            <h4 className="text-xs font-black text-[#0B2A52] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#0878D1]" />
              <span>Resolution Lifecycle Timeline</span>
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {report.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  {/* Step Dot */}
                  <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    event.completed
                      ? 'bg-[#20B86B] border-white shadow text-white'
                      : 'bg-white border-slate-300'
                  }`}>
                    {event.completed && <CheckCircle2 className="w-3 h-3" />}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h5 className={`font-bold text-xs ${event.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                        {event.step}
                      </h5>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Support & Upvotes */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={handleVote}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 font-bold text-xs transition-all ${
                upvoted
                  ? 'bg-blue-50 border-[#0878D1] text-[#0878D1]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${upvoted ? 'fill-current' : ''}`} />
              <span>{upvoted ? 'Supported' : 'Support this Issue'} ({localVotes})</span>
            </button>

            <button
              onClick={() => alert(`Municipal Ticket ${report.ticketNumber} link copied to clipboard!`)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Share Ticket"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
