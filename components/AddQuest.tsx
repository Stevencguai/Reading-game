
import React, { useState } from 'react';
import { Book } from '../types';

interface AddQuestProps {
  onBack: () => void;
  onSave: (book: Book) => void;
}

const AddQuest: React.FC<AddQuestProps> = ({ onBack, onSave }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<number>(0);
  const [genre, setGenre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !pages) return;

    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author,
      totalPages: pages,
      currentPage: 0,
      genre: genre || 'General',
      coverUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/300`,
      status: 'active',
      lastRead: new Date().toISOString()
    };
    onSave(newBook);
  };

  return (
    <div className="flex flex-col p-4 bg-background-dark h-screen">
       <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-400">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex items-center gap-2">
           <span className="material-symbols-outlined text-primary">stylus_note</span>
           新增任務
        </h2>
        <div className="w-6"></div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
         {/* Cover Placeholder */}
         <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-border-purple/30 bg-surface-dark/50 flex flex-col items-center justify-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-4xl">add_a_photo</span>
            <p className="text-xs font-bold uppercase tracking-widest">裝備書本 (Equip Book)</p>
         </div>

         <div className="space-y-4">
            <div>
               <label className="text-[10px] font-bold text-accent-purple uppercase tracking-widest block mb-1">書名 (TITLE) <span className="text-primary">*</span></label>
               <input 
                 required
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className="w-full bg-surface-dark border-0 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary"
                 placeholder="輸入冒險之書名稱"
               />
            </div>

            <div>
               <label className="text-[10px] font-bold text-accent-purple uppercase tracking-widest block mb-1">作者 (AUTHOR)</label>
               <input 
                 value={author}
                 onChange={(e) => setAuthor(e.target.value)}
                 className="w-full bg-surface-dark border-0 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary"
                 placeholder="輸入創造者姓名"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-bold text-accent-purple uppercase tracking-widest block mb-1">總頁數 (PAGES) <span className="text-primary">*</span></label>
                  <input 
                    required
                    type="number"
                    value={pages || ''}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full bg-surface-dark border-0 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-bold text-accent-purple uppercase tracking-widest block mb-1">類型 (GENRE)</label>
                  <select 
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-surface-dark border-0 rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-primary"
                  >
                     <option value="">選擇類別</option>
                     <option value="自我成長">自我成長 (Growth)</option>
                     <option value="奇幻冒險">奇幻冒險 (Fantasy)</option>
                     <option value="科幻經典">科幻經典 (Sci-Fi)</option>
                     <option value="歷史人文">歷史人文 (History)</option>
                  </select>
               </div>
            </div>
         </div>

         <div className="flex-1"></div>

         <button 
           type="submit"
           className="w-full bg-primary py-4 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(164,19,236,0.4)] flex items-center justify-center gap-2 mb-8"
         >
            <span className="material-symbols-outlined">swords</span>
            接受任務 (Accept Quest)
         </button>
      </form>
    </div>
  );
};

export default AddQuest;
