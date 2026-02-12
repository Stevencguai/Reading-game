import React, { useState, useEffect } from 'react';
import { Book, UserStats, ViewState } from './types';
import { INITIAL_STATS } from './constants';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Stats from './components/Stats';
import Calendar from './components/Calendar';
import ReadingSession from './components/ReadingSession';
import AddQuest from './components/AddQuest';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.Dashboard);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [books, setBooks] = useState<Book[]>([]);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  // 1. 模擬從 LocalStorage 讀取資料
  useEffect(() => {
    const savedStats = localStorage.getItem('user_stats');
    const savedBooks = localStorage.getItem('user_books');
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedBooks) setBooks(JSON.parse(savedBooks));
    if (savedStats || savedBooks) setShowTutorial(false);
  }, []);

  // 2. 儲存資料
  useEffect(() => {
    localStorage.setItem('user_stats', JSON.stringify(stats));
    localStorage.setItem('user_books', JSON.stringify(books));
  }, [stats, books]);

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
    setCurrentView(ViewState.Dashboard);
  };

  const handleCompleteReading = (pagesRead: number) => {
    if (!activeBook) return;
    
    const xpGained = pagesRead * 5;
    const manaGained = pagesRead * 2;
    
    const updatedBook = {
      ...activeBook,
      currentPage: activeBook.currentPage + pagesRead,
      lastRead: new Date().toISOString(),
      status: (activeBook.currentPage + pagesRead >= activeBook.totalPages) ? 'completed' : 'active'
    } as Book;

    setBooks(books.map(b => b.id === activeBook.id ? updatedBook : b));
    setStats(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      mana: prev.mana + manaGained,
      attributes: {
        ...prev.attributes,
        focus: prev.attributes.focus + (pagesRead > 10 ? 1 : 0),
        discipline: prev.attributes.discipline + 1
      }
    }));
    
    setCurrentView(ViewState.Dashboard);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-slate-950 text-white font-sans">
      {/* 新手指導 Overlay */}
      {showTutorial && (
        <div className="absolute inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/50 animate-pulse">
            <span className="material-symbols-outlined text-5xl text-primary">auto_awesome</span>
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-wider text-primary">冒險開始</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            勇者，歡迎來到冒險日誌。<br/>
            你的每一次翻頁，都將化為成長的經驗值。
          </p>
          <button 
            onClick={() => setShowTutorial(false)}
            className="bg-primary hover:bg-primary-light text-black px-12 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 transition-transform active:scale-95"
          >
            踏上旅程
          </button>
        </div>
      )}

      {/* 主要內容區域 */}
      <main className="h-full overflow-y-auto pb-32">
        {currentView === ViewState.Dashboard && (
          <Dashboard 
            stats={stats} 
            books={books} 
            onStartReading={(b) => { setActiveBook(b); setCurrentView(ViewState.ReadingSession); }} 
            onAddQuest={() => setCurrentView(ViewState.AddQuest)} 
          />
        )}
        
        {/* 修正：Shop 需要 stats 來處理購買扣款，並傳入 setStats */}
        {currentView === ViewState.Shop && (
          <Shop stats={stats} setStats={setStats} onBack={() => setCurrentView(ViewState.Dashboard)} />
        )}
        
        {currentView === ViewState.Stats && (
          <Stats stats={stats} onBack={() => setCurrentView(ViewState.Dashboard)} />
        )}
        
        {currentView === ViewState.Calendar && (
          <Calendar onBack={() => setCurrentView(ViewState.Dashboard)} />
        )}
        
        {currentView === ViewState.AddQuest && (
          <AddQuest onBack={() => setCurrentView(ViewState.Dashboard)} onSave={handleAddBook} />
        )}
        
        {currentView === ViewState.ReadingSession && activeBook && (
          <ReadingSession 
            book={activeBook} 
            onBack={() => setCurrentView(ViewState.Dashboard)} 
            onComplete={handleCompleteReading} 
          />
        )}
      </main>

      {/* Navigation - 底部導覽列 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex justify-around items-center z-50 shadow-2xl">
        <button onClick={() => setCurrentView(ViewState.Dashboard)} className={`flex flex-col items-center gap-1 transition-colors ${currentView === ViewState.Dashboard ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">冒險</span>
        </button>
        
        {/* 新增：日曆/打卡紀錄按鈕 */}
        <button onClick={() => setCurrentView(ViewState.Calendar)} className={`flex flex-col items-center gap-1 transition-colors ${currentView === ViewState.Calendar ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-2xl">calendar_month</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">紀錄</span>
        </button>

        <button onClick={() => setCurrentView(ViewState.Shop)} className={`flex flex-col items-center gap-1 transition-colors ${currentView === ViewState.Shop ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-2xl">storefront</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">商店</span>
        </button>

        <button onClick={() => setCurrentView(ViewState.Stats)} className={`flex flex-col items-center gap-1 transition-colors ${currentView === ViewState.Stats ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">英雄</span>
        </button>
      </nav>
    </div>
  );
};

export default App;