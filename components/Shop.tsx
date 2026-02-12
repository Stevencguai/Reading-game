import React from 'react';
import { MOCK_SHOP } from '../constants';
import { ShopItem, UserStats } from '../types';

interface ShopProps {
  stats: UserStats; // 接收整個 stats 內容
  setStats: React.Dispatch<React.SetStateAction<UserStats>>; // 接收修改權限
  onBack: () => void;
}

const Shop: React.FC<ShopProps> = ({ stats, setStats, onBack }) => {
  const handlePurchase = (item: ShopItem) => {
    // 檢查餘額
    if (stats.mana < item.price) {
      alert("瑪那不足！快去閱讀獲取能量。");
      return;
    }

    // 確認視窗 (原本是 window.confirm)
    const confirmed = window.confirm(`確認花費 ${item.price} 瑪那購買「${item.name}」嗎？`);
    
    if (confirmed) {
      // 真的執行扣款！
      setStats(prev => ({
        ...prev,
        mana: prev.mana - item.price
      }));
      
      alert(`「${item.name}」購買成功！能量已釋放。`);
    }
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-slate-400 p-2 hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-black tracking-tight">靈魂商店</h2>
      </header>

      {/* 瑪那顯示卡片 */}
      <div className="bg-gradient-to-br from-primary/30 to-slate-900 p-8 rounded-[2.5rem] mb-10 border border-primary/20 shadow-lg shadow-primary/5 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="material-symbols-outlined text-8xl">auto_awesome</span>
        </div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Current Mana Pool</p>
        <div className="flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-primary text-4xl animate-pulse">diamond</span>
          <span className="text-5xl font-black tracking-tighter text-white">{stats.mana}</span>
        </div>
      </div>

      <div className="grid gap-5">
        {MOCK_SHOP.map(item => (
          <div key={item.id} className="group bg-slate-900 border border-white/5 p-5 rounded-3xl flex items-center gap-5 transition-all active:scale-[0.98] hover:border-white/10">
            <div className="relative">
              <img src={item.imageUrl} className="size-20 rounded-2xl object-cover shadow-2xl" alt={item.name} />
              {item.locked && (
                <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                  <span className="material-symbols-outlined text-white">lock</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">{item.name}</h4>
              <p className="text-xs text-slate-500 leading-tight mb-3">{item.description}</p>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">diamond</span>
                <span className="text-sm font-black tracking-tighter">{item.price} Mana</span>
              </div>
            </div>
            
            <button 
              onClick={() => handlePurchase(item)} 
              className="bg-white text-black px-5 py-3 rounded-2xl text-xs font-black shadow-xl active:bg-primary transition-colors disabled:opacity-30"
              disabled={item.locked}
            >
              購買
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center text-slate-600 text-[10px] mt-12 uppercase tracking-widest">道具效力即將在冒險中開啟</p>
    </div>
  );
};

export default Shop;