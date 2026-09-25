import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  MapPin,
  Clock,
  Shield,
  Send,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Building2,
  Share2
} from 'lucide-react';
import { CivicReport, Priority, CivicCategory } from '../../types';
import { SAMPLE_CIVIC_PHOTOS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface CameraReportScreenProps {
  onBack: () => void;
  onSubmitSuccess: (newReport: CivicReport) => void;
  initialPhotoUrl?: string;
  initialCategory?: CivicCategory;
  initialLocation?: string;
}

export const CameraReportScreen: React.FC<CameraReportScreenProps> = ({
  onBack,
  onSubmitSuccess,
  initialPhotoUrl,
  initialCategory,
  initialLocation,
}) => {
  // Current active image
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(initialPhotoUrl || null);

  // Analysis States
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanStep, setScanStep] = useState<number>(0);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePhoto = customPhotoUrl
    ? {
        name: 'Pothole detected',
        category: initialCategory || ('Road Infrastructure' as CivicCategory),
        priority: 'high' as Priority,
        defaultLocation: initialLocation || 'Main Road, near ABC School',
        ward: 'Ward 14 • Metro Central',
        confidence: 98.4,
        department: 'Public Works Department (PWD)',
        slaHours: 24,
        description: 'Pothole detected on roadway. Crater depth posing risk to two-wheelers and passenger vehicles.',
        url: customPhotoUrl,
      }
    : SAMPLE_CIVIC_PHOTOS[selectedPhotoIndex];

  // AI Step Simulation
  useEffect(() => {
    setIsScanning(true);
    setScanStep(0);
    setAnalysisComplete(false);

    const step1 = setTimeout(() => setScanStep(1), 500); // Object detected
    const step2 = setTimeout(() => setScanStep(2), 1000); // Civic issue identified
    const step3 = setTimeout(() => setScanStep(3), 1500); // Location identified
    const step4 = setTimeout(() => setScanStep(4), 1900); // Priority estimated

    const finish = setTimeout(() => {
      setIsScanning(false);
      setAnalysisComplete(true);
    }, 2200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(finish);
    };
  }, [selectedPhotoIndex, customPhotoUrl]);

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dispatch report
  const handleConfirmAndDispatch = () => {
    // Confetti celebration
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0878D1', '#16B8C4', '#20B86B', '#FFD700']
    });

    const ticketNumber = `MSA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: CivicReport = {
      id: `rep-${Date.now()}`,
      ticketNumber,
      title: activePhoto.name,
      category: activePhoto.category,
      priority: activePhoto.priority,
      status: 'under_review',
      location: activePhoto.defaultLocation,
      ward: activePhoto.ward,
      coordinates: [12.9716 + (Math.random() - 0.5) * 0.008, 77.5946 + (Math.random() - 0.5) * 0.008],
      timestamp: 'Just now',
      description: activePhoto.description,
      imageUrl: activePhoto.url,
      method: 'photo',
      votes: 1,
      aiConfidence: activePhoto.confidence,
      department: activePhoto.department,
      slaHours: activePhoto.slaHours,
      timeline: [
        {
          step: 'Report Filed by Citizen',
          time: 'Just now',
          description: 'Captured via MySafeArea AI Camera with GPS timestamping.',
          completed: true,
        },
        {
          step: 'AI Computer Vision Analysis',
          time: 'Just now',
          description: `${activePhoto.name} verified with ${activePhoto.confidence}% confidence. Routed to ${activePhoto.department}.`,
          completed: true,
        },
        {
          step: 'Municipal Dispatch Queue',
          time: 'Processing',
          description: `Dispatched to ${activePhoto.ward} zonal inspection team. SLA: ${activePhoto.slaHours} hours.`,
          completed: false,
        }
      ]
    };

    onSubmitSuccess(newReport);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#F5F9FC] text-slate-900 overflow-y-auto no-scrollbar pb-20 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#F5F9FC]/95 backdrop-blur-md px-5 py-3 border-b border-slate-200/60 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-black text-[#0B2A52] tracking-tight">AI CAMERA SCAN</span>
          <span className="text-[10px] text-slate-500 font-medium">Real-Time Computer Vision</span>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-[#0878D1] shadow-sm flex items-center justify-center hover:bg-blue-100 transition-colors"
          title="Upload Photo"
        >
          <Upload className="w-4.5 h-4.5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </header>

      {/* Main Content */}
      <main className="p-5 space-y-5">
        {/* Sample preset selector buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
            Presets:
          </span>
          {SAMPLE_CIVIC_PHOTOS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setCustomPhotoUrl(null);
                setSelectedPhotoIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                !customPhotoUrl && selectedPhotoIndex === idx
                  ? 'bg-[#0878D1] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* IMAGE DISPLAY CONTAINER (Prominent as specified in Section 6) */}
        <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-slate-900 flex items-center justify-center">
          <img
            src={activePhoto.url}
            alt={activePhoto.name}
            className="w-full h-full object-cover select-none"
          />

          {/* AI SCANNING OVERLAY & LASER LINE */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Cyan / Blue Scan Grid */}
              <div 
                className="w-full h-full opacity-30"
                style={{
                  backgroundImage: `linear-gradient(rgba(22, 184, 196, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 184, 196, 0.4) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Glowing vertical animated scanning line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#16B8C4] to-transparent shadow-[0_0_15px_#16B8C4] animate-ai-scan">
                <div className="w-12 h-3 bg-[#20B86B]/80 mx-auto blur-xs -translate-y-1 rounded-full" />
              </div>

              {/* Scanning status banner */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#16B8C4] animate-ping" />
                  <span>Analyzing image…</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                  YOLO-v11 CIVIC
                </div>
              </div>

              {/* Corner targeting brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#16B8C4] rounded-tl" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#16B8C4] rounded-tr" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#16B8C4] rounded-bl" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#16B8C4] rounded-br" />
            </div>
          )}

          {/* AI TARGET BOUNDING BOX (Shows when analysis completes) */}
          {analysisComplete && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-8 border-2 border-dashed border-[#20B86B] rounded-2xl pointer-events-none flex flex-col justify-between p-2"
            >
              <div className="self-start px-2 py-0.5 rounded-md bg-[#20B86B] text-white text-[10px] font-black uppercase tracking-wider shadow">
                {activePhoto.name} ({activePhoto.confidence}%)
              </div>
              <div className="self-end px-2 py-0.5 rounded-md bg-[#0B2A52]/90 text-white text-[10px] font-mono">
                BBOX: [320, 220, 140, 70]
              </div>
            </motion.div>
          )}

          {/* Bottom Photo Metadata Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-medium text-white/90 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#16B8C4]" />
              GPS Locked
            </span>
            <span>EXIF 2026 • Municipal Geo-stamp</span>
          </div>
        </div>

        {/* AI SCANNING STATUS CHECKLIST (Section 6 exact requirement) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0878D1]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Civic AI Diagnostic Pipeline
              </h4>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              analysisComplete ? 'bg-emerald-50 text-[#20B86B]' : 'bg-blue-50 text-[#0878D1]'
            }`}>
              {analysisComplete ? 'Verification Complete' : 'Processing...'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Step 1: Object detected */}
            <div className={`p-2 rounded-xl border flex items-center space-x-2 transition-all ${
              scanStep >= 1 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${scanStep >= 1 ? 'text-[#20B86B]' : 'text-slate-300'}`} />
              <span className="font-semibold text-[11px]">Object detected</span>
            </div>

            {/* Step 2: Civic issue identified */}
            <div className={`p-2 rounded-xl border flex items-center space-x-2 transition-all ${
              scanStep >= 2 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${scanStep >= 2 ? 'text-[#20B86B]' : 'text-slate-300'}`} />
              <span className="font-semibold text-[11px]">Civic issue identified</span>
            </div>

            {/* Step 3: Location identified */}
            <div className={`p-2 rounded-xl border flex items-center space-x-2 transition-all ${
              scanStep >= 3 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${scanStep >= 3 ? 'text-[#20B86B]' : 'text-slate-300'}`} />
              <span className="font-semibold text-[11px]">Location identified</span>
            </div>

            {/* Step 4: Priority estimated */}
            <div className={`p-2 rounded-xl border flex items-center space-x-2 transition-all ${
              scanStep >= 4 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${scanStep >= 4 ? 'text-[#20B86B]' : 'text-slate-300'}`} />
              <span className="font-semibold text-[11px]">Priority estimated</span>
            </div>
          </div>
        </div>

        {/* AI ANALYSIS RESULTS CARD (Section 6 exact requirement) */}
        <AnimatePresence>
          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4"
            >
              {/* Main Result Headline */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Detection Result
                  </span>
                  <h3 className="text-xl font-black text-[#0B2A52] tracking-tight">
                    “{activePhoto.name}”
                  </h3>
                </div>

                <div className="px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200 text-[#0878D1] text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activePhoto.confidence}% Match</span>
                </div>
              </div>

              {/* Required Breakdown Grid: Category, Priority, Location */}
              <div className="space-y-3 pt-1 border-t border-slate-100 text-xs">
                {/* Category */}
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-semibold">Category:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#0878D1]" />
                    {activePhoto.category}
                  </span>
                </div>

                {/* Priority */}
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-semibold">Priority:</span>
                  <span className="font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {activePhoto.priority.toUpperCase()}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-semibold flex-shrink-0">Location:</span>
                  <span className="font-bold text-slate-800 text-right flex items-center gap-1 ml-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{activePhoto.defaultLocation}</span>
                  </span>
                </div>

                {/* Routed Municipal Department */}
                <div className="flex items-center justify-between p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-slate-600 font-semibold">Routed Department:</span>
                  <span className="font-extrabold text-[#0B2A52]">
                    {activePhoto.department}
                  </span>
                </div>

                {/* SLA Resolution Target */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#20B86B]" />
                    Target Resolution SLA
                  </span>
                  <span className="font-bold text-slate-700">
                    &lt; {activePhoto.slaHours} Hours
                  </span>
                </div>
              </div>

              {/* Action Buttons: Confirm & Dispatch */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleConfirmAndDispatch}
                  className="w-full h-14 rounded-2xl text-white font-extrabold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] hover:opacity-95"
                  style={{
                    background: 'linear-gradient(135deg, #0878D1 0%, #1595E7 100%)',
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Confirm & Dispatch to Municipal Dept</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Shield className="w-3.5 h-3.5 text-[#20B86B]" />
                  <span>Verified Citizen Report • Official Municipal Workflow</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
