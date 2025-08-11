const CharacterIllustration = ({ mbtiType, className = "w-full h-full" }) => {
  const characterDesigns = {
    INTJ: (
      // Erwin Smith - Strategic Commander
      <g>
        <defs>
          <linearGradient id="erwinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        {/* Hair */}
        <path d="M85 40 Q85 30 100 25 Q115 30 115 40 L115 50 Q100 45 85 50 Z" fill="#D4A574" />
        {/* Face */}
        <ellipse cx="100" cy="60" rx="20" ry="25" fill="#FDBCB4" />
        {/* Eyes */}
        <ellipse cx="92" cy="55" rx="3" ry="4" fill="#4A5568" />
        <ellipse cx="108" cy="55" rx="3" ry="4" fill="#4A5568" />
        {/* Survey Corps Cape */}
        <path d="M70 80 Q70 70 100 75 Q130 70 130 80 L120 140 L80 140 Z" fill="url(#erwinGrad)" />
        {/* Wings of Freedom emblem */}
        <path d="M95 100 L90 105 L95 102 L100 105 L105 102 L110 105 L105 100 Z" fill="#FFF" opacity="0.8" />
      </g>
    ),
    ENFP: (
      // Sasha Blouse - Cheerful Foodie
      <g>
        <defs>
          <linearGradient id="sashaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        {/* Hair (ponytail) */}
        <path d="M85 35 Q85 25 100 20 Q115 25 115 35 L115 45 Q100 40 85 45 Z" fill="#92400E" />
        <path d="M115 30 Q120 35 118 50 Q115 55 112 50 Q115 40 115 30" fill="#92400E" />
        {/* Face */}
        <ellipse cx="100" cy="55" rx="18" ry="23" fill="#FDBCB4" />
        {/* Happy Eyes */}
        <path d="M90 50 Q92 48 94 50" fill="none" stroke="#4A5568" strokeWidth="2" />
        <path d="M106 50 Q108 48 110 50" fill="none" stroke="#4A5568" strokeWidth="2" />
        {/* Smile */}
        <path d="M90 62 Q100 68 110 62" fill="none" stroke="#E11D48" strokeWidth="2" />
        {/* Potato! */}
        <ellipse cx="125" cy="65" rx="8" ry="6" fill="#D4A574" />
        {/* Body */}
        <path d="M75 75 Q75 65 100 70 Q125 65 125 75 L115 130 L85 130 Z" fill="url(#sashaGrad)" />
      </g>
    ),
    ISTP: (
      // Levi Ackerman - Humanity's Strongest
      <g>
        <defs>
          <linearGradient id="leviGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
        {/* Hair (undercut) */}
        <path d="M85 45 Q85 35 100 30 Q115 35 115 45 L115 48 Q100 43 85 48 Z" fill="#1F2937" />
        {/* Face */}
        <ellipse cx="100" cy="60" rx="18" ry="22" fill="#FDBCB4" />
        {/* Sharp Eyes */}
        <line x1="88" y1="55" x2="94" y2="55" stroke="#374151" strokeWidth="2" />
        <line x1="106" y1="55" x2="112" y2="55" stroke="#374151" strokeWidth="2" />
        {/* Cravat */}
        <rect x="94" y="78" width="12" height="8" fill="#FFF" />
        {/* Body */}
        <path d="M72 85 Q72 75 100 80 Q128 75 128 85 L118 140 L82 140 Z" fill="url(#leviGrad)" />
        {/* Blade */}
        <rect x="125" y="90" width="3" height="40" fill="#9CA3AF" transform="rotate(-15 125 90)" />
      </g>
    ),
    ISTJ: (
      // Mikasa Ackerman - Devoted Warrior
      <g>
        <defs>
          <linearGradient id="mikasaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
        {/* Hair (short black) */}
        <path d="M80 40 Q80 30 100 25 Q120 30 120 40 L120 65 Q110 60 100 62 Q90 60 80 65 Z" fill="#1F2937" />
        {/* Face */}
        <ellipse cx="100" cy="58" rx="19" ry="24" fill="#FDBCB4" />
        {/* Eyes */}
        <ellipse cx="91" cy="53" rx="3" ry="4" fill="#374151" />
        <ellipse cx="109" cy="53" rx="3" ry="4" fill="#374151" />
        {/* Red Scarf */}
        <path d="M75 75 Q85 70 100 72 Q115 70 125 75 L120 85 Q100 80 80 85 Z" fill="url(#mikasaGrad)" />
        {/* Body */}
        <path d="M73 85 Q73 75 100 80 Q127 75 127 85 L117 140 L83 140 Z" fill="#374151" />
      </g>
    )
  };

  // Default character silhouette
  const defaultCharacter = (
    <g>
      <ellipse cx="100" cy="60" rx="20" ry="25" fill="#9CA3AF" />
      <path d="M70 80 Q70 70 100 75 Q130 70 130 80 L120 140 L80 140 Z" fill="#6B7280" />
      <text x="100" y="100" textAnchor="middle" fill="#FFF" fontSize="20" fontWeight="bold">
        {mbtiType}
      </text>
    </g>
  );

  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="characterShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#characterShadow)">
        {characterDesigns[mbtiType] || defaultCharacter}
      </g>
    </svg>
  );
};

export default CharacterIllustration;