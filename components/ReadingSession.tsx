
import React, { useState, useEffect, useRef } from 'react';
import { Book } from '../types';
import { generateMemoryShard } from '../services/geminiService';

interface ReadingSessionProps {
  book: Book;
  onBack: () => void;
  onComplete: (pages: number) => void;
}

const ReadingSession: React.FC<ReadingSessionProps> = ({ book, onBack, onComplete }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [pagesRead, setPagesRead] = useState(0);
  const [memoryShard, setMemoryShard] = useState<string>("Loading ancient wisdom...");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Fetch AI flavor text
    generateMemoryShard(book.title).then(setMemoryShard);
  }, [book.title]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark p-6">
      <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-400">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="uppercase font-bold tracking-widest text-sm text-primary">Reading Quest</h2>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 flex flex-col items-center gap-10">
        {/* Book Header Card */}
        <div className="w-full bg-card-dark rounded-2xl border border-border-purple/30 p-4 flex gap-4">
          <div className="w-16 aspect-[2/3] rounded-md bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${book.coverUrl}')` }}></div>
          <div className="flex-1 flex flex-col justify-center">
             <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">Active Quest</span>
             <h3 className="font-bold text-lg leading-tight">{book.title}</h3>
             <p className="text-xs text-slate-500">Lvl {book.currentPage}</p>
          </div>
        </div>

        {/* Memory Shard */}
        <div className="w-full relative group">
          <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur opacity-50"></div>
          <div className="relative bg-surface-dark p-5 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Memory Shard</span>
            </div>
            <p className="italic text-accent-purple text-sm font-body leading-relaxed border-l-2 border-primary/40 pl-3">
              "{memoryShard}"
            </p>
          </div>
        </div>

        {/* Timer UI */}
        <div className="relative flex items-center justify-center">
           {/* Animated Outer Ring */}
           <div className={`absolute size-64 rounded-full border-2 border-dashed border-primary/20 ${isActive ? 'animate-[spin_20s_linear_infinite]' : ''}`}></div>
           
           <div className="size-56 rounded-full bg-surface-dark border-4 border-background-dark shadow-[0_0_30px_rgba(164,19,236,0.2)] flex flex-col items-center justify-center relative">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Session Time</span>
              <div className="text-5xl font-display font-bold tabular-nums">
                {formatTime(seconds)}
              </div>
              <button 
                onClick={() => setIsActive(!isActive)}
                className="absolute -bottom-6 size-14 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-[0_0_20px_rgba(164,19,236,0.4)]"
              >
                <span className="material-symbols-outlined text-3xl font-bold">{isActive ? 'pause' : 'play_arrow'}</span>
              </button>
           </div>
        </div>

        {/* Quest Log Form */}
        <div className="w-full mt-8 bg-card-dark p-5 rounded-2xl border border-border-purple/20 space-y-4">
           <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">edit_note</span>
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Quest Log</h4>
           </div>
           <div>
              <label className="text-[10px] text-accent-purple font-bold block mb-1">PAGES COMPLETED</label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  value={pagesRead || ''} 
                  onChange={(e) => setPagesRead(Number(e.target.value))}
                  placeholder="0"
                  className="flex-1 bg-background-dark border-0 rounded-lg py-3 px-4 font-bold text-lg focus:ring-2 focus:ring-primary"
                />
                <span className="text-slate-500 font-bold">/ {book.totalPages - book.currentPage}</span>
              </div>
           </div>
        </div>
      </main>

      <footer className="mt-8 pb-6">
        <button 
          onClick={() => onComplete(pagesRead)}
          className="w-full bg-primary py-4 rounded-xl font-bold text-background-dark shadow-[0_0_20px_rgba(164,19,236,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">check_circle</span>
          COMPLETE QUEST
        </button>
      </footer>
    </div>
  );
};

export default ReadingSession;
