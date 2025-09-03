import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const modelName = "gemini-1.5-flash";

if (!API_KEY) {
  console.error("❌ Gemini API key is missing. Check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: modelName });

export async function runGemini(prompt, imageFile) {
  try {
    // Handle text-only prompts
    if (!imageFile) {
      const result = await model.generateContent(prompt);
      return result.response.text();
    }

    // Handle multimodal requests
    const parts = [];
    if (prompt) parts.push({ text: prompt });

    const base64 = await fileToBase64(imageFile);
    parts.push({
      inlineData: {
        mimeType: imageFile.type,
        data: base64,
      },
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });

    return result.response.text();

  } catch (err) {
    console.error("❌ Error calling Gemini API:", err);
    return `Error: ${err.message || err}`;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
