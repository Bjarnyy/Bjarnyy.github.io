const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to users data file
const USERS_FILE = path.join(__dirname, 'users.json');

// Load users from file or start with empty object
let users = {};
if (fs.existsSync(USERS_FILE)) {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
  }
}

// Save users to file function
function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// CORS setup
const corsOptions = {
  origin: 'https://bjarnyy.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.options('*', cors(corsOptions));

// Signup
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required.' });

  const lowerUsername = username.toLowerCase();
  if (users[lowerUsername]) return res.status(409).json({ message: 'Username already exists.' });

  users[lowerUsername] = { original: username, password };
  saveUsers();

  res.status(201).json({ message: 'Signup successful.' });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required.' });

  const lowerUsername = username.toLowerCase();
  const user = users[lowerUsername];

  if (user && user.password === password) {
    res.json({ message: 'Login successful.', username: user.original });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Backend is live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
