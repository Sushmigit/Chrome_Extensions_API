const express = require('express');
const app = express();
const port = 3000;

// Serve static frontend files
app.use(express.static(__dirname));

// Import JSON data
const extensions = require('./chrome-extensions.json');

// API endpoint
app.get('/api/extensions', (req, res) => {
  res.json(extensions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
