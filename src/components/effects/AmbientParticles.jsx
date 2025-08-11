import { useState, useEffect, useRef } from 'react';

const AmbientParticles = ({ 
  isActive = true,
  particleType = 'dust', // 'dust', 'embers', 'snowflakes', 'sparks', 'leaves'
  density = 'low', // 'low', 'medium', 'high'
  color = 'white',
  speed = 'slow',
  direction = 'up',
  interactive = false,
  respawnEdge = true
}) => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef();
  const animationRef = useRef();

  const densityConfig = {
    low: 15,
    medium: 30,
    high: 50
  };

  const speedConfig = {
    slow: { min: 0.5, max: 1.5 },
    medium: { min: 1, max: 3 },
    fast: { min: 2, max: 5 }
  };

  const particleTypes = {
    dust: {
      size: { min: 1, max: 3 },
      opacity: { min: 0.1, max: 0.3 },
      shape: 'circle',
      blur: 1
    },
    embers: {
      size: { min: 2, max: 5 },
      opacity: { min: 0.3, max: 0.7 },
      shape: 'circle',
      blur: 2,
      glow: true
    },
    snowflakes: {
      size: { min: 3, max: 8 },
      opacity: { min: 0.4, max: 0.8 },
      shape: 'snowflake',
      blur: 0.5
    },
    sparks: {
      size: { min: 1, max: 4 },
      opacity: { min: 0.5, max: 1 },
      shape: 'spark',
      blur: 1,
      glow: true
    },
    leaves: {
      size: { min: 4, max: 10 },
      opacity: { min: 0.2, max: 0.6 },
      shape: 'leaf',
      blur: 0.5
    }
  };

  const colorMap = {
    white: 'rgba(255, 255, 255, ',
    gold: 'rgba(255, 215, 0, ',
    red: 'rgba(255, 99, 71, ',
    blue: 'rgba(135, 206, 235, ',
    green: 'rgba(144, 238, 144, ',
    purple: 'rgba(147, 112, 219, ',
    orange: 'rgba(255, 165, 0, '
  };

  const createParticle = (index) => {
    const container = containerRef.current;
    if (!container) return null;

    const { width, height } = container.getBoundingClientRect();
    const config = particleTypes[particleType];
    const speedRange = speedConfig[speed];

    let startX, startY, targetX, targetY;
    
    // Spawn position based on direction
    switch (direction) {
      case 'up':
        startX = Math.random() * width;
        startY = height + 20;
        targetX = startX + (Math.random() - 0.5) * 100;
        targetY = -20;
        break;
      case 'down':
        startX = Math.random() * width;
        startY = -20;
        targetX = startX + (Math.random() - 0.5) * 100;
        targetY = height + 20;
        break;
      case 'left':
        startX = width + 20;
        startY = Math.random() * height;
        targetX = -20;
        targetY = startY + (Math.random() - 0.5) * 100;
        break;
      case 'right':
        startX = -20;
        startY = Math.random() * height;
        targetX = width + 20;
        targetY = startY + (Math.random() - 0.5) * 100;
        break;
      default:
        startX = Math.random() * width;
        startY = Math.random() * height;
        targetX = startX;
        targetY = startY - 200;
    }

    return {
      id: `particle-${index}-${Date.now()}`,
      x: startX,
      y: startY,
      targetX,
      targetY,
      size: Math.random() * (config.size.max - config.size.min) + config.size.min,
      opacity: Math.random() * (config.opacity.max - config.opacity.min) + config.opacity.min,
      speedX: (targetX - startX) / 1000 * (Math.random() * (speedRange.max - speedRange.min) + speedRange.min),
      speedY: (targetY - startY) / 1000 * (Math.random() * (speedRange.max - speedRange.min) + speedRange.min),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 3000 + Math.random() * 5000,
      startTime: Date.now(),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02
    };
  };

  const updateParticles = () => {
    if (!isActive) return;

    setParticles(prevParticles => {
      const now = Date.now();
      const container = containerRef.current;
      if (!container) return prevParticles;

      const { width, height } = container.getBoundingClientRect();
      
      // Update existing particles
      const updatedParticles = prevParticles.map(particle => {
        const age = now - particle.startTime;
        const life = Math.max(0, 1 - (age / particle.maxLife));
        
        // Interactive effect
        let attractionX = 0, attractionY = 0;
        if (interactive) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.1;
            attractionX = (dx / distance) * force;
            attractionY = (dy / distance) * force;
          }
        }
        
        // Wobble effect for natural movement
        const wobbleOffsetX = Math.sin(particle.wobble) * 0.5;
        const wobbleOffsetY = Math.cos(particle.wobble * 0.7) * 0.3;
        
        return {
          ...particle,
          x: particle.x + particle.speedX + attractionX + wobbleOffsetX,
          y: particle.y + particle.speedY + attractionY + wobbleOffsetY,
          rotation: particle.rotation + particle.rotationSpeed,
          wobble: particle.wobble + particle.wobbleSpeed,
          opacity: particle.opacity * life,
          life
        };
      }).filter(particle => {
        // Remove particles that are out of bounds or dead
        return particle.life > 0 && 
               particle.x > -50 && particle.x < width + 50 &&
               particle.y > -50 && particle.y < height + 50;
      });

      // Add new particles if needed
      const targetCount = densityConfig[density];
      const needNewParticles = updatedParticles.length < targetCount;
      
      if (needNewParticles && Math.random() < 0.1) {
        const newParticle = createParticle(updatedParticles.length);
        if (newParticle) {
          updatedParticles.push(newParticle);
        }
      }

      return updatedParticles;
    });
  };

  // Mouse tracking for interactive mode
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      // Initialize particles
      const initialParticles = Array.from({ length: Math.floor(densityConfig[density] / 3) }, (_, i) => createParticle(i)).filter(Boolean);
      setParticles(initialParticles);
      
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setParticles([]);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, density, particleType, speed, direction]);

  const renderParticle = (particle) => {
    const config = particleTypes[particleType];
    const baseColor = colorMap[color] || colorMap.white;
    
    const particleStyle = {
      position: 'absolute',
      left: `${particle.x}px`,
      top: `${particle.y}px`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
      transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
      pointerEvents: 'none',
      filter: config.blur ? `blur(${config.blur}px)` : undefined,
      boxShadow: config.glow ? `0 0 ${particle.size * 2}px ${baseColor}0.8)` : undefined
    };

    switch (config.shape) {
      case 'circle':
        return (
          <div
            key={particle.id}
            style={{
              ...particleStyle,
              borderRadius: '50%',
              backgroundColor: `${baseColor}${particle.opacity})`
            }}
          />
        );
      
      case 'spark':
        return (
          <div
            key={particle.id}
            style={{
              ...particleStyle,
              background: `linear-gradient(45deg, ${baseColor}${particle.opacity}), transparent)`,
              clipPath: 'polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)'
            }}
          />
        );
      
      case 'snowflake':
        return (
          <div
            key={particle.id}
            style={{
              ...particleStyle,
              color: `${baseColor}${particle.opacity})`,
              fontFamily: 'monospace',
              fontSize: `${particle.size}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ❄
          </div>
        );
      
      case 'leaf':
        return (
          <div
            key={particle.id}
            style={{
              ...particleStyle,
              background: `${baseColor}${particle.opacity})`,
              borderRadius: '0 100% 0 100%',
              transform: `${particleStyle.transform} rotateY(${Math.sin(particle.wobble) * 30}deg)`
            }}
          />
        );
      
      default:
        return (
          <div
            key={particle.id}
            style={{
              ...particleStyle,
              borderRadius: '50%',
              backgroundColor: `${baseColor}${particle.opacity})`
            }}
          />
        );
    }
  };

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ 
        perspective: '1000px',
        zIndex: interactive ? 20 : 5
      }}
    >
      {particles.map(renderParticle)}
      
      {/* Interactive cursor effect */}
      {interactive && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colorMap[color]}0.1) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease-out'
          }}
        />
      )}
    </div>
  );
};

export default AmbientParticles;