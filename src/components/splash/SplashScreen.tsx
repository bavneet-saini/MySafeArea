import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // Step progression states
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Step 2 & 3: Logo appearance and scale-up
    const t1 = setTimeout(() => setStep(2), 250);
    // Step 4: Glow sweep
    const t2 = setTimeout(() => setStep(4), 700);
    // Step 5: Text and Tagline display
    const t3 = setTimeout(() => setStep(5), 1100);
    // Step 6: Progress line
    const t4 = setTimeout(() => setStep(6), 1400);

    // Progress line animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 12;
      });
    }, 90);

    // Step 7: Transition to next screen (approx 2.4s total)
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(exitTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="relative w-full h-full min-h-[640px] flex flex-col items-center justify-between p-8 bg-[#F5F9FC] text-slate-900 overflow-hidden select-none"
    >
      {/* Background civic watermark pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 35%, rgba(8, 120, 209, 0.08) 0%, rgba(245, 249, 252, 0) 70%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0B2A52 1px, transparent 1px), linear-gradient(to right, #0B2A52 1px, #F5F9FC 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Top subtle civic badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: step >= 2 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-4 flex items-center space-x-1.5 text-xs font-semibold tracking-wider text-[#0878D1] uppercase"
      >
        <ShieldCheck className="w-4 h-4 text-[#20B86B]" />
        <span>Civic Technology Platform</span>
      </motion.div>

      {/* Center Logo & Brand Sequence */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-xs text-center z-10">
        {/* Step 2, 3, 4: Logo Container with Scale and Glow Sweep */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Glow Sweep aura behind logo */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.3, 0.7, 0.4],
                  scale: [0.95, 1.15, 1],
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-4 rounded-full pointer-events-none blur-2xl"
                style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, #0878D1 0deg, #16B8C4 120deg, #20B86B 240deg, #0878D1 360deg)'
                }}
              />
            )}
          </AnimatePresence>

          {/* Logo Icon with Step 2 fade-in and Step 3 scale-up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={
              step >= 2
                ? { opacity: 1, scale: step >= 3 ? [0.82, 1.06, 1] : 1 }
                : { opacity: 0, scale: 0.82 }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-36 h-36 rounded-3xl p-2 bg-white/80 shadow-xl shadow-blue-900/10 border border-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <img
              src="./assets/logo.png"
              alt="MySafeArea AI Logo"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />

            {/* Step 4: Subtle light sweep shine across logo */}
            {step >= 4 && (
              <motion.div
                initial={{ x: '-120%', opacity: 0 }}
                animate={{ x: '140%', opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 pointer-events-none"
              />
            )}
          </motion.div>
        </div>

        {/* Step 5: Application Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={step >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-6"
        >
          <div className="flex items-center justify-center font-black tracking-tight text-3xl">
            <span className="text-[#0B2A52]">MySafe</span>
            <span className="text-[#0878D1]">Area</span>
            <span 
              className="ml-1.5 px-2 py-0.5 rounded-lg text-white text-xl font-extrabold shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #0878D1 0%, #16B8C4 50%, #20B86B 100%)'
              }}
            >
              AI
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={step >= 5 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2.5 text-slate-600 text-sm font-medium tracking-normal leading-relaxed px-2"
          >
            “See a problem. Speak up. Let AI take it forward.”
          </motion.p>
        </motion.div>
      </div>

      {/* Step 6: Subtle animated blue progress line */}
      <div className="w-full max-w-xs mb-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={step >= 6 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1.5 px-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#16B8C4]" />
              Initializing Smart City AI Engine
            </span>
            <span className="font-semibold text-[#0878D1]">{Math.min(100, progress)}%</span>
          </div>
          
          <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #0878D1 0%, #16B8C4 50%, #20B86B 100%)'
              }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* Quick skip button for instant evaluation */}
        <button
          onClick={onComplete}
          className="mt-4 text-[11px] text-slate-400 hover:text-slate-600 font-medium transition-colors"
        >
          Tap to skip animation
        </button>
      </div>
    </motion.div>
  );
};
