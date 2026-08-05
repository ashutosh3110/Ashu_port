import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Shield, MousePointer, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme, cursorEnabled, toggleCursor } = useTheme();
  const { isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', path: '/' },
    { name: 'About', href: '#about', path: '/' },
    { name: 'Skills', href: '#skills', path: '/' },
    { name: 'Projects', href: '#projects', path: '/' },
    { name: 'Experience', href: '#experience', path: '/' },
    { name: 'Certificates', href: '#certificates', path: '/' },
    { name: 'Blog', href: '#blog', path: '/' },
    { name: 'Contact', href: '#contact', path: '/' },
  ];

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/' && item.href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/60 shadow-xl shadow-black/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Ashutosh <span className="gradient-text">.dev</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-1 px-4 py-1.5 rounded-full bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-md border border-slate-800/50">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions (Theme, Cursor, Admin) */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Custom Cursor Toggle */}
          <button
            onClick={toggleCursor}
            title={cursorEnabled ? 'Disable Custom Cursor' : 'Enable Custom Cursor'}
            className={`p-2 rounded-xl border transition-all duration-200 ${
              cursorEnabled
                ? 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
                : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MousePointer className="w-4 h-4" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-all duration-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Admin Panel Button */}
          <Link
            to={isAdmin ? '/admin/dashboard' : '/admin/login'}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 transition-all duration-200"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-800 text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-4 pt-3 pb-6"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/admin/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                >
                  {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
