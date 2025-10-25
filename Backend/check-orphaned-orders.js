const mongoose = require('mongoose');
const Order = require('./src/models/Order');
const User = require('./src/models/User');

mongoose.connect('mongodb://localhost:27017/ar-ecommerce')
  .then(async () => {
    console.log('Connected to database\n');
    
    const orders = await Order.find().populate('user');
    const users = await User.find();
    
    console.log('=== ALL ORDERS ===');
    for (const order of orders) {
      if (order.user) {
        console.log(`Order ${order.orderId} - User: ${order.user.email} - Status: ${order.status}`);
      } else {
        console.log(`Order ${order.orderId} - User: DELETED (ORPHANED) - Status: ${order.status}`);
      }
    }
    
    console.log('\n=== ALL USERS ===');
    users.forEach(u => {
      console.log(`${u.name} (${u.email}) - Role: ${u.role}`);
    });
    
    console.log(`\n=== SUMMARY ===`);
    console.log(`Total Orders: ${orders.length}`);
    console.log(`Orphaned Orders: ${orders.filter(o => !o.user).length}`);
    console.log(`Total Users: ${users.length}`);
    
    // Find and delete orphaned orders
    const orphanedOrders = orders.filter(o => !o.user);
    if (orphanedOrders.length > 0) {
      console.log(`\nFound ${orphanedOrders.length} orphaned orders. Deleting them...`);
      const orphanedIds = orphanedOrders.map(o => o._id);
      const result = await Order.deleteMany({ _id: { $in: orphanedIds } });
      console.log(`✓ Deleted ${result.deletedCount} orphaned orders.`);
    } else {
      console.log(`\nNo orphaned orders found. Database is clean!`);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
