import React from 'react';
import { MOCK_SHOP } from '../constants';
import { ShopItem } from '../types';

interface ShopProps {
  mana: number;
  onBack: () => void;
}

const Shop: React.FC<ShopProps> = ({ mana, onBack }) => {
  const handlePurchase = (item: ShopItem) => {
    if (mana < item.price) {
      alert("瑪那不足！快去閱讀獲取能量。");
      return;
    }
    const confirmed = window.confirm(`確認花費 ${item.price} 瑪那購買「${item.name}」嗎？`);
    if (confirmed) {
      alert("購買成功！道具已放入背包（即將推出）。");
    }
  };

  return (
    <div className="p-4">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-slate-400"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="text-xl font-bold tracking-widest">獎勵商城</h2>
      </header>

      <div className="bg-gradient-to-br from-primary/20 to-accent-purple/20 p-6 rounded-3xl mb-8 border border-white/10 text-center">
        <p className="text-[10px] font-bold text-accent-purple uppercase tracking-widest mb-1">可用瑪那</p>
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">diamond</span>
          <span className="text-4xl font-bold">{mana}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_SHOP.map(item => (
          <div key={item.id} className="bg-card-dark border border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <img src={item.imageUrl} className="size-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-[10px] text-slate-400">{item.description}</p>
              <p className="text-primary font-bold mt-1">{item.price} Mana</p>
            </div>
            <button onClick={() => handlePurchase(item)} className="bg-primary px-4 py-2 rounded-lg text-xs font-bold">購買</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;