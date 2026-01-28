import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { medicineName } = await req.json();

    if (!medicineName) {
      return Response.json({ error: "Medicine name is required" }, { status: 400 });
    }

    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Analyze the medicine "${medicineName}" and respond with ONLY valid JSON (no markdown, no extra text, no code blocks). Use exactly this structure:

{
  "medicineName": "Name",
  "dosage": "Dosage info",
  "activeIngredients": ["ingredient1"],
  "generalUse": "Use description",
  "commonSideEffects": ["effect1"],
  "precautions": ["precaution1"],
  "ageRestrictions": {"children": "Safe/Caution/Avoid", "elderly": "Safe/Caution/Avoid", "pregnancy": "Safe/Caution/Avoid"},
  "conditionRisks": {"highBloodPressure": "Safe/Caution/Avoid", "diabetes": "Safe/Caution/Avoid", "asthma": "Safe/Caution/Avoid", "kidneyIssues": "Safe/Caution/Avoid", "liverIssues": "Safe/Caution/Avoid"},
  "drugInteractions": ["interaction1"],
  "safetyLevel": "Safe/Use with Caution/Avoid without medical advice",
  "safetyReason": "Reason",
  "disclaimer": "Medical disclaimer"
}`,
        context: {}
      })
    });

    const data = await response.json();
    let responseText = data.response || '';

    // Remove markdown formatting
    responseText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    // Find first { and last }
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      return Response.json(
        { error: "Invalid response format from AI" },
        { status: 400 }
      );
    }

    const jsonString = responseText.substring(firstBrace, lastBrace + 1);

    try {
      const medicineData = JSON.parse(jsonString);
      return Response.json(medicineData);
    } catch (parseErr) {
      return Response.json(
        { error: "Could not parse medicine data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Medicine analysis error:", error);
    return Response.json(
      { error: error.message || "Failed to analyze medicine" },
      { status: 500 }
    );
  }
}
