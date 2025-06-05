const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const USERS_FILE = path.join(__dirname, 'users.json');

// Load users from file, or initialize empty object
let users = {};
try {
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    users = JSON.parse(data);
  }
} catch (err) {
  console.error('Error reading users file:', err);
  users = {};
}

// Function to save users to file synchronously
function saveUsers() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users file:', err);
  }
}

// CORS configuration - allow your GitHub Pages domain
const corsOptions = {
  origin: 'https://bjarnyy.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.options('*', cors(corsOptions));

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const lowerUsername = username.toLowerCase();

  // Check if username already exists (case-insensitive)
  if (users[lowerUsername]) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  // Add new user (store original username for display)
  users[lowerUsername] = { original: username, password };

  // Save users to file
  saveUsers();

  return res.status(201).json({ message: 'Signup successful.' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const lowerUsername = username.toLowerCase();
  const user = users[lowerUsername];

  if (user && user.password === password) {
    return res.json({ message: 'Login successful.', username: user.original });
  } else {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
