const backendURL = 'https://bjarnyy-backend.onrender.com';

// Signup handler
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
      alert('Signup successful! You can now login.');
      window.location.href = 'login.html';
    } else {
      const data = await res.json();
      alert('Signup failed: ' + data.message);
    }
  } catch (e) {
    alert('Error: ' + e.message);
  }
}

// Login handler
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
      onLoginSuccess(data.username);
    } else {
      const data = await res.json();
      alert('Login failed: ' + data.message);
    }
  } catch (e) {
    alert('Error: ' + e.message);
  }
}

// Called after successful login/signup to store login state and redirect
function onLoginSuccess(username) {
  localStorage.setItem('loggedInUser', username);
  window.location.href = 'home.html';
}

// On home page, check login state and show username + logout button
function checkLogin() {
  const user = localStorage.getItem('loggedInUser');
  const welcomeEl = document.getElementById('welcome');
  const logoutBtn = document.getElementById('logoutBtn');

  if (user) {
    if (welcomeEl && logoutBtn) {
      welcomeEl.textContent = `Welcome, ${user}!`;
      welcomeEl.style.display = 'block';
      logoutBtn.style.display = 'inline-block';

      logoutBtn.onclick = logout;
    }
  } else {
    // Not logged in, redirect to login page
    window.location.href = 'login.html';
  }
}

// Logout function clears localStorage and redirects to login
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}

// Attach event listeners based on the page
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
