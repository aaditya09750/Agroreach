require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

const createAdmin = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connected to MongoDB');

    // Admin user details
    const adminData = {
      email: 'agroreach25@gmail.com',
      password: 'Agroreach@321',
      firstName: 'Admin',
      lastName: 'User'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('\n⚠️  Admin user already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Role:', existingAdmin.role);
      
      // Update role and password (let the pre-save hook hash it)
      existingAdmin.role = 'admin';
      existingAdmin.password = adminData.password; // Plain password - model will hash it
      existingAdmin.isActive = true;
      await existingAdmin.save();
      
      console.log('✅ Updated admin role and reset password');
      
      console.log('\n📝 Login Credentials:');
      console.log('   Email:', adminData.email);
      console.log('   Password:', adminData.password);
      console.log('\n⚠️  IMPORTANT: Change the password after first login!');
      
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create new admin user (model will hash the password via pre-save hook)
    const adminUser = await User.create({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      password: adminData.password, // Plain password - model will hash it
      role: 'admin',
      isActive: true
    });

    console.log('\n🎉 Admin user created successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('   Email:', adminUser.email);
    console.log('   Password:', adminData.password);
    console.log('   Role:', adminUser.role);
    console.log('   ID:', adminUser._id);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('\n🚀 You can now sign in at: http://localhost:5000/api/auth/signin');

    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    
    if (error.code === 11000) {
      console.error('⚠️  User with this email already exists!');
    }
    
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createAdmin();
