import Resume from "../models/Resume.js";
import {
  extractKeywordsFromJD,
  rewriteBulletWithAI,
  generateSummaryAI
} from "../services/ai.service.js";

import { calculateATSScore } from "../services/ats.service.js";

// 🔍 ANALYZE JD
export const analyzeJD = async (req, res) => {
  try {
    const { jd, resumeId } = req.body;

    const keywords = await extractKeywordsFromJD(jd);

    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      {
        jobDescription: jd,
        extractedKeywords: keywords
      },
      { new: true }
    );

    res.json({ keywords, resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✨ REWRITE EXPERIENCE BULLET
export const rewriteExperience = async (req, res) => {
  try {
    const { text, resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    const improved = await rewriteBulletWithAI(
      text,
      resume.extractedKeywords
    );

    res.json({ improved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🧾 GENERATE SUMMARY
export const generateSummary = async (req, res) => {
  try {
    const { input, role } = req.body;

    const summary = await generateSummaryAI(input, role);

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📊 CALCULATE ATS SCORE
export const calculateATS = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    const fullText = `
      ${resume.summary?.text || ""}
      ${resume.experience.map(e => e.description).join(" ")}
      ${resume.skills.map(s => s.name).join(" ")}
    `;

    const score = calculateATSScore(
      fullText,
      resume.extractedKeywords
    );

    resume.atsScore = score;
    await resume.save();

    res.json({ score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};