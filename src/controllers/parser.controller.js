import { extractTextFromPDF } from "../services/pdf.service.js";
import { parseResumeText } from "../services/parser.service.js";
import Resume from "../models/Resume.js";
import fs from "fs";

export const uploadAndParseResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    // 1. Extract text
    const text = await extractTextFromPDF(filePath);

    // 2. Parse text
    const parsedData = parseResumeText(text);

    // 3. Save to DB
    const resume = await Resume.create({
      user: req.user.id,
      ...parsedData
    });

    // 4. Cleanup file
    fs.unlinkSync(filePath);

    res.json({
      message: "Resume parsed successfully",
      resume
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};