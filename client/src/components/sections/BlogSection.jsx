import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Tag, X, ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import API from '../../services/api';
import { FALLBACK_BLOGS } from '../../data/fallbackData';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await API.get('/blogs');
        if (res.data.success && res.data.data && res.data.data.length > 0) {
          setBlogs(res.data.data);
        } else {
          setBlogs(FALLBACK_BLOGS);
        }
      } catch (err) {
        console.error('Blogs fetch fallback used:', err.message);
        setBlogs(FALLBACK_BLOGS);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-24 relative z-10 bg-slate-100/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Technical Writing"
          title="Articles &"
          highlight="Insights"
          subtitle="Deep dives into React 19, Node.js microservices, Tailwind CSS v4, and engineering practices."
        />

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id || blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col justify-between p-0 overflow-hidden group">
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-bold text-indigo-400">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] text-slate-600 dark:text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-400 line-clamp-3 leading-relaxed font-medium">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags && blog.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] text-slate-500 font-medium">#{t}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedArticle(blog)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center space-x-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        )}

        {/* Full Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card max-w-3xl w-full p-8 relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {selectedArticle.category} • {selectedArticle.readTime}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{selectedArticle.title}</h2>
                </div>

                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                />

                <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.content}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
