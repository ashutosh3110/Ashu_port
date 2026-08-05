import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is your primary tech stack?',
      answer: 'My core stack is the MERN ecosystem: React 19, Next.js, Node.js, Express.js, MongoDB, and Tailwind CSS. I also work extensively with TypeScript, Docker, and AWS.',
    },
    {
      question: 'Are you available for freelance projects or full-time roles?',
      answer: 'Yes! I am open to full-time remote roles, contract consulting, and high-impact full-stack freelance projects.',
    },
    {
      question: 'How do you handle backend security & authentication?',
      answer: 'I implement industry best practices: JWT tokens with short expiry, bcrypt password hashing, CORS protection, rate limiting, and input validation schemas.',
    },
    {
      question: 'Can you work across different time zones?',
      answer: 'Absolutely. I have experience working asynchronously with teams across US West Coast, US East Coast, Europe, and Asia.',
    },
  ];

  return (
    <section className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Clear answers to common questions regarding my availability, stack, and workflow."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <GlassCard
                key={index}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="cursor-pointer hover:border-indigo-500/40 transition-colors p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                    <h3 className="text-base font-bold text-white">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-slate-300 pt-4 leading-relaxed border-t border-slate-800/80 mt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
