import express from "express";
import authRoutes from "./auth.js";
import userinfoRoutes from './userinfo.js';
import pathsRoutes from './paths.js';
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.redirect("/testregister.html");
});

app.use("/auth", authRoutes);
app.use("/userinfo", userinfoRoutes);
app.use("/paths", pathsRoutes);

export default app;
