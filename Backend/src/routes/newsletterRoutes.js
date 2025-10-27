const express = require('express');
const router = express.Router();
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletterController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/roleCheck');

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes
router.get('/subscribers', protect, adminOnly, getAllSubscribers);

module.exports = router;
