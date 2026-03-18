const express = require('express');
const path = require('path');
const authRoutes = require('./auth');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public', 'index.html'));
});

module.exports = (req, res) => {
  console.log('API route hit');
  app(req, res);
};
