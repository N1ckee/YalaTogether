import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET = process.env.JWT_SECRET; // Set your secret in environment variables

router.get('/user', (req, res) => {
  // Get token from cookie or Authorization header
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(token, SECRET);
    // Only send non-sensitive info
    res.json({
      username: payload.username,
      role: payload.role
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
