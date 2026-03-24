import express from 'express';
import pool from "./db.js";

const router = express.Router();

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

export default router;
