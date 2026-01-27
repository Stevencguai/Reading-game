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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
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
    <form onSubmit={handleSubmit} className="p-6 flex flex-col min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button type="button" onClick={onBack} className="text-slate-400"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="text-xl font-bold">新增閱讀任務</h2>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="size-32 rounded-2xl border-2 border-dashed border-slate-700 bg-card-dark flex items-center justify-center overflow-hidden mb-4">
            {previewUrl ? <img src={previewUrl} className="size-full object-cover" /> : <span className="material-symbols-outlined text-4xl text-slate-600">photo_camera</span>}
          </div>
          <label className="bg-surface-dark px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
            拍照或上傳封面
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="書名" className="w-full bg-card-dark p-4 rounded-xl border-0 focus:ring-2 focus:ring-primary" required />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="作者" className="w-full bg-card-dark p-4 rounded-xl border-0 focus:ring-2 focus:ring-primary" />
        <input type="number" value={pages || ''} onChange={e => setPages(Number(e.target.value))} placeholder="總頁數" className="w-full bg-card-dark p-4 rounded-xl border-0 focus:ring-2 focus:ring-primary" required />
        
        <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-card-dark p-4 rounded-xl border-0">
          <option value="自我成長">自我成長</option>
          <option value="文學小說">文學小說</option>
          <option value="商業理財">商業理財</option>
          <option value="歷史人文">歷史人文</option>
        </select>
      </div>

      <button type="submit" className="mt-auto mb-8 w-full bg-primary py-4 rounded-2xl font-bold shadow-glow">接受任務 (Accept Quest)</button>
    </form>
  );
};

export default AddQuest;