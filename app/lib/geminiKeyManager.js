// Gemini API Key Manager with rotation
// This handles multiple API keys and rotates when rate limits are hit

const keys = JSON.parse(process.env.GEMINI_API_KEYS || '[]');
let currentKeyIndex = 0;
const keyStats = new Map();

// Initialize stats for each key
keys.forEach((key, index) => {
  keyStats.set(index, {
    successCount: 0,
    errorCount: 0,
    lastUsed: null,
    isBlocked: false
  });
});

export function getKey() {
  if (!keys || keys.length === 0) {
    return { key: null, index: -1 };
  }
  
  // Find a non-blocked key
  for (let i = 0; i < keys.length; i++) {
    const keyIndex = (currentKeyIndex + i) % keys.length;
    const stats = keyStats.get(keyIndex);
    
    if (!stats.isBlocked) {
      const key = keys[keyIndex];
      keyStats.set(keyIndex, { ...stats, lastUsed: new Date() });
      return { key, index: keyIndex };
    }
  }
  
  // If all blocked, reset and return first
  keys.forEach((_, i) => {
    const stats = keyStats.get(i);
    keyStats.set(i, { ...stats, isBlocked: false, errorCount: 0 });
  });
  
  currentKeyIndex = 0;
  return { key: keys[0], index: 0 };
}

export function reportSuccess(index) {
  if (keyStats.has(index)) {
    const stats = keyStats.get(index);
    keyStats.set(index, { ...stats, successCount: stats.successCount + 1 });
  }
}

export function reportError(index, error) {
  if (keyStats.has(index)) {
    const stats = keyStats.get(index);
    const errorCount = stats.errorCount + 1;
    const isBlocked = errorCount >= 3;
    
    keyStats.set(index, { 
      ...stats, 
      errorCount,
      isBlocked
    });
    
    if (isBlocked) {
      currentKeyIndex = (index + 1) % keys.length;
    }
  }
}

export function getStats() {
  return {
    totalKeys: keys.length,
    currentIndex: currentKeyIndex,
    keyStats: Object.fromEntries(keyStats)
  };
}

export function getKeyManager() {
  return {
    getKey,
    reportSuccess,
    reportError,
    getStats
  };
}
