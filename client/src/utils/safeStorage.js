// Safe wrapper for localStorage access to prevent SecurityError/DOMException crashes in iOS WebViews (WhatsApp, Instagram, etc.)

export const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] getItem failed for key "${key}":`, e.message);
    }
    return null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`[SafeStorage] setItem failed for key "${key}":`, e.message);
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] removeItem failed for key "${key}":`, e.message);
    }
  },
};
