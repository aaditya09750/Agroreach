const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  incrementViewCount,
  searchProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/roleCheck');
const {
  createProductValidation,
  updateProductValidation,
  validate
} = require('../validators/productValidator');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.patch('/:id/view', incrementViewCount);

// Admin routes (with image upload support)
router.post('/', protect, adminOnly, upload.array('images', 5), createProductValidation, validate, createProduct);
router.put('/:id', protect, adminOnly, upload.array('images', 5), updateProductValidation, validate, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
