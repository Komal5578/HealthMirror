import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { healthGoal, completedTasksCount, streakDays, currentDay, userAge, vitalSigns } = body;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a short, encouraging 2-3 sentence prediction about how someone will look and feel in 5 years if they continue their health journey.

Details:
- Health Goal: ${healthGoal}
- Tasks Completed: ${completedTasksCount}
- Current Streak: ${streakDays} days
- Age: ${userAge}

Make it personal, motivating, and specific to their goal. Focus on physical appearance, energy levels, and confidence. Return ONLY a JSON object like: {"message": "your prediction here"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    if (text.startsWith('```')) {
      text = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
    }
    
    const data = JSON.parse(text);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error:', error);
    
    // Fallback message
    return NextResponse.json({
      message: "Based on your dedication, in 5 years you'll have transformed into a stronger, more energetic version of yourself. Your consistent efforts will show in your posture, your glow, and the confidence you carry every day!"
    });
  }
}
