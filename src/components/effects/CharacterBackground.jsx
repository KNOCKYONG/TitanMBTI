import { useEffect, useState } from 'react';
import SteamEffect from './SteamEffect';
import LightningEffect from './LightningEffect';

const CharacterBackground = ({ 
  characterType,
  isActive = true,
  intensity = 'medium',
  showParticles = true
}) => {
  const [lightningActive, setLightningActive] = useState(false);
  const [environmentState, setEnvironmentState] = useState('calm');

  const characterThemes = {
    // Main Characters
    'Eren Yeager': {
      primaryColor: 'from-red-900 via-orange-800 to-red-900',
      accentColor: 'red-600',
      atmosphere: 'rage',
      particles: { color: 'red', intensity: 'high', type: 'ember' },
      weather: 'storm',
      lighting: 'dramatic',
      sounds: 'thunder',
      specialEffects: ['lightning', 'steam']
    },
    'Mikasa Ackerman': {
      primaryColor: 'from-gray-900 via-slate-800 to-gray-900',
      accentColor: 'red-500',
      atmosphere: 'focused',
      particles: { color: 'white', intensity: 'medium', type: 'blade-trails' },
      weather: 'clear',
      lighting: 'sharp',
      sounds: 'blade-whistle',
      specialEffects: ['wire-slash']
    },
    'Armin Arlert': {
      primaryColor: 'from-blue-900 via-cyan-800 to-blue-900',
      accentColor: 'blue-400',
      atmosphere: 'contemplative',
      particles: { color: 'blue', intensity: 'low', type: 'floating-lights' },
      weather: 'misty',
      lighting: 'soft',
      sounds: 'ocean-waves',
      specialEffects: ['colossal-steam']
    },
    'Levi Ackerman': {
      primaryColor: 'from-gray-900 via-blue-900 to-gray-900',
      accentColor: 'cyan-400',
      atmosphere: 'cold',
      particles: { color: 'silver', intensity: 'high', type: 'blade-sparks' },
      weather: 'windy',
      lighting: 'harsh',
      sounds: 'wind-cutting',
      specialEffects: ['wire-slash', 'speed-lines']
    },
    'Hange Zoe': {
      primaryColor: 'from-amber-900 via-yellow-800 to-orange-900',
      accentColor: 'amber-400',
      atmosphere: 'curious',
      particles: { color: 'yellow', intensity: 'medium', type: 'research-notes' },
      weather: 'experimental',
      lighting: 'warm',
      sounds: 'bubbling',
      specialEffects: ['titan-transformation']
    },
    'Sasha Blouse': {
      primaryColor: 'from-green-900 via-emerald-800 to-green-900',
      accentColor: 'green-400',
      atmosphere: 'peaceful',
      particles: { color: 'green', intensity: 'low', type: 'forest-leaves' },
      weather: 'gentle-breeze',
      lighting: 'natural',
      sounds: 'forest-ambience',
      specialEffects: ['nature-elements']
    },
    'Connie Springer': {
      primaryColor: 'from-yellow-900 via-amber-800 to-yellow-900',
      accentColor: 'yellow-400',
      atmosphere: 'energetic',
      particles: { color: 'yellow', intensity: 'medium', type: 'energy-bursts' },
      weather: 'sunny',
      lighting: 'bright',
      sounds: 'upbeat',
      specialEffects: ['cheerful-sparks']
    },
    'Jean Kirstein': {
      primaryColor: 'from-brown-900 via-amber-800 to-brown-900',
      accentColor: 'amber-500',
      atmosphere: 'determined',
      particles: { color: 'gold', intensity: 'medium', type: 'determination' },
      weather: 'steady',
      lighting: 'golden',
      sounds: 'steady-march',
      specialEffects: ['leadership-aura']
    },

    // Default themes by MBTI
    'INTJ': {
      primaryColor: 'from-purple-900 via-indigo-800 to-purple-900',
      accentColor: 'purple-400',
      atmosphere: 'strategic',
      particles: { color: 'purple', intensity: 'low', type: 'thought-patterns' }
    },
    'ENTP': {
      primaryColor: 'from-green-900 via-teal-800 to-green-900',  
      accentColor: 'teal-400',
      atmosphere: 'innovative',
      particles: { color: 'green', intensity: 'high', type: 'idea-sparks' }
    },
    'ISFJ': {
      primaryColor: 'from-blue-900 via-sky-800 to-blue-900',
      accentColor: 'sky-400', 
      atmosphere: 'nurturing',
      particles: { color: 'blue', intensity: 'medium', type: 'care-waves' }
    },
    'ESTP': {
      primaryColor: 'from-red-900 via-orange-800 to-red-900',
      accentColor: 'orange-400',
      atmosphere: 'dynamic',
      particles: { color: 'orange', intensity: 'high', type: 'action-trails' }
    }
  };

  const theme = characterThemes[characterType] || characterThemes['INTJ'];

  // Environmental effects based on theme
  useEffect(() => {
    if (!isActive) return;

    const effectInterval = setInterval(() => {
      // Trigger lightning for dramatic characters
      if (theme.specialEffects?.includes('lightning') && Math.random() > 0.7) {
        setLightningActive(true);
        setTimeout(() => setLightningActive(false), 300);
      }

      // Change environmental state
      const states = ['calm', 'intense', 'dynamic'];
      setEnvironmentState(states[Math.floor(Math.random() * states.length)]);
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(effectInterval);
  }, [isActive, theme]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.primaryColor} transition-all duration-1000`} />
      
      {/* Secondary atmospheric layer */}
      <div 
        className={`absolute inset-0 bg-gradient-radial from-${theme.accentColor}/20 via-transparent to-transparent transition-all duration-2000`}
        style={{
          background: `radial-gradient(circle at ${Math.sin(Date.now() * 0.001) * 20 + 50}% ${Math.cos(Date.now() * 0.0008) * 20 + 50}%, rgba(var(--${theme.accentColor}), 0.2) 0%, transparent 60%)`
        }}
      />

      {/* Environmental patterns */}
      <div className="absolute inset-0 opacity-10">
        {theme.atmosphere === 'strategic' && (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M30,0 L60,30 L30,60 L0,30 Z M30,10 L50,30 L30,50 L10,30 Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        )}
        
        {theme.atmosphere === 'rage' && (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='red' fill-opacity='0.1'%3E%3Cpath d='M0,20 Q10,0 20,20 Q30,0 40,20 Q30,40 20,20 Q10,40 0,20'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />
        )}

        {theme.atmosphere === 'focused' && (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)`,
              backgroundSize: '20px 20px',
              opacity: 0.05,
              animation: 'slideBackground 15s linear infinite'
            }}
          />
        )}
      </div>

      {/* Particle effects */}
      {showParticles && (
        <>
          {/* Steam/smoke for atmospheric characters */}
          {(theme.specialEffects?.includes('steam') || theme.specialEffects?.includes('colossal-steam')) && (
            <SteamEffect 
              isActive={true}
              intensity={theme.specialEffects.includes('colossal-steam') ? 'titan' : 'medium'}
              color={theme.particles.color}
              opacity={0.3}
            />
          )}

          {/* Custom particle systems */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: theme.particles.intensity === 'high' ? 20 : theme.particles.intensity === 'medium' ? 12 : 6 }, (_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-${theme.accentColor} rounded-full animate-float`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  opacity: Math.random() * 0.6 + 0.2,
                  transform: `scale(${Math.random() * 2 + 0.5})`
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Lightning effects for dramatic characters */}
      <LightningEffect 
        isActive={lightningActive}
        intensity={theme.atmosphere === 'rage' ? 'titan' : 'medium'}
        color={theme.accentColor.includes('red') ? 'red' : 
              theme.accentColor.includes('blue') ? 'blue' :
              theme.accentColor.includes('purple') ? 'purple' : 'yellow'}
        onComplete={() => setLightningActive(false)}
      />

      {/* Dynamic lighting overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-3000 ${
          environmentState === 'intense' ? 'opacity-30' : 
          environmentState === 'dynamic' ? 'opacity-20' : 'opacity-10'
        }`}
        style={{
          background: `linear-gradient(${Math.sin(Date.now() * 0.002) * 180}deg, 
            rgba(var(--${theme.accentColor}), 0.1) 0%, 
            transparent 50%, 
            rgba(var(--${theme.accentColor}), 0.1) 100%)`
        }}
      />

      {/* Character-specific overlay effects */}
      {theme.specialEffects?.includes('speed-lines') && environmentState === 'intense' && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-white opacity-20 h-px animate-speedLine"
              style={{
                top: `${10 + i * 10}%`,
                left: 0,
                right: 0,
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${-5 + Math.random() * 10}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Atmospheric depth layers */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-2000 ${
        environmentState === 'calm' ? 'opacity-60' : 'opacity-30'
      }`} />
    </div>
  );
};

export default CharacterBackground;