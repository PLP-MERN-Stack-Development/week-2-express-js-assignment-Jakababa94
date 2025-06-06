const express = require('express');
const {
  getAllProducts, getProductById, createProduct,
  updateProduct, deleteProduct, searchProducts, getStats
} = require('../controllers/productController');
const { validateProduct } = require('../middlewares/validator');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/stats', getStats);
router.get('/:id', getProductById);
router.post('/', auth, validateProduct, createProduct);
router.put('/:id', auth, validateProduct, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
