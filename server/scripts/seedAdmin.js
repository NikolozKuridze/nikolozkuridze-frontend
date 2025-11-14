import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nikolozkuridze', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL || 'admin@nikolozkuridze.com'
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@nikolozkuridze.com',
      password: process.env.ADMIN_PASSWORD || 'changeme123',
      name: 'Admin User'
    });

    await admin.save();

    console.log('✅ Admin user created successfully');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'changeme123');
    console.log('\n⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
