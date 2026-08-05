import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
