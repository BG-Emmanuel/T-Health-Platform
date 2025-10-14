const express = require('express');
const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'User Service is healthy' });
});

// Mock user data
const users = [
  { id: 1, email: 'demo@thealth.com', name: 'Demo User' }
];

// Get user profile
app.get('/profile/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
});

// Mock login
app.post('/login', (req, res) => {
  res.json({ 
    message: 'Login successful',
    token: 'mock-jwt-token',
    user: users[0]
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});