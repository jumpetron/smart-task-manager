import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function generateSubtasks(taskTitle: string, taskDescription?: string) {
  try {
    const prompt = `Break the following task into 3-5 smaller, actionable steps. 
    Return only a bulleted list without any additional text or formatting. 
    Each subtask should be concise (2-3 words max) and start with a verb.
    Task: ${taskTitle}${taskDescription ? `\nDescription: ${taskDescription}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const text = response.text;

    if (!text) {
      throw new Error("No text returned from Gemini API");
    }
    
    return text.split('\n')
      .map(line => line.replace(/^\s*[-*•]\s*/, '').trim())
      .filter(line => line.length > 0);
  } catch (error) {
    console.error('Error generating subtasks:', error);
    throw new Error('Failed to generate subtasks. Please try again.');
  }
}