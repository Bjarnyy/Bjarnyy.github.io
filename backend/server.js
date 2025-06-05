const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection pool, using DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // needed for Render PostgreSQL SSL
  },
});

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

// Create users table if it doesn't exist
async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await pool.query(query);
}
createUsersTable().catch(err => console.error('Error creating users table:', err));

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const lowerUsername = username.toLowerCase();

  try {
    // Check if username already exists
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [lowerUsername]);
    if (result.rows.length > 0) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    // Insert new user
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [lowerUsername, password]);
    return res.status(201).json({ message: 'Signup successful.' });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const lowerUsername = username.toLowerCase();

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [lowerUsername]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = result.rows[0];
    if (user.password === password) {
      return res.json({ message: 'Login successful.', username: user.username });
    } else {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
