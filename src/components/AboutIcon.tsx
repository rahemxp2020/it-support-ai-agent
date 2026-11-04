import React from 'react';

interface AboutIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const AboutIcon: React.FC<AboutIconProps> = ({
  className = '',
  size = 'md',
  showText = false
}) => {
  const sizeMap = {
    sm: 'w-5 h-5 text-[9px]',
    md: 'w-7 h-7 text-[10px]',
    lg: 'w-10 h-10 text-xs',
    xl: 'w-16 h-16 text-sm'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Designed SVG Badge with "حول / About" insignia */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-slate-900 border border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-950/40 ${sizeMap[size].split(' ').slice(0, 2).join(' ')}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Hexagonal Shield / Tech Outer Ring */}
          <path
            d="M24 4L42 12V24C42 34 34.5 42.5 24 45C13.5 42.5 6 34 6 24V12L24 4Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-400"
          />
          {/* Inner Circular Core */}
          <circle cx="24" cy="23" r="13" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400/60" />
          {/* Stylized 'i' info pillar with dot */}
          <circle cx="24" cy="16" r="2.2" fill="currentColor" className="text-cyan-300" />
          <path
            d="M22 21H24.5V31H26"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-300"
          />
          {/* Tech decorative tick marks */}
          <line x1="21" y1="31" x2="27" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-cyan-300" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right leading-none">
          <span className="font-extrabold text-white text-xs sm:text-sm">حول</span>
          <span className="font-mono text-[10px] text-cyan-400 tracking-wider" dir="ltr">About</span>
        </div>
      )}
    </div>
  );
};
