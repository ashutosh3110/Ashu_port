const express = require('express');
const router = express.Router();
const { loginUser, getMe, getPublicProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/public-profile', getPublicProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
