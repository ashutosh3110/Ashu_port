import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Send, Github, Linkedin, Twitter, Mail, Eye, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';

export default function HeroSection() {
  const [visitorCount, setVisitorCount] = useState(1450);
  const [typedText, setTypedText] = useState('');
  const roles = [
    'Full Stack MERN Developer',
    'React 19 & Next.js Architect',
    'Node.js & Express REST APIs',
    'Scalable Cloud & UI/UX Specialist',
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypedText(
          currentRole.substring(0, typedText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Fetch Visitor Counter API
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await API.post('/analytics/visitor');
        if (res.data.success) {
          setVisitorCount(res.data.count);
        }
      } catch (e) {
        // keep fallback
      }
    };
    fetchVisitorCount();
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center space-y-8">
        
        {/* Status Pill & Visitor Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Available for new opportunities
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> {visitorCount.toLocaleString()} Visitors
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hi, I'm <span className="gradient-text">Ashutosh Banke</span>
          </h1>

          {/* Animated Subtitle */}
          <div className="h-12 sm:h-14 text-xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center">
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold mr-2">&gt;</span>
            <span>{typedText}</span>
            <span className="animate-pulse text-indigo-600 dark:text-indigo-400 font-mono ml-0.5">|</span>
          </div>
        </motion.div>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Passionate Full Stack Architect specializing in building scalable web applications, robust Node.js microservices, and interactive pixel-perfect interfaces with modern React 19 and Tailwind CSS.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center space-x-2 transition-all duration-200 hover:scale-[1.03]"
          >
            <Send className="w-4 h-4" />
            <span>Hire Me / Contact</span>
          </a>

          <a
            href="https://drive.google.com/file/d/1LfKUedMYBZkbkTJ27rm1YG5IqVS403X8/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-sm shadow-md shadow-slate-200/50 dark:shadow-none flex items-center space-x-2 backdrop-blur-md transition-all duration-200 hover:scale-[1.03]"
          >
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Quick Stats / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm font-semibold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>1 Year Experience</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm font-semibold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>8 Projects Delivered</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm font-semibold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>10 Happy Clients</span>
          </div>
        </motion.div>

        {/* Social Links Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center space-x-4 pt-4"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-110"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-110"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter Profile"
            className="p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-110"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:ashutoshbankey21306@gmail.com"
            title="Send Email"
            className="p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-110"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
