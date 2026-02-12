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
  const [genre, setGenre] = useState('自我成長');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false); // AI 辨識狀態

  // 模擬 AI 辨識功能 (未來可以串接 geminiService)
  const analyzeBookImage = async (file: File) => {
    setIsAnalyzing(true);
    
    // 這裡先寫模擬邏輯，讓你推上去手機看效果
    // 實際開發時，你會在這裡呼叫之前寫的 Gemini 接口
    setTimeout(() => {
      // 假設 AI 從封面抓到了資訊
      if (!title) setTitle("預測書名: 英雄的覺醒"); 
      if (!author) setAuthor("AI 鑑定作者");
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      analyzeBookImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !pages) return;

    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author,
      totalPages: pages,
      currentPage: 0,
      genre,
      coverUrl: previewUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/300`,
      status: 'active',
      lastRead: new Date().toISOString()
    };
    onSave(newBook);
  };

  return (
    <div className="p-6 flex flex-col min-h-screen bg-slate-950">
      <header className="flex items-center gap-4 mb-8">
        <button type="button" onClick={onBack} className="text-slate-400 p-2 hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-black tracking-tight">啟動閱讀任務</h2>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
        {/* 封面掃描區域 */}
        <div className="flex flex-col items-center">
          <div className={`relative size-40 rounded-3xl border-2 border-dashed transition-all duration-500 flex items-center justify-center overflow-hidden mb-4 ${isAnalyzing ? 'border-primary animate-pulse shadow-glow' : 'border-slate-700 bg-slate-900'}`}>
            {previewUrl ? (
              <img src={previewUrl} className="size-full object-cover" alt="Cover Preview" />
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <span className="material-symbols-outlined text-5xl">menu_book</span>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-primary text-xs font-bold animate-bounce text-center px-2">
                  <span className="material-symbols-outlined block text-3xl mb-1">searching</span>
                  真理鑑定中...
                </div>
              </div>
            )}
          </div>
          
          <label className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-black cursor-pointer active:scale-95 transition-transform flex items-center gap-2 shadow-xl">
            <span className="material-symbols-outlined text-lg">photo_camera</span>
            掃描書本封面
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* 輸入區域 */}
        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-bold text-primary uppercase ml-4 mb-1 block">書名 (Title)</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="輸入或掃描獲取書名" className="w-full bg-slate-900 p-4 rounded-2xl border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-primary transition-all text-white placeholder:text-slate-600" required />
          </div>

          <div className="group">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-4 mb-1 block">作者 (Author)</label>
            <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="作者姓名" className="w-full bg-slate-900 p-4 rounded-2xl border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-primary transition-all text-white placeholder:text-slate-600" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-4 mb-1 block">總頁數 (Pages)</label>
              <input type="number" value={pages || ''} onChange={e => setPages(Number(e.target.value))} placeholder="0" className="w-full bg-slate-900 p-4 rounded-2xl border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-primary transition-all text-white" required />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-4 mb-1 block">類型 (Genre)</label>
              <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-slate-900 p-4 rounded-2xl border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-primary transition-all text-white appearance-none">
                <option value="自我成長">🆙 自我成長</option>
                <option value="文學小說">📚 文學小說</option>
                <option value="商業理財">💰 商業理財</option>
                <option value="歷史人文">📜 歷史人文</option>
              </select>
            </div>
          </div>
        </div>

        {/* 底部按鈕 */}
        <button type="submit" className="mt-auto mb-4 w-full bg-primary text-black py-5 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">task_alt</span>
          接受任務 (Accept Quest)
        </button>
      </form>
    </div>
  );
};

export default AddQuest;