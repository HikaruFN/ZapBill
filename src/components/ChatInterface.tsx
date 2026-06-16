import React, { useEffect, useRef } from 'react';

export const ChatInterface: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Retrieve the static df-messenger element from the document and insert it into our container
    const messenger = document.querySelector('df-messenger');
    if (messenger && containerRef.current) {
      containerRef.current.appendChild(messenger);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 min-h-0 flex flex-col bg-[rgba(22,25,32,0.4)] backdrop-blur-md rounded-3xl border border-[rgba(255,255,255,0.05)] overflow-hidden shadow-2xl relative"
    />
  );
};
