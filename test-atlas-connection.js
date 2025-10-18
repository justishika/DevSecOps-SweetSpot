// Test script to verify MongoDB Atlas connection
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sweetspot";

console.log("🔗 Testing MongoDB Atlas Connection...");
console.log("📍 Connection URI:", MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials

async function testConnection() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Successfully connected to MongoDB Atlas!");
        
        // Test basic operations
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("📊 Collections found:", collections.length);
        
        // Test creating a simple document
        const testCollection = db.collection('connection-test');
        await testCollection.insertOne({ 
            test: true, 
            timestamp: new Date(),
            message: "MongoDB Atlas connection successful!" 
        });
        console.log("✅ Test document inserted successfully!");
        
        // Clean up test document
        await testCollection.deleteOne({ test: true });
        console.log("🧹 Test document cleaned up!");
        
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB Atlas");
        console.log("🎉 All tests passed! Your MongoDB Atlas setup is working perfectly!");
        
    } catch (error) {
        console.error("❌ MongoDB Atlas connection failed:", error.message);
        console.log("\n🔧 Troubleshooting tips:");
        console.log("1. Make sure your MongoDB Atlas cluster is running");
        console.log("2. Check that your IP address is whitelisted");
        console.log("3. Verify your username and password are correct");
        console.log("4. Ensure your connection string is properly formatted");
        process.exit(1);
    }
}

testConnection();
