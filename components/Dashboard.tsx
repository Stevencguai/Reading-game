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
    <div className="flex flex-col gap-6 p-6 pt-8 bg-slate-950 min-h-full">
      {/* Header Status - 玩家狀態列 */}
      <header className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="relative">
          <div className="size-16 rounded-full border-2 border-primary p-1">
            <div className="size-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky')` }}></div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">LV.{stats.level}</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <h2 className="font-black text-xl tracking-tighter">勇者探求者</h2>
            <div className="flex items-center gap-1 text-orange-400 font-black text-xs">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              {stats.streak} DAY STREAK
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-1000" style={{ width: `${(stats.xp / stats.maxXp) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-black tracking-widest text-slate-500 uppercase">
              <span>Experience</span>
              <span className="text-primary">{stats.xp} / {stats.maxXp} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Active Quests - 進行中的任務 */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">map</span>
            <h3 className="font-black text-lg tracking-tight uppercase">目前任務</h3>
          </div>
          {/* 右上角的小型新增按鈕 */}
          <button onClick={onAddQuest} className="size-8 bg-primary/20 text-primary rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
        </div>

        {activeQuests.length > 0 ? (
          <div className="space-y-5">
            {activeQuests.map(book => (
              <div key={book.id} className="group bg-slate-900/50 rounded-[2rem] border border-white/5 overflow-hidden transition-all active:scale-[0.97] hover:border-primary/30 shadow-xl">
                <div className="flex p-5 gap-5">
                  <div className="w-24 aspect-[3/4] rounded-2xl bg-cover bg-center shadow-2xl shrink-0 border border-white/10" style={{ backgroundImage: `url('${book.coverUrl}')` }}></div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{book.genre}</span>
                      <h4 className="font-bold text-lg leading-tight line-clamp-2 mt-1">{book.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{book.author}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        <span>進度 {Math.round((book.currentPage / book.totalPages) * 100)}%</span>
                        <span>{book.currentPage}/{book.totalPages} 頁</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onStartReading(book)}
                  className="w-full bg-white text-black py-4 font-black text-sm flex items-center justify-center gap-2 transition-colors active:bg-primary"
                >
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  進入閱讀冥想
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* 空狀態：引導玩家新增書籍 */
          <div onClick={onAddQuest} className="bg-slate-900/30 border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all">
            <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-600">add_reaction</span>
            </div>
            <p className="text-slate-500 font-bold mb-1">尚未啟動任何知識任務</p>
            <p className="text-primary text-xs font-black uppercase tracking-widest">點擊這裡召喚第一本書</p>
          </div>
        )}
      </section>

      {/* 數據卡片 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-5 rounded-[2rem] border border-white/5 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-inner">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <p className="text-2xl font-black tracking-tighter">{stats.booksRead}</p>
            <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest">已完成</p>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-[2rem] border border-white/5 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <div>
            <p className="text-2xl font-black tracking-tighter">{stats.totalTime}H</p>
            <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest">總時數</p>
          </div>
        </div>
      </div>

      {/* 已完成區域 */}
      {completedQuests.length > 0 && (
        <section className="pb-10">
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="material-symbols-outlined text-yellow-500 text-xl">workspace_premium</span>
            <h3 className="font-black text-lg tracking-tight uppercase">榮耀殿堂</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {completedQuests.map(book => (
              <div key={book.id} className="w-24 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                 <div className="aspect-[3/4] rounded-xl bg-cover bg-center border border-white/10 shadow-lg mb-2" style={{ backgroundImage: `url('${book.coverUrl}')` }}></div>
                 <p className="text-[10px] text-center truncate font-black text-slate-500 uppercase tracking-tighter">{book.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;