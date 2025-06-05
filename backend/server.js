const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests only from your frontend domain
const corsOptions = {
  origin: 'https://bjarnyy.github.io',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// In-memory users store
const users = {};

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  if (users[username]) {
    return res.status(409).json({ message: 'Username already exists.' });
  }
  users[username] = password;
  res.status(201).json({ message: 'Signup successful.' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.json({ message: 'Login successful.' });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
