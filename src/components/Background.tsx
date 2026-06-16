import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Mountains */}
        <polygon points="-100,800 300,450 700,800" fill="#202532" opacity="0.7" />
        <polygon points="600,800 1100,300 1600,800" fill="#2b3244" opacity="0.9" />
        <polygon points="950,450 1100,300 1200,450" fill="#3a445c" opacity="0.5" />
        
        {/* Clouds / Mist layers */}
        <path d="M-50,750 Q100,700 300,740 T700,720 T1100,750 T1550,710 L1550,800 L-50,800 Z" fill="#9aa2cc" opacity="0.2" />
        <path d="M-50,770 Q150,740 400,760 T900,730 T1550,760 L1550,800 L-50,800 Z" fill="#b9c0e6" opacity="0.15" />
      </svg>
    </div>
  );
};
