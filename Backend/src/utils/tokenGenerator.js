const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId, email, role) => {
  return jwt.sign(
    {
      userId,
      email,
      role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

module.exports = generateToken;
