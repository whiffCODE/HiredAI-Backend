import puppeteer from "puppeteer";

export const launchBrowser = async () => {
  const isProduction = process.env.NODE_ENV === "production";

  return await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],

    ...(isProduction && {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    }),
  });
};