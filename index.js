// index.js - Express server
const express = require('express');
const path = require('path');

// Create Express app
const app = express();
const PORT = 8080;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Routes for specific pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact-me.html'));
});

// 404 handler - must be after all other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Available routes:');
  console.log(`  http://localhost:${PORT}/ -> index.html`);
  console.log(`  http://localhost:${PORT}/about -> about.html`);
  console.log(`  http://localhost:${PORT}/contact-me -> contact-me.html`);
  console.log(`All other routes will show the 404 page`);
});