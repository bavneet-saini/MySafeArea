import React from 'react';
import {
  User,
  ShieldCheck,
  Award,
  Play,
  Briefcase,
  PhoneCall,
  Globe,
  Settings,
  ChevronRight,
  HeartHandshake,
  ExternalLink
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface ProfileScreenProps {
  onReplaySplash: () => void;
  onSwitchToOfficer: () => void;
  selectedWard: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onReplaySplash,
  onSwitchToOfficer,
  selectedWard,
}) => {
  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#F5F9FC] text-slate-900 overflow-y-auto no-scrollbar pb-24 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#F5F9FC]/95 backdrop-blur-md px-5 pt-4 pb-3 border-b border-slate-200/60 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#0B2A52] tracking-tight">
            Citizen Profile
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            Verified Community Contributor
          </p>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#20B86B] text-[10px] font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Citizen</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-5 space-y-5">
        {/* Citizen ID Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0B2A52] to-[#0878D1] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              RK
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#20B86B] border-2 border-white flex items-center justify-center text-white">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-[#0B2A52] truncate">
              Rohan Kulkarni
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate">
              Resident • {selectedWard}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-extrabold text-[#0878D1] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Civic Trust Score: 98%
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Tier 1 Contributor
              </span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-base font-black text-[#0B2A52]">18</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Issues Fixed</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-base font-black text-[#0878D1]">1,240+</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Citizens Aided</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-base font-black text-[#20B86B]">Top 3%</span>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Ward Rank</span>
          </div>
        </div>

        {/* Competition & Demo Tools */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-3xl p-4 border border-blue-100 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0878D1]" />
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2A52]">
              Competition Evaluator Controls
            </h4>
          </div>

          <p className="text-[11px] text-slate-600 leading-normal">
            Designed for national civic technology competitions. Replay introductory sequence or view municipal dispatcher backend.
          </p>

          <div className="space-y-2 pt-1">
            {/* Replay Splash Animation */}
            <button
              onClick={onReplaySplash}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-blue-200 text-[#0878D1] font-bold text-xs flex items-center justify-between shadow-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Replay App Opening Animation (Splash)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Switch to Municipal Authority Portal */}
            <button
              onClick={onSwitchToOfficer}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0B2A52] hover:bg-[#081e3b] text-white font-bold text-xs flex items-center justify-between shadow-sm transition-colors"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-[#16B8C4]" />
                <span>Switch to Municipal Authority Portal</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          </div>
        </div>

        {/* Emergency Civic Helplines */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2.5">
          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-red-500" />
            <span>Emergency Civic Helplines</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="tel:112"
              className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-bold text-slate-800 hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              <span>National Emergency</span>
              <span className="text-red-600 font-mono">112</span>
            </a>
            <a
              href="tel:1916"
              className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-bold text-slate-800 hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <span>Civic Control Room</span>
              <span className="text-[#0878D1] font-mono">1916</span>
            </a>
          </div>
        </div>

        {/* Official Application Watermark */}
        <div className="text-center pt-2">
          <Logo size="xs" showText={true} showTagline={true} />
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            v2.4.0-SmartCity • Built with Government AI Standards
          </p>
        </div>
      </main>
    </div>
  );
};
