import { useState, useEffect } from 'react';

const WallCrackEffect = ({ 
  isActive = false,
  onComplete = () => {},
  intensity = 'medium',
  crackDirection = 'random',
  showDebris = true,
  duration = 1500
}) => {
  const [cracks, setCracks] = useState([]);
  const [debris, setDebris] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const intensityConfig = {
    low: { crackCount: 3, debrisCount: 8, crackWidth: 2, shakeIntensity: 2 },
    medium: { crackCount: 5, debrisCount: 15, crackWidth: 3, shakeIntensity: 4 },
    high: { crackCount: 8, debrisCount: 25, crackWidth: 4, shakeIntensity: 6 },
    titan: { crackCount: 12, debrisCount: 40, crackWidth: 6, shakeIntensity: 8 }
  };

  const generateCrack = (index) => {
    const config = intensityConfig[intensity];
    const startPoints = {
      random: { x: Math.random() * 100, y: Math.random() * 100 },
      center: { x: 50, y: 50 },
      top: { x: Math.random() * 100, y: 0 },
      bottom: { x: Math.random() * 100, y: 100 },
      left: { x: 0, y: Math.random() * 100 },
      right: { x: 100, y: Math.random() * 100 }
    };

    const start = startPoints[crackDirection] || startPoints.random;
    const segments = 6 + Math.random() * 8;
    
    let path = `M ${start.x} ${start.y}`;
    let currentX = start.x;
    let currentY = start.y;
    
    // Main crack path
    for (let i = 0; i < segments; i++) {
      const angle = Math.random() * Math.PI * 2;
      const length = Math.random() * 15 + 5;
      
      currentX += Math.cos(angle) * length;
      currentY += Math.sin(angle) * length;
      
      // Keep within bounds
      currentX = Math.max(0, Math.min(100, currentX));
      currentY = Math.max(0, Math.min(100, currentY));
      
      if (Math.random() > 0.8) {
        // Add jagged crack detail
        const jagX = currentX + (Math.random() - 0.5) * 8;
        const jagY = currentY + (Math.random() - 0.5) * 8;
        path += ` L ${jagX} ${jagY}`;
      }
      
      path += ` L ${currentX} ${currentY}`;
    }
    
    return {
      id: `crack-${index}`,
      path,
      width: Math.random() * config.crackWidth + 1,
      opacity: Math.random() * 0.6 + 0.4,
      delay: Math.random() * 300,
      branches: Math.random() > 0.5 ? generateBranches(currentX, currentY, 2 + Math.floor(Math.random() * 3)) : []
    };
  };

  const generateBranches = (startX, startY, count) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const length = Math.random() * 20 + 10;
      const endX = Math.max(0, Math.min(100, startX + Math.cos(angle) * length));
      const endY = Math.max(0, Math.min(100, startY + Math.sin(angle) * length));
      
      return {
        id: `branch-${i}`,
        path: `M ${startX} ${startY} L ${endX} ${endY}`,
        width: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        delay: Math.random() * 200 + 100
      };
    });
  };

  const generateDebris = () => {
    const config = intensityConfig[intensity];
    return Array.from({ length: config.debrisCount }, (_, i) => ({
      id: `debris-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      speedX: (Math.random() - 0.5) * 10,
      speedY: Math.random() * 8 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 500,
      shape: Math.random() > 0.5 ? 'square' : 'triangle'
    }));
  };

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      const config = intensityConfig[intensity];
      
      // Generate cracks
      const newCracks = Array.from({ length: config.crackCount }, (_, i) => generateCrack(i));
      setCracks(newCracks);
      
      // Generate debris if enabled
      if (showDebris) {
        setDebris(generateDebris());
      }

      // Screen shake effect
      document.body.style.animation = `wallShake ${duration}ms ease-out`;

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCracks([]);
        setDebris([]);
        document.body.style.animation = '';
        onComplete();
      }, duration);

      return () => {
        clearTimeout(timer);
        document.body.style.animation = '';
      };
    }
  }, [isActive, intensity, duration, isAnimating, showDebris]);

  if (!isActive && !isAnimating) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Crack overlay */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="crack-shadow">
              <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="black" floodOpacity="0.8"/>
            </filter>
            <linearGradient id="crack-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="stop-gray-800" />
              <stop offset="50%" className="stop-gray-900" />
              <stop offset="100%" className="stop-black" />
            </linearGradient>
          </defs>
          
          {cracks.map((crack) => (
            <g key={crack.id}>
              {/* Main crack */}
              <path
                d={crack.path}
                stroke="url(#crack-gradient)"
                strokeWidth={crack.width}
                fill="none"
                opacity={crack.opacity}
                filter="url(#crack-shadow)"
                className="animate-pulse"
                style={{
                  animationDelay: `${crack.delay}ms`,
                  animationDuration: '200ms',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                }}
              />
              
              {/* Branches */}
              {crack.branches.map((branch) => (
                <path
                  key={branch.id}
                  d={branch.path}
                  stroke="url(#crack-gradient)"
                  strokeWidth={branch.width}
                  fill="none"
                  opacity={branch.opacity}
                  filter="url(#crack-shadow)"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${crack.delay + branch.delay}ms`,
                    animationDuration: '150ms',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round'
                  }}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>

      {/* Debris particles */}
      {showDebris && (
        <div className="fixed inset-0 pointer-events-none z-45">
          {debris.map((piece) => (
            <div
              key={piece.id}
              className={`absolute bg-wall-brown opacity-70 shadow-lg`}
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                opacity: piece.opacity,
                transform: `rotate(${piece.rotation}deg)`,
                clipPath: piece.shape === 'triangle' 
                  ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                  : undefined,
                animation: `debrisFall ${duration}ms ease-out ${piece.delay}ms forwards`,
                animationFillMode: 'both'
              }}
            />
          ))}
        </div>
      )}

      {/* Dust cloud overlay */}
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-35">
          <div 
            className="absolute inset-0 bg-gradient-radial from-gray-400/20 via-gray-500/10 to-transparent animate-pulse"
            style={{ animationDuration: '300ms' }}
          />
        </div>
      )}
    </>
  );
};

export default WallCrackEffect;