import express from 'express';
import { body, validationResult } from 'express-validator';
import Blog from '../models/Blog.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all published blogs (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20, page = 1 } = req.query;

    const query = { published: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const blogs = await Blog.find(query)
      .select('-content')
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/blogs/all (admin)
// @desc    Get all blogs including unpublished
// @access  Private
router.get('/all', authenticate, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .select('-content')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private
router.post('/', [
  authenticate,
  body('title.en').notEmpty().trim(),
  body('title.ka').notEmpty().trim(),
  body('description.en').notEmpty().trim(),
  body('description.ka').notEmpty().trim(),
  body('content.en').notEmpty(),
  body('content.ka').notEmpty(),
  body('category').isIn(['tutorial', 'tip', 'article', 'news'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const blog = new Blog(req.body);
    await blog.save();

    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
