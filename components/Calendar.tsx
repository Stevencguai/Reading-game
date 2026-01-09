
import React from 'react';
import { MOCK_BADGES } from '../constants';

interface CalendarProps {
  onBack: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ onBack }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col p-4">
       <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-slate-400">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold uppercase tracking-widest">Legacy</h2>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-card-dark p-4 rounded-2xl border border-border-purple/30 text-center">
           <p className="text-2xl font-bold text-primary">LV. 5</p>
           <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Librarian</p>
        </div>
        <div className="bg-card-dark p-4 rounded-2xl border border-border-purple/30 text-center">
           <div className="flex items-center justify-center gap-1">
              <p className="text-2xl font-bold">12</p>
              <span className="material-symbols-outlined text-yellow-500 text-sm">military_tech</span>
           </div>
           <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Artifacts</p>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-4">Achievement Log</h3>
        <div className="bg-card-dark p-4 rounded-2xl border border-border-purple/20">
           <div className="flex justify-between items-center mb-4">
              <span className="material-symbols-outlined text-slate-500">chevron_left</span>
              <p className="font-bold">October 2023</p>
              <span className="material-symbols-outlined text-slate-500">chevron_right</span>
           </div>
           <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-accent-purple mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
           </div>
           <div className="grid grid-cols-7 gap-1">
              {Array(3).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
              {days.map(d => (
                <div key={d} className={`aspect-square rounded flex items-center justify-center text-[10px] font-bold ${d % 4 === 0 ? 'bg-primary/20 text-primary' : d === 6 ? 'bg-primary text-background-dark shadow-glow' : 'text-slate-600'}`}>
                   {d}
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="mb-20">
         <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-4">Unlocked Badges</h3>
         <div className="grid grid-cols-3 gap-4">
            {MOCK_BADGES.map(badge => (
              <div key={badge.id} className="flex flex-col gap-2 items-center">
                 <div className="aspect-square rounded-2xl border-2 border-primary/40 relative overflow-hidden shadow-glow">
                    <img src={badge.imageUrl} alt={badge.name} className="size-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                    <div className="absolute bottom-1 right-1">
                       <span className="material-symbols-outlined text-yellow-500 text-xs">star</span>
                    </div>
                 </div>
                 <p className="text-[10px] font-bold text-center truncate w-full">{badge.name}</p>
                 <p className="text-[8px] text-primary font-bold">{badge.rewardXp} XP</p>
              </div>
            ))}
            {Array(3).fill(null).map((_, i) => (
              <div key={`lock-${i}`} className="flex flex-col gap-2 items-center opacity-30">
                 <div className="aspect-square w-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-slate-600">lock</span>
                 </div>
                 <p className="text-[10px] font-bold">???</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default Calendar;
