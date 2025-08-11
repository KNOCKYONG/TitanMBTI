import { useState, useEffect, useRef } from 'react';

const SteamEffect = ({ 
  isActive = false,
  intensity = 'medium',
  color = 'white',
  direction = 'up',
  opacity = 0.6,
  useImage = false
}) => {
  const [particles, setParticles] = useState([]);
  const animationRef = useRef();
  const containerRef = useRef();

  const intensityConfig = {
    low: { particleCount: 15, spawnRate: 100, size: { min: 20, max: 40 } },
    medium: { particleCount: 25, spawnRate: 80, size: { min: 30, max: 60 } },
    high: { particleCount: 40, spawnRate: 60, size: { min: 40, max: 80 } },
    titan: { particleCount: 60, spawnRate: 40, size: { min: 50, max: 100 } }
  };

  const colorClasses = {
    white: 'bg-white/30',
    gray: 'bg-gray-400/40',
    yellow: 'bg-yellow-100/50',
    blue: 'bg-blue-100/40',
    red: 'bg-red-100/30'
  };

  const createParticle = () => {
    const config = intensityConfig[intensity];
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;

    return {
      id: Math.random(),
      x: Math.random() * containerWidth,
      y: direction === 'up' ? containerHeight + 50 : -50,
      size: Math.random() * (config.size.max - config.size.min) + config.size.min,
      speedY: direction === 'up' ? -(Math.random() * 2 + 1) : Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * opacity + 0.1,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      life: 1.0,
      maxLife: Math.random() * 3000 + 2000,
      startTime: Date.now()
    };
  };

  const updateParticles = () => {
    if (!isActive) return;

    setParticles(prevParticles => {
      const now = Date.now();
      const config = intensityConfig[intensity];
      
      // Update existing particles
      const updatedParticles = prevParticles
        .map(particle => {
          const age = now - particle.startTime;
          const life = Math.max(0, 1 - (age / particle.maxLife));
          
          return {
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            scale: particle.scale + 0.01, // Gradually expand
            opacity: particle.opacity * life * (1 - Math.pow(1 - life, 3)), // Fade out
            rotation: particle.rotation + particle.rotationSpeed,
            life
          };
        })
        .filter(particle => particle.life > 0);

      // Add new particles if needed
      const needNewParticles = updatedParticles.length < config.particleCount && Math.random() < 0.7;
      if (needNewParticles) {
        updatedParticles.push(createParticle());
      }

      return updatedParticles;
    });
  };

  useEffect(() => {
    if (isActive) {
      const config = intensityConfig[intensity];
      // Initialize particles
      const initialParticles = Array.from({ length: Math.floor(config.particleCount / 2) }, createParticle);
      setParticles(initialParticles);

      // Start animation loop
      const animate = () => {
        updateParticles();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Fade out existing particles
      setParticles([]);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, intensity]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        updateParticles();
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  if (!isActive && particles.length === 0) return null;

  // Use SVG image if specified
  if (useImage) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img 
          src="/images/effects/steam.svg" 
          alt="" 
          className={`absolute inset-0 w-full h-full object-cover ${isActive ? 'opacity-70' : 'opacity-0'} transition-opacity duration-500`}
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full blur-sm ${colorClasses[color]} transition-all duration-100`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `
              translate(-50%, -50%) 
              scale(${particle.scale}) 
              rotate(${particle.rotation}deg)
              rotateX(${Math.sin(Date.now() * 0.001 + particle.id) * 10}deg)
            `,
            filter: `blur(${2 + particle.scale}px)`,
            background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
          }}
        />
      ))}
      
      {/* Additional ambient steam overlay */}
      {isActive && (
        <div 
          className={`absolute inset-0 ${colorClasses[color]} opacity-10 animate-pulse`}
          style={{
            background: `radial-gradient(ellipse at center ${direction === 'up' ? 'bottom' : 'top'}, currentColor 0%, transparent 60%)`,
            animationDuration: '3s'
          }}
        />
      )}
    </div>
  );
};

export default SteamEffect;