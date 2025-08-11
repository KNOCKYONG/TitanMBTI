// Main Effect Components
export { default as LightningEffect } from './LightningEffect';
export { default as SteamEffect } from './SteamEffect';
export { default as WallCrackEffect } from './WallCrackEffect';
export { default as CardFlip3D, withCardFlip } from './CardFlip3D';
export { default as WireSlashEffect } from './WireSlashEffect';

// Background and Atmosphere
export { default as CharacterBackground } from './CharacterBackground';
export { default as AmbientParticles } from './AmbientParticles';

// Interactive Effects
export { default as WingsCursor } from './WingsCursor';
export { default as EasterEggs } from './EasterEggs';

// Loading and Transitions
export { default as TitanLoadingScreen } from './TitanLoadingScreen';

// Mobile Optimization
export { 
  default as MobileOptimizedEffect,
  useDeviceCapabilities,
  getOptimizedEffectConfig,
  useTouchOptimizedGestures,
  usePerformanceMonitor
} from './MobileOptimizedEffects';

// Effect Combinations and Presets
export const EffectPresets = {
  // Character introduction effects
  characterIntro: {
    lightning: { intensity: 'high', color: 'blue', duration: 800 },
    steam: { intensity: 'medium', color: 'white', opacity: 0.4 },
    particles: { type: 'sparks', density: 'medium', color: 'gold' }
  },
  
  // Question transition effects
  questionTransition: {
    cardFlip: { direction: 'horizontal', duration: 600 },
    wireSlash: { direction: 'diagonal', intensity: 'medium' },
    particles: { type: 'dust', density: 'low', speed: 'slow' }
  },
  
  // Result reveal effects
  resultReveal: {
    lightning: { intensity: 'titan', color: 'yellow', duration: 1200 },
    steam: { intensity: 'high', color: 'gray', opacity: 0.6 },
    wallCrack: { intensity: 'high', crackDirection: 'center', showDebris: true },
    particles: { type: 'embers', density: 'high', color: 'orange' }
  },
  
  // Loading screen effects
  loading: {
    steam: { intensity: 'low', color: 'gray', opacity: 0.3 },
    particles: { type: 'dust', density: 'low', speed: 'slow' },
    wallAnimation: true
  },
  
  // Ambient atmosphere
  ambient: {
    particles: { type: 'dust', density: 'low', speed: 'slow', interactive: false },
    characterBackground: true
  }
};

// Utility function to trigger effect combinations
export const triggerEffectCombo = (preset, options = {}) => {
  const config = EffectPresets[preset];
  if (!config) return null;
  
  return {
    ...config,
    ...options,
    timestamp: Date.now(),
    id: `effect-${preset}-${Date.now()}`
  };
};

// Effect manager class for coordinating multiple effects
export class EffectManager {
  constructor() {
    this.activeEffects = new Map();
    this.eventListeners = new Map();
  }
  
  // Register an effect
  registerEffect(id, config) {
    this.activeEffects.set(id, {
      ...config,
      startTime: Date.now(),
      isActive: true
    });
  }
  
  // Remove an effect
  removeEffect(id) {
    this.activeEffects.delete(id);
  }
  
  // Get all active effects
  getActiveEffects() {
    return Array.from(this.activeEffects.values());
  }
  
  // Trigger a preset combination
  triggerPreset(presetName, options = {}) {
    const preset = EffectPresets[presetName];
    if (!preset) return;
    
    const effectId = `preset-${presetName}-${Date.now()}`;
    this.registerEffect(effectId, { ...preset, ...options });
    
    return effectId;
  }
  
  // Clean up expired effects
  cleanup() {
    const now = Date.now();
    for (const [id, effect] of this.activeEffects.entries()) {
      const duration = effect.duration || 5000;
      if (now - effect.startTime > duration) {
        this.removeEffect(id);
      }
    }
  }
  
  // Add event listener
  addEventListener(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);
  }
  
  // Remove event listener
  removeEventListener(event, callback) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).delete(callback);
    }
  }
  
  // Emit event
  emit(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => callback(data));
    }
  }
}

// Global effect manager instance
export const globalEffectManager = new EffectManager();