import express from "express";
import authRoutes from "./auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);

export default app;
