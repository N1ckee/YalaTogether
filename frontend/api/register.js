import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { firstname, lastname, username, phonenumber, email, password, role } = req.body;

  try {

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users 
      (firstname, lastname, username, phonenumber, email, password, role)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [firstname, lastname, username, phonenumber, email, hash, role]
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).send("Database error");

  }
}
