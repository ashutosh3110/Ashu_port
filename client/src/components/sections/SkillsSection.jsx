import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import API from '../../services/api';
import {
  SiReact, SiTypescript, SiTailwindcss, SiFramer, SiHtml5,
  SiNodedotjs, SiExpress, SiJsonwebtokens, SiMongodb,
  SiPostgresql, SiDocker, SiVercel, SiGit,
  SiPostman, SiVite
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'];

  // Map icon strings to React Icons
  const iconMap = {
    SiReact, SiTypescript, SiTailwindcss, SiFramer, SiHtml5,
    SiNodedotjs, SiExpress, SiJsonwebtokens, SiMongodb,
    SiPostgresql, SiDocker, SiAmazonaws: FaAws, SiAmazonwebservices: FaAws, FaAws, SiVercel, SiGit,
    SiPostman, SiVite
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get('/skills');
        if (res.data.success) {
          setSkills(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Tech Stack"
          title="Skills &"
          highlight="Expertise"
          subtitle="Comprehensive mastery across modern full-stack web technologies and engineering tools."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || SiReact;
            return (
              <motion.div
                key={skill._id || skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-white">{skill.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-400">{skill.proficiency}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
