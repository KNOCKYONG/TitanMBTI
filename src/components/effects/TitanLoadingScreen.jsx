import { useState, useEffect } from 'react';
import SteamEffect from './SteamEffect';
import LightningEffect from './LightningEffect';

const TitanLoadingScreen = ({ 
  isVisible = true,
  onComplete = () => {},
  loadingText = "벽 너머의 진실을 찾고 있습니다...",
  duration = 3000,
  theme = 'wall' // 'wall', 'titan', 'survey'
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('loading'); // loading, analyzing, complete
  const [showLightning, setShowLightning] = useState(false);
  const [wallCracks, setWallCracks] = useState([]);

  const themes = {
    wall: {
      bgGradient: 'from-stone-800 via-stone-700 to-stone-900',
      accentColor: 'wall-brown',
      wallColor: '#8D6E63',
      text: '벽 너머의 진실을 찾고 있습니다...'
    },
    titan: {
      bgGradient: 'from-red-900 via-red-800 to-gray-900',
      accentColor: 'red-600',
      wallColor: '#B71C1C',
      text: '거인의 힘이 깨어나고 있습니다...'
    },
    survey: {
      bgGradient: 'from-green-900 via-green-800 to-gray-900',
      accentColor: 'green-600',
      wallColor: '#2E7D32',
      text: '조사병단의 분석이 진행 중입니다...'
    }
  };

  const currentTheme = themes[theme];

  // Generate wall crack pattern
  const generateWallCracks = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      path: `M${10 + i * 10},0 Q${15 + i * 10},50 ${10 + i * 10},100`,
      width: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: i * 200
    }));
  };

  // Loading progress animation
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 - prev) * 0.02;
        
        // Phase transitions
        if (newProgress > 30 && currentPhase === 'loading') {
          setCurrentPhase('analyzing');
          setShowLightning(true);
          setWallCracks(generateWallCracks());
        } else if (newProgress > 80 && currentPhase === 'analyzing') {
          setCurrentPhase('complete');
        }
        
        if (newProgress >= 99.5) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, currentPhase, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br ${currentTheme.bgGradient} flex items-center justify-center`}>
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${currentTheme.wallColor}' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Wall structure */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main wall */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-stone-700 to-stone-600 opacity-40">
          {/* Wall blocks pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 40px'
          }} />
          
          {/* Wall cracks */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {wallCracks.map((crack) => (
              <path
                key={crack.id}
                d={crack.path}
                stroke="rgba(0,0,0,0.6)"
                strokeWidth={crack.width}
                fill="none"
                opacity={crack.opacity}
                className="animate-crack-grow"
                style={{
                  animationDelay: `${crack.delay}ms`,
                  animationDuration: '800ms'
                }}
              />
            ))}
          </svg>
        </div>

        {/* Top wall edge */}
        <div className="absolute top-1/4 left-0 right-0 h-12 bg-gradient-to-b from-stone-500 to-stone-600 opacity-60">
          <div className="h-full bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </div>
      </div>

      {/* Steam effects */}
      <div className="absolute inset-0">
        <SteamEffect 
          isActive={currentPhase !== 'loading'} 
          intensity="medium" 
          color="gray" 
          opacity={0.4} 
        />
      </div>

      {/* Lightning effects */}
      <LightningEffect 
        isActive={showLightning}
        intensity="high"
        color="yellow"
        duration={500}
        onComplete={() => setShowLightning(false)}
      />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-6">
        {/* Titan silhouette or emblem */}
        <div className="mb-8 relative">
          {theme === 'survey' ? (
            // Survey Corps emblem
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-2xl font-bold text-green-800">自由</div>
            </div>
          ) : (
            // Titan silhouette
            <div className="w-24 h-32 bg-gradient-to-t from-gray-800 to-gray-600 clip-titan opacity-80 shadow-2xl animate-pulse" />
          )}
          
          {/* Glow effect */}
          <div 
            className={`absolute inset-0 bg-${currentTheme.accentColor} rounded-full opacity-20 animate-pulse blur-xl`}
            style={{ animationDuration: '2s' }}
          />
        </div>

        {/* Loading text */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2 animate-fade-in">
            {currentTheme.text}
          </h2>
          <p className="text-sm text-gray-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {currentPhase === 'loading' && '데이터를 수집하고 있습니다...'}
            {currentPhase === 'analyzing' && '성격을 분석하고 있습니다...'}
            {currentPhase === 'complete' && '결과를 준비하고 있습니다...'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          {/* Progress track */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full bg-gradient-to-r from-${currentTheme.accentColor} to-amber-400 transition-all duration-200 ease-out shadow-lg`}
              style={{ 
                width: `${progress}%`,
                boxShadow: `0 0 10px rgba(249, 168, 37, 0.5)`
              }}
            />
          </div>
          
          {/* Progress percentage */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>진행률</span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-1 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 bg-${currentTheme.accentColor} rounded-full animate-pulse`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Phase indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className={`w-2 h-2 rounded-full ${currentPhase === 'loading' ? `bg-${currentTheme.accentColor}` : 'bg-gray-500'} transition-colors duration-300`} />
            <div className={`w-2 h-2 rounded-full ${currentPhase === 'analyzing' ? `bg-${currentTheme.accentColor}` : 'bg-gray-500'} transition-colors duration-300`} />
            <div className={`w-2 h-2 rounded-full ${currentPhase === 'complete' ? `bg-${currentTheme.accentColor}` : 'bg-gray-500'} transition-colors duration-300`} />
          </div>
        </div>
      </div>

      {/* Screen overlay for dramatic effect */}
      {currentPhase === 'complete' && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 animate-fade-in" />
      )}
    </div>
  );
};

export default TitanLoadingScreen;