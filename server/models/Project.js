const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: 'Full Stack' }, // Full Stack, Frontend, Backend, Mobile, AI/ML
    technologies: [{ type: String }],
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
