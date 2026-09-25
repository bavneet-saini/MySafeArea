import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Camera,
  Video,
  Mic,
  FileText,
  MapPin,
  Upload,
  CheckCircle2,
  Sparkles,
  Send,
  Volume2,
  Square,
  AlertCircle
} from 'lucide-react';
import { ReportMethod, CivicCategory, Priority, CivicReport } from '../../types';
import { SAMPLE_CIVIC_PHOTOS, MUNICIPAL_WARDS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface ReportHubScreenProps {
  initialMethod?: ReportMethod;
  selectedWard: string;
  onBack: () => void;
  onOpenLiveCameraScan: (photoUrl?: string, category?: CivicCategory, location?: string) => void;
  onSubmitSuccess: (newReport: CivicReport) => void;
}

export const ReportHubScreen: React.FC<ReportHubScreenProps> = ({
  initialMethod = 'photo',
  selectedWard,
  onBack,
  onOpenLiveCameraScan,
  onSubmitSuccess,
}) => {
  const [activeMethod, setActiveMethod] = useState<ReportMethod>(initialMethod);
  const [description, setDescription] = useState<string>('');
  const [locationText, setLocationText] = useState<string>('Main Road, near ABC School');
  const [selectedWardLocal, setSelectedWardLocal] = useState<string>(selectedWard);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Voice recording simulation
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [voiceSeconds, setVoiceSeconds] = useState<number>(0);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const voiceIntervalRef = useRef<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick suggestion chips
  const quickSuggestions = [
    'Deep dangerous pothole',
    'Streetlight broken & dark',
    'Garbage dump overflowing',
    'Water pipeline leakage',
    'Broken sidewalk paver',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecordingVoice) {
      clearInterval(voiceIntervalRef.current);
      setIsRecordingVoice(false);
      setVoiceTranscript('“Dangerous pothole crater located right outside ABC School gate, vehicles are braking suddenly.”');
      if (!description) {
        setDescription('Dangerous pothole crater located right outside ABC School gate, vehicles are braking suddenly.');
      }
    } else {
      setIsRecordingVoice(true);
      setVoiceSeconds(0);
      setVoiceTranscript('Listening... Speak now about the civic hazard');
      voiceIntervalRef.current = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Submit for AI Analysis (Transitions to Camera AI Scan or Direct Dispatch)
  const handleSubmit = () => {
    const currentPhoto = uploadedImage || SAMPLE_CIVIC_PHOTOS[selectedPresetIndex].url;
    const currentCat = SAMPLE_CIVIC_PHOTOS[selectedPresetIndex].category;

    // Direct to the AI Camera Scanning Screen for complete analysis experience
    onOpenLiveCameraScan(currentPhoto, currentCat, locationText);
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
          <span className="text-xs font-black text-[#0B2A52] tracking-tight">REPORT A PROBLEM</span>
          <span className="text-[10px] text-slate-500 font-medium">Quick Citizen Submission</span>
        </div>

        <div className="w-10" />
      </header>

      {/* Main Container */}
      <main className="p-5 space-y-6">
        {/* ==================================================
            HEADING: "What did you notice?"
           ================================================== */}
        <div>
          <span className="text-[11px] font-bold text-[#0878D1] tracking-wider uppercase">
            Step 1 of 2 • Input Evidence
          </span>
          <h2 className="text-2xl font-black text-[#0B2A52] tracking-tight mt-0.5">
            What did you notice?
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
            Choose your preferred reporting format. AI will extract issue specifics, priority level, and municipal routing.
          </p>
        </div>

        {/* ==================================================
            FOUR REPORTING METHODS
            [ 📷 Photo ] [ 🎥 Video ] [ 🎤 Voice ] [ 📝 Text ]
           ================================================== */}
        <div className="grid grid-cols-4 gap-2">
          {/* [ 📷 Photo ] */}
          <button
            onClick={() => setActiveMethod('photo')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeMethod === 'photo'
                ? 'bg-blue-50 border-[#0878D1] text-[#0878D1] shadow-sm font-bold ring-2 ring-[#0878D1]/20'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
              activeMethod === 'photo' ? 'bg-[#0878D1] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs">Photo</span>
          </button>

          {/* [ 🎥 Video ] */}
          <button
            onClick={() => setActiveMethod('video')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeMethod === 'video'
                ? 'bg-blue-50 border-[#0878D1] text-[#0878D1] shadow-sm font-bold ring-2 ring-[#0878D1]/20'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
              activeMethod === 'video' ? 'bg-[#0878D1] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              <Video className="w-5 h-5" />
            </div>
            <span className="text-xs">Video</span>
          </button>

          {/* [ 🎤 Voice ] */}
          <button
            onClick={() => setActiveMethod('voice')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeMethod === 'voice'
                ? 'bg-blue-50 border-[#0878D1] text-[#0878D1] shadow-sm font-bold ring-2 ring-[#0878D1]/20'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
              activeMethod === 'voice' ? 'bg-[#20B86B] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              <Mic className="w-5 h-5" />
            </div>
            <span className="text-xs">Voice</span>
          </button>

          {/* [ 📝 Text ] */}
          <button
            onClick={() => setActiveMethod('text')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeMethod === 'text'
                ? 'bg-blue-50 border-[#0878D1] text-[#0878D1] shadow-sm font-bold ring-2 ring-[#0878D1]/20'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
              activeMethod === 'text' ? 'bg-[#0B2A52] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs">Text</span>
          </button>
        </div>

        {/* ==================================================
            1. CAPTURE / UPLOAD AN IMAGE
           ================================================== */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0878D1] flex items-center justify-center text-[11px] font-black">
                1
              </span>
              <span>Capture / Upload Evidence</span>
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-bold text-[#0878D1] hover:underline flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              <span>Upload Custom Photo</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Image Preview / Preset Selector */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center">
            <img
              src={uploadedImage || SAMPLE_CIVIC_PHOTOS[selectedPresetIndex].url}
              alt="Evidence Preview"
              className="w-full h-full object-cover"
            />

            {/* Quick action button to trigger live AI scanner */}
            <button
              onClick={() => onOpenLiveCameraScan(uploadedImage || SAMPLE_CIVIC_PHOTOS[selectedPresetIndex].url)}
              className="absolute inset-x-4 bottom-3 h-10 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white font-bold text-xs backdrop-blur-md flex items-center justify-center gap-2 border border-white/20 shadow-md transition-all active:scale-95"
            >
              <Camera className="w-4 h-4 text-[#16B8C4]" />
              <span>Launch Live AI Camera Scanner</span>
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
              Pick Preset:
            </span>
            {SAMPLE_CIVIC_PHOTOS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setUploadedImage(null);
                  setSelectedPresetIndex(idx);
                  if (!description) setDescription(p.name);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  !uploadedImage && selectedPresetIndex === idx
                    ? 'bg-[#0878D1] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================
            2. ENTER A DESCRIPTION
           ================================================== */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0878D1] flex items-center justify-center text-[11px] font-black">
              2
            </span>
            <span>Enter Description</span>
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in your own words, or tap a suggestion below..."
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0878D1]/30 focus:border-[#0878D1] bg-slate-50/50 resize-none font-sans"
          />

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickSuggestions.map((sug) => (
              <button
                key={sug}
                onClick={() => setDescription(sug)}
                className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#0878D1] transition-colors"
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================
            3. RECORD VOICE
           ================================================== */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0878D1] flex items-center justify-center text-[11px] font-black">
                3
              </span>
              <span>Voice Note (Optional)</span>
            </label>
            {isRecordingVoice && (
              <span className="text-[11px] font-bold text-red-500 animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Recording {voiceSeconds}s
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleVoiceRecording}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                isRecordingVoice
                  ? 'bg-red-500 text-white animate-bounce'
                  : 'bg-emerald-50 text-[#20B86B] border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isRecordingVoice ? <Square className="w-5 h-5" /> : <Mic className="w-6 h-6" />}
            </button>

            <div className="flex-1">
              {isRecordingVoice ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-1 bg-red-400 rounded-full animate-pulse" />
                    <span className="h-6 w-1 bg-red-500 rounded-full animate-pulse" />
                    <span className="h-4 w-1 bg-red-400 rounded-full animate-pulse" />
                    <span className="h-7 w-1 bg-red-600 rounded-full animate-pulse" />
                    <span className="h-5 w-1 bg-red-500 rounded-full animate-pulse" />
                    <span className="h-2 w-1 bg-red-400 rounded-full animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-600 italic">Listening to citizen audio...</p>
                </div>
              ) : voiceTranscript ? (
                <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 leading-tight">
                  <span className="font-bold flex items-center gap-1 text-[#20B86B]">
                    <Volume2 className="w-3 h-3" /> Transcribed:
                  </span>
                  {voiceTranscript}
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 leading-tight">
                  Tap microphone to speak in any language. AI auto-transcribes & extracts civic parameters.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            4. SELECT LOCATION
           ================================================== */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0878D1] flex items-center justify-center text-[11px] font-black">
              4
            </span>
            <span>Select Location & Ward</span>
          </label>

          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <MapPin className="w-4 h-4 text-[#0878D1] flex-shrink-0" />
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="Street name, landmark or junction..."
                className="w-full text-xs font-medium bg-transparent focus:outline-none text-slate-800"
              />
            </div>

            <select
              value={selectedWardLocal}
              onChange={(e) => setSelectedWardLocal(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0878D1]"
            >
              {MUNICIPAL_WARDS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ==================================================
            5. SUBMIT FOR AI ANALYSIS
           ================================================== */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleSubmit}
            className="w-full h-14 rounded-2xl text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] hover:opacity-95"
            style={{
              background: 'linear-gradient(135deg, #0878D1 0%, #1595E7 100%)',
            }}
          >
            <Sparkles className="w-5 h-5 text-[#16B8C4]" />
            <span>Submit for AI Analysis</span>
          </button>
          
          <p className="text-center text-[10px] text-slate-500 font-medium">
            AI Computer Vision & NLP will verify issue authenticity before municipal dispatch.
          </p>
        </div>
      </main>
    </div>
  );
};
