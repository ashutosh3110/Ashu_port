import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Search, X, Sparkles, Code } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import API from '../../services/api';
import { formatUrl } from '../../utils/formatUrl';
import { addLog } from '../../utils/logger';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Featured Works"
          title="Curated"
          highlight="Projects"
          subtitle="Explore recent full-stack web applications, open-source work, and cloud architectures."
        />

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="h-full flex flex-col justify-between p-0 overflow-hidden group">
                  {/* Image Header */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => setSelectedProjectModal(project)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                      >
                        <span>View Details</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        {project.githubLink && (
                          <a
                            href={formatUrl(project.githubLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              addLog('INFO', 'LINK', `GitHub Link clicked: ${project.title} -> ${formatUrl(project.githubLink)}`);
                            }}
                            className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                            title="GitHub Source"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={formatUrl(project.liveLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              addLog('INFO', 'LINK', `Live Link clicked: ${project.title} -> ${formatUrl(project.liveLink)}`);
                            }}
                            className="p-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detailed Project Modal */}
        <AnimatePresence>
          {selectedProjectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card max-w-2xl w-full p-6 space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <img
                  src={selectedProjectModal.image}
                  alt={selectedProjectModal.title}
                  className="w-full h-56 object-cover rounded-xl border border-slate-800"
                />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
                      {selectedProjectModal.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedProjectModal.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedProjectModal.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectModal.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-indigo-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-slate-800">
                  {selectedProjectModal.liveLink && (
                    <a
                      href={formatUrl(selectedProjectModal.liveLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        addLog('INFO', 'LINK', `Modal Live Preview clicked: ${selectedProjectModal.title} -> ${formatUrl(selectedProjectModal.liveLink)}`);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Preview</span>
                    </a>
                  )}
                  {selectedProjectModal.githubLink && (
                    <a
                      href={formatUrl(selectedProjectModal.githubLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        addLog('INFO', 'LINK', `Modal View Code clicked: ${selectedProjectModal.title} -> ${formatUrl(selectedProjectModal.githubLink)}`);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs flex items-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
