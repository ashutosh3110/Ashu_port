const Skill = require('../models/Skill');

const initialSkills = [
  // Frontend
  { name: 'React 19 & Next.js', category: 'Frontend', proficiency: 95, icon: 'SiReact', order: 1 },
  { name: 'JavaScript & TypeScript', category: 'Frontend', proficiency: 92, icon: 'SiTypescript', order: 2 },
  { name: 'Tailwind CSS v4', category: 'Frontend', proficiency: 98, icon: 'SiTailwindcss', order: 3 },
  { name: 'Framer Motion', category: 'Frontend', proficiency: 88, icon: 'SiFramer', order: 4 },
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 96, icon: 'SiHtml5', order: 5 },

  // Backend
  { name: 'Node.js & Express.js', category: 'Backend', proficiency: 92, icon: 'SiNodedotjs', order: 1 },
  { name: 'RESTful API & GraphQL', category: 'Backend', proficiency: 90, icon: 'SiExpress', order: 2 },
  { name: 'JWT & OAuth Authentication', category: 'Backend', proficiency: 88, icon: 'SiJsonwebtokens', order: 3 },

  // Database
  { name: 'MongoDB & Mongoose', category: 'Database', proficiency: 90, icon: 'SiMongodb', order: 1 },
  { name: 'PostgreSQL & Prisma', category: 'Database', proficiency: 85, icon: 'SiPostgresql', order: 2 },

  // DevOps
  { name: 'Docker & Containers', category: 'DevOps', proficiency: 82, icon: 'SiDocker', order: 1 },
  { name: 'AWS & Cloud Hosting', category: 'DevOps', proficiency: 78, icon: 'SiAmazonwebservices', order: 2 },
  { name: 'Vercel / Render Deployment', category: 'DevOps', proficiency: 95, icon: 'SiVercel', order: 3 },

  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 95, icon: 'SiGit', order: 1 },
  { name: 'Postman & Swagger', category: 'Tools', proficiency: 92, icon: 'SiPostman', order: 2 },
  { name: 'Vite & Build Tools', category: 'Tools', proficiency: 90, icon: 'SiVite', order: 3 },
];

const ensureInitialSkills = async () => {
  try {
    const count = await Skill.countDocuments();
    if (count === 0) {
      await Skill.insertMany(initialSkills);
    }
  } catch (err) {
    console.error('Error auto-seeding skills:', err.message);
  }
};

const getSkills = async (req, res) => {
  try {
    await ensureInitialSkills();
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.json({ success: true, count: initialSkills.length, data: initialSkills });
  }
};

const createSkill = async (req, res) => {
  try {
    await ensureInitialSkills();
    const { name, category, proficiency, icon, order } = req.body;
    const skill = new Skill({ name, category, proficiency, icon, order });
    const createdSkill = await skill.save();
    res.status(201).json({ success: true, data: createdSkill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      skill.name = req.body.name || skill.name;
      skill.category = req.body.category || skill.category;
      skill.proficiency = req.body.proficiency !== undefined ? req.body.proficiency : skill.proficiency;
      skill.icon = req.body.icon !== undefined ? req.body.icon : skill.icon;
      skill.order = req.body.order !== undefined ? req.body.order : skill.order;

      const updatedSkill = await skill.save();
      return res.json({ success: true, data: updatedSkill });
    }
    res.status(404).json({ success: false, message: 'Skill not found' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await skill.deleteOne();
      return res.json({ success: true, message: 'Skill removed' });
    }
    res.status(404).json({ success: false, message: 'Skill not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
