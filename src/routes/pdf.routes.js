import express from "express";
import { generateResumePDF } from "../controllers/pdf.controller.js";

const router = express.Router();

router.post("/generate", generateResumePDF);

export default router;