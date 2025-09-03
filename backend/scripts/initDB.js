import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables (optional)
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/GradGrove";
const client = new MongoClient(uri);

async function initDB() {
  try {
    await client.connect();
    console.log("✅ Connected to local MongoDB");

    const db = client.db("GradGrove");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email: "test@example.com" });

    if (!existingUser) {
      await users.insertOne({ name: "First User", email: "test@example.com" });
      console.log("✅ Inserted test user into 'users' collection!");
    } else {
      console.log("ℹ️ Test user already exists in 'users' collection.");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error.stack);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

initDB();
