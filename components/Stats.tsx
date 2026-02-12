import React, { useState, useRef } from 'react';
import { UserStats, INITIAL_STATS } from '../constants'; // 確保路徑正確

interface StatsProps {
  stats: UserStats;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
  onBack: () => void;
}

const Stats: React.FC<StatsProps> = ({ stats, setStats, onBack }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. 處理更換頭像
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStats(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. 處理重置數據 (重啟人生)
  const handleReset = () => {
    const confirmed = window.confirm("確定要重啟人生嗎？這將刪除所有等級與進度，且無法復原。");
    if (confirmed) {
      localStorage.clear();
      setStats(INITIAL_STATS);
      window.location.reload(); // 重新整理頁面以套用
    }
  };

  // Radar Chart Component
  const RadarChart = () => {
    const scale = 8; // 等級縮放係數
    const points = [
      `100,${100 - stats.attributes.focus * scale}`,
      `${100 + stats.attributes.comprehension * scale},100`,
      `100,${100 + stats.attributes.discipline * scale}`,
      `${100 - stats.attributes.exploration * scale},100`,
    ];

    return (
      <div className="relative size-64 mx-auto my-12 page-transition">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(164,19,236,0.3)] overflow-visible">
          {[10, 8, 6, 4, 2].map((lv) => (
            <polygon key={lv} points={`100,${100 - lv*scale} ${100 + lv*scale},100 100,${100 + lv*scale} ${100 - lv*scale},100`} className="fill-none stroke-white/5 stroke-1" />
          ))}
          <line x1="100" y1="20" x2="100" y2="180" className="stroke-white/5" />
          <line x1="20" y1="100" x2="180" y2="100" className="stroke-white/5" />
          <polygon points={points.join(' ')} className="fill-primary/30 stroke-primary stroke-2 transition-all duration-1000" />
        </svg>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-center">
           <p className="text-primary font-black text-[10px] tracking-widest">FOCUS</p>
           <p className="text-[10px] text-white/40">LV.{stats.attributes.focus}</p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-center">
           <p className="text-[10px] text-white/40">LV.{stats.attributes.discipline}</p>
           <p className="text-primary font-black text-[10px] tracking-widest">DISCIPLINE</p>
        </div>
        <div className="absolute right-0 top-1/2 translate-x-14 -translate-y-1/2 text-left">
           <p className="text-primary font-black text-[10px] tracking-widest uppercase">Comp</p>
           <p className="text-[10px] text-white/40">LV.{stats.attributes.comprehension}</p>
        </div>
        <div className="absolute left-0 top-1/2 -translate-x-14 -translate-y-1/2 text-right">
           <p className="text-primary font-black text-[10px] tracking-widest uppercase">Expl</p>
           <p className="text-[10px] text-white/40">LV.{stats.attributes.exploration}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-6 bg-slate-950 min-h-full pb-32 overflow-y-auto">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 p-2"><span className="material-symbols-outlined">arrow_back</span></button>
          <h2 className="text-xl font-black uppercase tracking-tighter">Hero Status</h2>
        </div>
        <button onClick={handleReset} className="text-red-500/50 text-[10px] font-bold border border-red-500/20 px-3 py-1 rounded-full active:bg-red-500 active:text-white transition-all">重啟人生</button>
      </header>

      {/* 角色資訊卡片 */}
      <div className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex items-center gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-8xl">shield</span>
        </div>
        
        {/* 點擊可更換頭像 */}
        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
          <div className="size-20 rounded-3xl border-2 border-primary overflow-hidden shadow-glow">
            <img src={stats.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky'} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="material-symbols-outlined text-white">photo_camera</span>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>

        <div className="flex-1">
           {isEditingName ? (
             <input 
               autoFocus 
               className="bg-transparent border-b border-primary text-xl font-black w-full outline-none" 
               onBlur={() => setIsEditingName(false)}
               value={stats.name || "勇者"}
               onChange={(e) => setStats(prev => ({ ...prev, name: e.target.value }))}
             />
           ) : (
             <h3 className="font-black text-2xl tracking-tight flex items-center gap-2" onClick={() => setIsEditingName(true)}>
               {stats.name || "勇者"} <span className="material-symbols-outlined text-xs text-slate-600">edit</span>
             </h3>
           )}
           <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mt-1">Lv.{stats.level} Novice Scholar</p>
        </div>
      </div>

      <RadarChart />

      {/* 屬性清單 */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { icon: 'timer', label: 'Duration', attr: '專注力', lv: stats.attributes.focus, color: 'text-orange-400' },
          { icon: 'menu_book', label: 'Notes', attr: '理解力', lv: stats.attributes.comprehension, color: 'text-blue-400' },
          { icon: 'calendar_month', label: 'Streak', attr: '紀律性', lv: stats.attributes.discipline, color: 'text-green-400' },
          { icon: 'explore', label: 'Genres', attr: '探索力', lv: stats.attributes.exploration, color: 'text-primary' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-[1.5rem] border border-white/5 relative group active:scale-95 transition-all">
             <span className={`material-symbols-outlined absolute top-3 right-3 opacity-10 text-3xl ${item.color}`}>{item.icon}</span>
             <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">{item.label}</p>
             <p className="font-black text-lg mb-2">{item.attr}</p>
             <span className={`${item.color} font-black text-xs`}>LV.{item.lv}</span>
          </div>
        ))}
      </div>

      {/* 稱號系統 */}
      <div className="mt-10 space-y-4">
        <h3 className="font-black text-lg uppercase tracking-tight px-2">解鎖稱號 (Titles)</h3>
        <div className="bg-gradient-to-r from-primary/20 to-slate-900 p-1 rounded-3xl border border-primary/30">
          <div className="bg-slate-950/80 p-4 rounded-[1.4rem] flex gap-5 items-center">
             <div className="size-16 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
             </div>
             <div className="flex-1">
                <span className="bg-primary text-black px-2 py-0.5 rounded text-[8px] font-black uppercase">Equipped</span>
                <p className="font-black text-xl tracking-tighter mt-1">守藏史</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Archive Keeper</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;