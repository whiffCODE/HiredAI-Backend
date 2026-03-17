// ===== MINIMAL =====
import { minimalTemplate1 } from "./resume/minimal/minimal1.js";
import { minimalTemplate2 } from "./resume/minimal/minimal2.js";
import { minimalTemplate3 } from "./resume/minimal/minimal3.js";
import { minimalTemplate4 } from "./resume/minimal/minimal4.js";
import { minimalTemplate5 } from "./resume/minimal/minimal5.js";

// ===== MODERN =====
import { modernTemplate1 } from "./resume/modern/modern1.js";
import { modernTemplate2 } from "./resume/modern/modern2.js";
import { modernTemplate3 } from "./resume/modern/modern3.js";
import { modernTemplate4 } from "./resume/modern/modern4.js";
import { modernTemplate5 } from "./resume/modern/modern5.js";

// ===== EXECUTIVE =====
import { executiveTemplate1 } from "./resume/executive/executive1.js";
import { executiveTemplate2 } from "./resume/executive/executive2.js";
import { executiveTemplate3 } from "./resume/executive/executive3.js";
import { executiveTemplate4 } from "./resume/executive/executive4.js";
import { executiveTemplate5 } from "./resume/executive/executive5.js";

// ===== TEMPLATE MAP =====
const templates = {
  minimal: {
    minimal1: minimalTemplate1,
    minimal2: minimalTemplate2,
    minimal3: minimalTemplate3,
    minimal4: minimalTemplate4,
    minimal5: minimalTemplate5,
  },

  modern: {
    modern1: modernTemplate1,
    modern2: modernTemplate2,
    modern3: modernTemplate3,
    modern4: modernTemplate4,
    modern5: modernTemplate5,
  },

  executive: {
    executive1: executiveTemplate1,
    executive2: executiveTemplate2,
    executive3: executiveTemplate3,
    executive4: executiveTemplate4,
    executive5: executiveTemplate5,
  },
};

// ===== SELECTOR FUNCTION =====
export const getTemplate = ({ category, name }) => {
  try {
    if (!category || !name) {
      throw new Error("Template category or name missing");
    }

    const selectedCategory = templates[category];

    if (!selectedCategory) {
      throw new Error(`Invalid category: ${category}`);
    }

    const template = selectedCategory[name];

    if (!template) {
      throw new Error(`Template not found: ${name}`);
    }

    return template;
  } catch (error) {
    console.error("Template Selector Error:", error.message);

    // fallback template (safe default)
    return minimalTemplate1;
  }
};