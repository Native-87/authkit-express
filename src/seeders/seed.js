const { User } = require('../models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    const users = [
      {
        name: 'Admin Demo',
        email: 'demo@authkit.dev',
        password: 'demo1234',
        role: 'admin',
      },
      {
        name: 'Supervisor Demo',
        email: 'supervisor@authkit.dev',
        password: 'demo1234',
        role: 'supervisor',
      },
      {
        name: 'Operator Demo',
        email: 'operator@authkit.dev',
        password: 'demo1234',
        role: 'operator',
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
        });
        console.log(`✅ Created user: ${userData.email}`);
      } else {
        console.log(`⏭️  User already exists: ${userData.email}`);
      }
    }
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

module.exports = seedDatabase;
