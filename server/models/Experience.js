const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: '' },
    type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Education', 'Freelance'], default: 'Full-Time' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
