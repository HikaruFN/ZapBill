import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="text-center z-10 w-full flex flex-col items-center select-none pt-4 pb-6 px-4">
      {/* Brand Box with Logo and Name */}
      <div className="flex items-center justify-center gap-3 mb-2">
        {/* Lightning Logo */}
        <div className="w-10 h-10 bg-[#2a3142] border-2 border-[#f9d976] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(249,217,118,0.2)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              fill="#f9d976"
              stroke="#f9d976"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Logo Text */}
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          ZAPBILL
        </h1>
      </div>
      
      {/* Subtitle */}
      <h2 className="text-sm font-sans tracking-[0.25em] text-[#aeb7e6] uppercase font-semibold mb-4 sm:mb-6">
        Powered by Olympus AI
      </h2>

      {/* Tagline */}
      <div className="inline-block bg-[rgba(174,183,230,0.08)] border border-[rgba(174,183,230,0.15)] rounded-full px-6 py-3 max-w-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <p className="text-sm sm:text-base leading-relaxed text-slate-200">
          Bring your rate to Olympus: see in a{' '}
          <span className="text-[#f9d976] font-bold drop-shadow-[0_0_8px_rgba(249,217,118,0.4)]">
            flash
          </span>{' '}
          if you're overpaying.
        </p>
      </div>
    </div>
  );
};
