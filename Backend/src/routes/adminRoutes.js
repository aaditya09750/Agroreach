const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  deleteOrder,
  getAllUsers,
  toggleUserActive,
  deleteUser,
  getRecentProducts
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/roleCheck');

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Orders management
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderDetails);
router.patch('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

// Users management
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle-active', toggleUserActive);
router.delete('/users/:id', deleteUser);

// Products management
router.get('/products/recent', getRecentProducts);

module.exports = router;
