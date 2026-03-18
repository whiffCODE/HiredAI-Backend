import express from "express";
import { generatePreview } from "../controllers/preview.controller.js";

const router = express.Router();

router.post("/", generatePreview);

export default router;