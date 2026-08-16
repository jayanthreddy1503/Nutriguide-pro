const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const HomeRemedy   = require('../models/HomeRemedy');
const remediesData = require('../data/remediesData');

dotenv.config();

const seedRemedies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing remedies
    await HomeRemedy.deleteMany({});
    console.log('Existing remedies cleared.');

    // Insert all 20 remedies
    const inserted = await HomeRemedy.insertMany(remediesData);
    console.log(`${inserted.length} remedies seeded successfully.`);

    // Show what was inserted
    inserted.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.emoji} ${r.problem}`);
    });

    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedRemedies();