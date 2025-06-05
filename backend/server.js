const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options allowing only your frontend domain
const corsOptions = {
  origin: 'https://bjarnyy.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));  // Enable CORS for all routes with config
app.use(bodyParser.json());

// Handle OPTIONS preflight requests for all routes
app.options('*', cors(corsOptions));

// In-memory users store: key = lowercased username
const users = {};

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const lowerUsername = username.toLowerCase();
  if (users[lowerUsername]) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  users[lowerUsername] = { original: username, password };
  res.status(201).json({ message: 'Signup successful.' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const lowerUsername = username.toLowerCase();
  const user = users[lowerUsername];

  if (user && user.password === password) {
    res.json({ message: 'Login successful.', username: user.original });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// Simple test route to check backend health
app.get('/', (req, res) => {
  res.send('Backend is live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
