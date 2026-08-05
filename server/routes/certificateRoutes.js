const express = require('express');
const router = express.Router();
const {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require('../controllers/certificateController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getCertificates).post(protect, admin, createCertificate);
router.route('/:id').put(protect, admin, updateCertificate).delete(protect, admin, deleteCertificate);

module.exports = router;
