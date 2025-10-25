const { body, validationResult } = require('express-validator');

// Order creation validation
exports.createOrderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  
  body('items.*.product')
    .notEmpty()
    .withMessage('Product ID is required for each item'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('billingAddress.firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  
  body('billingAddress.lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  
  body('billingAddress.email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  
  body('billingAddress.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  
  body('billingAddress.streetAddress')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('billingAddress.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  
  body('billingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('billingAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'])
    .withMessage('Invalid payment method'),
  
  body('total')
    .notEmpty()
    .withMessage('Total amount is required')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number')
];

// Validate results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};
