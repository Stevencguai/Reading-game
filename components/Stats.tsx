
import React from 'react';
import { UserStats } from '../types';

interface StatsProps {
  stats: UserStats;
  onBack: () => void;
}

const Stats: React.FC<StatsProps> = ({ stats, onBack }) => {
  // Simple Radar Chart Component
  const RadarChart = () => {
    // Center is 100,100
    const points = [
      `100,${100 - stats.attributes.focus * 5}`,     // Top
      `${100 + stats.attributes.comprehension * 5},100`, // Right
      `100,${100 + stats.attributes.discipline * 5}`, // Bottom
      `${100 - stats.attributes.exploration * 5},100`, // Left
    ];

    return (
      <div className="relative size-64 mx-auto my-8">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Grids */}
          {[10, 8, 6, 4, 2].map((lv) => (
            <polygon key={lv} points={`100,${100 - lv*8} ${100 + lv*8},100 100,${100 + lv*8} ${100 - lv*8},100`} className="fill-none stroke-white/10 stroke-1" />
          ))}
          {/* Axes */}
          <line x1="100" y1="20" x2="100" y2="180" className="stroke-white/10" />
          <line x1="20" y1="100" x2="180" y2="100" className="stroke-white/10" />
          {/* Data Shape */}
          <polygon points={points.join(' ')} className="fill-primary/20 stroke-primary stroke-2" />
          {/* Data Points */}
          {points.map((p, i) => {
            const [x, y] = p.split(',');
            return <circle key={i} cx={x} cy={y} r="3" className="fill-primary" />;
          })}
        </svg>
        {/* Labels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-center">
           <p className="text-primary font-bold text-[10px] tracking-widest">FOCUS</p>
           <p className="text-[8px] text-white/40">Lv.{stats.attributes.focus}</p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-center">
           <p className="text-[8px] text-white/40">Lv.{stats.attributes.discipline}</p>
           <p className="text-primary font-bold text-[10px] tracking-widest">DISCIPLINE</p>
        </div>
        <div className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2">
           <p className="text-primary font-bold text-[10px] tracking-widest">COMP</p>
           <p className="text-[8px] text-white/40">Lv.{stats.attributes.comprehension}</p>
        </div>
        <div className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 text-right">
           <p className="text-primary font-bold text-[10px] tracking-widest">EXPL</p>
           <p className="text-[8px] text-white/40">Lv.{stats.attributes.exploration}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-slate-400">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Character Status</h2>
      </header>

      <div className="flex items-center gap-4 bg-card-dark p-4 rounded-2xl border border-border-purple/20">
        <div className="size-16 rounded-xl border-2 border-primary bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/id/64/100/100')` }}></div>
        <div className="flex-1">
           <h3 className="font-bold text-xl">Alex Reader</h3>
           <p className="text-primary text-sm">Novice Scholar</p>
           <div className="w-full bg-border-purple/30 h-1.5 rounded-full mt-2">
              <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
           </div>
        </div>
      </div>

      <RadarChart />

      <div className="grid grid-cols-2 gap-3 mt-8">
        {[
          { icon: 'timer', label: 'Duration', attr: '專注力', lv: stats.attributes.focus, sub: '45m / Session' },
          { icon: 'menu_book', label: 'Notes', attr: '理解力', lv: stats.attributes.comprehension, sub: '24 Notes' },
          { icon: 'calendar_month', label: 'Streak', attr: '紀律', lv: stats.attributes.discipline, sub: `${stats.streak} Days` },
          { icon: 'explore', label: 'Genres', attr: '探索', lv: stats.attributes.exploration, sub: '6 Genres' },
        ].map((item, i) => (
          <div key={i} className="bg-surface-dark p-3 rounded-2xl border border-white/5 relative overflow-hidden">
             <span className="material-symbols-outlined absolute top-2 right-2 text-primary/10 text-4xl">{item.icon}</span>
             <p className="text-[8px] uppercase font-bold text-white/40 tracking-wider mb-1">{item.label}</p>
             <p className="font-bold text-base mb-2">{item.attr}</p>
             <div className="flex justify-between items-end">
                <span className="text-primary font-bold text-xs">Lv.{item.lv}</span>
                <span className="text-white/30 text-[8px]">{item.sub}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4 mb-20">
        <h3 className="font-bold text-lg">稱號系統 (Titles)</h3>
        <div className="bg-card-dark p-2 rounded-2xl border border-primary/20 flex gap-4">
           <div className="w-20 aspect-[3/4] rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/id/50/200/300')` }}></div>
           <div className="flex-1 py-2 flex flex-col justify-center">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[8px] font-bold uppercase w-fit mb-1">Equipped</span>
              <p className="font-bold text-lg">守藏史</p>
              <p className="text-[10px] text-accent-purple">Archive Keeper</p>
              <p className="text-primary font-bold text-[10px] mt-1">+5% XP Gain</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
