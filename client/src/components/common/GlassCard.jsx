import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverEffect = true, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 ${hoverEffect ? 'glass-card-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
