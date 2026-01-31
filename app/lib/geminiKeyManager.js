// Gemini API Key Manager with rotation
// This handles multiple API keys and rotates when rate limits are hit

const keys = JSON.parse(process.env.GEMINI_API_KEYS || '[]');
let currentKeyIndex = 0;
const keyErrors = new Map();

export function getKey() {
  if (!keys || keys.length === 0) {
    return null;
  }
  
  // Try to get a working key
  for (let i = 0; i < keys.length; i++) {
    const keyIndex = (currentKeyIndex + i) % keys.length;
    const key = keys[keyIndex];
    
    if (!keyErrors.has(key) || keyErrors.get(key) < 3) {
      currentKeyIndex = keyIndex;
      return key;
    }
  }
  
  // If all keys have errors, reset and return the first one
  keyErrors.clear();
  currentKeyIndex = 0;
  return keys[0];
}

export function markKeyError(key) {
  const errorCount = (keyErrors.get(key) || 0) + 1;
  keyErrors.set(key, errorCount);
  
  if (errorCount >= 3) {
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
  }
}
