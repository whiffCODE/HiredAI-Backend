import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import parserRoutes from "./routes/parser.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";


import { protect } from "./middleware/auth.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/parser", parserRoutes);
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send("Hired.ai Backend Running ⚡");
});

app.get("/api/test", protect, (req, res) => {
  res.json({ message: "Protected route working 🚀" });
});



export default app;