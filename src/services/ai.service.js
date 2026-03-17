import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// 🔍 JD KEYWORD EXTRACTION
export const extractKeywordsFromJD = async (jdText) => {
  const prompt = `
Extract the most important ATS keywords from this job description.
Return ONLY a JSON array.

JD:
${jdText}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }]
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch {
    return content.split(",").map(k => k.trim());
  }
};

// ✨ AI REWRITE BULLET
export const rewriteBulletWithAI = async (text, keywords) => {
  const prompt = `
Rewrite this resume bullet point to be more professional, impactful, and ATS optimized.
Naturally include these keywords: ${keywords.join(", ")}

Original:
${text}

Return ONLY the improved version.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};

// 🧾 SUMMARY GENERATOR
export const generateSummaryAI = async (input, role) => {
  const prompt = `
Create a powerful professional summary for a ${role}.
Use this info:
${input}

Make it concise, impactful, ATS-friendly.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};