import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  if (type === 'skill') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 space-y-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-800/80 rounded-xl" />
                <div className="h-5 bg-slate-800/80 rounded w-28" />
              </div>
              <div className="h-4 bg-slate-800/60 rounded w-10" />
            </div>
            <div className="h-2.5 bg-slate-800/60 rounded-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'timeline') {
    return (
      <div className="relative border-l border-indigo-500/20 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative space-y-3 animate-pulse">
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-8 h-8 rounded-full bg-slate-800/80 border-2 border-indigo-500/30" />
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <div className="h-5 bg-slate-800/80 rounded w-1/2" />
              <div className="h-4 bg-slate-800/60 rounded w-1/3" />
              <div className="h-4 bg-slate-800/60 rounded w-full" />
              <div className="h-4 bg-slate-800/60 rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 space-y-4 animate-pulse">
            <div className="h-48 bg-slate-800/60 rounded-xl w-full" />
            <div className="h-6 bg-slate-800/80 rounded w-3/4" />
            <div className="h-4 bg-slate-800/60 rounded w-full" />
            <div className="h-4 bg-slate-800/60 rounded w-5/6" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-slate-800/60 rounded-full w-16" />
              <div className="h-6 bg-slate-800/60 rounded-full w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 bg-slate-800/60 rounded-xl w-full" />
      ))}
    </div>
  );
}
