import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ka: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ka: { type: String, required: true }
  },
  longDescription: {
    en: { type: String },
    ka: { type: String }
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  demoUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Project', projectSchema);
