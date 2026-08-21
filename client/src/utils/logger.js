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

export const addLog = (type, category, message, details = null) => {
  const logItem = {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toLocaleTimeString(),
    type, // 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR'
    category, // 'SYSTEM' | 'NETWORK' | 'LINK' | 'CONSOLE'
    message,
    details: details ? (typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details)) : null,
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
    const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    addLog('INFO', 'CONSOLE', msg);
  };

  console.warn = (...args) => {
    originalConsoleWarn.apply(console, args);
    const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    addLog('WARN', 'CONSOLE', msg);
  };

  console.error = (...args) => {
    originalConsoleError.apply(console, args);
    const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
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
