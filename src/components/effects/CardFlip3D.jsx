import { useState, useEffect } from 'react';

const CardFlip3D = ({ 
  children,
  isFlipping = false,
  flipDirection = 'horizontal', // 'horizontal', 'vertical', 'diagonal'
  duration = 600,
  onComplete = () => {},
  flipTrigger = null, // Element that triggers the flip
  perspective = 1000,
  rotateIntensity = 180
}) => {
  const [currentFlipState, setCurrentFlipState] = useState('front');
  const [isAnimating, setIsAnimating] = useState(false);

  const flipDirections = {
    horizontal: {
      axis: 'rotateY',
      transform: 'perspective(1000px) rotateY(180deg)'
    },
    vertical: {
      axis: 'rotateX', 
      transform: 'perspective(1000px) rotateX(180deg)'
    },
    diagonal: {
      axis: 'rotate3d',
      transform: 'perspective(1000px) rotate3d(1, 1, 0, 180deg)'
    },
    titanSlash: {
      axis: 'rotate3d',
      transform: 'perspective(1500px) rotate3d(1, 0.5, 0.3, 180deg) scale(0.9)'
    }
  };

  const getFlipTransform = (progress, direction) => {
    const config = flipDirections[direction] || flipDirections.horizontal;
    const rotation = progress * rotateIntensity;
    
    switch (direction) {
      case 'horizontal':
        return `perspective(${perspective}px) rotateY(${rotation}deg)`;
      case 'vertical':
        return `perspective(${perspective}px) rotateX(${rotation}deg)`;
      case 'diagonal':
        return `perspective(${perspective}px) rotate3d(1, 1, 0, ${rotation}deg)`;
      case 'titanSlash':
        return `perspective(${perspective * 1.5}px) rotate3d(1, 0.5, 0.3, ${rotation}deg) scale(${1 - progress * 0.1})`;
      default:
        return config.transform;
    }
  };

  useEffect(() => {
    if (isFlipping && !isAnimating) {
      setIsAnimating(true);
      
      // Add CSS custom properties for animation
      const cardElement = document.querySelector('[data-card-flip="true"]');
      if (cardElement) {
        cardElement.style.setProperty('--flip-duration', `${duration}ms`);
        cardElement.style.setProperty('--flip-transform', flipDirections[flipDirection]?.transform || flipDirections.horizontal.transform);
      }

      const timer = setTimeout(() => {
        setCurrentFlipState(prev => prev === 'front' ? 'back' : 'front');
        setIsAnimating(false);
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isFlipping, flipDirection, duration, isAnimating]);

  const cardStyle = {
    transformStyle: 'preserve-3d',
    perspective: `${perspective}px`,
    transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transform: isAnimating 
      ? getFlipTransform(1, flipDirection)
      : 'perspective(1000px) rotateY(0deg)',
  };

  return (
    <div className="relative w-full h-full" style={{ perspective: `${perspective}px` }}>
      <div
        data-card-flip="true"
        className={`
          relative w-full h-full
          ${isAnimating ? 'animate-card-flip' : ''}
          transition-transform duration-300
        `}
        style={cardStyle}
      >
        {/* Front face */}
        <div 
          className={`
            absolute inset-0 w-full h-full backface-hidden
            ${currentFlipState === 'back' ? 'invisible' : 'visible'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          {children}
        </div>

        {/* Back face */}
        <div 
          className={`
            absolute inset-0 w-full h-full backface-hidden
            ${currentFlipState === 'front' ? 'invisible' : 'visible'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: flipDirection === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)'
          }}
        >
          {/* Flipped version of content */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-titan-gold to-amber-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-white/80 text-sm">변환 중...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flip particles effect */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-titan-gold rounded-full animate-ping"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 20}%`,
                animationDelay: `${i * 50}ms`,
                animationDuration: '400ms'
              }}
            />
          ))}
        </div>
      )}

      {/* Glow effect during flip */}
      {isAnimating && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-titan-gold/10 via-amber-500/5 to-titan-gold/10 rounded-2xl animate-pulse pointer-events-none"
          style={{ 
            animationDuration: `${duration}ms`,
            filter: 'blur(20px)'
          }}
        />
      )}
    </div>
  );
};

// Higher-order component for easy integration
export const withCardFlip = (WrappedComponent, flipOptions = {}) => {
  return function CardFlipWrapper(props) {
    const [shouldFlip, setShouldFlip] = useState(false);

    const triggerFlip = () => {
      setShouldFlip(true);
      setTimeout(() => setShouldFlip(false), flipOptions.duration || 600);
    };

    return (
      <CardFlip3D
        isFlipping={shouldFlip}
        onComplete={() => setShouldFlip(false)}
        {...flipOptions}
      >
        <WrappedComponent {...props} onFlip={triggerFlip} />
      </CardFlip3D>
    );
  };
};

export default CardFlip3D;