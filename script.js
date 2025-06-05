const backendURL = 'https://bjarnyy-backend.onrender.com';

// Signup form handler
async function signup(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${backendURL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      alert('Signup successful! Please log in.');
      window.location.href = 'login.html';
    } else {
      const data = await res.json();
      alert('Signup failed: ' + data.message);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Login form handler
async function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${backendURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('loggedInUser', data.username);
      window.location.href = 'home.html';
    } else {
      const data = await res.json();
      alert('Login failed: ' + data.message);
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Check login status on home page
function checkLogin() {
  const user = localStorage.getItem('loggedInUser');
  const welcomeEl = document.getElementById('welcome');
  const logoutBtn = document.getElementById('logoutBtn');

  if (user) {
    welcomeEl.textContent = `Welcome, ${user}!`;
    welcomeEl.style.display = 'block';
    logoutBtn.style.display = 'inline-block';

    logoutBtn.onclick = () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    };
  } else {
    window.location.href = 'login.html';
  }
}

// Attach event listeners depending on the page
window.onload = () => {
  if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', signup);
  }
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', login);
  }
  if (document.getElementById('welcome')) {
    checkLogin();
  }
};
