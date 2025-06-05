const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const users = {}; // Store usernames/passwords in memory

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  users[username] = password;
  res.json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    return res.json({ success: true });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
