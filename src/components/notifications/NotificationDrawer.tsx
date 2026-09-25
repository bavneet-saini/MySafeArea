import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectTicket?: (ticket: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectTicket,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-md max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 border border-slate-200"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0878D1] flex items-center justify-center">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B2A52]">Notifications</h3>
              <p className="text-[10px] text-slate-500 font-medium">Real-time civic alerts & status updates</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] font-bold text-[#0878D1] hover:underline"
            >
              Mark read
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-3 no-scrollbar max-h-[60vh]">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.reportTicket && onSelectTicket) {
                  onSelectTicket(n.reportTicket);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                n.read
                  ? 'bg-white border-slate-200/80 text-slate-600'
                  : 'bg-blue-50/60 border-blue-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${n.read ? 'bg-slate-300' : 'bg-[#0878D1] animate-pulse'}`} />
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {n.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed pl-4">
                {n.message}
              </p>

              {n.reportTicket && (
                <div className="mt-2 pl-4 flex items-center justify-between text-[11px] font-semibold text-[#0878D1]">
                  <span>Track Ticket #{n.reportTicket}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
