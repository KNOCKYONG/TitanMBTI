const TitanWall = ({ className = "w-full h-full" }) => {
  return (
    <svg className={className} viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
        <pattern id="brickPattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="39" height="9" fill="#4B5563" />
          <rect x="0" y="10" width="39" height="9" fill="#4B5563" />
          <rect x="20" y="10" width="39" height="9" fill="#4B5563" />
        </pattern>
      </defs>
      
      {/* Wall Structure */}
      <rect x="0" y="50" width="800" height="150" fill="url(#wallGradient)" />
      <rect x="0" y="50" width="800" height="150" fill="url(#brickPattern)" opacity="0.3" />
      
      {/* Wall Top Details */}
      {[...Array(20)].map((_, i) => (
        <rect 
          key={i} 
          x={i * 40} 
          y="30" 
          width="30" 
          height="20" 
          fill="#374151"
        />
      ))}
      
      {/* Cracks and Details */}
      <path d="M200 100 L210 120 L205 140 L215 180" stroke="#1F2937" strokeWidth="2" opacity="0.5" />
      <path d="M400 80 L405 100 L395 130 L410 160" stroke="#1F2937" strokeWidth="2" opacity="0.5" />
      <path d="M600 90 L605 110 L595 140 L605 170" stroke="#1F2937" strokeWidth="2" opacity="0.5" />
      
      {/* Shadow */}
      <rect x="0" y="190" width="800" height="10" fill="#000000" opacity="0.2" />
    </svg>
  );
};

export default TitanWall;