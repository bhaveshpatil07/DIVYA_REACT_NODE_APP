// Import necessary modules
const express = require('express');
const router = express.Router();

// Define the admin credentials
const adminCredentials = {
  username: 'divya@gmail.com',
  password: '123456789' 
};

// Route for admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match the admin credentials
  if (username === adminCredentials.username && password === adminCredentials.password) {
    // If the credentials are correct, send a success response
    res.status(200).json({ message: 'Login successful' });
  } else {
    // If the credentials are incorrect, send an error response
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;