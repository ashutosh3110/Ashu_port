import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, X, Trash2, Copy, RefreshCw, CheckCircle, AlertTriangle, AlertCircle, Info, Smartphone, ExternalLink, Globe } from 'lucide-react';
import { getLogs, subscribeLogs, clearLogs, addLog } from '../../utils/logger';
import API from '../../services/api';
import { formatUrl } from '../../utils/formatUrl';

export default function MobileDebugConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('logs'); // 'logs' | 'system' | 'tools'
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [testingApi, setTestingApi] = useState(false);

  useEffect(() => {
    setLogs(getLogs());
    const unsubscribe = subscribeLogs((updatedLogs) => {
      setLogs(updatedLogs);
    });
    return () => unsubscribe();
  }, []);

  const errorCount = logs.filter((l) => l.type === 'ERROR').length;

  const handleCopyLogs = () => {
    const text = logs
      .map((l) => `[${l.timestamp}] [${l.type}] [${l.category}] ${l.message} ${l.details || ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestApi = async () => {
    setTestingApi(true);
    addLog('INFO', 'SYSTEM', 'Starting manual API health check...');
    try {
      const res = await API.get('/health');
      addLog('SUCCESS', 'SYSTEM', `Health Check Passed! Response: ${JSON.stringify(res.data)}`);
    } catch (err) {
      addLog('ERROR', 'SYSTEM', `Health Check Failed: ${err.message}`, {
        code: err.code,
        response: err.response?.data,
      });
    } finally {
      setTestingApi(false);
    }
  };

  const handleTestProjectsApi = async () => {
    setTestingApi(true);
    addLog('INFO', 'SYSTEM', 'Fetching /projects API...');
    try {
      const res = await API.get('/projects');
      addLog('SUCCESS', 'SYSTEM', `Projects API Success! Received ${res.data?.data?.length || 0} projects.`, res.data);
    } catch (err) {
      addLog('ERROR', 'SYSTEM', `Projects API Failed: ${err.message}`, err);
    } finally {
      setTestingApi(false);
    }
  };

  const handleTestLiveLink = (testUrl = 'https://wapixo.com') => {
    const targetUrl = formatUrl(testUrl);
    addLog('INFO', 'LINK', `Testing open URL: ${targetUrl}`);
    try {
      const newWin = window.open(targetUrl, '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        addLog('ERROR', 'LINK', `Popup Blocker detected! Browser blocked opening ${targetUrl}. Try allowing popups.`);
      } else {
        addLog('SUCCESS', 'LINK', `Successfully dispatched window.open for ${targetUrl}`);
      }
    } catch (err) {
      addLog('ERROR', 'LINK', `Failed to open ${targetUrl}: ${err.message}`);
    }
  };

  const systemInfo = {
    url: typeof window !== 'undefined' ? window.location.href : 'N/A',
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    screen: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A',
    touchDevice: typeof window !== 'undefined' ? ('ontouchstart' in window || navigator.maxTouchPoints > 0 ? 'Yes (Touchscreen)' : 'No (Mouse)') : 'N/A',
    apiBaseURL: API.defaults.baseURL,
  };

  return (
    <>
      {/* Floating Debug Button */}
      <div className="fixed bottom-5 left-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-mono text-xs shadow-2xl backdrop-blur-md flex items-center space-x-2 transition-transform active:scale-95"
        >
          <Bug className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Logs</span>
          {errorCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
              {errorCount}
            </span>
          )}
        </button>
      </div>

      {/* Debug Console Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-2 bottom-16 sm:inset-x-auto sm:left-5 sm:bottom-16 sm:w-[480px] z-50 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh] text-slate-100 font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bug className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Mobile Diagnostics & Logs</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-800 bg-slate-950 text-xs">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex-1 py-2.5 text-center font-semibold transition-colors ${
                  activeTab === 'logs' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10' : 'text-slate-400 hover:text-white'
                }`}
              >
                Logs ({logs.length})
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`flex-1 py-2.5 text-center font-semibold transition-colors ${
                  activeTab === 'system' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10' : 'text-slate-400 hover:text-white'
                }`}
              >
                Device Info
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex-1 py-2.5 text-center font-semibold transition-colors ${
                  activeTab === 'tools' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10' : 'text-slate-400 hover:text-white'
                }`}
              >
                Quick Tests
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3 font-mono text-xs min-h-[300px]">
              {/* TAB 1: LOGS */}
              {activeTab === 'logs' && (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className="text-[10px] text-slate-400">Live Console & API Events</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyLogs}
                        className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 flex items-center space-x-1 hover:text-white"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={clearLogs}
                        className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-400 flex items-center space-x-1 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>

                  {logs.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs font-sans">
                      No logs captured yet. Interact with the website or tap Quick Tests.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {logs.map((log) => {
                        const isError = log.type === 'ERROR';
                        const isWarn = log.type === 'WARN';
                        const isSuccess = log.type === 'SUCCESS';

                        return (
                          <div
                            key={log.id}
                            onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                            className={`p-2.5 rounded-xl border text-[11px] cursor-pointer transition-colors ${
                              isError
                                ? 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                                : isWarn
                                ? 'bg-amber-950/40 border-amber-800/80 text-amber-300'
                                : isSuccess
                                ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center space-x-1.5 shrink-0">
                                {isError && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                                {isWarn && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                                {isSuccess && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                                {!isError && !isWarn && !isSuccess && <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 font-bold uppercase">
                                  {log.category}
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-500 shrink-0">{log.timestamp}</span>
                            </div>

                            <p className="mt-1 font-semibold leading-relaxed break-words">{log.message}</p>

                            {log.details && (
                              <div className="mt-1.5">
                                {expandedLogId === log.id ? (
                                  <pre className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 overflow-x-auto whitespace-pre-wrap">
                                    {log.details}
                                  </pre>
                                ) : (
                                  <span className="text-[9px] text-indigo-400 underline">Tap to view details...</span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: SYSTEM INFO */}
              {activeTab === 'system' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Target API Endpoint</div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-emerald-400 break-all">
                      {systemInfo.apiBaseURL}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Current Page Location</div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-slate-300 break-all">
                      {systemInfo.url}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Screen Size</span>
                      <span className="font-bold text-white">{systemInfo.screen}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Touch Screen</span>
                      <span className="font-bold text-emerald-400">{systemInfo.touchDevice}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[10px]">
                    <span className="text-slate-400 block font-bold">User Agent</span>
                    <p className="text-slate-300 font-mono break-all leading-tight">{systemInfo.userAgent}</p>
                  </div>
                </div>
              )}

              {/* TAB 3: QUICK DIAGNOSTIC TESTS */}
              {activeTab === 'tools' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-indigo-400" />
                      <span>Test Backend Connection</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Check if your mobile phone can reach the backend server without CORS or network block errors.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleTestApi}
                        disabled={testingApi}
                        className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${testingApi ? 'animate-spin' : ''}`} />
                        <span>Test /api/health</span>
                      </button>
                      <button
                        onClick={handleTestProjectsApi}
                        disabled={testingApi}
                        className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5"
                      >
                        <span>Test /api/projects</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-purple-400" />
                      <span>Test Opening Live Link</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Simulate opening a project live link to check if your mobile browser blocks popup windows or absolute URLs.
                    </p>
                    <button
                      onClick={() => handleTestLiveLink('https://wapixo.com')}
                      className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Test Open wapixo.com</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
