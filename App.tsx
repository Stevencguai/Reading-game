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
  const [showTutorial, setShowTutorial] = useState(true); // 新手指導開關

  // 模擬從 LocalStorage 讀取資料
  useEffect(() => {
    const savedStats = localStorage.getItem('user_stats');
    const savedBooks = localStorage.getItem('user_books');
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedBooks) setBooks(JSON.parse(savedBooks));
    if (savedStats || savedBooks) setShowTutorial(false);
  }, []);

  // 儲存資料
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
    
    // 計算邏輯：每讀一頁增加 5 XP, 2 瑪那，並根據頁數增加屬性
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
    <div className="relative h-screen overflow-hidden bg-background-dark text-white font-body">
      {/* 新手指導 Overlay */}
      {showTutorial && (
        <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-8 text-center">
          <span className="material-symbols-outlined text-6xl text-primary mb-4">auto_awesome</span>
          <h2 className="text-2xl font-bold mb-2">歡迎來到冒險日誌</h2>
          <p className="text-slate-400 mb-8">在這裡，你的每一次閱讀都會轉化為英雄的屬性。準備好開始你的知識冒險了嗎？</p>
          <button 
            onClick={() => setShowTutorial(false)}
            className="bg-primary px-8 py-3 rounded-xl font-bold"
          >
            開始新手任務
          </button>
        </div>
      )}

      <main className="h-full overflow-y-auto pb-24">
        {currentView === ViewState.Dashboard && (
          <Dashboard stats={stats} books={books} onStartReading={(b) => { setActiveBook(b); setCurrentView(ViewState.ReadingSession); }} onAddQuest={() => setCurrentView(ViewState.AddQuest)} />
        )}
        {currentView === ViewState.Shop && <Shop mana={stats.mana} onBack={() => setCurrentView(ViewState.Dashboard)} />}
        {currentView === ViewState.Stats && <Stats stats={stats} onBack={() => setCurrentView(ViewState.Dashboard)} />}
        {currentView === ViewState.Calendar && <Calendar onBack={() => setCurrentView(ViewState.Dashboard)} />}
        {currentView === ViewState.AddQuest && <AddQuest onBack={() => setCurrentView(ViewState.Dashboard)} onSave={handleAddBook} />}
        {currentView === ViewState.ReadingSession && activeBook && (
          <ReadingSession book={activeBook} onBack={() => setCurrentView(ViewState.Dashboard)} onComplete={handleCompleteReading} />
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card-dark/80 backdrop-blur-lg border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setCurrentView(ViewState.Dashboard)} className={`flex flex-col items-center gap-1 ${currentView === ViewState.Dashboard ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => setCurrentView(ViewState.Shop)} className={`flex flex-col items-center gap-1 ${currentView === ViewState.Shop ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] font-bold">Shop</span>
        </button>
        <button onClick={() => setCurrentView(ViewState.Stats)} className={`flex flex-col items-center gap-1 ${currentView === ViewState.Stats ? 'text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Hero</span>
        </button>
      </nav>
    </div>
  );
};

export default App;