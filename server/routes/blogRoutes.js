const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router.route('/slug/:slug').get(getBlogBySlug);
router.route('/:id').put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

module.exports = router;
