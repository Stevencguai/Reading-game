
export interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  genre: string;
  coverUrl: string;
  status: 'active' | 'completed';
  lastRead: string; // ISO string
}

export interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  mana: number;
  booksRead: number;
  totalTime: number; // in hours
  attributes: {
    focus: number;
    comprehension: number;
    discipline: number;
    exploration: number;
  };
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  locked: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  condition: string;
  imageUrl: string;
  unlocked: boolean;
  rewardXp: number;
}

export enum ViewState {
  Dashboard = 'quests',
  Shop = 'shop',
  Stats = 'stats',
  Calendar = 'calendar',
  AddQuest = 'add_quest',
  ReadingSession = 'reading'
}
