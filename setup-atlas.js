// Setup script for MongoDB Atlas configuration
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("🚀 MongoDB Atlas Setup for SweetSpot Marketplace");
console.log("=" .repeat(50));

console.log("\n📋 Before we start, make sure you have:");
console.log("✅ Created a MongoDB Atlas account");
console.log("✅ Created a cluster (M0 Sandbox is free)");
console.log("✅ Created a database user");
console.log("✅ Whitelisted your IP address (0.0.0.0/0 for development)");
console.log("✅ Copied your connection string");

console.log("\n🔗 Your connection string should look like:");
console.log("mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority");

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function setup() {
    try {
        console.log("\n" + "=".repeat(50));
        
        const connectionString = await askQuestion("\n🔗 Paste your MongoDB Atlas connection string: ");
        
        if (!connectionString.includes('mongodb+srv://')) {
            console.log("❌ Invalid connection string format. Please make sure it starts with 'mongodb+srv://'");
            rl.close();
            return;
        }
        
        console.log("\n📝 Environment Configuration:");
        console.log("Add this to your environment variables:");
        console.log(`MONGODB_URI=${connectionString}`);
        console.log(`JWT_SECRET=your-secret-jwt-key-here`);
        console.log(`NODE_ENV=development`);
        console.log(`PORT=3001`);
        
        console.log("\n🔧 To set environment variables on Windows:");
        console.log("set MONGODB_URI=" + connectionString);
        console.log("set JWT_SECRET=your-secret-jwt-key-here");
        console.log("set NODE_ENV=development");
        console.log("set PORT=3001");
        
        console.log("\n🧪 To test your connection:");
        console.log("node test-atlas-connection.js");
        
        console.log("\n🚀 To run your application:");
        console.log("npm run dev");
        
        console.log("\n✅ Setup complete! Happy coding!");
        
    } catch (error) {
        console.error("❌ Setup failed:", error.message);
    } finally {
        rl.close();
    }
}

setup();
