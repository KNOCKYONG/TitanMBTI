const TitanLogo = ({ className = "w-full h-full" }) => {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wings of Freedom Design */}
      <defs>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Shield Background */}
      <path 
        d="M100 20 L140 40 L160 80 L160 120 L100 180 L40 120 L40 80 L60 40 Z" 
        fill="url(#wingGradient)" 
        opacity="0.1"
      />
      
      {/* Left Wing */}
      <path 
        d="M50 80 Q30 70 20 90 Q30 100 40 95 Q30 110 50 120 Q70 100 80 100 Q70 90 50 80" 
        fill="url(#wingGradient)" 
        filter="url(#glow)"
      />
      
      {/* Right Wing */}
      <path 
        d="M150 80 Q170 70 180 90 Q170 100 160 95 Q170 110 150 120 Q130 100 120 100 Q130 90 150 80" 
        fill="url(#wingGradient)" 
        filter="url(#glow)"
      />
      
      {/* Center Sword */}
      <rect x="95" y="50" width="10" height="100" fill="url(#wingGradient)" />
      <path d="M100 50 L90 60 L100 55 L110 60 Z" fill="url(#wingGradient)" />
      
      {/* Shield Lines */}
      <path d="M60 60 L140 60" stroke="url(#wingGradient)" strokeWidth="2" opacity="0.5" />
      <path d="M70 140 L130 140" stroke="url(#wingGradient)" strokeWidth="2" opacity="0.5" />
    </svg>
  );
};

export default TitanLogo;