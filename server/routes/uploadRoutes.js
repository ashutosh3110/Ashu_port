const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    // Check if Cloudinary is explicitly configured with non-empty credentials
    const hasCloudinary = 
      process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME.trim() !== '' &&
      process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY.trim() !== '' &&
      process.env.CLOUDINARY_API_SECRET && process.env.CLOUDINARY_API_SECRET.trim() !== '';

    if (hasCloudinary) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio',
      });
      return res.json({
        success: true,
        imageUrl: result.secure_url,
        storedOn: 'cloudinary',
      });
    }

    // Local server storage fallback (saves in server/uploads folder)
    const relativePath = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${relativePath}`;

    res.json({
      success: true,
      imageUrl: fullUrl,
      relativePath: relativePath,
      filename: req.file.filename,
      storedOn: 'local_server',
    });
  } catch (error) {
    console.error('File Upload Error:', error);
    res.status(500).json({ success: false, message: error.message || 'File upload failed' });
  }
});

module.exports = router;

