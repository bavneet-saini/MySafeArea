import React, { useState } from 'react';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  Home,
  Map,
  FileText,
  User,
  Camera,
  Layers
} from 'lucide-react';
import { AppScreen } from '../../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onResetData: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeScreen,
  onNavigate,
  onResetData,
}) => {
  const [isFramed, setIsFramed] = useState<boolean>(true);

  // Bottom navigation items
  const navItems: Array<{ screen: AppScreen; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { screen: 'home', label: 'Home', icon: Home },
    { screen: 'map', label: 'Map', icon: Map },
    { screen: 'my_reports', label: 'My Reports', icon: FileText },
    { screen: 'profile', label: 'Profile', icon: User },
  ];

  const showBottomNav = ['home', 'map', 'my_reports', 'profile'].includes(activeScreen);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-start sm:p-4 md:p-6 overflow-x-hidden font-sans">
      {/* Top Demo Bar for Evaluators & Competition Judges */}
      <div className="w-full max-w-5xl mb-3 flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#20B86B] animate-pulse" />
          <span className="font-extrabold text-white tracking-wide">MySafeArea AI</span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            • Civic Tech Prototype
          </span>
        </div>

        {/* Quick Screen Navigation Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1 hidden md:inline">
            Screens:
          </span>
          <button
            onClick={() => onNavigate('splash')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              activeScreen === 'splash' ? 'bg-[#0878D1] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Splash (Intro)
          </button>
          <button
            onClick={() => onNavigate('welcome')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              activeScreen === 'welcome' ? 'bg-[#0878D1] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Welcome
          </button>
          <button
            onClick={() => onNavigate('home')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              activeScreen === 'home' ? 'bg-[#0878D1] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('camera_report')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              activeScreen === 'camera_report' ? 'bg-[#0878D1] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            AI Camera Scan
          </button>
          <button
            onClick={() => onNavigate('map')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              activeScreen === 'map' ? 'bg-[#0878D1] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => onNavigate('authority_dashboard')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
              activeScreen === 'authority_dashboard' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
            }`}
          >
            Authority Portal
          </button>
        </div>

        {/* View Mode & Reset Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFramed(!isFramed)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5 transition-colors text-[11px]"
            title={isFramed ? 'Switch to Full Screen View' : 'Switch to Phone Frame View'}
          >
            {isFramed ? <Maximize2 className="w-3.5 h-3.5 text-[#16B8C4]" /> : <Smartphone className="w-3.5 h-3.5 text-[#16B8C4]" />}
            <span>{isFramed ? 'Full View' : 'Phone Frame'}</span>
          </button>

          <button
            onClick={onResetData}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset Mock Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Frame */}
      <div
        className={`w-full transition-all duration-300 flex items-center justify-center ${
          isFramed
            ? 'max-w-[420px] rounded-[48px] p-3 bg-slate-800/90 shadow-[0_25px_70px_rgba(0,0,0,0.8)] border-[6px] border-slate-700 ring-1 ring-white/10'
            : 'max-w-2xl min-h-screen rounded-none p-0'
        }`}
      >
        {/* Phone Glass Inner Screen */}
        <div className="relative w-full h-[844px] max-h-[92vh] bg-[#F5F9FC] rounded-[38px] overflow-hidden flex flex-col shadow-inner">
          {/* Status Bar */}
          <div className="w-full h-11 bg-transparent px-7 flex items-center justify-between text-slate-800 text-xs font-semibold z-40 select-none pointer-events-none">
            {/* Clock */}
            <span className="font-bold tracking-tight">09:41</span>

            {/* Dynamic Island / Speaker Notch */}
            <div className="w-24 h-5 bg-slate-900 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
            </div>

            {/* Telemetry Icons */}
            <div className="flex items-center space-x-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5 fill-current" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Active Screen Slot */}
          <div className="flex-1 w-full overflow-hidden relative">
            {children}
          </div>

          {/* ==================================================
              BOTTOM NAVIGATION BAR (When on main citizen views)
              Home | Map | My Reports | Profile
             ================================================== */}
          {showBottomNav && (
            <nav className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2 z-40 flex items-center justify-around select-none">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.screen;
                return (
                  <button
                    key={item.screen}
                    onClick={() => onNavigate(item.screen)}
                    className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
                      isActive ? 'text-[#0878D1]' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                    <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-black' : 'font-semibold'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 w-3 h-1 rounded-full bg-[#0878D1]" />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* iOS Bottom Swipe Indicator Bar */}
          <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-50">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
