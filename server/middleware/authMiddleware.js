const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_ashu_portfolio_2026';
      const decoded = jwt.verify(token, secret);
      
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (e) {
        req.user = null;
      }

      if (!req.user && decoded.id) {
        req.user = { id: decoded.id, name: 'Admin', email: decoded.email || 'admin@portfolio.com', role: 'admin' };
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User authorization failed' });
      }

      return next();
    } catch (error) {
      console.error('JWT protect error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin };

