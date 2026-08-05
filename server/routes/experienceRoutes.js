const express = require('express');
const router = express.Router();
const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getExperiences).post(protect, admin, createExperience);
router.route('/:id').put(protect, admin, updateExperience).delete(protect, admin, deleteExperience);

module.exports = router;
