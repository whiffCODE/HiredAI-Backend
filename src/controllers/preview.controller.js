import { getTemplate } from "../templates/templateSelector.js";

export const generatePreview = async (req, res) => {
  try {
    const { resume, user } = req.body;

    const isPro = user?.subscription === "PRO";

    const { category, name } = resume.template || {};

    const templateFn = getTemplate({ category, name });

    const html = templateFn(resume, isPro);

    return res.json({ html });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Preview failed" });
  }
};