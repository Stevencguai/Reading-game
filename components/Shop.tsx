
import React from 'react';
import { MOCK_SHOP } from '../constants';

interface ShopProps {
  mana: number;
  onBack: () => void;
}

const Shop: React.FC<ShopProps> = ({ mana, onBack }) => {
  return (
    <div className="flex flex-col p-4">
       <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-slate-400">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">獎勵商城 (Shop)</h2>
      </header>

      <div className="bg-gradient-to-r from-card-dark to-surface-dark border border-border-purple/30 p-6 rounded-3xl mb-8 flex flex-col items-center gap-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-24 bg-primary/10 blur-2xl -mr-12 -mt-12"></div>
        <p className="text-[10px] font-bold text-accent-purple uppercase tracking-widest">可用瑪那 (MANA)</p>
        <div className="flex items-center gap-2">
           <span className="material-symbols-outlined text-primary text-3xl fill-1">diamond</span>
           <span className="text-4xl font-display font-bold tracking-tight">{mana.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4 mb-20">
         {MOCK_SHOP.map(item => (
           <div key={item.id} className={`flex items-center gap-4 p-3 bg-card-dark border rounded-2xl transition-all ${item.locked ? 'border-border-purple/10 grayscale opacity-60' : 'border-border-purple/30'}`}>
              <div className="relative size-16 shrink-0 rounded-xl overflow-hidden bg-background-dark">
                <img src={item.imageUrl} alt={item.name} className="size-full object-cover" />
                {item.locked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/50">lock</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                 <h4 className="font-bold text-sm truncate">{item.name}</h4>
                 <p className="text-[10px] text-accent-purple line-clamp-1">{item.description}</p>
                 <p className="text-primary font-bold text-sm mt-1">{item.price} Pt</p>
              </div>
              <button disabled={item.locked} className={`size-10 rounded-xl flex items-center justify-center transition-all ${item.locked ? 'bg-border-purple/20 text-slate-500' : 'bg-primary text-white shadow-lg'}`}>
                 <span className="material-symbols-outlined text-xl">{item.locked ? 'lock' : 'shopping_cart'}</span>
              </button>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Shop;
