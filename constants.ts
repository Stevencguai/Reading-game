import { Book, UserStats, ShopItem } from './types';

export const INITIAL_STATS: UserStats = {
  level: 1,
  xp: 0,
  maxXp: 100,
  streak: 0,
  mana: 0,
  booksRead: 0,
  totalTime: 0,
  attributes: {
    focus: 0,
    comprehension: 0,
    discipline: 0,
    exploration: 0
  }
};

export const MOCK_BOOKS: Book[] = [];

export const MOCK_SHOP: ShopItem[] = [
  {
    id: 's1',
    name: '專注藥水',
    description: '使用後單次閱讀獲得的 Focus 經驗值翻倍。',
    price: 150,
    imageUrl: 'https://picsum.photos/id/1060/200/200',
    locked: false
  },
  {
    id: 's2',
    name: '理解之眼',
    description: '強化 AI 分析深度，獲得更多 Comprehension。',
    price: 300,
    imageUrl: 'https://picsum.photos/id/1073/200/200',
    locked: false
  }
];