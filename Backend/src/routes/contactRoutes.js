const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// @route   GET /api/contact/test
// @desc    Test contact route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ message: 'Contact route is working!' });
});

// @route   POST /api/contact
// @desc    Send contact form message
// @access  Private (requires authentication)
router.post('/', protect, sendContactMessage);

module.exports = router;
