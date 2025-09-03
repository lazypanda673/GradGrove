import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Prioritize Atlas if available, else fallback to local
const atlasURI = process.env.MONGODB_ATLAS_URI;
const localURI = process.env.MONGODB_LOCAL_URI || "mongodb://localhost:27017/GradGrove";
const dbName = "GradGrove";

async function initDB() {
  let client;
  let connectedTo = "";

  try {
    // Try Atlas first if provided
    if (atlasURI) {
      try {
        client = new MongoClient(atlasURI);
        await client.connect();
        connectedTo = "MongoDB Atlas";
      } catch (e) {
        console.warn("⚠️ Failed to connect to Atlas:", e.message);
      }
    }

    // Fallback to local if Atlas fails or not provided
    if (!client || !client.topology?.isConnected()) {
      client = new MongoClient(localURI);
      await client.connect();
      connectedTo = "Local MongoDB";
    }

    console.log(`✅ Connected to ${connectedTo}`);

    const db = client.db(dbName);
    const users = db.collection("users");

    // Seed test user if not present
    const existingUser = await users.findOne({ email: "test@example.com" });

    if (!existingUser) {
      await users.insertOne({
        name: "First User",
        email: "test@example.com",
        createdAt: new Date(),
      });
      console.log("✅ Inserted test user into 'users' collection!");
    } else {
      console.log("ℹ️ Test user already exists in 'users' collection.");
    }
  } catch (error) {
    console.error("❌ Database initialization error:", error.message);
  } finally {
    await client?.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

initDB();
