const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updateBillingAddress,
  changePassword
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', upload.single('image'), updateProfile);
router.put('/billing-address', updateBillingAddress);
router.put('/change-password', changePassword);

module.exports = router;
