const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  getMe,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  signupValidation,
  signinValidation,
  validate
} = require('../validators/authValidator');

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/signin', signinValidation, validate, signin);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
