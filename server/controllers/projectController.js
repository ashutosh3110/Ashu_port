const Project = require('../models/Project');

const initialProjects = [
  {
    title: 'Wapixo Salon Management Platform',
    description: 'Multi-Tenant Salon Management SaaS Platform supporting independent salon operations on shared infrastructure with RBAC (7 roles), Razorpay, WhatsApp Cloud API, Node-Cron, and real-time Recharts analytics.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay', 'WhatsApp API', 'Node-Cron', 'Recharts'],
    githubLink: 'https://github.com/ashutosh3110/Salon_crm123.git',
    liveLink: 'https://wapixo.com',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    order: 1,
  },
  {
    title: 'Dintask Customer Management System',
    description: 'Enterprise CRM, Sales & Service Management System supporting 100+ RESTful APIs, RBAC for 6 roles, Socket.IO real-time chat, Razorpay subscriptions, and automated Node-Cron reminders.',
    category: 'Full Stack',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Socket.IO', 'Razorpay', 'Node-Cron', 'React'],
    githubLink: 'https://github.com/ashutosh3110/Dintask123.git',
    liveLink: 'https://dintask.com',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    order: 2,
  },
  {
    title: 'Sootit Driver Management System',
    description: 'Sootit is a scalable full-stack MERN (MongoDB, Express.js, React 19, Node.js) on-demand automotive and transport service ecosystem designed to connect vehicle owners with verified service providers such as mechanics, drivers, RTO consultants, towing services, and legal advisors.',
    category: 'Full Stack',
    technologies: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay', 'Framer Motion', 'Tailwind CSS', 'Cloudinary'],
    githubLink: 'https://github.com/ashutosh3110/sotit.git',
    liveLink: 'https://sootit.com',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    order: 3,
  },
  {
    title: 'EzOfLife On-Demand Laundry & Logistics Platform',
    description: 'Ezoflife (Loondry) – Multi-Persona On-Demand Laundry & Logistics Platform built using the MERN stack with 5 dedicated portals, 4-step secure logistics handshake protocol, dual-OTP verification, and executive Admin dashboard.',
    category: 'Full Stack',
    technologies: ['React 19', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express.js', 'MongoDB', 'Zustand', 'Framer Motion'],
    githubLink: 'https://github.com/ashutosh3110/Ezoflife123.git',
    liveLink: 'https://ezoflife123.vercel.app/',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    order: 4,
  },
];

const ensureInitialProjects = async () => {
  try {
    for (const proj of initialProjects) {
      const exists = await Project.findOne({ title: proj.title });
      if (!exists) {
        await Project.create(proj);
      }
    }
  } catch (err) {
    console.error('Error auto-seeding projects:', err.message);
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    await ensureInitialProjects();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.json({ success: true, count: initialProjects.length, data: initialProjects });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    await ensureInitialProjects();
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    await ensureInitialProjects();
    const { title, description, category, technologies, githubLink, liveLink, image, featured, order } = req.body;
    const project = new Project({
      title,
      description,
      category: category || 'Full Stack',
      technologies: Array.isArray(technologies) ? technologies : (technologies || '').split(',').map((t) => t.trim()),
      githubLink,
      liveLink,
      image,
      featured: featured || false,
      order: order || 0,
    });
    const createdProject = await project.save();
    res.status(201).json({ success: true, data: createdProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.category = req.body.category || project.category;
      if (req.body.technologies) {
        project.technologies = Array.isArray(req.body.technologies)
          ? req.body.technologies
          : req.body.technologies.split(',').map((t) => t.trim());
      }
      project.githubLink = req.body.githubLink !== undefined ? req.body.githubLink : project.githubLink;
      project.liveLink = req.body.liveLink !== undefined ? req.body.liveLink : project.liveLink;
      project.image = req.body.image !== undefined ? req.body.image : project.image;
      project.featured = req.body.featured !== undefined ? req.body.featured : project.featured;
      project.order = req.body.order !== undefined ? req.body.order : project.order;

      const updatedProject = await project.save();
      return res.json({ success: true, data: updatedProject });
    }
    res.status(404).json({ success: false, message: 'Project not found' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      return res.json({ success: true, message: 'Project removed' });
    }
    res.status(404).json({ success: false, message: 'Project not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
