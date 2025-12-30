import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // हम Gemini 1.5 Flash यूज कर रहे हैं जो फ्री और सुपरफास्ट है
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // अभी के लिए यह डेमो वीडियो दे रहा है, क्योंकि Veo API अभी वेटलिस्ट में है
    return NextResponse.json({ 
      success: true, 
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      text: response.text()
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
