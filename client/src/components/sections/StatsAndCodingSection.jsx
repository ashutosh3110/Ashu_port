import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Award, Terminal, ExternalLink } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';

export default function StatsAndCodingSection() {
  // Simulated GitHub heat map activity grid (52 weeks x 7 days)
  const generateContributionCells = () => {
    const cells = [];
    for (let i = 0; i < 112; i++) {
      const levels = ['bg-slate-900', 'bg-emerald-900/60', 'bg-emerald-700/80', 'bg-emerald-500', 'bg-emerald-400'];
      const randomIndex = Math.floor(Math.random() * levels.length);
      cells.push(levels[randomIndex]);
    }
    return cells;
  };

  const contributionCells = generateContributionCells();

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Coding Profiles"
          title="Open Source &"
          highlight="Competitive Metrics"
          subtitle="Real-time activity metrics across GitHub, LeetCode, and major coding platforms."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* GitHub Activity Grid */}
          <div className="lg:col-span-7">
            <GlassCard className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">GitHub Contributions</h3>
                    <p className="text-xs text-slate-400">1,248 commits in the past year</p>
                  </div>
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>@ashutosh-verma</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Grid Heatmap */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 overflow-x-auto">
                <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[500px]">
                  {contributionCells.map((levelClass, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${levelClass} hover:ring-1 hover:ring-emerald-300 transition-all`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-900"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-900/60"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700/80"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* LeetCode & Profile Stats */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">LeetCode Stats</h3>
                  <p className="text-xs text-slate-400">Top 5% Global Rank</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl font-bold text-emerald-400">280+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Easy</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl font-bold text-amber-400">320+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Medium</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl font-bold text-rose-400">75+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Hard</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
