import { useState, useEffect } from 'react';
import LightningEffect from './LightningEffect';
import WireSlashEffect from './WireSlashEffect';
import SteamEffect from './SteamEffect';

const EasterEggs = () => {
  const [activeEgg, setActiveEgg] = useState(null);
  const [clickSequence, setClickSequence] = useState([]);
  const [keySequence, setKeySequence] = useState([]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  // Konami Code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  // Click patterns for different effects
  const clickPatterns = {
    titanTransformation: [3, 3, 3], // Triple click 3 times
    wireSlash: [2, 2], // Double click 2 times
    lightning: [1, 1, 1, 1, 1], // 5 rapid single clicks
  };

  const easterEggs = {
    konamiCode: {
      name: 'Survey Corps Mode',
      message: '調査兵団、心臓を捧げよ！',
      effect: 'survey-mode',
      duration: 5000
    },
    rapidClick: {
      name: 'Titan Transformation',
      message: '거인화의 힘이 각성했습니다!',
      effect: 'titan-transform',
      duration: 3000
    },
    secretPhrase: {
      name: 'Wings of Freedom',
      message: '자유의 날개가 펼쳐집니다',
      effect: 'wings-freedom',
      duration: 4000
    },
    mouseCircle: {
      name: '3D Maneuver Gear',
      message: '입체기동장치가 활성화되었습니다!',
      effect: 'wire-slash',
      duration: 2000
    },
    longHover: {
      name: 'Wall Maria',
      message: '벽이 무너지고 있습니다...',
      effect: 'wall-crack',
      duration: 3000
    }
  };

  // Track key sequences
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeySequence(prev => {
        const newSequence = [...prev, e.code].slice(-konamiCode.length);
        
        // Check if Konami code is entered
        if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
          triggerEasterEgg('konamiCode');
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track click patterns
  useEffect(() => {
    let clickTimer;
    
    const handleClick = () => {
      const now = Date.now();
      
      setClickSequence(prev => {
        // Clean old clicks (older than 2 seconds)
        const recentClicks = prev.filter(time => now - time < 2000);
        const newSequence = [...recentClicks, now];
        
        // Check for patterns
        checkClickPatterns(newSequence);
        
        return newSequence;
      });
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, []);

  const checkClickPatterns = (clicks) => {
    // Check for rapid clicks (titan transformation)
    if (clicks.length >= 5) {
      const rapidClicks = clicks.slice(-5);
      const timeSpan = rapidClicks[4] - rapidClicks[0];
      if (timeSpan < 1000) { // 5 clicks in 1 second
        triggerEasterEgg('rapidClick');
        setClickSequence([]);
      }
    }
  };

  // Mouse tracking for circle pattern
  useEffect(() => {
    let mousePositions = [];
    let isCircling = false;
    
    const handleMouseMove = (e) => {
      const now = Date.now();
      mousePositions.push({ x: e.clientX, y: e.clientY, time: now });
      
      // Keep only recent positions (last 2 seconds)
      mousePositions = mousePositions.filter(pos => now - pos.time < 2000);
      
      // Check for circular motion
      if (mousePositions.length > 20) {
        const isCircular = detectCircularMotion(mousePositions);
        if (isCircular && !isCircling) {
          isCircling = true;
          triggerEasterEgg('mouseCircle');
          setTimeout(() => { isCircling = false; }, 3000);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const detectCircularMotion = (positions) => {
    if (positions.length < 20) return false;
    
    const recent = positions.slice(-20);
    const centerX = recent.reduce((sum, pos) => sum + pos.x, 0) / recent.length;
    const centerY = recent.reduce((sum, pos) => sum + pos.y, 0) / recent.length;
    
    let angleSum = 0;
    for (let i = 1; i < recent.length; i++) {
      const prev = recent[i - 1];
      const curr = recent[i];
      
      const angle1 = Math.atan2(prev.y - centerY, prev.x - centerX);
      const angle2 = Math.atan2(curr.y - centerY, curr.x - centerX);
      
      let angleDiff = angle2 - angle1;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
      
      angleSum += angleDiff;
    }
    
    return Math.abs(angleSum) > Math.PI; // More than 180 degrees total rotation
  };

  // Long hover detection
  useEffect(() => {
    let hoverTimer;
    let hoverElement = null;
    
    const handleMouseEnter = (e) => {
      if (e.target.className && e.target.className.includes('glass')) {
        hoverElement = e.target;
        hoverTimer = setTimeout(() => {
          if (hoverElement === e.target) {
            triggerEasterEgg('longHover');
          }
        }, 5000); // 5 second hover
      }
    };

    const handleMouseLeave = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      hoverElement = null;
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, []);

  const triggerEasterEgg = (eggType) => {
    const egg = easterEggs[eggType];
    if (!egg || activeEgg) return;
    
    setActiveEgg(egg);
    
    // Special unlocks
    if (eggType === 'konamiCode') {
      setSecretUnlocked(true);
      localStorage.setItem('titanMBTI_secretUnlocked', 'true');
    }
    
    setTimeout(() => {
      setActiveEgg(null);
    }, egg.duration);
  };

  // Check for secret unlock on mount
  useEffect(() => {
    const isUnlocked = localStorage.getItem('titanMBTI_secretUnlocked') === 'true';
    setSecretUnlocked(isUnlocked);
  }, []);

  return (
    <>
      {/* Easter egg notification */}
      {activeEgg && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass card-base p-4 max-w-sm animate-slide-up">
            <div className="text-center">
              <div className="text-lg font-bold text-titan-gold mb-2">
                🎉 {activeEgg.name}
              </div>
              <div className="text-sm text-white/80">
                {activeEgg.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Effect triggers */}
      {activeEgg?.effect === 'titan-transform' && (
        <LightningEffect 
          isActive={true}
          intensity="titan"
          color="yellow"
          duration={2000}
        />
      )}

      {activeEgg?.effect === 'wire-slash' && (
        <WireSlashEffect 
          isActive={true}
          direction="cross"
          intensity="omniGear"
          color="steel"
          duration={1500}
        />
      )}

      {activeEgg?.effect === 'survey-mode' && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <SteamEffect 
            isActive={true}
            intensity="high"
            color="green"
            opacity={0.3}
          />
          {/* Survey Corps emblem overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
              <div className="text-4xl font-bold text-green-400">自由</div>
            </div>
          </div>
        </div>
      )}

      {activeEgg?.effect === 'wings-freedom' && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Wing particles */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-8 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 transform rotate-12 rounded-full opacity-60" />
            </div>
          ))}
        </div>
      )}

      {/* Secret unlock indicator */}
      {secretUnlocked && (
        <div className="fixed bottom-4 right-4 z-30">
          <div className="w-12 h-12 bg-gradient-to-r from-titan-gold to-amber-400 rounded-full flex items-center justify-center animate-pulse cursor-pointer"
               title="Survey Corps Mode Unlocked">
            <span className="text-white font-bold text-xs">自由</span>
          </div>
        </div>
      )}

      {/* Hidden interactions */}
      <div className="fixed bottom-0 left-0 w-8 h-8 opacity-0 cursor-pointer" 
           onClick={() => triggerEasterEgg('secretPhrase')} />
      
      {/* Debug mode (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 text-xs text-white/50 font-mono">
          <div>Clicks: {clickSequence.length}</div>
          <div>Keys: {keySequence.slice(-5).map(k => k.replace('Key', '')).join('-')}</div>
          <div>Secrets: {secretUnlocked ? '✓' : '✗'}</div>
        </div>
      )}
    </>
  );
};

export default EasterEggs;