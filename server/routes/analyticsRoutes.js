const express = require('express');
const router = express.Router();
const { incrementVisitor, getStats } = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/visitor', incrementVisitor);
router.get('/stats', protect, admin, getStats);

module.exports = router;
