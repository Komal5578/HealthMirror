import { getKeyManager } from '../../lib/geminiKeyManager';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function POST(request) {
  try {
    const { message, context } = await request.json();
    
    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get API key from rotation manager
    const keyManager = getKeyManager();
    const { key, index } = keyManager.getKey();

    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(context);
    
    // Create the request body for Gemini 2.0 Flash
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser: ${message}\n\nTwinX:`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }

      // Extract text from Gemini response
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t generate a response. Please try again.';

      // Report success
      keyManager.reportSuccess(index);

      return Response.json({ 
        response: text,
        keyIndex: index
      });

    } catch (geminiError) {
      console.error('[Gemini API Error]:', geminiError);
      
      // Report error and try with another key
      keyManager.reportError(index, geminiError);
      
      // Check if it's a rate limit or quota error
      if (geminiError.message?.includes('429') || 
          geminiError.message?.includes('quota') ||
          geminiError.message?.includes('rate') ||
          geminiError.message?.includes('RESOURCE_EXHAUSTED')) {
        
        // Try with another key
        const { key: newKey, index: newIndex } = keyManager.getKey();
        
        if (newIndex !== index) {
          try {
            const retryResponse = await fetch(`${GEMINI_API_URL}?key=${newKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody)
            });

            const retryData = await retryResponse.json();

            if (!retryResponse.ok) {
              throw new Error(retryData.error?.message || 'Retry failed');
            }

            const retryText = retryData.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t generate a response.';
            
            keyManager.reportSuccess(newIndex);
            
            return Response.json({ 
              response: retryText,
              keyIndex: newIndex,
              retried: true
            });
          } catch (retryError) {
            keyManager.reportError(newIndex, retryError);
            throw retryError;
          }
        }
      }
      
      throw geminiError;
    }

  } catch (error) {
    console.error('[Chat API Error]:', error);
    
    return Response.json({ 
      error: 'Failed to generate response',
      details: error.message 
    }, { status: 500 });
  }
}

function buildSystemPrompt(context) {
  const {
    healthGoal = 'general fitness',
    planName = 'your health plan',
    userAge = 'adult',
    guiderName = 'your Guider',
    currentDay = 1,
    totalDays = 30,
    completedTasks = 0,
    totalTasks = 0,
    streak = 0,
    level = 1,
    recentTasks = []
  } = context || {};

  return `You are "TwinX", a friendly and knowledgeable AI health advisor. You are helping a ${userAge}-year-old user who is working on "${healthGoal}" with the "${planName}".

ABOUT THE USER:
- Health Goal: ${healthGoal}
- Current Plan: ${planName}
- Day ${currentDay} of ${totalDays}
- Completed ${completedTasks}/${totalTasks} tasks today
- Current streak: ${streak} days
- Level: ${level}
- Their motivational companion is named: ${guiderName}

RECENT TASKS:
${recentTasks.map(t => `- ${t.name}: ${t.completed ? '✅ Completed' : '⏳ Pending'}`).join('\n') || 'No tasks yet today'}

YOUR PERSONALITY (TwinX):
- Warm, encouraging, and supportive like a caring health coach
- Professional but approachable
- Knowledgeable about health, wellness, and fitness
- Always remind users you're an AI advisor and not a doctor
- Encourage consulting healthcare professionals for medical advice
- Speak in first person as TwinX

GUIDELINES:
1. Be concise but helpful (2-3 paragraphs max)
2. Reference their specific health goal when relevant
3. Celebrate their progress and streak
4. If they mention pain, discomfort, or symptoms, advise consulting a doctor
5. Offer practical, actionable advice
6. If asked about medications or diagnoses, always recommend consulting their doctor
7. End with an encouraging note or helpful follow-up question
8. Use a friendly, conversational tone

IMPORTANT DISCLAIMERS (include when relevant):
- "As your AI health advisor, I recommend consulting your doctor for medical advice"
- "This is general wellness guidance, not a medical diagnosis"
- "Please speak with a healthcare professional about this concern"`;
}

// GET endpoint to check API status
export async function GET() {
  try {
    const keyManager = getKeyManager();
    const stats = keyManager.getStats();
    
    return Response.json({
      status: 'ok',
      keysConfigured: stats.totalKeys,
      currentKeyIndex: stats.currentIndex
    });
  } catch (error) {
    return Response.json({ 
      status: 'error',
      error: error.message 
    }, { status: 500 });
  }
}
