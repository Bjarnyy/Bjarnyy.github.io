const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://bjarnyy.github.io',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Users stored as { lowerUsername: { original, password } }
const users = {};

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required.' });

  const lowerUsername = username.toLowerCase();

  if (users[lowerUsername]) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  users[lowerUsername] = { original: username, password };
  res.status(201).json({ message: 'Signup successful.' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required.' });

  const lowerUsername = username.toLowerCase();
  const user = users[lowerUsername];

  if (user && user.password === password) {
    res.json({ message: 'Login successful.', username: user.original });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
