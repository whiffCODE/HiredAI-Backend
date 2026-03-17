export const calculateATSScore = (resumeText, keywords) => {
  if (!keywords || keywords.length === 0) return 0;

  const text = resumeText.toLowerCase();

  let matchCount = 0;

  keywords.forEach((keyword) => {
    if (text.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  });

  const score = (matchCount / keywords.length) * 100;

  return Math.round(score);
};