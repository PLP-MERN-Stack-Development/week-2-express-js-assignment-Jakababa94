// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4:uuid } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
// Root route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Product API');
});

// Sample product data
let products = [
  {"id":1,
    "name": "Laptop",
    "description": "A high-performance laptop for professionals.",
    "price": 1200.00,
    "category": "Electronics",
    "stock": false
  },
  {"id":2,
    "name": "Smartphone",
    "description": "A latest model smartphone with advanced features.",
    "price": 800.00,
    "category": "Electronics",
    "stock": true
  },
  {"id":3,
    "name": "Headphones",
    "description": "Noise-cancelling headphones for an immersive audio experience.",
    "price": 200.00,
    "category": "Accessories",
    "stock": true
  }
];

// TODO: Implement the following routes:
// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id == productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});
// - Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: uuid(), // <-- call uuid() directly
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
// - Update a product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(p => p.id == productId);
  if (productIndex !== -1) {
    const updatedProduct = {
      ...products[productIndex],
      ...req.body
    };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});
// - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(p => p.id == productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});


// TODO: Implement custom middleware for:
// - Request logging
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
// - Logger
app.use((req, res, next) => {
  console.log(`Request received at ${new Date().toISOString()}`);
  next();
});
// - Authentication
app.use((req, res, next) => {
  // Placeholder for authentication logic
  console.log('Authentication middleware executed');
  next();
});
// - Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// - Pagination
app.get('/api/products/page/:page', (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  const pageSize = 2; // Number of products per page
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);
  res.json({
    page,
    pageSize,
    totalProducts: products.length,
    totalPages: Math.ceil(products.length / pageSize),
    products: paginatedProducts
  });
});
// - Search
app.get('/api/products/search', (req, res) => {
  const { query } = req;
  const filteredProducts = products.filter(product => {
    return Object.keys(query).every(key => 
      product[key] && product[key].toString().toLowerCase().includes(query[key].toLowerCase())
    );
  });
  res.json(filteredProducts);
});
// - Filtering
app.get('/api/products/filter', (req, res) => {
  const { category, stock } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }
  if (stock) {
    const inStock = stock.toLowerCase() === 'true';
    filteredProducts = filteredProducts.filter(product => product.stock === inStock);
  }

  res.json(filteredProducts);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;