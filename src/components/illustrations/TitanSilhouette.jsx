const TitanSilhouette = ({ className = "w-full h-full", type = "colossal" }) => {
  const titans = {
    colossal: (
      <g>
        {/* Colossal Titan Silhouette */}
        <path 
          d="M100 180 Q90 160 85 140 Q80 100 90 80 Q95 40 100 20 Q105 40 110 80 Q120 100 115 140 Q110 160 100 180"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Head */}
        <ellipse cx="100" cy="30" rx="15" ry="20" fill="currentColor" />
        {/* Steam Effect */}
        <circle cx="85" cy="25" r="3" fill="currentColor" opacity="0.3" className="animate-pulse" />
        <circle cx="115" cy="35" r="4" fill="currentColor" opacity="0.3" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="100" cy="15" r="3" fill="currentColor" opacity="0.3" className="animate-pulse" style={{ animationDelay: '1s' }} />
      </g>
    ),
    armored: (
      <g>
        {/* Armored Titan Silhouette */}
        <path 
          d="M100 180 Q85 160 80 140 Q75 100 85 80 Q90 40 100 25 Q110 40 115 80 Q125 100 120 140 Q115 160 100 180"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Armor Plates */}
        <rect x="85" y="60" width="30" height="20" fill="currentColor" opacity="0.9" />
        <rect x="90" y="85" width="20" height="25" fill="currentColor" opacity="0.9" />
        {/* Head */}
        <rect x="90" y="20" width="20" height="25" rx="5" fill="currentColor" />
      </g>
    ),
    female: (
      <g>
        {/* Female Titan Silhouette */}
        <path 
          d="M100 180 Q92 160 88 140 Q85 100 92 80 Q96 40 100 22 Q104 40 108 80 Q115 100 112 140 Q108 160 100 180"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Hair */}
        <path 
          d="M85 25 Q80 35 85 45 M115 25 Q120 35 115 45"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        {/* Head */}
        <ellipse cx="100" cy="28" rx="12" ry="16" fill="currentColor" />
      </g>
    )
  };

  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="titanShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#titanShadow)">
        {titans[type] || titans.colossal}
      </g>
    </svg>
  );
};

export default TitanSilhouette;