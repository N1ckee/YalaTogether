const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, username, phonenumber, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (firstname, lastname, username, phonenumber, password, role) VALUES ($1, $2, $3, $4, $5, $6)",
      [firstname, lastname, username, phonenumber, password, role]
    );

    res.send("User created!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});
