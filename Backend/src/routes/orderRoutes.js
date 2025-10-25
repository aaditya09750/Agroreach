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
router.get('/user', getUserOrders); // Changed from '/' to '/user' to avoid conflicts
router.get('/:id', getOrderById);
router.patch('/:id/cancel', cancelOrder);

module.exports = router;
