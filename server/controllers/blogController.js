const Blog = require('../models/Blog');

const initialBlogs = [
  {
    title: 'Mastering React 19: Actions, Optimistic UI & Server Components',
    slug: 'mastering-react-19-actions-and-optimistic-ui',
    excerpt: 'Explore the latest features in React 19 including native async transition hooks, useOptimistic, useFormStatus, and seamless state integration.',
    content: `React 19 brings powerful new primitives that eliminate boilerplate code when dealing with asynchronous operations, form submission state, and optimistic updates.
    
### 1. Simplified Form Actions
With React 19, form handling is dramatically cleaner. You no longer need manual state handlers for pending status or form validation.

### 2. The useOptimistic Hook
Optimistic updates allow your web app to reflect UI changes instantly before server confirmation, resulting in a snappy, app-like experience.

### 3. Automatic Asset Loading
Scripts, stylesheets, and fonts are now automatically hoisted and deduplicated by React during rendering!`,
    category: 'React & Frontend',
    tags: ['React 19', 'JavaScript', 'Frontend', 'Web Dev'],
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
    isPublished: true,
  },
  {
    title: 'Building Scalable RESTful APIs with Node.js, Express & MongoDB',
    slug: 'building-scalable-rest-apis-node-express-mongodb',
    excerpt: 'A comprehensive guide to designing clean MVC architectures, indexing MongoDB collections, using JWT middleware, and handling errors gracefully.',
    content: `Designing backend systems for production requires structure, security, and maintainability.

### Key Pillars of Production APIs:
- **Clean Folder Hierarchy**: Controller-Route-Service separation.
- **Robust Error Handling**: Global error boundary middleware preventing server crashes.
- **Security Best Practices**: Rate limiting, CORS policies, environment variable isolation, and password hashing using bcrypt.`,
    category: 'Backend & Node',
    tags: ['Node.js', 'Express', 'MongoDB', 'Security'],
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    isPublished: true,
  },
  {
    title: 'Tailwind CSS v4: What Developers Need to Know',
    slug: 'tailwind-css-v4-features-and-performance',
    excerpt: 'Discover the new Rust-based Oxide engine, zero-config CSS configuration, native CSS variables, and blistering fast build speeds.',
    content: `Tailwind CSS v4 introduces the Oxide engine built from the ground up to give developers instant build times and clean CSS syntax.

### Highlights:
- **10x Faster Build Speeds**: Lightning CSS integration.
- **Pure CSS Configuration**: Configure themes right in your CSS using standard \`@theme\` blocks.
- **Dynamic Container Queries**: Built-in support without extra plugins.`,
    category: 'CSS & Design',
    tags: ['Tailwind CSS', 'CSS', 'UI Design'],
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    isPublished: true,
  },
];

const ensureInitialBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(initialBlogs);
    }
  } catch (err) {
    console.error('Error auto-seeding blogs:', err.message);
  }
};

const getBlogs = async (req, res) => {
  try {
    await ensureInitialBlogs();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.json({ success: true, count: initialBlogs.length, data: initialBlogs });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    await ensureInitialBlogs();
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    await ensureInitialBlogs();
    const { title, slug, excerpt, content, category, tags, readTime, coverImage, isPublished } = req.body;
    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const blog = new Blog({
      title,
      slug: generatedSlug,
      excerpt,
      content,
      category: category || 'Engineering',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t) => t.trim()),
      readTime: readTime || '5 min read',
      coverImage,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    const createdBlog = await blog.save();
    res.status(201).json({ success: true, data: createdBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.slug = req.body.slug || blog.slug;
      blog.excerpt = req.body.excerpt || blog.excerpt;
      blog.content = req.body.content || blog.content;
      blog.category = req.body.category || blog.category;
      if (req.body.tags) {
        blog.tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',').map((t) => t.trim());
      }
      blog.readTime = req.body.readTime || blog.readTime;
      blog.coverImage = req.body.coverImage !== undefined ? req.body.coverImage : blog.coverImage;
      blog.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : blog.isPublished;

      const updatedBlog = await blog.save();
      return res.json({ success: true, data: updatedBlog });
    }
    res.status(404).json({ success: false, message: 'Blog not found' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      return res.json({ success: true, message: 'Blog removed' });
    }
    res.status(404).json({ success: false, message: 'Blog not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
