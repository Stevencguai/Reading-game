import React, { useState, useEffect } from 'react';
import { Book } from '../types';

interface ReadingSessionProps {
  book: Book;
  onBack: () => void;
  onComplete: (pagesRead: number, note: string) => void;
}

const ReadingSession: React.FC<ReadingSessionProps> = ({ book, onBack, onComplete }) => {
  // 使用時間戳記解決「切換頁面計時停止」的問題
  const [startTime] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [pagesRead, setPagesRead] = useState<number>(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col p-6 overflow-y-auto pb-32">
      <header className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-slate-400"><span className="material-symbols-outlined">close</span></button>
        <div className="text-center">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">正在冥想</p>
          <h2 className="font-bold text-sm truncate w-40">{book.title}</h2>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        {/* 計時器外圈 */}
        <div className="relative size-64 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin-slow"></div>
          <div className="text-center">
            <span className="text-6xl font-black tracking-tighter">{formatTime(elapsedSeconds)}</span>
            <p className="text-slate-500 font-bold mt-2 uppercase text-xs">專注時間</p>
          </div>
        </div>

        <div className="w-full space-y-6">
          <div className="bg-slate-900 p-6 rounded-[2rem] border border-white/5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">本次閱讀進度 (頁數)</label>
            <div className="flex items-center justify-between gap-4">
              <button onClick={() => setPagesRead(Math.max(0, pagesRead - 1))} className="size-12 bg-white/5 rounded-xl flex items-center justify-center">-</button>
              <input 
                type="number" 
                value={pagesRead || ''} 
                onChange={e => setPagesRead(Number(e.target.value))}
                className="flex-1 bg-transparent text-center text-3xl font-black focus:outline-none"
                placeholder="0"
              />
              <button onClick={() => setPagesRead(pagesRead + 1)} className="size-12 bg-white/5 rounded-xl flex items-center justify-center">+</button>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] border border-white/5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">刻在靈魂的文字 (心得/下一句)</label>
            <textarea 
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="記下這本書最讓你觸動的一句話..."
              className="w-full bg-transparent border-0 focus:ring-0 text-sm h-24 resize-none"
            />
          </div>
        </div>
      </div>

      {/* 底部按鈕 - 使用 fixed 確保不被導覽列遮擋，或加上足夠的 margin */}
      <div className="mt-8">
        <button 
          onClick={() => onComplete(pagesRead, note)}
          className="w-full bg-primary text-black py-5 rounded-2xl font-black text-lg shadow-glow active:scale-95 transition-all"
        >
          完成冥想 (Complete Quest)
        </button>
      </div>
    </div>
  );
};

export default ReadingSession;