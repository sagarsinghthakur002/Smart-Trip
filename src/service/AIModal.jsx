// AIModal.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize AI with API key from environment variable
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Select stable model: Gemini Pro
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", // Return JSON data
};

// Start a chat session
export const chatSession = model.startChat({ generationConfig, history: [] });

/**
 * Sends a prompt to Gemini AI and returns the response text
 * @param {string} prompt - The user prompt for generating trip
 * @returns {Promise<string>} - AI response in string format
 */
export const sendPrompt = async (prompt) => {
  try {
    const result = await chatSession.sendMessage(prompt);
    // result.response.text() returns string if successful
    const responseText = result?.response?.text();
    return responseText;
  } catch (error) {
    console.error("Error calling AI model:", error);
    throw error;
  }
};
