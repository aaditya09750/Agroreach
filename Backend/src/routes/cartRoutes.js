const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// All cart routes are protected
router.use(protect);

// Order matters - specific routes before general ones
router.delete('/clear', clearCart);  // DELETE /api/cart/clear - Clear entire cart
router.post('/', addToCart);  // POST /api/cart
router.get('/', getCart);  // GET /api/cart
router.put('/:productId', updateCartItem);  // PUT /api/cart/:productId
router.delete('/:productId', removeFromCart);  // DELETE /api/cart/:productId

module.exports = router;
