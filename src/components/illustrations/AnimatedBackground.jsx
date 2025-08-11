const AnimatedBackground = ({ className = "w-full h-full" }) => {
  return (
    <svg className={className} viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Steam/Smoke Animation */}
        <linearGradient id="steamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0" />
        </linearGradient>
        
        {/* Wall Gradient */}
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
      </defs>
      
      {/* Background Mountains */}
      <path d="M0 400 Q300 350 600 380 T1200 400 L1200 800 L0 800 Z" fill="#111827" opacity="0.3" />
      <path d="M0 500 Q400 450 800 480 T1200 500 L1200 800 L0 800 Z" fill="#1F2937" opacity="0.3" />
      
      {/* Wall Maria */}
      <rect x="100" y="300" width="1000" height="500" fill="url(#wallGrad)" opacity="0.2" />
      
      {/* Animated Steam Effects */}
      {[...Array(5)].map((_, i) => (
        <g key={i}>
          <ellipse 
            cx={200 + i * 200} 
            cy="600" 
            rx="40" 
            ry="80" 
            fill="url(#steamGrad)"
          >
            <animate 
              attributeName="cy" 
              from="600" 
              to="200" 
              dur={`${8 + i * 2}s`}
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="opacity" 
              from="0.5" 
              to="0" 
              dur={`${8 + i * 2}s`}
              repeatCount="indefinite" 
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              from="1 1"
              to="1.5 2"
              dur={`${8 + i * 2}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        </g>
      ))}
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <circle
          key={`particle-${i}`}
          cx={Math.random() * 1200}
          cy={Math.random() * 800}
          r="2"
          fill="#F59E0B"
          opacity="0.3"
        >
          <animate
            attributeName="cy"
            from={Math.random() * 800}
            to="-10"
            dur={`${10 + Math.random() * 10}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.5;0"
            dur={`${10 + Math.random() * 10}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      
      {/* Birds in Distance */}
      <g opacity="0.3">
        <path d="M100 100 Q105 95 110 100" stroke="#4B5563" strokeWidth="2" fill="none">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="1200 50"
            dur="30s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M120 110 Q125 105 130 110" stroke="#4B5563" strokeWidth="2" fill="none">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="1200 30"
            dur="32s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
};

export default AnimatedBackground;