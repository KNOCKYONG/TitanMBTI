import { useState, useEffect } from 'react';

const WireSlashEffect = ({ 
  isActive = false,
  onComplete = () => {},
  direction = 'diagonal', // 'diagonal', 'horizontal', 'vertical', 'cross'
  duration = 800,
  intensity = 'medium',
  color = 'silver'
}) => {
  const [slashes, setSlashes] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const intensityConfig = {
    low: { slashCount: 2, sparkleCount: 8, wireWidth: 2, glowSize: 10 },
    medium: { slashCount: 3, sparkleCount: 15, wireWidth: 3, glowSize: 15 },
    high: { slashCount: 5, sparkleCount: 25, wireWidth: 4, glowSize: 20 },
    omniGear: { slashCount: 8, sparkleCount: 40, wireWidth: 2, glowSize: 25 }
  };

  const colorClasses = {
    silver: { 
      wire: 'from-gray-300 via-white to-gray-400',
      glow: 'shadow-white/50',
      sparkle: 'bg-white'
    },
    gold: { 
      wire: 'from-yellow-400 via-yellow-200 to-amber-400',
      glow: 'shadow-yellow-400/50',
      sparkle: 'bg-yellow-300'
    },
    steel: { 
      wire: 'from-blue-300 via-cyan-200 to-blue-400',
      glow: 'shadow-cyan-400/50',
      sparkle: 'bg-cyan-300'
    }
  };

  const generateSlash = (index, direction, config) => {
    const patterns = {
      diagonal: () => ({
        start: { x: 0, y: 100 },
        end: { x: 100, y: 0 },
        curve: `M 0 100 Q 30 70 50 50 Q 70 30 100 0`
      }),
      horizontal: () => ({
        start: { x: -10, y: 50 },
        end: { x: 110, y: 50 },
        curve: `M -10 50 Q 25 ${48 + (Math.random() - 0.5) * 4} 50 50 Q 75 ${52 + (Math.random() - 0.5) * 4} 110 50`
      }),
      vertical: () => ({
        start: { x: 50, y: -10 },
        end: { x: 50, y: 110 },
        curve: `M 50 -10 Q ${48 + (Math.random() - 0.5) * 4} 25 50 50 Q ${52 + (Math.random() - 0.5) * 4} 75 50 110`
      }),
      cross: () => {
        if (index % 2 === 0) {
          return patterns.diagonal();
        } else {
          return {
            start: { x: 100, y: 100 },
            end: { x: 0, y: 0 },
            curve: `M 100 100 Q 70 70 50 50 Q 30 30 0 0`
          };
        }
      }
    };

    const pattern = patterns[direction] || patterns.diagonal;
    const { start, end, curve } = pattern();
    
    return {
      id: `slash-${index}`,
      path: curve,
      start,
      end,
      width: config.wireWidth + Math.random() * 2,
      opacity: Math.random() * 0.3 + 0.7,
      delay: index * 100 + Math.random() * 100,
      speed: Math.random() * 200 + 400,
      trailLength: Math.random() * 30 + 20
    };
  };

  const generateSparkles = (slashes, config) => {
    const sparkles = [];
    
    slashes.forEach((slash, slashIndex) => {
      const sparkleCount = Math.floor(config.sparkleCount / slashes.length);
      
      for (let i = 0; i < sparkleCount; i++) {
        const progress = Math.random();
        const x = slash.start.x + (slash.end.x - slash.start.x) * progress;
        const y = slash.start.y + (slash.end.y - slash.start.y) * progress;
        
        sparkles.push({
          id: `sparkle-${slashIndex}-${i}`,
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.7 + 0.3,
          delay: slash.delay + Math.random() * 200,
          duration: Math.random() * 300 + 200,
          speedX: (Math.random() - 0.5) * 4,
          speedY: (Math.random() - 0.5) * 4,
          rotation: Math.random() * 360
        });
      }
    });
    
    return sparkles;
  };

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      const config = intensityConfig[intensity];
      
      // Generate slashes
      const newSlashes = Array.from({ length: config.slashCount }, (_, i) => 
        generateSlash(i, direction, config)
      );
      setSlashes(newSlashes);
      
      // Generate sparkles along slash paths
      const newSparkles = generateSparkles(newSlashes, config);
      setSparkles(newSparkles);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlashes([]);
        setSparkles([]);
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, direction, intensity, duration, isAnimating]);

  if (!isActive && !isAnimating) return null;

  const currentColor = colorClasses[color] || colorClasses.silver;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Wire slashes */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wire-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-transparent" />
            <stop offset="20%" className={`${color === 'silver' ? 'stop-gray-300' : 
              color === 'gold' ? 'stop-yellow-400' : 'stop-blue-300'}`} />
            <stop offset="50%" className="stop-white" />
            <stop offset="80%" className={`${color === 'silver' ? 'stop-gray-400' : 
              color === 'gold' ? 'stop-amber-400' : 'stop-blue-400'}`} />
            <stop offset="100%" className="stop-transparent" />
          </linearGradient>
          
          <filter id={`wire-glow-${color}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <mask id={`slash-mask-${color}`}>
            <rect width="100%" height="100%" fill="black"/>
            {slashes.map((slash) => (
              <path
                key={`mask-${slash.id}`}
                d={slash.path}
                stroke="white"
                strokeWidth={slash.width * 2}
                fill="none"
                opacity="1"
              />
            ))}
          </mask>
        </defs>
        
        {slashes.map((slash) => (
          <g key={slash.id}>
            {/* Main wire slash */}
            <path
              d={slash.path}
              stroke={`url(#wire-gradient-${color})`}
              strokeWidth={slash.width}
              fill="none"
              opacity={slash.opacity}
              filter={`url(#wire-glow-${color})`}
              strokeLinecap="round"
              className="animate-slash"
              style={{
                animationDelay: `${slash.delay}ms`,
                animationDuration: `${slash.speed}ms`,
                animationFillMode: 'forwards',
                strokeDasharray: slash.trailLength,
                strokeDashoffset: slash.trailLength,
              }}
            />
            
            {/* Secondary glow */}
            <path
              d={slash.path}
              stroke="white"
              strokeWidth={slash.width * 0.3}
              fill="none"
              opacity={slash.opacity * 1.5}
              strokeLinecap="round"
              className="animate-slash"
              style={{
                animationDelay: `${slash.delay}ms`,
                animationDuration: `${slash.speed}ms`,
                animationFillMode: 'forwards',
                strokeDasharray: slash.trailLength,
                strokeDashoffset: slash.trailLength,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Sparkle effects */}
      <div className="absolute inset-0">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className={`absolute ${currentColor.sparkle} rounded-full animate-sparkle`}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              opacity: sparkle.opacity,
              transform: `rotate(${sparkle.rotation}deg)`,
              animationDelay: `${sparkle.delay}ms`,
              animationDuration: `${sparkle.duration}ms`,
              boxShadow: `0 0 ${sparkle.size * 2}px currentColor`,
              filter: 'brightness(1.5)'
            }}
          />
        ))}
      </div>

      {/* Screen flash effect */}
      {isAnimating && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${currentColor.wire} opacity-5 animate-pulse`}
          style={{ 
            animationDuration: '100ms',
            animationIterationCount: 3
          }}
        />
      )}

      {/* Cut line effect */}
      {isAnimating && direction !== 'cross' && (
        <div 
          className="absolute bg-white/20 animate-fade-out"
          style={{
            ...(direction === 'diagonal' && {
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'linear-gradient(135deg, transparent 49%, white 50%, transparent 51%)',
              height: '2px',
              transform: 'rotate(45deg) translateY(50vh)'
            }),
            ...(direction === 'horizontal' && {
              top: '50%',
              left: '0',
              right: '0',
              height: '2px',
              background: 'white'
            }),
            ...(direction === 'vertical' && {
              top: '0',
              bottom: '0',
              left: '50%',
              width: '2px',
              background: 'white'
            }),
            animationDuration: '300ms',
            animationDelay: '200ms'
          }}
        />
      )}
    </div>
  );
};

export default WireSlashEffect;