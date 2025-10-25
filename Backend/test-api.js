const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testBackend() {
  console.log('🧪 Testing AR E-commerce Backend API\n');
  
  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Health Check
  try {
    console.log('1️⃣  Testing Health Check...');
    const response = await axios.get(`${BASE_URL}/health`);
    if (response.data.status === 'OK') {
      console.log('   ✅ Health check passed\n');
      testsPassed++;
    }
  } catch (error) {
    console.log('   ❌ Health check failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 2: Get Products
  try {
    console.log('2️⃣  Testing Get Products...');
    const response = await axios.get(`${BASE_URL}/products`);
    console.log(`   ✅ Products retrieved: ${response.data.products?.length || 0} products\n`);
    testsPassed++;
  } catch (error) {
    console.log('   ❌ Get products failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 3: Register User
  try {
    console.log('3️⃣  Testing User Registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'Test@123',
      phone: '+1234567890'
    };
    const response = await axios.post(`${BASE_URL}/auth/register`, testUser);
    if (response.data.token) {
      console.log('   ✅ User registration successful\n');
      testsPassed++;
      
      // Test 4: Get User Profile
      try {
        console.log('4️⃣  Testing Get User Profile...');
        const profileResponse = await axios.get(`${BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${response.data.token}` }
        });
        console.log(`   ✅ Profile retrieved: ${profileResponse.data.name}\n`);
        testsPassed++;
      } catch (error) {
        console.log('   ❌ Get profile failed:', error.message, '\n');
        testsFailed++;
      }
    }
  } catch (error) {
    console.log('   ❌ User registration failed:', error.response?.data?.message || error.message, '\n');
    testsFailed++;
  }

  // Summary
  console.log('━'.repeat(50));
  console.log(`\n📊 Test Summary:`);
  console.log(`   ✅ Passed: ${testsPassed}`);
  console.log(`   ❌ Failed: ${testsFailed}`);
  console.log(`   📈 Total: ${testsPassed + testsFailed}\n`);
  
  if (testsFailed === 0) {
    console.log('🎉 All tests passed! Backend is working correctly.\n');
  } else {
    console.log('⚠️  Some tests failed. Please check the backend configuration.\n');
  }
}

// Run tests
testBackend().catch(error => {
  console.error('❌ Test suite failed:', error.message);
  console.error('\n💡 Make sure:');
  console.error('   1. Backend server is running (npm start in Backend folder)');
  console.error('   2. MongoDB is running');
  console.error('   3. .env file is configured correctly\n');
});
