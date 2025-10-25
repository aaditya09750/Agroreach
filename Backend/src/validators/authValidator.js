const { body, validationResult } = require('express-validator');

// Signup validation rules
exports.signupValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  // Accept either 'name' field or 'firstName'+'lastName' fields
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  
  body('phone')
    .optional()
    .trim()
];

// Signin validation rules
exports.signinValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
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
  
  // Custom validation: Check if either 'name' or 'firstName'+'lastName' is provided
  if (req.path === '/signup') {
    const { name, firstName, lastName } = req.body;
    
    if (!name && (!firstName || !lastName)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: [{
          field: 'name',
          message: 'Either name or firstName and lastName are required'
        }]
      });
    }
  }
  
  next();
};
