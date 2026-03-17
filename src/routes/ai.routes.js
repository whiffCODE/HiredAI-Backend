import express from "express";
import {
  analyzeJD,
  rewriteExperience,
  generateSummary,
  calculateATS
} from "../controllers/ai.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/analyze-jd", protect, analyzeJD);
router.post("/rewrite", protect, rewriteExperience);
router.post("/summary", protect, generateSummary);
router.post("/ats-score", protect, calculateATS);

export default router;