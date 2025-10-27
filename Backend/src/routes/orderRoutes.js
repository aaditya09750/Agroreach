const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const {
  createOrderValidation,
  validate
} = require('../validators/orderValidator');

// All order routes are protected
router.use(protect);

router.post('/', createOrderValidation, validate, createOrder);
router.get('/user', getUserOrders); // Must come BEFORE /:id to avoid conflicts
router.patch('/:id/cancel', cancelOrder);
router.get('/:id', getOrderById); // Dynamic routes should come last

module.exports = router;
