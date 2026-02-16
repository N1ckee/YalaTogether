// backend/src/app.js
const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;



