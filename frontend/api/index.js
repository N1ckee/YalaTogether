import express from "express";
import authRoutes from "./auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/testregister.html"));
});

app.use("/auth", authRoutes);

export default app;
