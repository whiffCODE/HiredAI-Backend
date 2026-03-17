import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadAndParseResume } from "../controllers/parser.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadAndParseResume
);

export default router;