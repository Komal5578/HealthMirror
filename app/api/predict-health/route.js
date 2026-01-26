import { getKey, markKeyError } from '../../lib/geminiKeyManager';

// Fallback prediction based on data patterns (Option A)
function getFallbackPrediction(data, years) {
  const { healthGoal, completionRate, streakDays, healthScore, vitalSigns, userAge } = data;
  
  // Calculate trend
  const trend = completionRate > 70 ? 'improving' : completionRate > 50 ? 'stable' : 'declining';
  const riskLevel = healthScore < 30 ? 'high' : healthScore < 50 ? 'moderate' : 'low';
  
  // Project scores
  const yearlyChange = completionRate > 70 ? 8 : completionRate > 50 ? 2 : -10;
  const projectedScore = Math.min(100, Math.max(0, healthScore + (yearlyChange * years)));
  
  // Determine body state based on goal and projected score
  let projectedBodyState = 'normal';
  let description = '';
  let recommendations = [];
  
  if (healthGoal === 'muscle_gain') {
    if (completionRate > 70) {
      projectedBodyState = years >= 5 ? 'very_muscular' : years >= 2 ? 'muscular' : 'fit';
      description = `With your consistent strength training (${completionRate.toFixed(0)}% completion rate), you're on track to build significant muscle mass. In ${years} years, expect visible muscle definition, increased strength, and improved metabolism.`;
      recommendations = [
        'Continue progressive overload training',
        'Maintain high protein intake (1.6-2g per kg body weight)',
        'Ensure adequate rest between workouts',
        'Consider periodization in your training'
      ];
    } else {
      projectedBodyState = years >= 3 ? 'thin' : 'normal';
      description = `Your current completion rate of ${completionRate.toFixed(0)}% is insufficient for muscle growth. Without improvement, you may experience muscle loss and decreased strength over the next ${years} years.`;
      recommendations = [
        'Increase workout frequency to at least 3x per week',
        'Focus on compound exercises like squats and deadlifts',
        'Track your protein intake',
        'Get 7-9 hours of sleep for recovery'
      ];
    }
  } else if (healthGoal === 'weight_loss') {
    if (completionRate > 70) {
      projectedBodyState = years >= 3 ? 'fit' : 'normal';
      description = `Great progress! With ${completionRate.toFixed(0)}% adherence to your plan, you're successfully losing weight. In ${years} years, expect a leaner physique, improved energy, and better overall health markers.`;
      recommendations = [
        'Maintain caloric deficit with nutrient-dense foods',
        'Continue regular cardio and strength training',
        'Stay consistent with meal planning',
        'Monitor progress with weekly weigh-ins'
      ];
    } else {
      projectedBodyState = years >= 2 ? 'overweight' : 'normal';
      description = `With only ${completionRate.toFixed(0)}% completion, weight loss goals are at risk. Without changes, you may gain additional weight and face related health complications over the next ${years} years.`;
      recommendations = [
        'Start with smaller, achievable daily goals',
        'Track everything you eat for awareness',
        'Add 30 minutes of walking daily',
        'Find an accountability partner'
      ];
    }
  } else if (healthGoal === 'cardio_health') {
    if (completionRate > 70) {
      projectedBodyState = years >= 5 ? 'very_fit' : 'fit';
      description = `Excellent cardiovascular commitment! Your ${completionRate.toFixed(0)}% completion rate suggests strong heart health improvement. In ${years} years, expect lower resting heart rate, improved endurance, and reduced cardiovascular disease risk.`;
      recommendations = [
        'Continue aerobic exercises 4-5x per week',
        'Include interval training for maximum benefit',
        'Monitor blood pressure regularly',
        'Maintain heart-healthy diet low in saturated fats'
      ];
    } else {
      projectedBodyState = years >= 5 ? 'critical' : years >= 2 ? 'weak' : 'normal';
      description = `WARNING: Your ${completionRate.toFixed(0)}% completion rate puts your heart health at risk. Without improvement, you may face increased risk of heart disease, high blood pressure, and reduced stamina in ${years} years.`;
      recommendations = [
        'Consult with a cardiologist',
        'Start with gentle walking and gradually increase',
        'Reduce sodium and processed food intake',
        'Monitor stress levels and practice relaxation'
      ];
    }
  } else if (healthGoal === 'diabetes_management') {
    if (completionRate > 70) {
      projectedBodyState = 'fit';
      description = `Your ${completionRate.toFixed(0)}% adherence to diabetes management is excellent. In ${years} years, expect better blood sugar control, reduced medication dependency, and fewer complications.`;
      recommendations = [
        'Continue monitoring blood glucose regularly',
        'Maintain consistent meal timing',
        'Keep up with prescribed exercise routine',
        'Regular check-ups with your endocrinologist'
      ];
    } else {
      projectedBodyState = years >= 3 ? 'weak' : 'normal';
      description = `CONCERN: With ${completionRate.toFixed(0)}% completion, blood sugar management is at risk. In ${years} years, this could lead to complications including nerve damage, vision problems, or cardiovascular issues.`;
      recommendations = [
        'Strictly follow medication schedule',
        'Monitor blood sugar more frequently',
        'Consult with diabetes educator',
        'Focus on low glycemic index foods'
      ];
    }
  } else if (healthGoal === 'stress_anxiety') {
    if (completionRate > 70) {
      projectedBodyState = 'fit';
      description = `Your mental wellness commitment (${completionRate.toFixed(0)}% completion) is showing results. In ${years} years, expect improved emotional regulation, better sleep, and enhanced overall quality of life.`;
      recommendations = [
        'Continue daily meditation practice',
        'Maintain regular exercise routine',
        'Prioritize sleep hygiene',
        'Consider journaling for emotional processing'
      ];
    } else {
      projectedBodyState = years >= 3 ? 'weak' : 'normal';
      description = `Your ${completionRate.toFixed(0)}% completion rate indicates ongoing stress. Without intervention, this could lead to chronic anxiety, sleep disorders, and physical health issues over ${years} years.`;
      recommendations = [
        'Start with just 5 minutes of daily meditation',
        'Reduce caffeine and alcohol intake',
        'Consider professional counseling',
        'Establish boundaries for work-life balance'
      ];
    }
  } else if (healthGoal === 'back_pain') {
    if (completionRate > 70) {
      projectedBodyState = 'fit';
      description = `Great progress on back pain management! Your ${completionRate.toFixed(0)}% completion suggests improved core strength and flexibility. In ${years} years, expect significantly reduced pain and better mobility.`;
      recommendations = [
        'Continue core strengthening exercises',
        'Maintain proper posture throughout the day',
        'Use ergonomic furniture',
        'Regular stretching breaks during work'
      ];
    } else {
      projectedBodyState = years >= 3 ? 'weak' : 'normal';
      description = `With ${completionRate.toFixed(0)}% completion, your back pain may worsen. In ${years} years, this could lead to chronic pain, reduced mobility, and potential need for medical intervention.`;
      recommendations = [
        'Prioritize daily stretching routine',
        'Improve workstation ergonomics immediately',
        'Consult with a physical therapist',
        'Consider swimming or water therapy'
      ];
    }
  } else {
    // General fitness
    if (completionRate > 70) {
      projectedBodyState = years >= 5 ? 'excellent' : 'fit';
      description = `Your ${completionRate.toFixed(0)}% completion rate shows strong commitment to fitness. In ${years} years, expect improved overall health, better energy levels, and reduced risk of chronic diseases.`;
      recommendations = [
        'Maintain balanced approach to exercise',
        'Include variety in workouts',
        'Regular health check-ups',
        'Focus on sustainable habits'
      ];
    } else {
      projectedBodyState = years >= 3 ? 'weak' : 'normal';
      description = `Your ${completionRate.toFixed(0)}% completion rate is below optimal. Without improvement, general health may decline over the next ${years} years, increasing risk of various health issues.`;
      recommendations = [
        'Set smaller, achievable daily goals',
        'Find activities you enjoy',
        'Build exercise into daily routine',
        'Consider working with a fitness coach'
      ];
    }
  }
  
  // Project vital signs
  const projectedVitals = {};
  Object.keys(vitalSigns).forEach(key => {
    const change = completionRate > 60 ? 5 * years : completionRate > 40 ? 0 : -5 * years;
    projectedVitals[key] = Math.min(100, Math.max(0, vitalSigns[key] + change));
  });
  
  return {
    success: true,
    source: 'fallback',
    prediction: {
      years,
      currentScore: healthScore,
      projectedScore,
      projectedBodyState,
      projectedVitals,
      trend,
      riskLevel,
      description,
      recommendations,
      userAge: userAge,
      futureAge: userAge + years,
    }
  };
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { years = 5 } = data;
    
    // Validate input
    if (!data.healthGoal || data.completionRate === undefined) {
      return Response.json({ 
        error: 'Missing required health data' 
      }, { status: 400 });
    }
    
    // Try AI prediction first (Option B)
    try {
      const apiKey = getKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      const prompt = `You are a health prediction AI. Based on the following patient data, provide a detailed health prediction for ${years} years in the future.

PATIENT DATA:
- Age: ${data.userAge || 30} years old
- Health Goal: ${data.healthGoal}
- Current Health Score: ${data.healthScore}/100
- Task Completion Rate: ${data.completionRate}%
- Current Streak: ${data.streakDays} days
- Days on Plan: ${data.currentDay}
- Vital Signs: Heart Health ${data.vitalSigns?.heartHealth}/100, Muscle Strength ${data.vitalSigns?.muscleStrength}/100, Flexibility ${data.vitalSigns?.flexibility}/100, Mental Wellness ${data.vitalSigns?.mentalWellness}/100, Energy Level ${data.vitalSigns?.energyLevel}/100

Respond in this EXACT JSON format (no markdown, no code blocks, just pure JSON):
{
  "projectedScore": <number 0-100>,
  "projectedBodyState": "<one of: thin, normal, fit, muscular, very_muscular, overweight, weak, critical, excellent, very_fit>",
  "trend": "<improving|stable|declining>",
  "riskLevel": "<low|moderate|high>",
  "description": "<2-3 sentence prediction description>",
  "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>", "<recommendation 4>"],
  "projectedVitals": {
    "heartHealth": <number>,
    "muscleStrength": <number>,
    "flexibility": <number>,
    "mentalWellness": <number>,
    "energyLevel": <number>
  }
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          })
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        markKeyError(apiKey);
        throw new Error(errorData.error?.message || 'AI API failed');
      }
      
      const result = await response.json();
      const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiText) {
        throw new Error('Empty AI response');
      }
      
      // Parse AI response
      const cleanedText = aiText.replace(/```json\n?|\n?```/g, '').trim();
      const aiPrediction = JSON.parse(cleanedText);
      
      return Response.json({
        success: true,
        source: 'ai',
        prediction: {
          years,
          currentScore: data.healthScore,
          projectedScore: aiPrediction.projectedScore,
          projectedBodyState: aiPrediction.projectedBodyState,
          projectedVitals: aiPrediction.projectedVitals,
          trend: aiPrediction.trend,
          riskLevel: aiPrediction.riskLevel,
          description: aiPrediction.description,
          recommendations: aiPrediction.recommendations,
          userAge: data.userAge || 30,
          futureAge: (data.userAge || 30) + years,
        }
      });
      
    } catch (aiError) {
      console.error('[AI Prediction Error]:', aiError.message);
      // Fall back to Option A
      return Response.json(getFallbackPrediction(data, years));
    }
    
  } catch (error) {
    console.error('[Prediction Error]:', error);
    return Response.json({ 
      error: 'Failed to generate prediction',
      details: error.message 
    }, { status: 500 });
  }
}
