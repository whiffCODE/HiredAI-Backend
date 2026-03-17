export const parseResumeText = (text) => {
  const lines = text.split("\n");

  let email = "";
  let phone = "";
  let skills = [];
  let experience = [];

  // 📧 Email
  const emailMatch = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  if (emailMatch) email = emailMatch[0];

  // 📱 Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[- ]?)?\d{10}/);
  if (phoneMatch) phone = phoneMatch[0];

  // 🛠️ Skills (simple heuristic)
  const skillKeywords = ["react", "javascript", "node", "python", "java"];

  skillKeywords.forEach((skill) => {
    if (text.toLowerCase().includes(skill)) {
      skills.push({
        name: skill.charAt(0).toUpperCase() + skill.slice(1),
        level: "Intermediate"
      });
    }
  });

  // 💼 Experience (very basic)
  lines.forEach((line) => {
    if (line.toLowerCase().includes("developer")) {
      experience.push({
        id: Date.now().toString(),
        jobTitle: line.trim(),
        description: line.trim(),
        order: experience.length + 1
      });
    }
  });

  return {
    contact: { email, phone },
    skills,
    experience
  };
};