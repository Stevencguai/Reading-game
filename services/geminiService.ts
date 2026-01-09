
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMemoryShard = async (bookTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a single short, profound, and RPG-flavored inspirational quote or "Memory Shard" based on the themes of the book "${bookTitle}". It should sound like ancient wisdom. Max 20 words.`,
    });
    return response.text || "Knowledge is the greatest weapon in any adventurer's arsenal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The path to wisdom is paved with the pages of the past.";
  }
};
