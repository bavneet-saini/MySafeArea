import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  animatedGlow?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  animatedGlow = false,
  className = '',
}) => {
  const sizeMap = {
    xs: { img: 'w-8 h-8', title: 'text-sm', tag: 'text-[9px]' },
    sm: { img: 'w-10 h-10', title: 'text-base', tag: 'text-[10px]' },
    md: { img: 'w-14 h-14', title: 'text-xl', tag: 'text-xs' },
    lg: { img: 'w-24 h-24', title: 'text-2xl', tag: 'text-xs' },
    xl: { img: 'w-36 h-36', title: 'text-3xl', tag: 'text-sm' },
  };

  const { img, title, tag } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Logo Pin Element with Glowing/Sweep Aura */}
      <div className="relative flex items-center justify-center">
        {animatedGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(22,184,196,0.6) 0%, rgba(8,120,209,0.3) 60%, rgba(32,184,107,0.4) 100%)'
            }}
          />
        )}
        
        {/* Logo Image */}
        <div className={`relative ${img} transition-all duration-300 transform`}>
          <img
            src="./assets/logo.png"
            alt="MySafeArea AI Official Logo"
            className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
          />
        </div>
      </div>

      {/* Typography: "MySafeArea AI" */}
      {showText && (
        <div className="mt-2 text-center">
          <div className={`font-extrabold tracking-tight text-slate-900 ${title} flex items-center justify-center`}>
            <span style={{ color: '#0B2A52' }}>MySafe</span>
            <span style={{ color: '#0878D1' }}>Area</span>
            <span 
              className="ml-1 px-1.5 py-0.5 rounded-md text-white font-black"
              style={{ 
                background: 'linear-gradient(135deg, #0878D1 0%, #16B8C4 50%, #20B86B 100%)',
                fontSize: '0.85em'
              }}
            >
              AI
            </span>
          </div>

          {showTagline && (
            <p className={`mt-1 font-medium text-slate-600 max-w-xs leading-snug ${tag}`}>
              “See a problem. Speak up. Let AI take it forward.”
            </p>
          )}
        </div>
      )}
    </div>
  );
};
