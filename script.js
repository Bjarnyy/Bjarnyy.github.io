const backendURL = 'https://bjarnyy-backend.onrender.com'; // Replace with your actual backend URL

async function signup(username, password) {
  const res = await fetch(`${backendURL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
}

async function login(username, password) {
  const res = await fetch(`${backendURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
}
