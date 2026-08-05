import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Send, Github, Linkedin, Mail, Eye, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';

export default function HeroSection() {
  const [visitorCount, setVisitorCount] = useState(1450);
  const [typedText, setTypedText] = useState('');
  const roles = [
    'Full Stack MERN Developer',
    'React 19 & Next.js',
    'Node.js & Express',
    'UI/UX',
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

  const [profileAvatar, setProfileAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop');

  // Fetch Public Profile & Visitor Counter API
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
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/public-profile');
        if (res.data.success && res.data.profile?.avatar) {
          setProfileAvatar(res.data.profile.avatar);
        }
      } catch (e) {
        // keep fallback
      }
    };
    fetchVisitorCount();
    fetchProfile();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">Available for new opportunities</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {visitorCount.toLocaleString()} Visitors
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="gradient-text">Ashutosh Banke</span>
              </h1>
              <div className="h-12 sm:h-14 text-xl sm:text-3xl font-bold text-slate-300 flex items-center justify-center lg:justify-start">
                <span className="text-indigo-400 mr-2">&gt;</span>
                <span>{typedText}</span>
                <span className="animate-pulse text-indigo-500 font-mono">|</span>
              </div>
            </motion.div>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              Passionate Full Stack Architect specializing in building scalable web applications, robust Node.js microservices, and interactive pixel-perfect interfaces with modern React 19 and Tailwind CSS.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all duration-200 hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me / Contact</span>
              </a>

              <a
                href="https://drive.google.com/file/d/1LfKUedMYBZkbkTJ27rm1YG5IqVS403X8/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 text-slate-200 font-semibold text-sm flex items-center space-x-2 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Quick Tech Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium text-slate-400"
            >
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1 Year Experience</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>8 Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>10 Happy Clients</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Avatar & Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Outer Glowing Rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 blur-2xl opacity-40 animate-pulse" />

              {/* Main Avatar Card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card border border-slate-700/50 shadow-2xl p-3 flex flex-col justify-between">
                <img
                  src={profileAvatar}
                  alt="Ashutosh Banke Profile"
                  className="w-full h-full object-cover rounded-2xl filter brightness-105 contrast-105"
                />

                {/* Floating Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800 flex items-center justify-between shadow-xl">
                  <div>
                    <h4 className="text-sm font-bold text-white">Ashutosh Banke</h4>
                    <p className="text-xs text-indigo-400 font-medium">MERN Architect</p>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
