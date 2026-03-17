import Resume from "../models/Resume.js";
import User from "../models/User.js";
import { getTemplate } from "../templates/templateSelector.js";
import { generatePDF } from "../services/pdf.service.js";

// ================================
// 📥 DOWNLOAD FROM DB
// ================================
export const downloadResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPro = user.subscription === "PRO";

    const { category, name } = resume.template || {};

    // 🔒 PRO CHECK
    const isAllowed =
      isPro ||
      (category === "minimal" && name === "minimal1");

    if (!isAllowed) {
      return res.status(403).json({
        error: "Upgrade to Pro to use this template",
      });
    }

    // 🎨 TEMPLATE
    const templateFn = getTemplate({ category, name });
    const html = templateFn(resume, isPro);

    // 📄 GENERATE PDF (service layer)
    const pdfBuffer = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${resume.title || "resume"}.pdf`,
    });

    return res.send(pdfBuffer);

  } catch (err) {
    console.error("Download PDF Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


// ================================
// 🚀 GENERATE FROM REQUEST BODY
// ================================
export const generateResumePDF = async (req, res) => {
  try {
    const { resume, user } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "Resume data missing" });
    }

    const isPro = user?.subscription === "PRO";

    const { category, name } = resume.template || {};

    // 🔒 PRO CHECK
    const isAllowed =
      isPro ||
      (category === "minimal" && name === "minimal1");

    if (!isAllowed) {
      return res.status(403).json({
        error: "Upgrade to Pro to use this template",
      });
    }

    // 🎨 TEMPLATE
    const templateFn = getTemplate({ category, name });
    const html = templateFn(resume, isPro);

    // 📄 USE SERVICE (NO DUPLICATION)
    const pdfBuffer = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF Error:", error);

    return res.status(500).json({
      error: "Failed to generate PDF",
    });
  }
};