const { v4: uuidv4 } = require('uuid');
let products = require('../models/product');
const { NotFoundError } = require('../utils/errors');

exports.getAllProducts = (req, res) => {
  let { category, page = 1, limit = 10 } = req.query;
  let result = products;

  if (category) result = result.filter(p => p.category === category);

  const start = (page - 1) * limit;
  const end = page * limit;
  res.json(result.slice(start, end));
};

exports.getProductById = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError());
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError());

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError());

  const removed = products.splice(index, 1);
  res.json(removed[0]);
};

exports.searchProducts = (req, res) => {
  const { name } = req.query;
  const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
};

exports.getStats = (req, res) => {
  const stats = products.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
};
exports.getPaginatedProducts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedProducts = products.slice(start, end);
  
  res.json({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    totalProducts: products.length,
    products: paginatedProducts
  });
};
exports.filterProducts = (req, res) => {
  const { category, inStock } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  if (inStock !== undefined) {
    const inStockBool = inStock.toLowerCase() === 'true';
    filteredProducts = filteredProducts.filter(product => product.inStock === inStockBool);
  }

  res.json(filteredProducts);
};
exports.getProductStatistics = (req, res) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalProducts ? (totalValue / totalProducts).toFixed(2) : 0;

  res.json({
    totalProducts,
    totalValue,
    averagePrice
  });
};
