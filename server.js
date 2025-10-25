const express = require('express');
const path = require('path');
const app = express();

// Use dynamic port provided by Azure, fallback to 3000 for local
const port = process.env.PORT || 3000;

// Serve static frontend files from root directory
app.use(express.static(path.join(__dirname)));

// Import JSON data once at startup
const extensions = require('./chrome-extensions.json');

// API endpoint to serve JSON
app.get('/api/extensions', (req, res) => {
  res.json(extensions);
});

// SPA fallback: serve index.html for all other routes except /api
app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
