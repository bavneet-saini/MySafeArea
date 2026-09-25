import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Square,
  ArrowLeft,
  Volume2,
  Sparkles,
  CheckCircle2,
  MapPin,
  Building2,
  Clock,
  Send,
  Globe
} from 'lucide-react';
import { CivicReport, Priority, CivicCategory } from '../../types';
import confetti from 'canvas-confetti';

interface VoiceReportScreenProps {
  selectedWard: string;
  onBack: () => void;
  onSubmitSuccess: (newReport: CivicReport) => void;
}

export const VoiceReportScreen: React.FC<VoiceReportScreenProps> = ({
  selectedWard,
  onBack,
  onSubmitSuccess,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [extractedParameters, setExtractedParameters] = useState<any | null>(null);
  const [isAnalyzingAudio, setIsAnalyzingAudio] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsAnalyzingAudio(true);

    // Simulate Natural Language AI parameter extraction
    setTimeout(() => {
      setIsAnalyzingAudio(false);
      setExtractedParameters({
        transcript: '“There is a major water pipeline rupture flooding the intersection of Civic Center Boulevard and 4th Avenue. Clean drinking water is gushing out and traffic is stalled.”',
        issue: 'Burst Water Pipeline',
        category: 'Water Supply' as CivicCategory,
        priority: 'high' as Priority,
        location: 'Civic Center Boulevard & 4th Avenue',
        ward: selectedWard,
        confidence: 99.1,
        department: 'Water Supply & Sewerage Board',
        slaHours: 8,
      });
    }, 1400);
  };

  const handleConfirm = () => {
    if (!extractedParameters) return;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0878D1', '#16B8C4', '#20B86B']
    });

    const ticketNumber = `MSA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: CivicReport = {
      id: `rep-${Date.now()}`,
      ticketNumber,
      title: extractedParameters.issue,
      category: extractedParameters.category,
      priority: extractedParameters.priority,
      status: 'under_review',
      location: extractedParameters.location,
      ward: extractedParameters.ward,
      coordinates: [12.9730, 77.5912],
      timestamp: 'Just now',
      description: extractedParameters.transcript,
      method: 'voice',
      votes: 1,
      aiConfidence: extractedParameters.confidence,
      department: extractedParameters.department,
      slaHours: extractedParameters.slaHours,
      timeline: [
        {
          step: 'Voice Report Recorded',
          time: 'Just now',
          description: 'Citizen audio captured with speech-to-text NLP verification.',
          completed: true,
        },
        {
          step: 'AI Natural Language Intent Extraction',
          time: 'Just now',
          description: 'Extracted: High Urgency Water Pipeline Rupture.',
          completed: true,
        },
        {
          step: 'Municipal Dispatch Queue',
          time: 'Active',
          description: `Forwarded to ${extractedParameters.department}.`,
          completed: false,
        }
      ]
    };

    onSubmitSuccess(newReport);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col bg-[#F5F9FC] text-slate-900 overflow-y-auto no-scrollbar pb-24 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#F5F9FC]/95 backdrop-blur-md px-5 py-3 border-b border-slate-200/60 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-black text-[#0B2A52] tracking-tight">AI VOICE REPORT</span>
          <span className="text-[10px] text-slate-500 font-medium">Multilingual Speech-to-Action</span>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
          <Globe className="w-3.5 h-3.5 text-[#0878D1]" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent focus:outline-none text-[11px] font-bold text-[#0878D1]"
          >
            <option value="English">ENG</option>
            <option value="Hindi">HIN</option>
            <option value="Kannada">KAN</option>
            <option value="Tamil">TAM</option>
            <option value="Spanish">ESP</option>
          </select>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-6 flex flex-col items-center justify-center my-auto space-y-6 text-center">
        {/* Animated Concentric Audio Pulse Waves */}
        <div className="relative flex items-center justify-center my-4">
          {isRecording && (
            <>
              <div className="absolute w-44 h-44 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full bg-[#20B86B]/30 animate-pulse pointer-events-none" />
            </>
          )}

          <button
            onClick={isRecording ? handleStopRecording : () => setIsRecording(true)}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 z-10 ${
              isRecording
                ? 'bg-gradient-to-tr from-[#20B86B] to-[#16B8C4] text-white ring-4 ring-emerald-200'
                : 'bg-white border-4 border-[#0878D1] text-[#0878D1]'
            }`}
          >
            {isRecording ? (
              <div className="flex flex-col items-center">
                <Square className="w-8 h-8 fill-current" />
                <span className="text-[10px] font-black uppercase mt-1">Tap to Stop</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Mic className="w-9 h-9" />
                <span className="text-[10px] font-black uppercase mt-1">Tap to Record</span>
              </div>
            )}
          </button>
        </div>

        {/* Status Text & Timer */}
        <div>
          {isRecording ? (
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#20B86B]">
                <span className="w-2 h-2 rounded-full bg-[#20B86B] animate-pulse" />
                Listening... 00:0{seconds}s
              </span>
              <h3 className="text-xl font-black text-[#0B2A52] tracking-tight mt-2">
                “Speak about the problem”
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Mention the issue and location naturally. Our AI extracts priority and department automatically.
              </p>
            </div>
          ) : isAnalyzingAudio ? (
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold">
                <Sparkles className="w-4 h-4 animate-spin text-[#16B8C4]" />
                <span>AI Natural Language Processing...</span>
              </div>
              <p className="text-xs text-slate-500">Transcribing audio and analyzing civic urgency...</p>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              Audio captured successfully. Review AI parameters below.
            </div>
          )}
        </div>

        {/* AI Extracted Output */}
        <AnimatePresence>
          {extractedParameters && !isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-3xl p-5 border border-slate-200 shadow-md text-left space-y-4"
            >
              {/* Transcript */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-[#0878D1]" />
                  <span>Speech-to-Text Transcript ({selectedLanguage})</span>
                </div>
                <p className="text-xs font-medium text-slate-800 italic leading-relaxed">
                  {extractedParameters.transcript}
                </p>
              </div>

              {/* Extracted Parameters */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-[10px] text-slate-500 font-semibold block">Detected Issue</span>
                  <span className="font-extrabold text-[#0B2A52] truncate block mt-0.5">
                    {extractedParameters.issue}
                  </span>
                </div>

                <div className="p-2.5 bg-red-50/60 rounded-xl border border-red-100">
                  <span className="text-[10px] text-slate-500 font-semibold block">Priority</span>
                  <span className="font-black text-red-600 uppercase tracking-wider block mt-0.5">
                    {extractedParameters.priority}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                  <span className="text-[10px] text-slate-500 font-semibold block">Location</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0878D1]" />
                    {extractedParameters.location}
                  </span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className="w-full h-13 rounded-2xl text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #0878D1 0%, #1595E7 100%)',
                }}
              >
                <Send className="w-4 h-4 text-white" />
                <span>Confirm & Dispatch Voice Report</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
