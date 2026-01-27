import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { healthGoal, userAge, userGender, years, vitalSigns } = body;

    // Generate image descriptions using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Based on these health transformation details, generate 5 detailed image descriptions (one for each year) showing a person's fitness journey transformation. 

Health Goal: ${healthGoal}
Starting Age: ${userAge}
Gender: ${userGender}

Year transformations:
${years?.map((y, i) => `Year ${i + 1}: ${y.description}`).join('\n')}

Generate a JSON response with image descriptions for visualization:
{
  "imageDescriptions": [
    "Year 1: Description of person's appearance and fitness level...",
    "Year 2: Description showing progress...",
    "Year 3: Description showing more transformation...",
    "Year 4: Description showing significant changes...",
    "Year 5: Description showing final transformation..."
  ]
}

Make descriptions vivid, focusing on:
- Body composition changes
- Energy and vitality visible in posture
- Healthy glow and confidence
- Athletic improvements based on the health goal

Return ONLY valid JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const imageData = JSON.parse(cleanedText);
    
    // Generate placeholder images using a service or return SVG data URLs
    // For now, we'll generate dynamic SVG visualizations
    const images = {};
    
    for (let i = 0; i < 5; i++) {
      images[i] = generateProgressSVG(i, healthGoal, userGender);
    }
    
    return NextResponse.json({ 
      images,
      descriptions: imageData.imageDescriptions 
    });

  } catch (error) {
    console.error('Error generating images:', error);
    
    // Return fallback SVG images
    const fallbackImages = {};
    for (let i = 0; i < 5; i++) {
      fallbackImages[i] = generateProgressSVG(i, 'fitness', 'neutral');
    }
    
    return NextResponse.json({ images: fallbackImages });
  }
}

function generateProgressSVG(yearIndex, healthGoal, gender) {
  const progress = (yearIndex + 1) * 20;
  const colors = [
    ['#3B82F6', '#06B6D4'],
    ['#10B981', '#34D399'],
    ['#8B5CF6', '#EC4899'],
    ['#F59E0B', '#F97316'],
    ['#EAB308', '#F97316']
  ];
  const [color1, color2] = colors[yearIndex];
  
  // Create a data URL for an SVG that represents progress
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="200" height="200" fill="#1a1a2e"/>
      
      <!-- Progress circle -->
      <circle cx="100" cy="100" r="80" fill="none" stroke="#333" stroke-width="8"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad)" stroke-width="8" 
        stroke-dasharray="${progress * 5.02} 502" 
        stroke-linecap="round"
        transform="rotate(-90 100 100)"
        filter="url(#glow)"/>
      
      <!-- Center icon based on health goal -->
      <text x="100" y="90" text-anchor="middle" font-size="40" fill="url(#grad)">
        ${healthGoal?.toLowerCase().includes('weight') ? '⚖️' : 
          healthGoal?.toLowerCase().includes('muscle') ? '💪' : 
          healthGoal?.toLowerCase().includes('cardio') ? '❤️' : 
          healthGoal?.toLowerCase().includes('flex') ? '🧘' : '🏃'}
      </text>
      
      <!-- Progress text -->
      <text x="100" y="130" text-anchor="middle" font-size="24" font-weight="bold" fill="white">${progress}%</text>
      <text x="100" y="155" text-anchor="middle" font-size="12" fill="#888">Year ${yearIndex + 1}</text>
      
      <!-- Decorative elements -->
      <circle cx="100" cy="100" r="90" fill="none" stroke="${color1}" stroke-width="1" opacity="0.3"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="${color2}" stroke-width="1" opacity="0.3"/>
    </svg>
  `;
  
  // Convert to data URL
  const encoded = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}
