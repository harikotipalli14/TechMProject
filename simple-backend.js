const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock user data
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123' // In a real app, this would be hashed
  }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  
  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  
  // Check password (in a real app, this would use bcrypt)
  if (user.password === password) {
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple backend server running on port ${PORT}`);
  console.log('Test user: test@example.com / password123');
}); 