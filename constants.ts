
import { Book, UserStats, ShopItem, Badge } from './types';

export const INITIAL_STATS: UserStats = {
  level: 12,
  xp: 750,
  maxXp: 1000,
  streak: 15,
  mana: 2450,
  booksRead: 12,
  totalTime: 42,
  attributes: {
    focus: 12,
    comprehension: 8,
    discipline: 15,
    exploration: 4
  }
};

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    totalPages: 300,
    currentPage: 42,
    genre: '自我成長',
    coverUrl: 'https://picsum.photos/id/24/200/300',
    status: 'active',
    lastRead: new Date().toISOString()
  },
  {
    id: '2',
    title: '人類大歷史',
    author: 'Yuval Noah Harari',
    totalPages: 443,
    currentPage: 150,
    genre: '歷史人文',
    coverUrl: 'https://picsum.photos/id/20/200/300',
    status: 'active',
    lastRead: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: '沙丘 Dune',
    author: 'Frank Herbert',
    totalPages: 600,
    currentPage: 600,
    genre: '科幻經典',
    coverUrl: 'https://picsum.photos/id/30/200/300',
    status: 'completed',
    lastRead: new Date(Date.now() - 604800000).toISOString()
  }
];

export const MOCK_SHOP: ShopItem[] = [
  {
    id: 's1',
    name: '覺醒藥劑',
    description: '早上的一杯精品咖啡，士氣 +10。',
    price: 500,
    imageUrl: 'https://picsum.photos/id/1060/200/200',
    locked: false
  },
  {
    id: 's2',
    name: '知識卷軸',
    description: '購買一本新小說，心靈容量擴充。',
    price: 1200,
    imageUrl: 'https://picsum.photos/id/1073/200/200',
    locked: false
  },
  {
    id: 's3',
    name: '休憩寶石',
    description: '購買新款遊戲，週末放鬆專用。',
    price: 5000,
    imageUrl: 'https://picsum.photos/id/1084/200/200',
    locked: true
  }
];

export const MOCK_BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Daily Pilgrim',
    description: 'Regular adventurer on the path of knowledge.',
    condition: '7 Day Streak',
    rewardXp: 50,
    imageUrl: 'https://picsum.photos/id/342/200/200',
    unlocked: true
  },
  {
    id: 'b2',
    name: 'Night Owl',
    description: 'The stars whisper stories to those who listen.',
    condition: 'Read after 11 PM',
    rewardXp: 50,
    imageUrl: 'https://picsum.photos/id/296/200/200',
    unlocked: true
  }
];
