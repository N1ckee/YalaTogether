import express from 'express';
import pool from "./db.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    // Ensure only the plain decoded JWT payload is attached
    req.user = typeof decoded === "object" ? { ...decoded } : {};
    next();
  });
}

router.post('/create', async (req, res) => {
  try {
    const {
      path_data,
      start,
      destination,
      length,
      eta,
      user_id,
      seats
    } = req.body;

    const query = `
    INSERT INTO paths (
      path_data, start, destination, length, eta, user_id, seats
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING *;
  `;

    const values = [
      path_data,
      start,
      destination,
      length,
      eta,
      user_id,
      seats
    ];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create path" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM paths ORDER BY created_at DESC;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load paths" });
  }
});

export default router;
