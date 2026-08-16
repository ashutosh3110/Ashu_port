import React from 'react';
import { Heart, Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Ashutosh <span className="gradient-text">Banke</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Senior Full Stack MERN Developer crafting high-performance, beautiful web applications with React 19, Node.js, MongoDB, and Tailwind CSS.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600/20 border border-slate-800 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600/20 border border-slate-800 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600/20 border border-slate-800 transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:ashutoshbankey21306@gmail.com"
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600/20 border border-slate-800 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-indigo-400 transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-indigo-400 transition-colors">Tech Stack & Skills</a></li>
              <li><a href="#projects" className="hover:text-indigo-400 transition-colors">Featured Projects</a></li>
              <li><a href="#experience" className="hover:text-indigo-400 transition-colors">Experience Timeline</a></li>
              <li><a href="#blog" className="hover:text-indigo-400 transition-colors">Latest Articles</a></li>
            </ul>
          </div>

          {/* Services & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Tech & Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Full Stack Web Apps</li>
              <li>REST & GraphQL APIs</li>
              <li>Custom React Component Systems</li>
              <li>Database Optimization</li>
              <li>DevOps & CI/CD Deployment</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ashutosh Banke. Built with React 19, Express, MongoDB & Tailwind CSS.</p>
          <p className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>for performance & elegance.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
