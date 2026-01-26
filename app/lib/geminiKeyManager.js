// Gemini API Key Manager with rotation
// This handles multiple API keys and rotates when rate limits are hit

class GeminiKeyManager {
  constructor() {
    this.keys = [];
    this.currentIndex = 0;
    this.keyUsage = {}; // Track usage per key
    this.keyErrors = {}; // Track errors per key
    this.loadKeys();
  }

  loadKeys() {
    try {
      const keysString = process.env.GEMINI_API_KEYS;
      if (keysString) {
        this.keys = JSON.parse(keysString);
        // Initialize usage tracking for each key
        this.keys.forEach((key, index) => {
          this.keyUsage[index] = { count: 0, lastUsed: null };
          this.keyErrors[index] = { count: 0, lastError: null };
        });
        console.log(`[GeminiKeyManager] Loaded ${this.keys.length} API keys`);
      } else {
        console.warn('[GeminiKeyManager] No GEMINI_API_KEYS found in environment');
      }
    } catch (error) {
      console.error('[GeminiKeyManager] Error parsing API keys:', error);
      this.keys = [];
    }
  }

  // Get the next available API key
  getKey() {
    if (this.keys.length === 0) {
      throw new Error('No Gemini API keys configured');
    }

    // Find a key that hasn't errored too many times recently
    let attempts = 0;
    while (attempts < this.keys.length) {
      const key = this.keys[this.currentIndex];
      const errorInfo = this.keyErrors[this.currentIndex];
      
      // Skip keys that have errored too many times in the last hour
      if (errorInfo.count < 3 || 
          (errorInfo.lastError && Date.now() - errorInfo.lastError > 3600000)) {
        
        // Reset error count if last error was over an hour ago
        if (errorInfo.lastError && Date.now() - errorInfo.lastError > 3600000) {
          this.keyErrors[this.currentIndex] = { count: 0, lastError: null };
        }
        
        // Track usage
        this.keyUsage[this.currentIndex].count++;
        this.keyUsage[this.currentIndex].lastUsed = Date.now();
        
        // Rotate to next key for next request (round-robin)
        const usedIndex = this.currentIndex;
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        
        return { key, index: usedIndex };
      }
      
      // Try next key
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      attempts++;
    }

    // All keys are in error state, try the first one anyway
    console.warn('[GeminiKeyManager] All keys in error state, using first key');
    return { key: this.keys[0], index: 0 };
  }

  // Report that a key failed
  reportError(keyIndex, error) {
    if (this.keyErrors[keyIndex]) {
      this.keyErrors[keyIndex].count++;
      this.keyErrors[keyIndex].lastError = Date.now();
      console.warn(`[GeminiKeyManager] Key ${keyIndex} error count: ${this.keyErrors[keyIndex].count}`);
    }
  }

  // Report successful use (resets error count)
  reportSuccess(keyIndex) {
    if (this.keyErrors[keyIndex]) {
      this.keyErrors[keyIndex].count = 0;
    }
  }

  // Get usage statistics
  getStats() {
    return {
      totalKeys: this.keys.length,
      currentIndex: this.currentIndex,
      usage: this.keyUsage,
      errors: this.keyErrors
    };
  }
}

// Singleton instance
let keyManager = null;

export function getKeyManager() {
  if (!keyManager) {
    keyManager = new GeminiKeyManager();
  }
  return keyManager;
}

export default GeminiKeyManager;
