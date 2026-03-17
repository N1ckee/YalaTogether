const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    phonenumber,
    password
  } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
       (firstname, lastname, username, email, phonenumber, password_hash, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, username, email, role`,
      [
        firstname || null,
        lastname || null,
        username,
        email,
        phonenumber || null,
        password_hash,
        'user'
      ]
    );

    res.status(201).json({
      message: 'User created',
      user: result.rows[0]
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Missing login credentials' });
    }

    const result = await pool.query(
      `SELECT id, username, email, password_hash, role
       FROM users
       WHERE email = $1 OR username = $1
       LIMIT 1`,
      [identifier]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
