
import React from 'react';
import { Book, UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
  books: Book[];
  onStartReading: (book: Book) => void;
  onAddQuest: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, books, onStartReading, onAddQuest }) => {
  const activeQuests = books.filter(b => b.status === 'active');
  const completedQuests = books.filter(b => b.status === 'completed');

  return (
    <div className="flex flex-col gap-6 p-4 pt-6">
      {/* Header Status */}
      <header className="flex items-center gap-3 bg-card-dark/50 p-3 rounded-2xl border border-border-purple/20">
        <div className="relative">
          <div className="size-14 rounded-full border-2 border-primary bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/id/64/100/100')` }}></div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-background-dark">Lv.{stats.level}</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-bold text-lg leading-none">Alex Reader</h2>
            <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
              <span className="material-symbols-outlined text-lg">local_fire_department</span>
              {stats.streak} Days
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-border-purple/30 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${(stats.xp / stats.maxXp) * 100}%` }}></div>
            </div>
            <span className="text-[10px] text-accent-purple font-medium">{stats.xp}/{stats.maxXp} XP</span>
          </div>
        </div>
      </header>

      {/* Primary Quest */}
      {activeQuests.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">auto_stories</span>
            <h3 className="font-bold text-xl tracking-tight">Active Quests</h3>
          </div>
          <div className="space-y-4">
            {activeQuests.map(book => (
              <div key={book.id} className="bg-card-dark rounded-2xl border border-border-purple/40 overflow-hidden shadow-lg transition-transform active:scale-[0.98]">
                <div className="flex p-4 gap-4">
                  <div className="w-20 aspect-[2/3] rounded-lg bg-cover bg-center shadow-md shrink-0" style={{ backgroundImage: `url('${book.coverUrl}')` }}></div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-base leading-tight line-clamp-1">{book.title}</h4>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase">{book.genre}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-accent-purple mt-1">{book.author}</p>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Progress</span>
                        <span>{Math.round((book.currentPage / book.totalPages) * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onStartReading(book)}
                  className="w-full bg-primary/10 border-t border-border-purple/20 py-3 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  Continue Adventure
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card-dark rounded-2xl border border-border-purple/30 p-4 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <p className="text-xl font-bold">{stats.booksRead}</p>
            <p className="text-[10px] uppercase text-accent-purple font-bold">Books Read</p>
          </div>
        </div>
        <div className="bg-card-dark rounded-2xl border border-border-purple/30 p-4 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <div>
            <p className="text-xl font-bold">{stats.totalTime}h</p>
            <p className="text-[10px] uppercase text-accent-purple font-bold">Total Time</p>
          </div>
        </div>
      </div>

      {/* Completed Section (Optional) */}
      {completedQuests.length > 0 && (
        <section className="mb-8">
           <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-yellow-500">military_tech</span>
            <h3 className="font-bold text-lg text-slate-400 uppercase tracking-widest text-[12px]">Completed Quests</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {completedQuests.map(book => (
              <div key={book.id} className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                 <div className="aspect-[2/3] rounded-lg bg-cover bg-center border border-border-purple/20 shadow-sm" style={{ backgroundImage: `url('${book.coverUrl}')` }}></div>
                 <p className="text-[10px] text-center mt-1 truncate font-medium text-accent-purple">{book.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
