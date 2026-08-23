// Mobile & Production In-App Debug Logger

const logs = [];
const listeners = new Set();

export const getLogs = () => [...logs];

export const subscribeLogs = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const notify = () => {
  listeners.forEach((listener) => listener([...logs]));
};

const safeStringify = (val, pretty = false) => {
  if (val === null || val === undefined) return String(val);
  if (typeof val !== 'object') return String(val);
  try {
    const seen = new WeakSet();
    return JSON.stringify(
      val,
      (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return '[Circular]';
          seen.add(value);
        }
        return value;
      },
      pretty ? 2 : undefined
    );
  } catch (e) {
    return String(val);
  }
};

export const addLog = (type, category, message, details = null) => {
  const logItem = {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toLocaleTimeString(),
    type, // 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR'
    category, // 'SYSTEM' | 'NETWORK' | 'LINK' | 'CONSOLE'
    message,
    details: details ? safeStringify(details, true) : null,
  };
  logs.unshift(logItem); // newest logs at top
  if (logs.length > 100) logs.pop(); // keep last 100 logs
  notify();
};

export const clearLogs = () => {
  logs.length = 0;
  notify();
};

// Initialize window global error and console interception
if (typeof window !== 'undefined' && !window.__logger_initialized) {
  window.__logger_initialized = true;

  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  console.log = (...args) => {
    originalConsoleLog.apply(console, args);
    const msg = args.map((a) => safeStringify(a)).join(' ');
    addLog('INFO', 'CONSOLE', msg);
  };

  console.warn = (...args) => {
    originalConsoleWarn.apply(console, args);
    const msg = args.map((a) => safeStringify(a)).join(' ');
    addLog('WARN', 'CONSOLE', msg);
  };

  console.error = (...args) => {
    originalConsoleError.apply(console, args);
    const msg = args.map((a) => safeStringify(a)).join(' ');
    addLog('ERROR', 'CONSOLE', msg);
  };

  window.addEventListener('error', (event) => {
    addLog('ERROR', 'SYSTEM', `Uncaught Error: ${event.message}`, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    addLog('ERROR', 'SYSTEM', `Unhandled Promise Rejection: ${event.reason?.message || event.reason}`, event.reason);
  });
}
