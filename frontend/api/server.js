import express from "express";
import path from "path";
import authRoutes from "./auth.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default (req, res) => {
  console.log("API route hit");
  app(req, res);
};
