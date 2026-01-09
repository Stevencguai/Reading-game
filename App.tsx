
import React, { useState, useEffect } from 'react';
import { Book, UserStats, ViewState } from './types';
import { INITIAL_STATS, MOCK_BOOKS } from './constants';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Stats from './components/Stats';
import Calendar from './components/Calendar';
import ReadingSession from './components/ReadingSession';
import AddQuest from './components/AddQuest';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.Dashboard);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [activeBook, setActiveBook] = useState<Book | null>(MOCK_BOOKS[0]);
  const [isReading, setIsReading] = useState(false);

  // Simple "routing" effect to handle back buttons or initial states
  const renderView = () => {
    switch (currentView) {
      case ViewState.Dashboard:
        return (
          <Dashboard 
            stats={stats} 
            books={books} 
            onStartReading={(book) => {
              setActiveBook(book);
              setCurrentView(ViewState.ReadingSession);
            }}
            onAddQuest={() => setCurrentView(ViewState.AddQuest)}
          />
        );
      case ViewState.Shop:
        return <Shop mana={stats.mana} onBack={() => setCurrentView(ViewState.Dashboard)} />;
      case ViewState.Stats:
        return <Stats stats={stats} onBack={() => setCurrentView(ViewState.Dashboard)} />;
      case ViewState.Calendar:
        return <Calendar onBack={() => setCurrentView(ViewState.Dashboard)} />;
      case ViewState.AddQuest:
        return (
          <AddQuest 
            onBack={() => setCurrentView(ViewState.Dashboard)} 
            onSave={(newBook) => {
              setBooks([newBook, ...books]);
              setCurrentView(ViewState.Dashboard);
            }}
          />
        );
      case ViewState.ReadingSession:
        if (!activeBook) return null;
        return (
          <ReadingSession 
            book={activeBook} 
            onBack={() => setCurrentView(ViewState.Dashboard)}
            onComplete={(pagesRead) => {
              // Update stats logic
              const updatedBooks = books.map(b => 
                b.id === activeBook.id 
                  ? { ...b, currentPage: Math.min(b.totalPages, b.currentPage + pagesRead) } 
                  : b
              );
              setBooks(updatedBooks);
              setStats({
                ...stats,
                xp: stats.xp + (pagesRead * 2), // 2 XP per page
                mana: stats.mana + pagesRead,
              });
              setCurrentView(ViewState.Dashboard);
            }}
          />
        );
      default:
        return <Dashboard stats={stats} books={books} onStartReading={setActiveBook} onAddQuest={() => {}} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden bg-background-dark">
      {/* View Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {renderView()}
      </div>

      {/* Bottom Navigation (Always Visible except in Reading mode) */}
      {currentView !== ViewState.ReadingSession && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card-dark/95 backdrop-blur-lg border-t border-border-purple/30 h-16 flex items-center justify-around z-50">
          <button 
            onClick={() => setCurrentView(ViewState.Dashboard)}
            className={`flex flex-col items-center gap-1 w-full ${currentView === ViewState.Dashboard ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined">map</span>
            <span className="text-[10px] font-bold">Quests</span>
          </button>
          <button 
            onClick={() => setCurrentView(ViewState.Shop)}
            className={`flex flex-col items-center gap-1 w-full ${currentView === ViewState.Shop ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined">storefront</span>
            <span className="text-[10px] font-bold">Shop</span>
          </button>
          <button 
            onClick={() => setCurrentView(ViewState.Stats)}
            className={`flex flex-col items-center gap-1 w-full ${currentView === ViewState.Stats ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-[10px] font-bold">Stats</span>
          </button>
          <button 
            onClick={() => setCurrentView(ViewState.Calendar)}
            className={`flex flex-col items-center gap-1 w-full ${currentView === ViewState.Calendar ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-[10px] font-bold">Legacy</span>
          </button>
        </nav>
      )}

      {/* Floating Action Button (only on Dashboard) */}
      {currentView === ViewState.Dashboard && (
        <button 
          onClick={() => setCurrentView(ViewState.AddQuest)}
          className="absolute bottom-24 right-5 size-14 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(164,19,236,0.5)] flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}
    </div>
  );
};

export default App;
