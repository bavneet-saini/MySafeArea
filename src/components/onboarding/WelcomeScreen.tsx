import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, Shield, Users, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogIn: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onLogIn }) => {
  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between p-6 bg-[#F5F9FC] text-slate-900 overflow-y-auto no-scrollbar select-none">
      {/* Background ambient gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-96 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, rgba(8, 120, 209, 0.18) 0%, rgba(22, 184, 196, 0.08) 50%, transparent 80%)'
        }}
      />

      {/* Top Header: Logo with entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="pt-4 flex flex-col items-center"
      >
        <Logo size="md" showText={true} showTagline={false} />
        <div className="mt-1 flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-[11px] font-semibold text-[#0878D1]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#20B86B] animate-pulse" />
          <span>National Civic Technology Platform</span>
        </div>
      </motion.div>

      {/* City / Community & Road Environment Vector Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="my-auto py-4 flex flex-col items-center justify-center"
      >
        <div className="relative w-full max-w-[280px] h-[190px] rounded-3xl bg-gradient-to-b from-white to-blue-50/50 p-4 shadow-lg shadow-blue-900/5 border border-white/80 overflow-hidden flex items-center justify-center">
          {/* Vector Artwork of City Skyline, Winding Road and Green Park Environment */}
          <svg
            viewBox="0 0 320 220"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sky & Sun */}
            <circle cx="260" cy="50" r="28" fill="#16B8C4" fillOpacity="0.15" />
            <circle cx="260" cy="50" r="16" fill="#1595E7" fillOpacity="0.25" />
            
            {/* Background City Skyline Buildings */}
            <rect x="30" y="60" width="34" height="90" rx="3" fill="#cbd5e1" opacity="0.6" />
            <rect x="75" y="40" width="40" height="110" rx="4" fill="#94a3b8" opacity="0.5" />
            <rect x="130" y="25" width="48" height="125" rx="4" fill="#0878D1" opacity="0.2" />
            <rect x="190" y="50" width="36" height="100" rx="3" fill="#0B2A52" opacity="0.15" />
            <rect x="238" y="70" width="45" height="80" rx="3" fill="#cbd5e1" opacity="0.6" />

            {/* Smart City Sensor Grid Lines */}
            <path d="M 154,25 L 210,15 M 154,45 L 90,30" stroke="#16B8C4" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="210" cy="15" r="3" fill="#16B8C4" />
            <circle cx="90" cy="30" r="3" fill="#20B86B" />

            {/* Building Windows */}
            <rect x="85" y="55" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />
            <rect x="98" y="55" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />
            <rect x="85" y="70" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />
            <rect x="98" y="70" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />
            <rect x="140" y="45" width="8" height="8" rx="1.5" fill="#FFFFFF" opacity="0.9" />
            <rect x="156" y="45" width="8" height="8" rx="1.5" fill="#FFFFFF" opacity="0.9" />
            <rect x="140" y="65" width="8" height="8" rx="1.5" fill="#FFFFFF" opacity="0.9" />
            <rect x="156" y="65" width="8" height="8" rx="1.5" fill="#FFFFFF" opacity="0.9" />

            {/* Green Environment / Park Land */}
            <path
              d="M 0,150 Q 80,135 160,145 T 320,140 L 320,220 L 0,220 Z"
              fill="#20B86B"
              fillOpacity="0.2"
            />
            <path
              d="M 0,165 Q 90,155 180,160 T 320,155 L 320,220 L 0,220 Z"
              fill="#20B86B"
              fillOpacity="0.35"
            />

            {/* Trees in Park */}
            <circle cx="45" cy="148" r="14" fill="#20B86B" opacity="0.9" />
            <rect x="43" y="158" width="4" height="12" fill="#0B2A52" opacity="0.4" />
            <circle cx="275" cy="145" r="16" fill="#16B8C4" opacity="0.8" />
            <rect x="273" y="157" width="4" height="12" fill="#0B2A52" opacity="0.4" />

            {/* Winding Smart Clean Road */}
            <path
              d="M 120,155 Q 160,165 170,185 T 195,220 L 125,220 Q 115,185 105,170 T 120,155 Z"
              fill="#0B2A52"
              opacity="0.85"
            />
            {/* Road Dashed Markings */}
            <path
              d="M 130,165 Q 145,185 158,220"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* Smart Streetlight */}
            <path d="M 90,180 L 90,140 Q 90,130 100,130" stroke="#0878D1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="102" cy="132" r="3" fill="#fbbf24" />
            <circle cx="102" cy="132" r="8" fill="#fbbf24" fillOpacity="0.25" />
          </svg>

          {/* Floating AI active badge */}
          <div className="absolute bottom-3 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-sm border border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#20B86B] animate-ping" />
              <span className="font-semibold text-slate-800">Connected City Grid</span>
            </div>
            <span className="text-[10px] font-bold text-[#0878D1] bg-blue-50 px-2 py-0.5 rounded-full">
              LIVE 24/7
            </span>
          </div>
        </div>

        {/* Short Message as requested */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 text-center px-4"
        >
          <h1 className="text-2xl font-extrabold text-[#0B2A52] tracking-tight leading-tight">
            Stronger Communities.<br />
            <span className="text-[#0878D1]">Safer Tomorrow.</span>
          </h1>
          <p className="mt-2 text-xs text-slate-600 max-w-xs leading-relaxed">
            Report civic hazards with AI-powered instant recognition and direct government department routing.
          </p>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full flex flex-col space-y-3 pb-2"
      >
        {/* Primary Blue [ Get Started ] Button */}
        <button
          onClick={onGetStarted}
          className="w-full h-14 rounded-2xl text-white font-bold text-base shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] hover:opacity-95"
          style={{
            background: 'linear-gradient(135deg, #0878D1 0%, #1595E7 100%)'
          }}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 text-white/90" />
        </button>

        {/* [ Log In ] Button */}
        <button
          onClick={onLogIn}
          className="w-full h-12 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 shadow-sm"
        >
          <LogIn className="w-4 h-4 text-slate-500" />
          <span>Log In / Officer Portal</span>
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-4 pt-1 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#20B86B]" />
            Official Municipal Standard
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#0878D1]" />
            Citizen Centric
          </span>
        </div>
      </motion.div>
    </div>
  );
};
