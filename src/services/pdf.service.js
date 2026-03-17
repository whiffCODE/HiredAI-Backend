import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { launchBrowser } from "../utils/puppeteer.js";

export const extractTextFromPDF = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items.map(item => item.str).join(" ");
    text += pageText + "\n";
  }

  return text;
};



export const generatePDF = async (html) => {
  let browser;

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "15px",
        right: "15px",
      },
    });

    await browser.close();

    return pdfBuffer;

  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
};