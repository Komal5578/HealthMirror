import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      healthGoal,
      completedTasksCount,
      streakDays,
      currentDay,
      planName,
      planDays,
      userAge,
      vitalSigns,
      recentTasks
    } = body;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a health and wellness AI assistant. Based on the following user data, generate a detailed 5-year health prediction showing their potential transformation if they continue their current health journey.

User Data:
- Health Goal: ${healthGoal}
- Current Plan: ${planName} (${planDays} days)
- Current Day in Plan: ${currentDay}
- Completed Tasks: ${completedTasksCount}
- Current Streak: ${streakDays} days
- User Age: ${userAge}
- Current Vital Signs: Energy Level: ${vitalSigns?.energyLevel || 50}%, Muscle Strength: ${vitalSigns?.muscleStrength || 50}%, Heart Health: ${vitalSigns?.heartHealth || 50}%, Flexibility: ${vitalSigns?.flexibility || 50}%, Mental Wellness: ${vitalSigns?.mentalWellness || 50}%
- Recent Tasks Completed: ${recentTasks?.join(', ') || 'None yet'}

Generate a JSON response with the following structure:
{
  "years": [
    {
      "description": "Detailed description of health status and achievements in Year 1 (3-4 sentences)",
      "achievements": ["achievement1", "achievement2", "achievement3"],
      "healthMetrics": {
        "energy": "value%",
        "strength": "value%",
        "overall": "value%"
      }
    },
    // ... repeat for years 2-5, showing progressive improvement
  ],
  "summary": "A compelling summary of the 5-year transformation (2-3 sentences)",
  "motivationalMessage": "An inspiring quote or message for the user"
}

Make the predictions realistic, encouraging, and based on the user's current progress. Show gradual improvement over the 5 years. If the user has a good streak and completed tasks, be more optimistic. If they're just starting, show how small consistent efforts lead to big changes.

IMPORTANT: Return ONLY valid JSON, no markdown formatting, no code blocks, just the raw JSON object.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }
    
    const prediction = JSON.parse(cleanedText);
    
    return NextResponse.json({ prediction });
  } catch (error) {
    console.error('Error generating prediction:', error);
    
    // Return a fallback prediction if API fails
    const fallbackPrediction = {
      years: [
        {
          description: "You're building strong foundations! Your consistency is paying off as you establish healthy habits that will serve you for years to come.",
          achievements: ["Established workout routine", "Improved energy levels", "Better sleep quality"],
          healthMetrics: { energy: "65%", strength: "60%", overall: "62%" }
        },
        {
          description: "Your dedication is showing visible results. Friends and family notice your transformation, and you're inspiring others around you.",
          achievements: ["Reached intermediate fitness", "Mastered nutrition basics", "Stress management improved"],
          healthMetrics: { energy: "72%", strength: "68%", overall: "70%" }
        },
        {
          description: "You've become a role model for healthy living. Your body and mind work in harmony, and challenges that once seemed hard are now routine.",
          achievements: ["Advanced fitness level", "Optimal weight achieved", "Mental clarity enhanced"],
          healthMetrics: { energy: "80%", strength: "76%", overall: "78%" }
        },
        {
          description: "Health mastery achieved! You understand your body deeply and can adapt your routines for any situation. Prevention is your lifestyle.",
          achievements: ["Health optimization expert", "Minimal sick days", "Peak performance"],
          healthMetrics: { energy: "88%", strength: "84%", overall: "86%" }
        },
        {
          description: "You've transformed not just your health, but your entire life. You're living proof that dedication and consistency create lasting change.",
          achievements: ["Lifestyle transformation complete", "Inspiring others", "Optimal longevity path"],
          healthMetrics: { energy: "95%", strength: "92%", overall: "94%" }
        }
      ],
      summary: "Your 5-year journey shows incredible potential for transformation. By maintaining your current habits and building upon them, you're setting yourself up for a healthier, happier, and more energetic future.",
      motivationalMessage: "Every step you take today is an investment in the amazing person you're becoming. Keep going!"
    };
    
    return NextResponse.json({ prediction: fallbackPrediction });
  }
}
