const Experience = require('../models/Experience');

const sampleExperience = [
  {
    _id: 'exp-1',
    title: 'Backend / Full Stack Developer',
    company: 'Appzeto Private Limited',
    location: 'On-Site',
    type: 'Full-Time',
    startDate: 'July 2025',
    endDate: 'July 2026',
    current: false,
    description: 'Developed and maintained scalable backend applications using Node.js, Express.js, and MongoDB for production SaaS products.',
    highlights: [
      'Designed and implemented secure RESTful APIs, JWT authentication, authorization middleware, and Role-Based Access Control (RBAC).',
      'Built and maintained multi-tenant SaaS architecture supporting multiple businesses on a shared infrastructure.',
      'Integrated third-party services including Razorpay Payment Gateway, WhatsApp Cloud API, SMS APIs, OTP verification, and Cloudinary.',
    ],
    order: 1,
  },
  {
    _id: 'exp-2',
    title: 'Master of Computer Applications (MCA)',
    company: 'Medi-Caps University',
    location: 'Indore, MP',
    type: 'Education',
    startDate: '2024',
    endDate: '2026',
    current: true,
    description: 'Specializing in Advanced Software Engineering, Cloud Architecture, Distributed Databases, and Enterprise Application Design.',
    highlights: [
      'Advanced Cloud Computing & Microservices Architecture',
      'Full Stack Web Development & System Design',
    ],
    order: 2,
  },
  {
    _id: 'exp-3',
    title: 'Bachelor of Computer Applications (BCA)',
    company: 'Career College',
    location: 'Bhopal, MP',
    type: 'Education',
    startDate: '2021',
    endDate: '2024',
    current: false,
    description: 'Graduated with strong foundation in Computer Science, Data Structures & Algorithms, Object-Oriented Programming, and Web Technologies.',
    highlights: [
      'Core Programming in C++, Java & Web Technologies',
      'Database Management Systems & Web Development Projects',
    ],
    order: 3,
  },
];

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    if (!experiences || experiences.length === 0) {
      return res.json({ success: true, count: sampleExperience.length, data: sampleExperience });
    }
    res.json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    res.json({ success: true, count: sampleExperience.length, data: sampleExperience });
  }
};

const createExperience = async (req, res) => {
  try {
    const { title, company, location, type, startDate, endDate, current, description, highlights, order } = req.body;
    const experience = new Experience({
      title,
      company,
      location,
      type: type || 'Full-Time',
      startDate,
      endDate,
      current: current || false,
      description,
      highlights: Array.isArray(highlights) ? highlights : (highlights || '').split(',').map((h) => h.trim()),
      order: order || 0,
    });
    const createdExp = await experience.save();
    res.status(201).json({ success: true, data: createdExp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      experience.title = req.body.title || experience.title;
      experience.company = req.body.company || experience.company;
      experience.location = req.body.location !== undefined ? req.body.location : experience.location;
      experience.type = req.body.type || experience.type;
      experience.startDate = req.body.startDate || experience.startDate;
      experience.endDate = req.body.endDate || experience.endDate;
      experience.current = req.body.current !== undefined ? req.body.current : experience.current;
      experience.description = req.body.description || experience.description;
      if (req.body.highlights) {
        experience.highlights = Array.isArray(req.body.highlights)
          ? req.body.highlights
          : req.body.highlights.split(',').map((h) => h.trim());
      }
      experience.order = req.body.order !== undefined ? req.body.order : experience.order;

      const updatedExp = await experience.save();
      return res.json({ success: true, data: updatedExp });
    }
    res.status(404).json({ success: false, message: 'Experience entry not found' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.deleteOne();
      return res.json({ success: true, message: 'Experience removed' });
    }
    res.status(404).json({ success: false, message: 'Experience entry not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
