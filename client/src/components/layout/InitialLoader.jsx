import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Fast simulated hydration progress
    const timer1 = setTimeout(() => setProgress(45), 200);
    const timer2 = setTimeout(() => setProgress(85), 500);
    const timer3 = setTimeout(() => setProgress(100), 900);
    const timer4 = setTimeout(() => setLoading(false), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none px-4"
        >
          {/* Background Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm w-full text-center">
            {/* Animated Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 flex items-center justify-center border border-indigo-400/30"
            >
              <Code2 className="w-10 h-10 animate-bounce" />
            </motion.div>

            {/* Brand Title */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
                Ashutosh <span className="gradient-text">.dev</span>
              </h1>
              <p className="text-xs text-indigo-300 font-medium flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full Stack MERN Portfolio</span>
              </p>
            </div>

            {/* Loading Bar */}
            <div className="w-full space-y-2 pt-4">
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Hydrating UI...</span>
                <span className="text-indigo-400 font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
