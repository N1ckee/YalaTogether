import express from "express";
import authRoutes from "./auth.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/testregister.html"));
});

app.use("/auth", authRoutes);

export default app;
