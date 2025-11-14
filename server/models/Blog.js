import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ka: { type: String, required: true }
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    en: { type: String, required: true },
    ka: { type: String, required: true }
  },
  content: {
    en: { type: String, required: true },
    ka: { type: String, required: true }
  },
  category: {
    type: String,
    enum: ['tutorial', 'tip', 'article', 'news'],
    default: 'article'
  },
  tags: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    default: 'Nikoloz Kuridze'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date
  }
});

// Update updatedAt on save
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.published && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

// Create slug from title if not provided
blogSchema.pre('validate', function(next) {
  if (!this.slug && this.title.en) {
    this.slug = this.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
