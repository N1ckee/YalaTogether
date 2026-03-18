// backend/src/app.js
const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

//auth
const authRoutes = require('../../frontend/api/auth');
app.use('/auth', authRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

let rides = [];

app.get("/api/rides", (req, res) => {
  res.json(rides);
});

app.post("/api/rides", (req, res) => {
  const newRide = {
    id: Date.now(),
    from: req.body.from,
    to: req.body.to,
    time: req.body.time,
    seats: req.body.seats,
    driver: "testUser"
  };

  rides.push(newRide);
  res.json(newRide);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
