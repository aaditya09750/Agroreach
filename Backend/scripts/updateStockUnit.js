/**
 * Migration Script: Add stockUnit field to existing products
 * This script updates all existing products to have a default stockUnit of 'kg'
 * 
 * Usage: node scripts/updateStockUnit.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

const updateStockUnits = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Find all products without stockUnit field
    console.log('\nChecking products...');
    const productsWithoutUnit = await Product.find({
      $or: [
        { stockUnit: { $exists: false } },
        { stockUnit: null }
      ]
    });

    console.log(`Found ${productsWithoutUnit.length} products without stockUnit`);

    if (productsWithoutUnit.length === 0) {
      console.log('✓ All products already have stockUnit field');
      process.exit(0);
    }

    // Update products with default stockUnit
    console.log('\nUpdating products with default stockUnit (kg)...');
    const result = await Product.updateMany(
      {
        $or: [
          { stockUnit: { $exists: false } },
          { stockUnit: null }
        ]
      },
      {
        $set: { stockUnit: 'kg' }
      }
    );

    console.log(`✓ Updated ${result.modifiedCount} products`);
    
    // Verify update
    const verifyCount = await Product.countDocuments({ stockUnit: { $exists: true } });
    const totalCount = await Product.countDocuments();
    
    console.log('\n=== Migration Summary ===');
    console.log(`Total products: ${totalCount}`);
    console.log(`Products with stockUnit: ${verifyCount}`);
    console.log(`Success: ${verifyCount === totalCount ? '✓' : '✗'}`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating stock units:', error);
    process.exit(1);
  }
};

// Run the migration
updateStockUnits();
