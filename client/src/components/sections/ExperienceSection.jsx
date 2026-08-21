import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import API from '../../services/api';
import { FALLBACK_EXPERIENCES } from '../../data/fallbackData';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState(FALLBACK_EXPERIENCES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await API.get('/experience');
        if (res.data.success && res.data.data && res.data.data.length > 0) {
          setExperiences(res.data.data);
        }
      } catch (err) {
        console.error('Experience background fetch fallback used:', err.message);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Career Journey"
          title="Experience &"
          highlight="Education"
          subtitle="My professional trajectory, key achievements, and educational qualifications."
        />

        {/* Timeline Container */}
        <div className="relative border-l border-indigo-500/30 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {experiences.map((item, index) => {
            const isEducation = item.type === 'Education';
            return (
              <motion.div
                key={item._id || item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot Icon */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1 p-2 rounded-full bg-slate-950 border-2 border-indigo-500 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                  {isEducation ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                </div>

                {/* Left Date Label for Desktop */}
                <div className="hidden sm:block absolute -left-36 top-1.5 text-right w-24">
                  <span className="text-xs font-bold text-indigo-400 block">{item.startDate}</span>
                  <span className="text-[10px] text-slate-500 block">{item.endDate}</span>
                </div>

                <GlassCard className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 flex items-center space-x-2">
                        <span>{item.company}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {item.location}
                            </span>
                          </>
                        )}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-semibold text-indigo-400 sm:hidden">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
