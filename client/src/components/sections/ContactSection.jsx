import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import API from '../../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all form fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/messages', formData);
      if (res.data.success) {
        toast.success(res.data.message || 'Message sent successfully!');
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Get In Touch"
          title="Let's Build Something"
          highlight="Extraordinary"
          subtitle="Have a project in mind, a question, or a job opportunity? Drop a message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Feel free to reach out via the form or through social channels. I usually respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Email</div>
                    <a href="mailto:ashutoshbankey21306@gmail.com" className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      ashutoshbankey21306@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Location</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Indore / Bhopal / Remote</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Phone / WhatsApp</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">+91 6263510091</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <GlassCard className="p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Delivered!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto font-medium">
                    Thank you for reaching out. A confirmation email has been logged and I will review your inquiry shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Project Inquiry / Job Opportunity"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell me about your project scope, timeline, or requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
