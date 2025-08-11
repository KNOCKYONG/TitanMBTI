import { useState, useEffect } from 'react';

const LightningEffect = ({ 
  isActive = false, 
  onComplete = () => {},
  intensity = 'medium',
  duration = 1000,
  color = 'blue',
  useImage = false
}) => {
  const [bolts, setBolts] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const colorClasses = {
    blue: 'from-blue-400 via-cyan-300 to-white',
    yellow: 'from-yellow-400 via-amber-300 to-white',
    purple: 'from-purple-400 via-violet-300 to-white',
    red: 'from-red-400 via-orange-300 to-white'
  };

  const intensityConfig = {
    low: { boltCount: 3, maxWidth: 2, glowSize: 20 },
    medium: { boltCount: 5, maxWidth: 3, glowSize: 30 },
    high: { boltCount: 8, maxWidth: 4, glowSize: 40 },
    titan: { boltCount: 12, maxWidth: 6, glowSize: 60 }
  };

  const generateBolt = (index) => {
    const config = intensityConfig[intensity];
    const startX = Math.random() * 100;
    const startY = Math.random() * 30;
    const segments = 8 + Math.random() * 8;
    
    let path = `M ${startX} ${startY}`;
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 0; i < segments; i++) {
      currentX += (Math.random() - 0.5) * 20;
      currentY += Math.random() * 15 + 5;
      
      if (Math.random() > 0.7) {
        // Add some jagged edges
        const zigX = currentX + (Math.random() - 0.5) * 10;
        const zigY = currentY + (Math.random() - 0.5) * 5;
        path += ` L ${zigX} ${zigY}`;
      }
      
      path += ` L ${currentX} ${currentY}`;
    }
    
    return {
      id: `bolt-${index}`,
      path,
      width: Math.random() * config.maxWidth + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 200,
      branches: Math.random() > 0.6 ? generateBranches(currentX, currentY, 2) : []
    };
  };

  const generateBranches = (startX, startY, count) => {
    return Array.from({ length: count }, (_, i) => {
      const branchLength = Math.random() * 30 + 10;
      const angle = (Math.random() - 0.5) * Math.PI * 0.8;
      const endX = startX + Math.cos(angle) * branchLength;
      const endY = startY + Math.sin(angle) * branchLength;
      
      return {
        id: `branch-${i}`,
        path: `M ${startX} ${startY} L ${endX} ${endY}`,
        width: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      };
    });
  };

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      const config = intensityConfig[intensity];
      const newBolts = Array.from({ length: config.boltCount }, (_, i) => generateBolt(i));
      setBolts(newBolts);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setBolts([]);
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, intensity, duration, isAnimating]);

  if (!isActive && !isAnimating) return null;

  // Use SVG image if specified
  if (useImage) {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} 
            ${isAnimating ? 'animate-pulse opacity-20' : 'opacity-0'}
            transition-opacity duration-100`}
        />
        <img 
          src="/images/effects/lightning.svg" 
          alt="" 
          className={`absolute inset-0 w-full h-full object-contain ${isAnimating ? 'animate-flash opacity-90' : 'opacity-0'}`}
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Screen Flash */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} 
          ${isAnimating ? 'animate-pulse opacity-20' : 'opacity-0'}
          transition-opacity duration-100`}
      />
      
      {/* Lightning Bolts */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`lightning-glow-${color}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
          <linearGradient id={`lightning-gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={`${color === 'blue' ? 'stop-cyan-200' : 
              color === 'yellow' ? 'stop-yellow-200' :
              color === 'purple' ? 'stop-purple-200' : 'stop-red-200'}`} />
            <stop offset="50%" className={`${color === 'blue' ? 'stop-blue-300' : 
              color === 'yellow' ? 'stop-amber-300' :
              color === 'purple' ? 'stop-violet-300' : 'stop-orange-300'}`} />
            <stop offset="100%" className="stop-white" />
          </linearGradient>
        </defs>
        
        {bolts.map((bolt) => (
          <g key={bolt.id}>
            {/* Main bolt */}
            <path
              d={bolt.path}
              stroke={`url(#lightning-gradient-${color})`}
              strokeWidth={bolt.width}
              fill="none"
              opacity={bolt.opacity}
              filter={`url(#lightning-glow-${color})`}
              className="animate-pulse"
              style={{
                animationDelay: `${bolt.delay}ms`,
                animationDuration: '100ms'
              }}
            />
            
            {/* Branches */}
            {bolt.branches.map((branch) => (
              <path
                key={branch.id}
                d={branch.path}
                stroke={`url(#lightning-gradient-${color})`}
                strokeWidth={branch.width}
                fill="none"
                opacity={branch.opacity * 0.7}
                filter={`url(#lightning-glow-${color})`}
                className="animate-pulse"
                style={{
                  animationDelay: `${bolt.delay + 50}ms`,
                  animationDuration: '80ms'
                }}
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Additional glow overlay */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/5 animate-pulse duration-75" />
      )}
    </div>
  );
};

export default LightningEffect;