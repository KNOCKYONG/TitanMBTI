import { useState, useEffect } from 'react';

// Hook to detect device capabilities and user preferences
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isLowPowerMode: false,
    prefersReducedMotion: false,
    supportsWebGL: false,
    devicePixelRatio: 1,
    isTouchDevice: false,
    networkSpeed: 'fast'
  });

  useEffect(() => {
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth <= 768;

    // Touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL support
    let supportsWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      supportsWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      supportsWebGL = false;
    }

    // Device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Battery/performance estimation
    const isLowPowerMode = devicePixelRatio < 2 && (isMobile || navigator.hardwareConcurrency < 4);

    // Network speed detection
    let networkSpeed = 'fast';
    if (navigator.connection) {
      const effectiveType = navigator.connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        networkSpeed = 'slow';
      } else if (effectiveType === '3g') {
        networkSpeed = 'medium';
      }
    }

    setCapabilities({
      isMobile,
      isLowPowerMode,
      prefersReducedMotion,
      supportsWebGL,
      devicePixelRatio,
      isTouchDevice,
      networkSpeed
    });

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => {
      setCapabilities(prev => ({ ...prev, prefersReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return capabilities;
};

// Effect configuration based on device capabilities
export const getOptimizedEffectConfig = (capabilities, baseConfig = {}) => {
  const { isMobile, isLowPowerMode, prefersReducedMotion, networkSpeed } = capabilities;

  // Base mobile optimizations
  let optimizedConfig = {
    ...baseConfig,
    // Reduce particle counts on mobile
    particleCount: isMobile ? Math.max(1, Math.floor((baseConfig.particleCount || 10) * 0.5)) : (baseConfig.particleCount || 10),
    // Lower frame rates on low power devices
    frameRate: isLowPowerMode ? 30 : 60,
    // Disable complex effects on reduced motion
    enableComplexAnimations: !prefersReducedMotion,
    // Reduce quality on slow networks
    quality: networkSpeed === 'slow' ? 'low' : networkSpeed === 'medium' ? 'medium' : 'high'
  };

  // Specific optimizations for different effect types
  if (prefersReducedMotion) {
    optimizedConfig = {
      ...optimizedConfig,
      animationDuration: 100, // Very fast animations
      disableAutoplay: true,
      reduceMotion: true,
      particleCount: 0, // No particles
      enableLightning: false,
      enableSteam: false,
      enableShake: false
    };
  } else if (isMobile) {
    optimizedConfig = {
      ...optimizedConfig,
      animationDuration: Math.max(200, (baseConfig.animationDuration || 500) * 0.8),
      particleSize: Math.max(2, (baseConfig.particleSize || 4) * 0.7),
      blurRadius: Math.max(1, (baseConfig.blurRadius || 2) * 0.5),
      enableShadows: false, // Shadows are expensive
      enableGradients: networkSpeed !== 'slow'
    };
  } else if (isLowPowerMode) {
    optimizedConfig = {
      ...optimizedConfig,
      animationDuration: Math.max(300, (baseConfig.animationDuration || 500) * 1.2),
      particleCount: Math.floor(optimizedConfig.particleCount * 0.7),
      enableComplexShaders: false,
      enableBloom: false
    };
  }

  return optimizedConfig;
};

// Mobile-optimized effect wrapper component
const MobileOptimizedEffect = ({ 
  children,
  fallback = null,
  requiresWebGL = false,
  minPerformance = 'low' // 'low', 'medium', 'high'
}) => {
  const capabilities = useDeviceCapabilities();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const { 
      prefersReducedMotion, 
      isLowPowerMode, 
      supportsWebGL,
      networkSpeed 
    } = capabilities;

    // Don't render if user prefers reduced motion
    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    // Don't render WebGL effects if not supported
    if (requiresWebGL && !supportsWebGL) {
      setShouldRender(false);
      return;
    }

    // Performance-based filtering
    const performanceScore = getPerformanceScore(capabilities);
    const requiredScore = {
      'low': 1,
      'medium': 2, 
      'high': 3
    }[minPerformance];

    setShouldRender(performanceScore >= requiredScore);
  }, [capabilities, requiresWebGL, minPerformance]);

  if (!shouldRender) {
    return fallback;
  }

  return children;
};

// Calculate performance score
const getPerformanceScore = (capabilities) => {
  const { 
    isMobile, 
    isLowPowerMode, 
    supportsWebGL, 
    devicePixelRatio,
    networkSpeed 
  } = capabilities;

  let score = 3; // Start with high performance

  if (isMobile) score -= 1;
  if (isLowPowerMode) score -= 1;
  if (!supportsWebGL) score -= 0.5;
  if (devicePixelRatio < 2) score -= 0.5;
  if (networkSpeed === 'slow') score -= 1;
  if (networkSpeed === 'medium') score -= 0.5;

  return Math.max(1, Math.floor(score));
};

// Touch-optimized interaction handlers
export const useTouchOptimizedGestures = (onGesture) => {
  useEffect(() => {
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    let touchMoves = [];

    const handleTouchStart = (e) => {
      touchStartTime = Date.now();
      const touch = e.touches[0];
      touchStartPos = { x: touch.clientX, y: touch.clientY };
      touchMoves = [touchStartPos];
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchMoves.push({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (e) => {
      const touchEndTime = Date.now();
      const duration = touchEndTime - touchStartTime;
      const touch = e.changedTouches[0];
      const endPos = { x: touch.clientX, y: touch.clientY };

      // Calculate gesture properties
      const distance = Math.sqrt(
        Math.pow(endPos.x - touchStartPos.x, 2) + 
        Math.pow(endPos.y - touchStartPos.y, 2)
      );

      const velocity = distance / duration;
      
      // Determine gesture type
      let gestureType = 'tap';
      if (duration < 200 && distance < 10) {
        gestureType = 'tap';
      } else if (duration > 500 && distance < 10) {
        gestureType = 'longPress';
      } else if (velocity > 0.5) {
        gestureType = 'swipe';
      } else if (isCircularGesture(touchMoves)) {
        gestureType = 'circle';
      }

      onGesture({
        type: gestureType,
        startPos: touchStartPos,
        endPos,
        distance,
        duration,
        velocity,
        moves: touchMoves
      });
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onGesture]);
};

const isCircularGesture = (moves) => {
  if (moves.length < 10) return false;

  const centerX = moves.reduce((sum, pos) => sum + pos.x, 0) / moves.length;
  const centerY = moves.reduce((sum, pos) => sum + pos.y, 0) / moves.length;

  let angleSum = 0;
  for (let i = 1; i < moves.length; i++) {
    const prev = moves[i - 1];
    const curr = moves[i];
    
    const angle1 = Math.atan2(prev.y - centerY, prev.x - centerX);
    const angle2 = Math.atan2(curr.y - centerY, curr.x - centerX);
    
    let angleDiff = angle2 - angle1;
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    
    angleSum += angleDiff;
  }

  return Math.abs(angleSum) > Math.PI;
};

// Performance monitor hook
export const usePerformanceMonitor = (onPerformanceChange) => {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let frameRate = 60;

    const measureFrameRate = (currentTime) => {
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        frameRate = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        onPerformanceChange({
          fps: frameRate,
          performance: frameRate >= 50 ? 'good' : frameRate >= 30 ? 'fair' : 'poor'
        });
      }
      
      requestAnimationFrame(measureFrameRate);
    };

    const animationId = requestAnimationFrame(measureFrameRate);
    return () => cancelAnimationFrame(animationId);
  }, [onPerformanceChange]);
};

export default MobileOptimizedEffect;