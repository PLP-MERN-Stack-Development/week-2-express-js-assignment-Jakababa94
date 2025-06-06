// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
// Root route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Product API');
});

// TODO: Implement the following routes:
// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// - Get a specific product
// - Create a new product
// - Update a product
// - Delete a product


// TODO: Implement custom middleware for:
// - Request logging
// - Logger
// - Authentication
// - Error handling
// - Pagination
// - Search
// - Filtering


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 