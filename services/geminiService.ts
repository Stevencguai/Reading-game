
import { GoogleGenerativeAI } from "@google/generative-ai";

// 修正：類別名稱要與 import 的一致，且初始化方式為 new GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');

export const generateMemoryShard = async (bookTitle: string) => {
  try {
    // 修正：Gemini 1.5 或 2.0/3.0 的標準呼叫方式
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    
    const prompt = `Generate a single short, profound, and RPG-flavored inspirational quote or "Memory Shard" based on the themes of the book "${bookTitle}". It should sound like ancient wisdom. Max 20 words.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Knowledge is the greatest weapon in any adventurer's arsenal.";
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The path to wisdom is paved with the pages of the past.";
  }
};
