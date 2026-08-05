import React from 'react';
import { motion } from 'framer-motion';

export default function ParticleBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] dark:bg-indigo-600/20" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] dark:bg-purple-600/20" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[130px] dark:bg-pink-600/15" />

      {/* Floating Animated Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-indigo-400/40 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
        animate={{
          y: [0, 40, 0],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/5 w-2 h-2 rounded-full bg-cyan-400/50 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
        animate={{
          x: [0, 25, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
