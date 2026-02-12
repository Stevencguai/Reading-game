import React, { useState } from 'react';
import { Book } from '../types';
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 將檔案轉為 Base64 格式，這是 Gemini 讀取圖片的要求
  const fileToGenerativePart = async (file: File) => {
    const base64Promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    const base64Data = await base64Promise as string;
    return {
      inlineData: {
        data: base64Data.split(',')[1],
        mimeType: file.type
      },
    };
  };

  const analyzeBookImage = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // 初始化 Gemini (請確認你的 Vercel 環境變數有 API_KEY)
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const imagePart = await fileToGenerativePart(file);
      const prompt = "這是一張書本封面的照片。請辨識並以 JSON 格式回傳這本書的：title (書名), author (作者), total_pages (預估總頁數，若看不出來則回傳 0)。請只回傳 JSON。";

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      // 解析 AI 回傳的 JSON (過濾掉 Markdown 的 ```json 標記)
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleanJson);

      if (data.title) setTitle(data.title);
      if (data.author) setAuthor(data.author);
      if (data.total_pages) setPages(Number(data.total_pages));
      
    } catch (error) {
      console.error("AI 辨識失敗:", error);
      alert("真理鑑定暫時失效，請手動輸入書名");
    } finally {
      setIsAnalyzing(false);
    }
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
    <div className="p-6 flex flex-col min-h-screen bg-slate-950 pb-20">
      <header className="flex items-center gap-4 mb-8">
        <button type="button" onClick={onBack} className="text-slate-400 p-2 active:bg-white/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-black tracking-tighter">啟動閱讀任務</h2>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
        {/* 封面掃描區域 */}
        <div className="flex flex-col items-center">
          <div className={`relative size-48 rounded-[2rem] border-2 border-dashed transition-all duration-700 flex items-center justify-center overflow-hidden mb-6 ${isAnalyzing ? 'border-primary shadow-[0_0_30px_rgba(164,19,236,0.4)]' : 'border-slate-800 bg-slate-900'}`}>
            {previewUrl ? (
              <img src={previewUrl} className="size-full object-cover" alt="Cover Preview" />
            ) : (
              <div className="flex flex-col items-center text-slate-700">
                <span className="material-symbols-outlined text-6xl">add_a_photo</span>
                <p className="text-[10px] font-black mt-2 uppercase tracking-widest">待掃描</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-primary text-xl animate-pulse">searching</span>
                </div>
                <p className="text-primary text-[10px] font-black mt-4 tracking-[0.2em] animate-pulse">真理鑑定中...</p>
              </div>
            )}
          </div>
          
          <label className="bg-white text-black px-8 py-3.5 rounded-2xl text-sm font-black cursor-pointer active:scale-90 transition-all flex items-center gap-2 shadow-2xl">
            <span className="material-symbols-outlined">camera</span>
            拍攝封面
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* 輸入區域 */}
        <div className="space-y-5">
          <div className="group">
            <label className="text-[10px] font-black text-primary uppercase ml-4 mb-1.5 block tracking-widest">任務名稱 (Title)</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="掃描或輸入書名..." className="w-full bg-slate-900/50 p-4 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-white font-bold" required />
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-4 mb-1.5 block tracking-widest">作者 (Author)</label>
            <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="掃描或輸入作者..." className="w-full bg-slate-900/50 p-4 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-white font-bold" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase ml-4 mb-1.5 block tracking-widest">總量 (Pages)</label>
              <input type="number" value={pages || ''} onChange={e => setPages(Number(e.target.value))} placeholder="0" className="w-full bg-slate-900/50 p-4 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-white font-bold text-center" required />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase ml-4 mb-1.5 block tracking-widest">卷軸類型 (Genre)</label>
              <div className="relative">
                <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-slate-900/50 p-4 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-white font-bold appearance-none">
                  <option value="自我成長">🆙 自我成長</option>
                  <option value="文學小說">📚 文學小說</option>
                  <option value="商業理財">💰 商業理財</option>
                  <option value="歷史人文">📜 歷史人文</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-primary text-black py-5 rounded-[2rem] font-black text-lg shadow-glow active:scale-95 transition-all flex items-center justify-center gap-3 mt-4">
          <span className="material-symbols-outlined">auto_awesome</span>
          接受任務 (Accept Quest)
        </button>
      </form>
    </div>
  );
};

export default AddQuest;