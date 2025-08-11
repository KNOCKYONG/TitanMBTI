import { useState, useEffect, useRef } from 'react';

const WingsCursor = ({ 
  isEnabled = true,
  wingType = 'survey', // 'survey', 'colossal', 'attack', 'wings-of-freedom'
  size = 'medium',
  opacity = 0.7,
  followSpeed = 0.1,
  flapIntensity = 'normal'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wingPosition, setWingPosition] = useState({ x: 0, y: 0 });
  const [isFlapping, setIsFlapping] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const requestRef = useRef();
  const previousPosition = useRef({ x: 0, y: 0 });

  const sizeConfig = {
    small: { width: 40, height: 20, scale: 0.8 },
    medium: { width: 60, height: 30, scale: 1 },
    large: { width: 80, height: 40, scale: 1.2 },
    titan: { width: 120, height: 60, scale: 1.5 }
  };

  const wingDesigns = {
    survey: {
      color: 'from-green-400 to-green-600',
      shape: 'M0,15 Q10,5 20,10 Q30,0 40,8 Q50,15 60,12 Q50,25 40,22 Q30,30 20,20 Q10,25 0,15 Z',
      glow: 'shadow-green-400/30'
    },
    colossal: {
      color: 'from-red-500 to-red-700',
      shape: 'M0,15 Q15,2 30,8 Q45,0 60,10 Q50,20 40,18 Q25,25 15,22 Q5,28 0,15 Z',
      glow: 'shadow-red-500/30'
    },
    attack: {
      color: 'from-amber-400 to-yellow-600',
      shape: 'M0,15 Q12,8 25,12 Q35,5 45,10 Q55,0 60,15 Q50,22 35,20 Q25,28 12,22 Q0,25 0,15 Z',
      glow: 'shadow-amber-400/30'
    },
    'wings-of-freedom': {
      color: 'from-blue-400 to-cyan-600',
      shape: 'M0,15 Q8,3 18,8 Q28,0 38,5 Q48,2 58,10 Q60,15 55,20 Q45,25 35,22 Q25,28 18,22 Q8,27 0,15 Z',
      glow: 'shadow-cyan-400/30'
    }
  };

  const currentConfig = sizeConfig[size];
  const currentDesign = wingDesigns[wingType];

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsFlapping(true);
    const handleMouseLeave = () => setIsFlapping(false);

    if (isEnabled) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseenter', handleMouseEnter);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isEnabled]);

  // Smooth wing following animation
  useEffect(() => {
    const animate = () => {
      setWingPosition(prevPos => {
        const dx = mousePosition.x - prevPos.x;
        const dy = mousePosition.y - prevPos.y;
        
        // Calculate velocity for flapping effect
        const newVelocity = {
          x: (mousePosition.x - previousPosition.current.x) * 0.1,
          y: (mousePosition.y - previousPosition.current.y) * 0.1
        };
        setVelocity(newVelocity);
        
        previousPosition.current = mousePosition;
        
        return {
          x: prevPos.x + dx * followSpeed,
          y: prevPos.y + dy * followSpeed
        };
      });

      if (isEnabled) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (isEnabled) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isEnabled, mousePosition, followSpeed]);

  // Determine flap intensity based on movement speed
  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const flapSpeed = Math.max(0.5, Math.min(3, speed * 10));
  
  if (!isEnabled) return null;

  return (
    <div 
      className="fixed pointer-events-none z-50"
      style={{
        left: wingPosition.x - currentConfig.width / 2,
        top: wingPosition.y - currentConfig.height / 2,
        transform: `scale(${currentConfig.scale}) rotate(${velocity.x * 2}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Left Wing */}
      <div 
        className={`absolute ${currentDesign.glow} animate-wing-flap`}
        style={{
          left: -currentConfig.width * 0.7,
          top: 0,
          width: currentConfig.width,
          height: currentConfig.height,
          opacity,
          transform: 'scaleX(-1)',
          animationDuration: `${2 / flapSpeed}s`,
          transformOrigin: 'right center'
        }}
      >
        <svg 
          width={currentConfig.width} 
          height={currentConfig.height}
          viewBox={`0 0 ${currentConfig.width} ${currentConfig.height}`}
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id={`wing-gradient-left-${wingType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${wingType === 'survey' ? 'stop-green-400' : 
                wingType === 'colossal' ? 'stop-red-500' :
                wingType === 'attack' ? 'stop-amber-400' : 'stop-blue-400'}`} />
              <stop offset="100%" className={`${wingType === 'survey' ? 'stop-green-600' : 
                wingType === 'colossal' ? 'stop-red-700' :
                wingType === 'attack' ? 'stop-yellow-600' : 'stop-cyan-600'}`} />
            </linearGradient>
            <filter id={`wing-glow-left-${wingType}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={currentDesign.shape}
            fill={`url(#wing-gradient-left-${wingType})`}
            filter={`url(#wing-glow-left-${wingType})`}
            opacity={opacity}
          />
          {/* Wing details */}
          <path
            d={currentDesign.shape}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            opacity={opacity * 0.7}
          />
        </svg>
      </div>

      {/* Right Wing */}
      <div 
        className={`absolute ${currentDesign.glow} animate-wing-flap`}
        style={{
          right: -currentConfig.width * 0.7,
          top: 0,
          width: currentConfig.width,
          height: currentConfig.height,
          opacity,
          animationDuration: `${2 / flapSpeed}s`,
          animationDelay: '0.1s',
          transformOrigin: 'left center'
        }}
      >
        <svg 
          width={currentConfig.width} 
          height={currentConfig.height}
          viewBox={`0 0 ${currentConfig.width} ${currentConfig.height}`}
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id={`wing-gradient-right-${wingType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${wingType === 'survey' ? 'stop-green-400' : 
                wingType === 'colossal' ? 'stop-red-500' :
                wingType === 'attack' ? 'stop-amber-400' : 'stop-blue-400'}`} />
              <stop offset="100%" className={`${wingType === 'survey' ? 'stop-green-600' : 
                wingType === 'colossal' ? 'stop-red-700' :
                wingType === 'attack' ? 'stop-yellow-600' : 'stop-cyan-600'}`} />
            </linearGradient>
            <filter id={`wing-glow-right-${wingType}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={currentDesign.shape}
            fill={`url(#wing-gradient-right-${wingType})`}
            filter={`url(#wing-glow-right-${wingType})`}
            opacity={opacity}
          />
          {/* Wing details */}
          <path
            d={currentDesign.shape}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            opacity={opacity * 0.7}
          />
        </svg>
      </div>

      {/* Center emblem (Wings of Freedom logo) */}
      {wingType === 'wings-of-freedom' && (
        <div 
          className="absolute bg-white rounded-full flex items-center justify-center"
          style={{
            left: '50%',
            top: '50%',
            width: currentConfig.width * 0.3,
            height: currentConfig.width * 0.3,
            transform: 'translate(-50%, -50%)',
            opacity: opacity * 0.9
          }}
        >
          <div className="text-xs font-bold text-gray-800" style={{ fontSize: currentConfig.width * 0.08 }}>
            自由
          </div>
        </div>
      )}

      {/* Speed trail effect */}
      {speed > 0.5 && (
        <div 
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: currentConfig.width * 2,
            height: currentConfig.height * 2,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse, ${currentDesign.color.split(' ')[1]} 0%, transparent 70%)`,
            opacity: Math.min(0.3, speed * 0.1),
            borderRadius: '50%',
            filter: 'blur(10px)'
          }}
        />
      )}
    </div>
  );
};

export default WingsCursor;