import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Cloud, Trophy, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';

export default function AboutSection() {
  const services = [
    {
      icon: Code,
      title: 'Frontend Engineering',
      desc: 'Building lightning-fast, reactive single-page applications using React 19, Next.js, and Tailwind CSS.',
      color: 'text-indigo-400',
    },
    {
      icon: Server,
      title: 'Backend & Microservices',
      desc: 'Architecting RESTful & GraphQL APIs with Express.js, JWT security, and scalable Node.js event loops.',
      color: 'text-purple-400',
    },
    {
      icon: Database,
      title: 'Database Architecture',
      desc: 'Designing optimized MongoDB collections, Mongoose indexing, PostgreSQL schemas, and Redis caching.',
      color: 'text-pink-400',
    },
    {
      icon: Cloud,
      title: 'DevOps & Deployment',
      desc: 'Streamlining CI/CD pipelines, Docker containerization, AWS hosting, and Cloudinary media optimization.',
      color: 'text-cyan-400',
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '1+' },
    { label: 'Projects Completed', value: '8' },
    { label: 'Happy Clients', value: '10' },
    { label: 'Code Commits', value: '800+' },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="About Me"
          title="Transforming Ideas Into"
          highlight="Scalable Products"
          subtitle="Experienced Full Stack Developer crafting sleek interfaces, rock-solid APIs, and cloud solutions."
        />

        {/* Bio & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <GlassCard className="relative overflow-hidden p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ashutosh Banke</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Senior MERN Stack Engineer</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                I specialize in turning complex requirements into clean, scalable software architecture. With deep expertise across the entire MERN stack, I build systems that perform exceptionally under high load while delivering smooth user experiences.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {stats.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Services List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full space-y-4">
                    <div className={`p-3 w-fit rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${item.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
